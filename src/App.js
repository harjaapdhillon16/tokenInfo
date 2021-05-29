import './App.css';
import React, { useContext, useEffect } from 'react';
import { Hub, API, graphqlOperation, Auth } from 'aws-amplify';
import { createAgent } from './graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainWrapper from './wrappers/MainWrapper';
import FormController from './views/FormController';
import { Switch, Route } from 'react-router-dom';
import appContext from './context/appContext';
import { getAgent } from './graphql/queries';

function App() {
	const { setAgent, setUser } = useContext(appContext);

	function authHandler() {
		Auth.currentAuthenticatedUser()
			.then((user) => {
				setUser(user);
				const { sub, email } = user.attributes;
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
			})
			.catch(() => {});
	}

	useEffect(() => {
		authHandler();
	}, []);

	useEffect(() => {
		Hub.listen('auth', (data) => {
			switch (data.payload.event) {
				case 'signIn':
					authHandler();
					break;
				case 'signOut':
					setUser(null);
					setAgent(null);
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
