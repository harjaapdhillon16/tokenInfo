import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AppContext } from './context/appContext';

Amplify.configure(awsconfig);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AppContext>
				<SnackbarProvider maxSnack={3} autoHideDuration={3500}>
					<App />
				</SnackbarProvider>
			</AppContext>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
