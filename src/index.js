import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from './context/appContext';

Amplify.configure(awsconfig);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AppContext>
				<App />
			</AppContext>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
