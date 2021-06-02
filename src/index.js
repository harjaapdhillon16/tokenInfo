import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from './context/appContext';
import FormController from './views/FormController';
import { Route } from 'react-router-dom';

Amplify.configure(awsconfig);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AppContext>
				<App />
				<Route path="/formSubmission/:id" component={FormController} />
			</AppContext>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
