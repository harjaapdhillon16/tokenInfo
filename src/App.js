import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { Hub, API, graphqlOperation, Auth } from 'aws-amplify';
import { Route, useHistory } from 'react-router-dom';
import appContext from './context/appContext';
import { getAgent } from './graphql/queries';
import AuthRouter from './router/authRouter';
import AppRouter from './router/applicationRouter';
import Loader from './components/Loader/Loader';
import FormController from './views/FormController';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendEmail } from './utils/email';

function App() {
	const { setAgent, setUser } = useContext(appContext);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	function authHandler() {
		Auth.currentAuthenticatedUser()
			.then((user) => {
				setUser(user);
				API.graphql(graphqlOperation(getAgent, { id: user.attributes.sub }))
					.then((res) => {
						setAgent(res.data.getAgent);
						setLoading(false);
					})
					.catch(() => {});
			})
			.catch(() => setLoading(false));
	}

	useEffect(() => {
		authHandler();
	}, []);

	useEffect(() => {
		Hub.listen('auth', (data) => {
			switch (data.payload.event) {
				case 'signUp':
				case 'signIn':
					authHandler();
					break;
				case 'signOut':
					history.push('/login');
					setAgent(null);
					break;
				default:
					break;
			}
		});
	}, []);

	if (loading) return <Loader />;

	return (
		<>
			<ToastContainer />
			<AuthRouter />
			<AppRouter />
			<Route path="/formSubmission/:id" component={FormController} />
		</>
	);
}
export default App;
