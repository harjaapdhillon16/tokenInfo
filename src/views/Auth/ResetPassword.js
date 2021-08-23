import * as Yup from 'yup';
import React, { useState } from 'react';
import { FormikProvider, Form, useFormik } from 'formik';
import { Container, Col, Row, Form as TextInput, FormLabel, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import useQuery from '../../hooks/useQuery';

const passwordSchema = Yup.object().shape({
	password: Yup.string().min(8).required('Password is required')
});

export default function ResetPassword() {
	const query = useQuery();
	const username = query.get('username');
	const code = query.get('code');

	const [isRedirect, setRedirect] = useState(false);

	const formik = useFormik({
		initialValues: {
			password: ''
		},
		validationSchema: passwordSchema,
		onSubmit: async ({ password }, { setSubmitting }) => {
			try {
				if (username && code) {
					Auth.forgotPasswordSubmit(username, code, password)
						.then(() => {
							setRedirect(true);
							setSubmitting(false);
							toast.success(
								'Your password was changed. You can now log in with the new password'
							);
						})
						.catch((e) => {
							setSubmitting(false);
							toast.error(e.message);
						});
				} else {
					setSubmitting(false);
					toast.error('Invalid URL');
				}
			} catch (e) {
				setSubmitting(false);
				toast.error('Invalid URL');
			}
		}
	});

	const { getFieldProps, touched, errors, handleSubmit, isSubmitting } = formik;

	if (isRedirect) return <Redirect to="/login" />;

	if (isSubmitting) return <Loader />;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Container fluid="sm" className="py-5">
					<Row className="justify-content-md-center mt-5 mb-2">
						<Col md={4}>
							<FormLabel>
								Enter a new password. Make sure it's at least 8 characters
							</FormLabel>
							<TextInput.Control
								placeholder="Enter a new password that's at least 8 characters long"
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
						<Button type="submit" className="px-4 mb-2">
							Change password
						</Button>
					</Row>
				</Container>
			</Form>
		</FormikProvider>
	);
}
