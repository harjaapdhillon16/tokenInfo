import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import EventItem from './EventItem';
import Loader from '../Loader/Loader';
import { listFormEvents } from '../../graphql/queries';

AuditTrail.propTypes = {
	formDataId: PropTypes.string
};

const EVENTS = [
	{
		timestamp: 'May 23, 2021 12:15 pm EDT',
		body:
			'Mont Sky Full Service Listing Agreement and Disclosure Forms - Sameer Tyagi Uploaded by Nick Oliver - team@hauseit.com IP 68.173.27.233'
	},
	{
		timestamp: 'May 23, 2021 12:15 pm EDT',
		body:
			'Mont Sky Full Service Listing Agreement and Disclosure Forms - Sameer Tyagi Uploaded by Nick Oliver - team@hauseit.com IP 68.173.27.233'
	},
	{
		timestamp: 'May 23, 2021 12:15 pm EDT',
		body:
			'Mont Sky Full Service Listing Agreement and Disclosure Forms - Sameer Tyagi Uploaded by Nick Oliver - team@hauseit.com IP 68.173.27.233'
	}
];

export default function AuditTrail(props) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		API.graphql(
			graphqlOperation(listFormEvents, { filter: { formDataId: { eq: props.formDataId } } })
		).then((res) => {
			console.log(res.data.listFormEvents.items);
		});
	}, []);

	return (
		<Container fluid="sm" style={{ borderTop: '1px solid #e2e2e2', padding: '3em 0' }}>
			<Row className="justify-content-md-between align-items-md-center my-2 mb-3">
				<Col>
					<h6>
						<b>Timestamp</b>
					</h6>
				</Col>
				<Col>
					<h6>
						<b>Audit</b>
					</h6>
				</Col>
			</Row>
			{EVENTS.map((event) => (
				<EventItem {...event} />
			))}
		</Container>
	);
}

// const Wrapper = styled.div`
// 	display: flex;
// 	flex-direction: row;
// `;

// const TimestampWrapper = styled.div`
// 	width: 35%;
// 	padding-right: 1em;
// `;
