import React, { useContext } from 'react';
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from '../assets/icons/icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import AppCard from '../components/card/card';
import Header from '../components/header/header';
import ApplicationRouter from '../router/applicationRouter';
import { withAuthenticator } from '@aws-amplify/ui-react';
import AppContext from '../context/appContext';


const MainWrapper = () => {
	const { agent } = useContext(AppContext);

	if (!agent) return 'Loading...';

	return (
		<Container fluid>
			<ApplicationRouter />
		</Container>
	);
};

export default withAuthenticator(MainWrapper);
