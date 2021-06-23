import { API, graphqlOperation } from 'aws-amplify';
import { listFormEvents } from '../graphql/queries';
import { createFormEvent } from '../graphql/mutations';
import { v4 as getIp } from 'public-ip';

export default async function formEventsHandler(formDataId, eventType, subjects) {
	try {
		const response = await API.graphql(
			graphqlOperation(listFormEvents, {
				filter: { formDataId: { eq: formDataId } }
			})
		);

		const trail = response.data.listFormEvents.items
			.map((item) => ({
				...item,
				createdAt: new Date(item.createdAt).getTime()
			}))
			.sort((a, b) => a.createdAt - b.createdAt);

		let currentIp;

		try {
			currentIp = await getIp();
		} catch (e) {
			currentIp = '127.0.0.1';
		}

		const eventBody = {
			formDataId,
			type: eventType,
			subjects,
			ip: currentIp
		};

		if (!canCreateEvent(trail, subjects, eventType)) return;

		API.graphql(graphqlOperation(createFormEvent, { input: eventBody }));
	} catch (e) {
		console.error(e);
	}
}

export function getEventBody(event) {
	switch (event.type) {
		case 'SENT':
			return `Sent for signature to ${getSubjectAsString(
				event.subjects[0]
			)} from ${getSubjectAsString(event.subjects[1])} - IP: ${event.ip}`;
		case 'VIEWED':
			return `Viewed by ${getSubjectAsString(event.subjects[0])} - IP: ${event.ip}`;
		case 'SIGNED':
			return `Signed by ${getSubjectAsString(event.subjects[0])} - IP: ${event.ip}`;
		default:
			break;
	}
}

function getSubjectAsString(subject) {
	return `${subject.name} (${subject.email})`;
}

function canCreateEvent(sortedTrail, subjects, type) {
	return (
		sortedTrail.findIndex(
			(item) => item.type === type && item.subjects[0].email === subjects[0].email
		) === -1
	);
}
