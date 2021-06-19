import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import EventItem from './EventItem';
import { listFormEvents } from '../../graphql/queries';
import { getEventBody } from '../../utils/formEventsHelpers';

AuditTrail.propTypes = {
	formDataId: PropTypes.string
};

export default function AuditTrail(props) {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		API.graphql(
			graphqlOperation(listFormEvents, { filter: { formDataId: { eq: props.formDataId } } })
		)
			.then((res) => {
				setEvents(
					res.data.listFormEvents.items
						.map((item) => ({
							...item,
							createdAt: new Date(item.createdAt).getTime()
						}))
						.sort((a, b) => a.createdAt - b.createdAt)
				);
			})
			.catch(() => {});
	}, []);

	return events.length !== 0 ? (
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
			{events.map((event, i) => (
				<EventItem
					timestamp={new Date(event.createdAt).toUTCString()}
					body={getEventBody(event)}
					key={i}
				/>
			))}
		</Container>
	) : null;
}
