import React from 'react';
import PublicRoute from '../wrappers/PublicRoute';
import SignUp from '../views/Auth/SignUp';
import SignIn from '../views/Auth/SignIn';

export default function AuthRouter() {
	return (
		<>
			<PublicRoute exact path="/login">
				<SignIn />
			</PublicRoute>
			<PublicRoute exact path="/register">
				<SignUp />
			</PublicRoute>
		</>
	);
}
