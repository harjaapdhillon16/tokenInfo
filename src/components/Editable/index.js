import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import {} from 'react-router-dom';

export default function Editable(props) {
	const [input, setInput] = useState(props.value || '');
	const [editMode, setEditMode] = useState(false);

	function onClickHandler() {
		if (editMode) {
			setEditMode(false);
			if (props.value !== input) {
				props.onSave(input);
			}
		} else {
			setEditMode(true);
		}
	}

	return (
		<Row className="border-bottom py-4">
			<Col md={7}>
				<h5>{props.label}</h5>
				{editMode ? (
					<Form.Control
						type="text"
						placeholder={`Enter ${props.label.toLowerCase()}`}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				) : (
					props.value
				)}
			</Col>
			<Col md={5} className="text-right">
				<h6 style={{ color: '#007bff', cursor: 'pointer' }} onClick={onClickHandler}>
					{editMode ? 'Save' : 'Edit'}
				</h6>
			</Col>
		</Row>
	);
}
