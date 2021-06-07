import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

EventItem.propTypes = {
	timestamp: PropTypes.string,
	body: PropTypes.string
};

export default function EventItem(props) {
	return (
		<Row className="justify-content-md-between align-items-md-center my-2 mb-4">
			<Col>
				<p>{props.timestamp}</p>
			</Col>
			<Col>
				<p>{props.body}</p>
			</Col>
		</Row>
	);
}
