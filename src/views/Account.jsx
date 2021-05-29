import React, { useEffect, useState, useContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { IconChecked } from '../assets/icons/icons';
import { Container, Row, Col, Card, InputGroup, Button } from 'react-bootstrap';
import Editable from '../components/Editable';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Loader from '../components/Loader/Loader';
import appContext from '../context/appContext';
import { updateAgent } from '../graphql/mutations';

const FormsScreen = () => {
	const { agent, setAgent } = useContext(appContext);

	function editAgent(updatedValue) {
		console.log(updatedValue, agent.id);
		setAgent({ ...agent, ...updatedValue });
		API.graphql(
			graphqlOperation(updateAgent, {
				input: { id: agent.id, ...updatedValue }
			})
		)
			.then(console.log)
			.catch(console.log);
	}

	if (!agent) return <Loader />;

	return (
		<Container fluid  className="p-0">
			<Header />
			<Container>
				<Breadcrumb className="title-bar">
					<Breadcrumb.Item>
						<Link to="/">Home</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item href="">Account</Breadcrumb.Item>
				</Breadcrumb>
				<Row>
					<Col md={12} className="pt-5">
						<h5>Account</h5>
					</Col>
				</Row>
				<Row>
					<Col md={8}>
						<Editable
							label="Name"
							value={agent.name}
							onSave={(val) => editAgent({ name: val })}
						/>
						<Editable
							label="Email"
							value={agent.email}
							onSave={(val) => editAgent({ email: val })}
						/>
						<Editable
							label="Brokerage"
							value={agent.brokerageName}
							onSave={(val) => editAgent({ brokerageName: val })}
						/>
						<Editable
							label="State of licensure"
							value={agent.stateOfLicensure}
							onSave={(val) => editAgent({ stateOfLicensure: val })}
						/>
					</Col>
					<Col md={4} className="pt-4">
						<Card>
							<IconChecked />
							<Card.Body>
								<Card.Title className="pt-3">
									<h6>Confirm Account Info</h6>
								</Card.Title>
								<Card.Text>Review and update your account information</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default FormsScreen;
