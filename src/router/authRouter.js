import React from 'react';
import PublicRoute from '../wrappers/PublicRoute';
import SignUp from '../views/Auth/SignUp';
import SignIn from '../views/Auth/SignIn';
import ConfirmSignUp from '../views/Auth/ConfirmSignUp';
import ForgetPassword from '../views/Auth/ForgetPassword';
import ResetPassword from '../views/Auth/ResetPassword';

export default function AuthRouter() {
	return (
		<>
			<PublicRoute exact path="/login">
				<SignIn />
			</PublicRoute>
			<PublicRoute exact path="/register">
				<SignUp />
			</PublicRoute>
			<PublicRoute exact path="/confirmSignup">
				<ConfirmSignUp />
			</PublicRoute>
			<PublicRoute exact path="/forgot-password">
				<ForgetPassword />
			</PublicRoute>
			<PublicRoute exact path="/reset-password">
				<ResetPassword />
			</PublicRoute>
		</>
	);
}
