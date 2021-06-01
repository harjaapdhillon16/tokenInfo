import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, Form, useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import { Container, Col, Row, Form as TextInput, FormLabel, Button } from 'react-bootstrap';

const signUpSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().email().required('Email is required'),
	password: Yup.string().required('Password is required')
});

export default function SignUp(props) {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		},
		validationSchema: signUpSchema,
		onSubmit: (values) => {}
	});

	const { getFieldProps, touched, errors } = formik;
	console.log(errors);

	return (
		<Container fluid="sm">
			<Row className="justify-content-md-center my-5">
				<Col xs={6}>
					<FormLabel>Email</FormLabel>
					<TextInput.Control placeholder="Enter your email" {...getFieldProps('email')} />
					{touched.email && errors.email && (
						<TextInput.Text className="text-error">{errors.email}</TextInput.Text>
					)}
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col xs={6}>
					<FormLabel>Password</FormLabel>
					<TextInput.Control
						placeholder="Enter your password"
						type="password"
						{...getFieldProps('password')}
					/>
					{touched.password && errors.password && (
						<TextInput.Text className="text-error">{errors.password}</TextInput.Text>
					)}
				</Col>
			</Row>
		</Container>
	);
}
