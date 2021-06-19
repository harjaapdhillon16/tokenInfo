import { API, graphqlOperation } from 'aws-amplify';
import { listFormEvents } from '../graphql/queries';
import { createFormEvent } from '../graphql/mutations';
import { v4 as getIp } from 'public-ip';

/* call this function whenever you need to create an event. It only creates VIEWED event if it's the user's first time viewing the form.
PARAMS:
formDataId: string - id of the formData that the event will be associated with
eventType: string - type of the event. could be any of 'VIEWED', 'SENT' or 'SIGNED'
subjects: array of objects - name and email of the contacts that triggered the event
e.g. [{name: 'contact1', email: 'contact1@gmail.com'}]
*/
export default async function formEventsHandler(formDataId, eventType, subjects) {
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

	const currentIp = await getIp();

	const eventBody = {
		formDataId,
		type: eventType,
		subjects,
		ip: currentIp
	};

	if (eventType === 'VIEWED' && !canCreateViewEvent(trail, subjects)) return;

	await API.graphql(graphqlOperation(createFormEvent, { input: eventBody }));
}

/*
Helper function to get a audit trail string from an event.
event: object - an event item fetched from aws
agentEmail: string - email of the agent that sent the form (only required in case of a SENT event)
*/
export function getEventBody(event, agentEmail) {
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
	// subjects = subjects.map((val) => `${val.name} (${val.email})`);
	// return subjects[0];
	return `${subject.name} (${subject.email})`;
	// const last = subjects.pop();
	// return `${subjects.join(', ')} and ${last}`;
}

function canCreateViewEvent(sortedTrail, subjects) {
	return (
		sortedTrail.findIndex(
			(item) => item.type === 'VIEWED' && item.subject[0].email === subjects[0].email
		) === -1
	);
}
