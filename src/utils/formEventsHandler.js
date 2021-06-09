import { API, graphqlOperation } from 'aws-amplify';
import { listFormEvents } from '../graphql/queries';
import { createFormEvent } from '../graphql/mutations';
import { v4 as getIp } from 'public-ip';

export default async function formEventsHandler(formDataId, eventName) {
	const response = await API.graphql(
		graphqlOperation(listFormEvents, {
			filter: { formDataId: { eq: formDataId } }
		})
	);
	const data = await API.graphql(
		graphqlOperation(createFormEvent, {
			// input: {181cb4f1-feef-43ad-afef-cf2813f5fc27}
		})
	);
	console.log('Hey there', response);
}
