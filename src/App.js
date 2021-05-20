// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Hub, API, graphqlOperation } from 'aws-amplify';
import { createAgent } from './graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainWrapper from './wrappers/MainWrapper';
import FormController from './views/FormController';
import { Switch, Route, Redirect } from 'react-router-dom';

Hub.listen('auth', (data) => {
	const { sub, email } = data.payload.data.attributes;
	let attributes = { id: sub, email };
	switch (data.payload.event) {
		case 'signIn':
			API.graphql(
				graphqlOperation(createAgent, {
					input: attributes,
					condition: { id: { attribute_not_exists: attributes.id } }
				})
			).catch(() => {});
			break;
		default:
			break;
	}
});

function App() {
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
