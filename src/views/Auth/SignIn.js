import React from 'react';
import * as Yup from 'yup';
import { FormikProvider, Form, useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form as TextInput, FormLabel, Button } from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import Loader from '../../components/Loader/Loader';

const signUpSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	password: Yup.string().required('Password is required')
});

export default function SignUp() {
	const { enqueueSnackbar } = useSnackbar();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: signUpSchema,
		onSubmit: async ({ email, password }, { setSubmitting }) => {
			try {
				await Auth.signIn(email, password);
				setSubmitting(false);
			} catch (e) {
				console.error(e);
				setSubmitting(false);
			}
		}
	});

	const { getFieldProps, touched, errors, handleSubmit, isSubmitting } = formik;

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
					<Row className="justify-content-md-center">
						<Col md={4} >
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
					<Row
						className="align-items-md-center mt-3 justify-content-md-center"
						style={{ justifyContent: 'space-evenly' }}>
						<Button type="submit" className="px-4 mb-2">Login</Button>
					</Row >
					<Row className="align-items-md-center  justify-content-md-center">
					<Link to="/register">Don't have an account yet?</Link>
					</Row>
					<div className="align-items-center d-flex justify-content-center pt-2">
						<Link to ="#">Reset Password</Link>
					</div>
					
				</Container>
			</Form>
		</FormikProvider>
	);
}
