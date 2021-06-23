import React, { useEffect, useState, useContext } from 'react';

import { IconPlus } from '../../assets/icons/icons';
import { Container, Modal, InputGroup, Form, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import AppCard from '../card/card';
import Header from '../header/header';
import AppContext from '../../context/appContext';
import { API, graphqlOperation } from 'aws-amplify';
import { listContacts } from '../../graphql/queries';
import { createContact } from '../../graphql/mutations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const CreateContactForm = ({ show, handleClose, setShow }) => {
	// const [show, setShow] = useState(false);
	// const handleClose = () => setShow(false);
	const { contacts, agent, onUpdateContacts } = useContext(AppContext);
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			companyName: '',
			title: '',
			phoneNum: '',
			roleInCompany: ''

			// agentId: "",
			// type:''
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please enter your contact's full name!"),
			email: Yup.string()
				.email("Please enter your contact's email address!")
				.required("Please enter your contact's email address!")
			// phoneNum: Yup.string()
			//   .required("Enter your valid phone number!")
			//   .matches(phoneRegExp, "Phone number is not valid")
			//   .min(10, "to short")
			//   .max(10, "to long"),
			// roleInCompany: Yup.string().required("Your role in Company"),
			// agentId: Yup.string().required("Enter your valid agent id"),
		}),
		onSubmit: (values, { resetForm }) => {
			handleContactCreation(values, resetForm);
		}
	});
	const handleContactCreation = async (values, resetForm) => {
		const data = {
			// agentId: values.agentId,
			agentId: agent.id,
			name: values.name,
			email: values.email,
			phoneNum: values.phoneNum,
			roleInCompany: values.roleInCompany,
			companyName: values.companyName,
			title: values.title
		};

		try {
			const createdContact = await API.graphql(graphqlOperation(createContact, { input: data }));
			const newContacts = [...contacts, createdContact.data.createContact];
			onUpdateContacts(newContacts);
			resetForm({});
			setShow(false);
			toast.success('Contact Created Successfully!');
		} catch (err) {
			console.log(err, 'Error creating contact');
			toast.error('Please try again!');
		}
	};

	return (
		<Modal show={show} onHide={handleClose} className="my-1">
			<Modal.Header closeButton>
				<Modal.Title className="text-center m-auto">Add New Contact</Modal.Title>
			</Modal.Header>
			<Form onSubmit={formik.handleSubmit}>
				<Modal.Body>
					{formik.touched.name && formik.errors.name && (
						<Form.Text className="text-error">{formik.errors.name}</Form.Text>
					)}
					<Form.Control
						className="mb-3"
						name="name"
						value={formik.values.name}
						type="text"
						placeholder="Full name"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
					/>

					{formik.touched.email && formik.errors.email && (
						<Form.Text className="text-error">{formik.errors.email}</Form.Text>
					)}
					<Form.Control
						className="mb-3"
						name="email"
						value={formik.values.email}
						type="text"
						placeholder="Email address"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
					/>

					<div>
						<Form.Control
							className="mb-3"
							name="companyName"
							// value={formik.values.companyName}
							type="text"
							placeholder="Company name (optional)"
							onChange={formik.handleChange}
						/>
					</div>
					<div>
						<Form.Control
							className="mb-3"
							name="title"
							value={formik.values.title}
							type="text"
							placeholder="Title (optional)"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</div>

					{formik.touched.phoneNum && formik.errors.phoneNum && (
						<Form.Text className="text-error">{formik.errors.phoneNum}</Form.Text>
					)}
					<Form.Control
						className="mb-3"
						name="phoneNum"
						// value={formik.values.phoneNum}
						type="number"
						placeholder="Phone Number (optional)"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
					/>
					{/* {formik.touched.roleInCompany && formik.errors.roleInCompany && (
            <Form.Text className="text-error">
              {formik.errors.roleInCompany}
            </Form.Text>
          )} */}

					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Control
							as="select"
							name="roleInCompany"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							// value={formik.values.roleInCompany}
						>
							<option value="" disabled selected hidden>
								Role
							</option>
							<option></option>
							<option>Buyer</option>
							<option>Agent</option>
							<option>Seller</option>
							<option>Landlord</option>
							<option>Tenant</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer className="my-4">
					<Button
						variant="primary"
						className="m-auto px-5"
						type="submit"
						disabled={!(formik.isValid && formik.dirty)}>
						Save
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default CreateContactForm;
