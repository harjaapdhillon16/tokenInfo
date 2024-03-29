import React from 'react';
import * as Yup from 'yup';
import { FormikProvider, Form, useFormik } from 'formik';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Container, Col, Row, Form as TextInput, FormLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSnackbar } from 'notistack';
import Loader from '../../components/Loader/Loader';
import { createAgent } from '../../graphql/mutations';

const signUpSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().email().required('Email is required'),
	password: Yup.string().required('Password is required')
});

export default function SignUp() {
	const { enqueueSnackbar } = useSnackbar();
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			companyName: '',
			stateLicensure: '',
			password: ''
		},
		validationSchema: signUpSchema,
		onSubmit: async (
			{ firstName, lastName, email, password, stateLicensure, companyName },
			{ setSubmitting }
		) => {
			try {
				const user = await Auth.signUp({
					username: email,
					password,
					attributes: {
						email,
						given_name: firstName,
						family_name: lastName
					}
				});
				await API.graphql(
					graphqlOperation(createAgent, {
						input: {
							id: user.userSub,
							name: `${firstName} ${lastName}`,
							email,
							...(companyName ? { brokerageName: companyName } : {}),
							...(stateLicensure ? { stateOfLicensure: stateLicensure } : {})
						}
					})
				);
				toast.success(
					'Thank you for registering with Cribfox! Please verify your account by clicking on the link that was sent to your email address.'
				);
				setSubmitting(false);
			} catch (e) {
				console.error(e);
				setSubmitting(false);
			}
		}
	});

	const { getFieldProps, touched, errors, isSubmitting, handleSubmit } = formik;

	if (isSubmitting) return <Loader />;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Container fluid="sm" className="py-5">
					<Row className="justify-content-md-center mt-5">
						<Col md={4}>
							<FormLabel>First name</FormLabel>
							<TextInput.Control
								placeholder="Enter your first name"
								{...getFieldProps('firstName')}
							/>
							{touched.firstName && errors.firstName && (
								<TextInput.Text className="text-error">{errors.firstName}</TextInput.Text>
							)}
						</Col>
					</Row>
					<Row className="justify-content-md-center mt-2">
						<Col md={4}>
							<FormLabel>Last name</FormLabel>
							<TextInput.Control
								placeholder="Enter your last name"
								{...getFieldProps('lastName')}
							/>
							{touched.lastName && errors.lastName && (
								<TextInput.Text className="text-error">{errors.lastName}</TextInput.Text>
							)}
						</Col>
					</Row>
					<Row className="justify-content-md-center my-2">
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
						<Col md={4}>
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
					<Row className="justify-content-md-center my-2">
						<Col md={4}>
							<FormLabel>Company name</FormLabel>
							<TextInput.Control
								placeholder="Enter your company name"
								{...getFieldProps('companyName')}
							/>
							{touched.companyName && errors.companyName && (
								<TextInput.Text className="text-error">{errors.companyName}</TextInput.Text>
							)}
						</Col>
					</Row>
					<Row className="justify-content-md-center my-2">
						<Col md={4}>
							<FormLabel>State of licensure</FormLabel>
							<TextInput.Control
								placeholder="Enter your state of licensure"
								{...getFieldProps('stateLicensure')}
							/>
							{touched.stateLicensure && errors.stateLicensure && (
								<TextInput.Text className="text-error">
									{errors.stateLicensure}
								</TextInput.Text>
							)}
						</Col>
					</Row>
					<Row
						className="align-items-center justify-content-center mt-3"
						style={{ justifyContent: 'space-evenly' }}>
						<Button type="submit">Register</Button>
					</Row>
					<Row className="align-items-center  justify-content-center mt-1">
						<Link to="/login">Already have an account?</Link>
					</Row>
				</Container>
			</Form>
		</FormikProvider>
	);
}
