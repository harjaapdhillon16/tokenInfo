import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import appContext from '../context/appContext';

export default function PrivateRoute({ children, ...rest }) {
	const { agent } = useContext(appContext);

	return <Route {...rest} render={() => (agent ? children : <Redirect to="/login" />)} />;
}
