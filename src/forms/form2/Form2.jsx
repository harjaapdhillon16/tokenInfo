import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Container, Row, Col, Form, Modal, Button, Image } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import SignaturePad from 'react-signature-canvas';
import FontPicker from 'font-picker-react';
import '../form2/css/style2.css';
import { IconFacebook, IconTwitter, IconLinkedin, IconInstagram } from '../../assets/icons/icons';
import Logo from '../../assets/FormImages/og_image.png';
import { API, graphqlOperation } from 'aws-amplify';
import { updateFormData } from '../../graphql/mutations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactToPdf from 'react-to-pdf';
import { Auth } from 'aws-amplify';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form2 = ({ formData, viewMode, onFormSubmission }) => {
	const [show, setShow] = useState(false);
	const [isShow, setIsShow] = useState(false);
	const [canvasShow, setCanvasShow] = useState(true);
	const [fieldShow, setFieldShow] = useState(false);
	const signPad = useRef({});
	const isHandleShow = () => setIsShow(true);
	const isHandleClose = () => setIsShow(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const [signImage, setSignImage] = useState('');
	const [signAsText, setSignAsText] = useState('');
	const [signMethod, setSignMethod] = useState('draw');
	const [activeFontFamily, setActiveFontFamily] = useState('Open Sans');
	const [formSubmitStatus, setFormSubmitStatus] = useState(false);
	const [viewedStatus, setViewedStatus] = useState(false);
	const [count, setCount] = useState(0);
	const [countInTimeout, setCountInTimeout] = useState(0);
	const [signTabState, setSignTabState] = useState('link-1');

	

	//console.log("viewMode",viewMode);

	useEffect(() => {
		if (show && signImage && signPad.current!== null) signPad.current.fromDataURL(signImage);
	}, [show]);

	const redirectToUrl = () => {
		setIsShow(true);
		if (isHandleShow) {
			setTimeout(() => {
				setIsShow(false);
				window.open('http://www.cribfox.com', '_blank');
			}, 2000);
		}
	};

	const date = new Date();
	let today = format(date, 'MM/dd/yyyy');
	today = moment(today, 'MM-DD-YYYY').toDate();

	const genrateImage = () => {
		setShow(false);
		setSignMethod('draw');
		setSignImage(signPad.current.toDataURL());
	};

	const handleSignAsText = () => {
		setShow(false);
		setSignMethod('sign');
	};

	function clear() {
		setSignAsText('')
		setSignImage('')
		
		if(signPad.current!== null){
			signPad.current.clear();

		}
	}

	const toggleMethod = () => {
		if (canvasShow == false) {
			setCanvasShow(true);
			setSignTabState('link-1')
			setFieldShow(false);
		} else {
			//setCanvasShow(false);
			setSignTabState('link-2')
		}
	};

	const toggleField = () => {
		if (fieldShow == false) {
			setFieldShow(true);
			setSignTabState('link-2')
			setCanvasShow(false);
		} else {
			setSignTabState('link-1')
			//setFieldShow(false);
		}
	};

	const formik = useFormik({
		initialValues: {
			senderName: formData.data[1],
			senderCompany: formData.data[3],
			signerName: formData.data[5],
			currentDate: formData.data[7] ? new Date(formData.data[7]) : today
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			senderName: Yup.string().required('Please enter the name'),
			senderCompany: Yup.string().required('Please enter the Real Estate Company Name'),
			signerName: Yup.string().required('Required accountype'),
			currentDate: Yup.string().required('Please enter Date')
		}),
		onSubmit: (values) => {
			submitForm(values);
		}
	});

	const submitForm = async (values) => {
		let data = [
			'name',
			values.senderName,
			'name_of_real_estate_company',
			values.senderCompany,
			'account_type',
			values.signerName,
			'date',
			values.currentDate
		];

		// let finalObject = {
		// 	id: formData.id,
		// 	data
		// };
		let finalObject = { ...formData };

		finalObject.status = 'SIGNED';
		finalObject.data = data;

		if (signAsText !== '') {
			finalObject.isSignatureTyped = true;
			finalObject.signatureFont = activeFontFamily;
			finalObject.signature = signAsText;
			finalObject.status = 'SIGNED';
		} else if (signImage !== '') {
			finalObject.isSignatureTyped = false;
			finalObject.signature = signImage;
			finalObject.status = 'SIGNED';
		}

		onFormSubmission(finalObject, 'SIGNED');
	};

	return (
		<Container className="form2">
			<Row className="pt-4">
				<Col md={2} sm={12} xs={12}>
					<img src={Logo} alt="logo" className=" img-fluid logo" />
				</Col>
				<Col md={4} sm={12} xs={12} className="top-title">
					<h2 className="border-left">Division of Licensing Service</h2>
				</Col>
				<Col md={6} sm={12} xs={12} className="header-right">
					<div>
						<ul>
							<li>New York state</li>
							<li>
								<span>Department of state, Division of Licensing Services</span>
							</li>
							<li>(518) 474-4429</li>
							<li>
								<a href="https://www.dos.ny.gov/">www.dos.ny.gov</a>
							</li>
						</ul>
					</div>
					<div>
						<ul>
							<li>New York state</li>
							<li>
								<span>Division of Consumer Rights</span>
							</li>
							<li>(888) 392-3644</li>
						</ul>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<div className="title-bar">
						<h4 className="py-2 mb-0">
							New York State Housing and Anti-Discrimination Disclosure Form
						</h4>
					</div>
					<div className="pt-3">
						<p>
							Federal, State and local Fair Housing and Anti-discrimination Laws provide
							comprehensive protections from discrimination in housing. It is unlawful for
							any property owner, landlord, property manager or other person who sells, rents
							or leases housing, to discriminate based on certain protected characteristics,
							which include,but are not limited to{' '}
							<span>
								race, creed, color, national origin, sexual orientation, gender identity or
								expression, military status, sex, age, disability, marital status, lawful
								source of income or familial status.
							</span>{' '}
							Real estate professionals must also comply with all Fair Housing and
							Anti-discrimination Laws.
						</p>
						<h5>
							<span>
								Real estate brokers and real estate salespersons, and their employees and
								agents violate the Law if they:
							</span>
						</h5>
						<ul>
							<li>
								Discriminate based on any protected characteristic when negotiating a sale,
								rental or lease, including representing that a property is not available
								when it is available
							</li>
							<li>
								Negotiate discriminatory terms of sale, rental or lease, such as stating a
								different price because of race, national origin or other protected
								characteristic.
							</li>
							<li>
								Discriminate based on any protected characteristic because it is the
								preference of a seller or landlord.
							</li>
							<li>
								Discriminate by “steering” which occurs when a real estate professional
								guides prospective buyers or renters towards or away from certain
								neighborhoods, locations or buildings, based on any protected
								characteristic.
							</li>
							<li>
								Discriminate by “blockbusting” which occurs when a real estate professional
								represents that a change has occurred or may occur in future in the
								composition of a block, neighborhood or area, with respect to any protected
								characteristics, and that the change will lead to undesirable consequences
								for that area, such as lower property values, increase in crime, or decline
								in the quality of schools.
							</li>
							<li>Discriminate by pressuring a client or employee to violate the Law.</li>
							<li>
								Express any discrimination because of any protected characteristic by any
								statement, publication,advertisement, application, inquiry or any Fair
								Housing Law record.
							</li>
						</ul>
						<h5>
							<span>YOU HAVE THE RIGHT TO FILE A COMPLAINT</span>
						</h5>
						<h6>
							<span>If you believe you have been the victim of housing discrimination</span>
							you should file a complaint with the New York State Division of Human Rights
							(DHR). Complaints may be filed by:
						</h6>
						<ul>
							<li>
								Downloading a complaint form from the DHR website:{' '}
								<a href="https://dhr.ny.gov/">www.dhr.ny.gov;</a>
							</li>
							<li>
								Stop by a DHR office in person, or contact one of the Division’s offices, by
								telephone or by mail, to obtain a complaint form and/or other assistance in
								filing a complaint. A list of office locations is available online at:
								<a href="https://dhr.ny.gov/contact-us">
									https://dhr.ny.gov/contact-us,
								</a>{' '}
								and the Fair Housing HOTLINE at (844)-862-8703.
							</li>
						</ul>
						<p>
							You may also file a complaint with the NYS Department of State, Division of
							Licensing Services. Complaints may be filed by:
						</p>
						<ul>
							<li>
								Downloading a complaint form from the Department of State’s website
								<a href="https://www.dos.ny.gov/licensing/complaint_links.html">
									https://www.dos.ny.gov/licensing/complaint_links.html
								</a>
							</li>
							<li>
								Stop by a Department’s office in person, or contact one of the Department’s
								offices, by telephone or by mail, to obtain a complaint form.
							</li>
							<li>Call the Department at (518) 474-4429.</li>
						</ul>
						<h6>
							There is no fee charged to you for these services. It is unlawful for anyone to
							retaliate against you for filing a complaint.
						</h6>
					</div>
				</Col>
			</Row>
			<Row className="pt-4">
				<Col md={12}>
					<h5>
						For more information on Fair Housing Act rights and responsibilities please visit
					</h5>
					<p>
						<a href="https://dhr.ny.gov/fairhousing">https://dhr.ny.gov/fairhousing</a> and{' '}
						<a href="https://www.dos.ny.gov/licensing/fairhousing.html">
							https://www.dos.ny.gov/licensing/fairhousing.html
						</a>
					</p>
					<form class="form-inline submit-form" onSubmit={formik.handleSubmit}>
						<ul class="form-inline">
							<li>
								<p className="apply-font">This form was provided to me by</p>
							</li>

							<li>
								<span>
									<input
										class="form-control mb-2 mr-sm-2"
										id="senderName"
										name="senderName"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.senderName}
										disabled={viewMode}
									/>

									{formik.touched.senderName && formik.errors.senderName && (
										<Form.Text className="text-error mx-3">
											{formik.errors.senderName}
										</Form.Text>
									)}
								</span>
							</li>

							<li>
								<p>(print name of Real Estate Salesperson/Broker) of</p>
							</li>

							<li>
								<span>
									<input
										class="form-control mb-2 mr-sm-2"
										type="text"
										id="senderCompany"
										name="senderCompany"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.senderCompany}
										disabled={viewMode}
									/>
									{formik.touched.senderCompany && formik.errors.senderCompany && (
										<Form.Text className="text-error  mx-3">
											{formik.errors.senderCompany}
										</Form.Text>
									)}
								</span>
							</li>

							<li>(print name of Real Estate company, firm or brokerage)</li>

							<li>
								(I)(We)
								<span>
									<>
										<input
											class="form-control mb-2 mr-sm-2"
											type="text"
											id="signerName"
											name="signerName"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.signerName}
											disabled={viewMode}
										/>

										{formik.touched.signerName && formik.errors.signerName && (
											<Form.Text className="text-error ml-2 pl-5">
												{formik.errors.signerName}
											</Form.Text>
										)}
									</>
								</span>
							</li>

							<li>(Buyer/Tenant/Seller/Landlord) acknowledge receipt of a copy of this</li>

							<li>disclosure form:</li>
						</ul>

						<div class="form-row pt-4 detail">
							{formData.status === 'SIGNED' ? (
								<div class="col-md-8 mb-3 d-flex">
									<label class="pt-2 input-head">
										Buyer/Tenant/Seller/Landlord Signature
									</label>
									{formData.isSignatureTyped === true && (
										<div class="form-control">
											{/* <img class="signature" src={formData.signature} /> */}
											<input
													type="text"
													class=" border-0 apply-font"
													value={formData.signature}
													style={{fontFamily:formData.signatureFont}}
												/>
											
										</div>
									)}
									{formData.isSignatureTyped === false && (
										// <input
										// 	type="text"
										// 	class="form-control apply-font"
										// 	value={formData.signature}
										// 	disabled
										// />
										<div class="form-control">
											<img class="signature" src={formData.signature} />
										</div>
									)}
								</div>
							) : (
								<div class="col-md-8 mb-3 d-flex">
									{viewMode   ?  (
										<label class="pt-2 input-head">
											Buyer/Tenant/Seller/Landlord Signature
										</label>
									) : (
										<label class="pt-2 input-head" onClick={handleShow}>
											Buyer/Tenant/Seller/Landlord Signature
										</label>
									)}

									{viewMode ? (
										<>
											{signMethod === 'draw' ? (
												<div class="form-control">
													<Image className="signature" src={signImage} />
												</div>
											) : (
												<input
													type="text"
													class="form-control apply-font"
													value={signAsText}
												/>
											)}
										</>
									) : (
										<>
											{signMethod === 'draw' ? (
												<div class="form-control" onClick={handleShow}>
													<Image className="signature" src={signImage} />
												</div>
											) : (
												<input
													type="text"
													class="form-control apply-font"
													value={signAsText}
													onClick={handleShow}
												/>
											)}
										</>
									)}
								</div>
							)}

							<div class="col-md-4 mb-3 d-flex">
								{formik.touched.currentDate && formik.errors.currentDate && (
									<Form.Text className="text-error">{formik.errors.currentDate}</Form.Text>
								)}
								<label class="pt-2 input-head">Date:</label>
								<DatePicker
									className="form-control date-block"
									name="currentDate"
									selected={formik.values.currentDate}
									onChange={(date) => formik.setFieldValue('currentDate', date)}
									disabled={viewMode}
								/>

								{/* <input
												class="form-control date-block"
												type="date"
												id="firstDate"
												name="firstDate"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.firstDate}
												disabled={viewMode}
											/> */}
							</div>
						</div>

						<p class="pt-4">
							Real Estate broker and real estate salespersons are required by New York State
							law to provide you with this Disclosure.
						</p>

						{(signImage !== '' || signAsText !== '') && !viewMode && (
							<Row className="bottomBar">
								<Col md={12} className="py-3 d-flex justify-content-center">
									<button class="btn btn-secondary" type="submit">
										Submit
									</button>
								</Col>
							</Row>
						)}
					</form>

					{formData.status === 'SIGNED' && (
						<>
							<Modal show={isShow}>
								{/* <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header> */}
								<Modal.Body className="text-center my-4">
									Your Form has been sent!
								</Modal.Body>
							</Modal>
						</>
					)}
				</Col>
			</Row>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h5>Please Confirm Full name and Signature</h5>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="draw-modal">
					<Nav fill variant="tabs" defaultActiveKey={signTabState}>
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
								ref={signPad}
							/>
							<p style={{ paddingTop: 10, paddingLeft: 30 }}>
								I am {formik.values.signerName} and this is my legal representation of my
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
								I am {formik.values.signerName} and this is my legal representation of my
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
			{/* <AuditTrail formDataId={formData.id} /> */}
		</Container>
	);
};

export default Form2;
