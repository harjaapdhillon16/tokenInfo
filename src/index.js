import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter} from "react-router-dom";

Amplify.configure(awsconfig);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>

	</React.StrictMode>,
	document.getElementById('root')
);
