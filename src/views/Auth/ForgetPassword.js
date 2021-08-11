import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, Form, useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import {
	Container,
	Col,
	Row,
	Form as TextInput,
	FormLabel,
	Button,
	FormText
} from 'react-bootstrap';
import Loader from '../../components/Loader/Loader';

const signUpSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required')
});

export default function ForgetPassword() {
	const [isSubmitted, setSubmitted] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: signUpSchema,
		onSubmit: async ({ email }, { setSubmitting }) => {
			try {
				await Auth.forgotPassword(email);
				setSubmitting(false);
				setSubmitted(true);
			} catch (e) {
				console.error(e);
				setSubmitting(false);
			}
		}
	});

	const { getFieldProps, touched, errors, handleSubmit, isSubmitting } = formik;

	if (isSubmitted) {
		return (
			<Container fluid="sm" className="py-5">
				<Row className="justify-content-md-center mt-5 mb-2">
					<Col md={4}>
						<FormText>We have sent you an email with further instructions</FormText>
					</Col>
				</Row>
			</Container>
		);
	}

	if (isSubmitting) return <Loader />;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Container fluid="sm" className="py-5">
					<Row className="justify-content-md-center mt-5 mb-2">
						<Col md={4}>
							<FormLabel>Email</FormLabel>
							<TextInput.Control
								placeholder="Enter your email"
								{...getFieldProps('email')}
							/>
							{touched.email && errors.email && (
								<TextInput.Text className="text-error">{errors.email}</TextInput.Text>
							)}
						</Col>
					</Row>
					<Row
						className="align-items-md-center mt-3 justify-content-md-center"
						style={{ justifyContent: 'space-evenly' }}>
						<Button type="submit" className="px-4 mb-2">
							Reset my password
						</Button>
					</Row>
				</Container>
			</Form>
		</FormikProvider>
	);
}
