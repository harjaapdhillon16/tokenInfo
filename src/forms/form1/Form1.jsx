import React, { Component, useState, useRef, useEffect } from 'react';
import SignaturePad from 'react-signature-canvas';
import FontPicker from 'font-picker-react';
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import '../form1/css/style1.css';
import { IconFacebook, IconTwitter, IconLinkedin, IconInstagram } from '../../assets/icons/icons';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';
import Logo from '../../assets/FormImages/rebny-logo.png';
import { updateFormData } from '../../graphql/mutations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Auth } from 'aws-amplify';
import ReactToPdf from 'react-to-pdf';
import AuditTrail from './../../components/AuditTrail'

const Form1 = ({ formData }) => {
	const [formItem, setFormItem] = useState(formData);
	const [show, setShow] = useState(false);
	const [canvasShow, setCanvasShow] = useState(true);
	const [fieldShow, setFieldShow] = useState(false);
	const sigPad = useRef({});
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [signImage, setSignImage] = useState('');
	const [activeFontFamily, setActiveFontFamily] = useState('Open Sans');
	const [signAsText, setSignAsText] = useState('');
	const [signMethod, setSignMethod] = useState('draw');
	const [startDate, setStartDate] = useState(new Date());
	const [formSubmitStatus, setFormSubmitStatus] = useState(false);
	const [viewedStatus, setViewedStatus] = useState(false);
	const ref = React.createRef();
	const options = {
		orientation: 'portrait',
		unit: 'in',
		format: [9, 10.3]
	};

	useEffect(() => {
		sendViewStatus();
		checkaAuthentication();
	}, []);

 
	const checkaAuthentication = () => {
		Auth.currentAuthenticatedUser()
			.then((userData) => {
				console.log('userData', userData);
				if (userData !== '') {
					setViewedStatus(true);
				}
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	const sendViewStatus = async () => {
		// setActiveFontFamily(formItem.signatureFont!== "" ? formItem.signatureFont : "Open Sans" );
		if (formItem.status === 'SENT') {
			let data = {};
			data.id = formItem.id;
			data.status = 'VIEWED';
			console.log(data);

			try {
				const checkFormStatus = await API.graphql(
					graphqlOperation(updateFormData, { input: data })
				);
				console.log('checkFormStatus', checkFormStatus);
			} catch (err) {
				console.log(err, 'Error updating Form View status');
			}
		}
	};

	function clear() {
		sigPad.current.clear();
	}

	const genrateImage = () => {
		setShow(false);
		setSignMethod('draw');
		setSignImage(sigPad.current.toDataURL());
	};

	const handleSignAsText = () => {
		setShow(false);
		setSignMethod('sign');
	};

	const toggleMethod = () => {
		if (canvasShow == false) {
			setCanvasShow(true);
			setFieldShow(false);
		} else {
			setCanvasShow(false);
		}
	};

	const toggleField = () => {
		if (fieldShow == false) {
			setFieldShow(true);
			setCanvasShow(false);
		} else {
			setFieldShow(false);
		}
	};
	// formItem.data[7]
	const formik = useFormik({
		initialValues: {
			fullName: formItem.data[1],
			currentDate: '',
			realEstateName: formItem.data[3],
			realEstateBrokerageCompany: formItem.data[5]
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			fullName: Yup.string().required('Please enter the name'),
			currentDate: Yup.string().required('Please enter the date'),
			realEstateName: Yup.string().required('Please enter the Real Estate Name'),
			realEstateBrokerageCompany: Yup.string().required(
				'Please enter the Real Estate Brockerage Company Name'
			)
		}),
		onSubmit: (values) => {
			submitForm(values);
		}
	});

	const submitForm = async (values) => {
		let updateData = [];
		let finalObject = {};
		console.log(values.currentDate);

		let updateDate = JSON.stringify(values.currentDate);
		updateDate = updateDate.slice(1, 11);
		console.log(updateDate);

		// let data = [];
		// data[0] = "name";
		// data[1] = values.fullName;
		// data[2] = "name_of_real_estate";
		// data[3] = values.realEstateName;
		// data[4] = "real_estate_brockerage_company";
		// data[5] = values.realEstateBrokerageCompany;
		// data[6] = "date";
		// data[7] = updateDate;
		// console.log(data);

		// if(signAsText !== ""){
		//   finalObject.id = formItem.id;
		//   finalObject.isSignatureTyped = true;
		//   finalObject.signatureFont = activeFontFamily;
		//   finalObject.signature = signAsText;
		//   finalObject.status = "SIGNED";
		//   finalObject.data = data;
		//   updateData = finalObject;
		// }else if(signImage !== ""){
		//   finalObject.id = formItem.id;
		//   finalObject.isSignatureTyped = false;
		//   finalObject.signature = signImage;
		//   finalObject.status = "SIGNED";
		//   finalObject.data = data;
		//   updateData = finalObject;
		// }

		// console.log("updateData", updateData);

		// try{
		//   const editForm = await API.graphql(
		//     graphqlOperation(updateFormData, { input: updateData })
		//   );
		//   console.log('editFormData', editForm);
		//   console.log(editForm.data.updateFormData.status);

		// }catch (err) {
		//   console.log(err, "Error updating Form data");
		// }

		// setFormSubmitStatus(true);
	};

	console.log('form opened', formItem);
	console.log(activeFontFamily);
	return (
		<Container className="form1" ref={ref}>
			<Row>
				<Col md={6} className="pt-5">
					<h4 class="resource-title font-weight-light">REBNY Resources</h4>
				</Col>
				<Col md={6} className="pt-5">
					<img src={Logo} alt="logo" className="form1-logo" />
				</Col>
			</Row>
			<Row>
				<Col md={10} className="pt-5 form-title pb-5">
					<h1>Limitation of Liability-Form</h1>
					<h3>For Coronavirus (COVID-19)</h3>
				</Col>
			</Row>
			<Row>
				<Col md={12} className="pt-5">
					<p>
						With stay-at-home orders being lifted in New York State, any parties involved in a
						real estate transaction must continue to be aware of the risks that are associated
						with the Coronavirus (COVID-19).
					</p>
					<p>
						Throughout the course of a real estate transaction, it may become necessary for a
						party to enter or access a residential or commercial property in-person, which
						raises the possibility of potential liability resulting from exposure to the
						Coronavirus (COVID-19).
					</p>
					<p>
						By entering the property or permitting a party to enter the property, you
						acknowledge that there is an assumption of exposure to the Coronavirus (COVID-19)
						and any and all consequences that may result from such exposure,including but not
						limited to, physical injury, psychological injury, pain, suffering, illness,
						temporary or permanentdisability, death or economic loss.
					</p>
					<p>
						This form is intended to notify the parties of the risks associated with
						conducting property visits in-person. All parties associated with the in-person
						meeting or showing (including the Agent or Broker) should sign this form. By
						signing this form, you hereby acknowledge and assume such risks and/or potential
						consequences
					</p>
					<p className="acknowledge">
						The undersigned hereby acknowledges receipt of this Coronavirus (COVID-19)
						Limitation of Liability Form and understands that the refusal to sign this form
						may result in the cancellation of any scheduled in-person meeting or showing.
					</p>
				</Col>
			</Row>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Row className="detail pt-5">
					<Col md={4}>
						{formItem.status === 'SIGNED' ? (
							<Form.Group controlId="formBasicSign">
								{formItem.isSignatureTyped === true ? (
									<Form.Control
										className="apply-font"
										type="text"
										value={formItem.signature}
										disabled
									/>
								) : (
									<div className="sign-field">
										<img src={formItem.signature} />
									</div>
								)}
								<Form.Label>Signature</Form.Label>
							</Form.Group>
						) : (
							<Form.Group controlId="formBasicSign">
								{signMethod === 'draw' ? (
									<div className="sign-field">
										<img src={signImage} />
									</div>
								) : (
									<Form.Control className="apply-font" type="text" value={signAsText} />
								)}

								{!viewedStatus ? (
									<Form.Label onClick={handleShow}>Signature</Form.Label>
								) : (
									<Form.Label>Signature</Form.Label>
								)}
							</Form.Group>
						)}
					</Col>
					<Col md={4}>
						{formik.touched.fullName && formik.errors.fullName && (
							<Form.Text className="text-error">{formik.errors.fullName}</Form.Text>
						)}
						<Form.Group controlId="formBasicSign">
							{formItem.status === 'SIGNED' ? (
								<Form.Control className="mb-3" value={formik.values.fullName} disabled />
							) : (
								<>
									{!viewedStatus ? (
										<Form.Control
											className="mb-3"
											name="fullName"
											value={formik.values.fullName}
											type="text"
											placeholder=""
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									) : (
										<Form.Control
											className="mb-3"
											value={formik.values.fullName}
											disabled
										/>
									)}
								</>
							)}

							<Form.Label>Full Name</Form.Label>
						</Form.Group>
					</Col>
					<Col md={4} className="mt-2">
						{formik.touched.currentDate && formik.errors.currentDate && (
							<Form.Text className="text-error">{formik.errors.currentDate}</Form.Text>
						)}
						<Form.Group controlId="formBasicSign">
							{
								formItem.status === 'SIGNED' ? (
									<DatePicker selected={formik.values.currentDate} />
								) : (
									// <Form.Control
									//   className="mb-3"
									//   value={formik.values.currentDate}
									//   disabled
									// />
									<>
										{!viewedStatus ? (
											<DatePicker
												name="currentDate"
												selected={formik.values.currentDate}
												onChange={(date) => formik.setFieldValue('currentDate', date)}
												// dateFormat="Pp"
												// timeFormat="HH:mm"
											/>
										) : (
											<DatePicker
												name="currentDate"
												selected={formik.values.currentDate}
												onChange={(date) => formik.setFieldValue('currentDate', date)}
												disabled
											/>
										)}
									</>
								)
								// <Form.Control
								//   className="mb-3"
								//   name="currentDate"
								//   value={formik.values.currentDate}
								//   type="text"
								//   placeholder=""
								//   onBlur={formik.handleBlur}
								//   onChange={formik.handleChange}
								// />
							}
						</Form.Group>
						<Form.Label>Date</Form.Label>
					</Col>
				</Form.Row>

				<Form.Row className="detail pt-4">
					<Col md={4} className="mb-3">
						<p>This form was presented to me by </p>
					</Col>
					<Col md={3} className="mb-3">
						{formik.touched.realEstateName && formik.errors.realEstateName && (
							<Form.Text className="text-error">{formik.errors.realEstateName}</Form.Text>
						)}
						<Form.Group controlId="formBasicSign">
							{formItem.status === 'SIGNED' ? (
								<Form.Control
									className="mb-3"
									value={formik.values.realEstateName}
									disabled
								/>
							) : (
								<>
									{!viewedStatus ? (
										<Form.Control
											className="mb-3"
											name="realEstateName"
											value={formik.values.realEstateName}
											type="text"
											placeholder=""
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									) : (
										<Form.Control
											className="mb-3"
											value={formik.values.realEstateName}
											disabled
										/>
									)}
								</>
							)}
							<Form.Label>Name of Real Estate License</Form.Label>
						</Form.Group>
					</Col>
					<Col md={1} className="text-center mb-3 pl-lg-5 pl-md-5">
						of
					</Col>
					<Col md={4} className="mb-3">
						<Form.Group controlId="formBasicSign">
							{formik.touched.realEstateBrokerageCompany &&
								formik.errors.realEstateBrokerageCompany && (
									<Form.Text className="text-error">
										{formik.errors.realEstateBrokerageCompany}
									</Form.Text>
								)}
							{formItem.status === 'SIGNED' ? (
								<Form.Control
									className="mb-3"
									value={formik.values.realEstateBrokerageCompany}
									disabled
								/>
							) : (
								<>
									{!viewedStatus ? (
										<Form.Control
											className="mb-3"
											name="realEstateBrokerageCompany"
											value={formik.values.realEstateBrokerageCompany}
											type="text"
											placeholder=""
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
										/>
									) : (
										<Form.Control
											className="mb-3"
											value={formik.values.realEstateBrokerageCompany}
											disabled
										/>
									)}
								</>
							)}
							<Form.Label>Real Estate Brokerage Company</Form.Label>
						</Form.Group>
					</Col>
				</Form.Row>

				{signImage !== '' && formSubmitStatus === false && (
					<Form.Row className="bottomBar">
						<Col md={12} className="py-3 d-flex justify-content-center">
							<Button
								variant="secondary"
								className="m-auto px-5"
								type="submit"
								disabled={!formik.isValid}>
								Submit
							</Button>
						</Col>
					</Form.Row>
				)}

				{signAsText !== '' && formSubmitStatus === false && (
					<Form.Row className="bottomBar">
						<Col md={12} className="py-3 d-flex justify-content-center">
							<Button
								variant="secondary"
								// onClick={submitForm}
								className="m-auto px-5"
								type="submit"
								disabled={!formik.isValid}>
								Submit
							</Button>
						</Col>
					</Form.Row>
				)}

				{formItem.status === 'SIGNED' && (
					<ReactToPdf
						targetRef={ref}
						filename={`${formItem.formName}.pdf`}
						options={options}
						x={0.2}
						y={0.5}
						scale={0.8}>
						{({ toPdf }) => (
							<Row className="downloadBar">
								<Col md={12} className="py-3 d-flex justify-content-end">
									<button class="btn btn-secondary mx-5" onClick={toPdf}>
										Download
									</button>
								</Col>
							</Row>
						)}
					</ReactToPdf>
				)}
			</Form>

			<div className="footer pl-0">
				<p>
					Please note that this form should not be construed as providing legal advice and you
					should review this form with an attorney before signing
				</p>
				<Row>
					<Col md={6} className="pt-2 d-flex justify-content-center">
						<h6>Real Estate board of New York | rebny.com</h6>
					</Col>
					<Col md={6} className="d-flex justify-content-center">
						<ul>
							<li>
								<h6 className="pt-1">Stay in Touch</h6>
							</li>
							<li>
								<IconTwitter />
							</li>
							<li>
								<IconFacebook />
							</li>
							<li>
								<IconLinkedin />
							</li>
							<li>
								<IconInstagram />
							</li>
						</ul>
					</Col>
				</Row>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h5>Please Confirm Full name and Signature</h5>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="draw-modal">
					<Nav fill variant="tabs" defaultActiveKey="link-1">
						<Nav.Item>
							<Nav.Link onClick={toggleMethod} eventKey="link-1">
								Draw
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link onClick={toggleField} eventKey="link-2">
								Type
							</Nav.Link>
						</Nav.Item>
					</Nav>
					{canvasShow && (
						<>
							<SignaturePad
								canvasProps={{
									width: 400,
									height: 'auto',
									className: 'sigCanvas'
								}}
								ref={sigPad}
							/>
							<p style={{ paddingTop: 10, paddingLeft: 30 }}>
								I am {formik.values.fullName} and this is my legal representation of my
								Signature.
							</p>
							<div className="d-flex justify-content-center">
								<Button variant="secondary" onClick={clear} className="mr-3">
									Clear{' '}
								</Button>
								<Button variant="primary" onClick={genrateImage}>
									Insert Signature
								</Button>
							</div>
						</>
					)}
					{fieldShow && (
						<>
							<div className="d-flex">
								<Form.Control
									type="text"
									value={signAsText}
									onChange={(e) => setSignAsText(e.target.value)}
									placeholder="Type your name here"
									className="toggle-field apply-font"
								/>
								<FontPicker
									apiKey="AIzaSyBCM9e_yuN64gSRUQxGrmHTJtK1v2YKvL8"
									activeFontFamily={activeFontFamily}
									onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
								/>
							</div>
							<p style={{ paddingTop: 10, paddingLeft: 30 }}>
								I am {formik.values.fullName} and this is my legal representation of my
								Signature.
							</p>
							<div className="d-flex justify-content-center">
								<Button variant="secondary" onClick={clear} className="mr-3">
									Clear{' '}
								</Button>
								<Button variant="primary" onClick={handleSignAsText}>
									Insert Signature
								</Button>
							</div>
						</>
					)}
				</Modal.Body>
			</Modal>
		</Container>
	);
};

export default Form1;
