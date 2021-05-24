import './App.css';
import React, { useContext, useEffect } from 'react';
import { Hub, API, graphqlOperation } from 'aws-amplify';
import { createAgent } from './graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainWrapper from './wrappers/MainWrapper';
import FormController from './views/FormController';
import { Switch, Route } from 'react-router-dom';
import appContext from './context/appContext';
import { getAgent } from './graphql/queries';

function App() {
	const { setAgent } = useContext(appContext);

	useEffect(() => {
		Hub.listen('auth', (data) => {
			switch (data.payload.event) {
				case 'signIn':
					const { sub, email } = data.payload.data.attributes;
					API.graphql(
						graphqlOperation(createAgent, {
							input: { id: sub, name: email.split('@')[0], email }
						})
					)
						.catch(() => {})
						.finally(() =>
							API.graphql(graphqlOperation(getAgent, { id: sub }))
								.then((res) => setAgent(res.data.getAgent))
								.catch(() => {})
						);
					break;
				default:
					break;
			}
		});
	}, []);

	return (
		<>
			<MainWrapper />
			<Switch>
				<Route path="/formSubmission/:id" component={FormController} />
				{/* <Route exact path="/" component={MainWrapper} /> */}
			</Switch>
		</>
	);
}
export default App;
