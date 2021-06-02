import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { Hub, API, graphqlOperation, Auth } from 'aws-amplify';
import { Route, Redirect, useHistory } from 'react-router-dom';
import appContext from './context/appContext';
import { getAgent } from './graphql/queries';
import AuthRouter from './router/authRouter';
import AppRouter from './router/applicationRouter';
import Loader from './components/Loader/Loader';

function App() {
	const { setAgent, setUser, agent, user } = useContext(appContext);
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

	console.log(history.location.pathname);

	useEffect(() => {
		Hub.listen('auth', (data) => {
			switch (data.payload.event) {
				case 'signUp':
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

	if (loading) return <Loader />;

	return (
		<>
			{agent && <Redirect exact to="/" />}
			{!user && <Redirect exact to="/login" />}
			<AuthRouter />
			<AppRouter />
		</>
	);
}
export default App;
