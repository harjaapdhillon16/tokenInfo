import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from '../views/Auth/SignUp';
import SignIn from '../views/Auth/SignIn';

export default function AuthRouter() {
	return (
		<>
			<Route exact path="/register" component={SignUp} />
			<Route exact path="/login" component={SignIn} />
		</>
	);
}
