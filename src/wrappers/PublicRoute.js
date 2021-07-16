import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import appContext from '../context/appContext';

export default function PublicRoute({ children, ...rest }) {
	const { agent } = useContext(appContext);

	return (
		<Route
			{...rest}
			render={(props) => (agent ? <Redirect to="/" /> : React.cloneElement(children, props))}
		/>
	);
}
