import React, { useEffect, useState, useContext } from 'react';
import { IconPlus } from '../../assets/icons/icons';
import { Container, Modal, InputGroup, Form, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import AppCard from '../card/card';
import Header from '../header/header';
import AppContext from '../../context/appContext';
import { API, graphqlOperation } from 'aws-amplify';
import { listContacts } from '../../graphql/queries';
import { createFormData } from '../../graphql/mutations';
import * as emailjs from 'emailjs-com';
import CreateContactForm from '../../../src/components/createContactForm/createContactForm';
import formEventsHandler from '../../utils/formEventsHelpers';

const SendForm = ({ formModal, onHandleFormModal }) => {
	const [currentState, handleCurrentState] = useState(1);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const [email, setEmail] = useState('sandalsimar@gmail.com');
	const [updatedFormTypes, setUpdatedFormTypes] = useState([]);
	const [updatedContacts, setUpdatedContacts] = useState([]);
	const [input, setInput] = useState('');
	const [contactList, setContactList] = useState();
	let base_url = window.location.origin;

	const {
		user,
		agent,
		formsTypes,
		contacts,
		onUpdateContacts,
		formItems,
		onFormItemsUpdate
	} = useContext(AppContext);

	useEffect(() => {
		handleCurrentState(1);
		handleContact();
		handleFormTypes();
		handleContactTypes();
	}, [formModal]);

	useEffect(() => {
		// handleCurrentState(1);
		handleContact();
		// handleFormTypes();
		handleContactTypes();
	}, [contacts]);

	const handleFormTypes = () => {
		const updatedTypes = formsTypes.map((item) => {
			item.isActive = false;
			return item;
		});
		setUpdatedFormTypes(updatedTypes);
	};

	//get contacts list
	const handleContactTypes = () => {
		setUpdatedContacts(contacts);
	};

	const handleSearch = (val) => {
		let filtered = [];
		if (val !== '') {
			filtered = updatedContacts.filter((item) => {
				return item.name.toLowerCase().includes(val.toLowerCase());
			});
		} else {
			filtered = contacts;
		}

		setInput(val);
		setUpdatedContacts(filtered);
	};

	const handleContact = async () => {
		if (contacts.length == 0) {
			try {
				const listContactsData = await API.graphql(
					graphqlOperation(listContacts, {
						filter: { agentId: { eq: agent.id } }
					})
				);

				onUpdateContacts(listContactsData.data.listContacts.items);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleFormCheck = (formid) => {
		let updateFormId = updatedFormTypes.filter(function (item) {
			if (item.id == formid) {
				item.isActive = !item.isActive;
			}
			return item;
		});

		setUpdatedFormTypes(updateFormId);
	};

	const onhandleContactMethod = (contactid) => {
		let updateContactId = updatedContacts.filter(function (item) {
			if (item.id == contactid) {
				item.isActive = !item.isActive;
			}
			return item;
		});

		setUpdatedContacts(updateContactId);
	};

	const hanldeContactSelection = () => {
		handleCurrentState(currentState + 1);
	};

	const handleMultipleFormsData = (formid, formData, agent) => {
		const date = new Date();
		let newDate = JSON.stringify(date);
		newDate = newDate.slice(1, 11);

		let data = [];

		if (formid === 1) {
			data[0] = 'name';
			data[1] = formData.name;
			data[2] = 'name_of_real_estate';
			data[3] = agent.name;
			data[4] = 'real_estate_brockerage_company';
			data[5] = agent.brokerageName;
			data[6] = 'date';
			data[7] = '';
		} else if (formid === 2) {
			data[0] = 'senderName';
			data[1] = agent.name;
			data[2] = 'senderCompany';
			data[3] = agent.brokerageName;
			data[4] = 'signerName';
			data[5] = formData.name;
			data[6] = 'date';
			data[7] = '';
		} else if (formid === 3) {
			data[0] = 'name';
			data[1] = formData.name;
			data[2] = 'date';
			data[3] = '';
			data[4] = 'property_address';
			data[5] = '';
			data[6] = 'real_estate_name';
			data[7] = formData.name;
			data[8] = 'name_of_brockerage_company';
			data[9] = formData.companyName;
			data[10] = 'checkValueFirst';
			data[11] = '';
			data[12] = 'checkValueSecond';
			data[13] = '';
			data[14] = 'checkValueThird';
			data[15] = '';
			data[14] = 'checkValueFourth';
			data[15] = '';
		}
		return data;
	};

	const handleSecondForm = () => {
		handleCurrentState(currentState + 1);
		let selectedforms = updatedFormTypes.filter((item) => item.isActive === true);
		let selectedcontacts = updatedContacts.filter((item) => item.isActive === true);

		let finalData = [];

		selectedcontacts.map((item) => {
			selectedforms.map(function (form) {
				let finalObject = {};
				finalObject.senderId = agent.id;
				finalObject.receiverId = item.id;
				finalObject.receiverName = item.name;
				finalObject.receiverEmail = item.email;
				finalObject.formName = form.title;
				finalObject.status = 'SENT';

				finalObject.data = handleMultipleFormsData(form.id, item, agent);
				finalData = [...finalData, finalObject];
			});
		});

		if (finalData.length > 0) {
			finalData.map((item) => {
				handleFormData(item);
			});
		}
	};
	const getTemplate = (senderName, senderEmail, docTitle, docLink, docID) => {
		return `<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
		<tbody>
			<tr>
				<td>
					<div class="wrapper" style="max-width: 600px;margin: 20px auto;padding: 28px 42px 48px;background-color: #fff;box-shadow: 0px 4px 15px rgba(40, 43, 45, 0.05);">
						<table class="body-wrapper" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tbody>
								<tr align="center">
									<td class="logo">
									<span style="padding:40px 0 30px;margin: 0;font-size: 50px;font-weight: 300;line-height: 28px;"> <img src="https://cribfox.com/wp-content/uploads/2021/04/CRIBFOX-text-logo-300x124.png" /></span>
									</td>
								</tr>
								 
								<tr>
									<td align="center">
										<p style="padding:40px 0 30px;margin: 0;font-size: 18px;font-weight: 300;line-height: 25px;"> ${senderName} (${senderEmail}) has requested your signature for 
										${docTitle}</p>
									</td>
								</tr>
								 
								  
								<tr>
									<td align="center">
										<a href="${docLink}" style="width: 139px;height: 48px;margin: 20px auto 0;background: #002C59;color: #fff;font-size: 14px;font-weight: 500;display: flex;align-items: center;text-decoration: none;justify-content: center;border-radius:6px;">
											<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M7.00002 0C5.536 0 4.16245 0.481105 3.02968 1.39118C2.85136 1.53466 2.82232 1.79565 2.9659 1.97492C3.10995 2.15394 3.371 2.18024 3.54946 2.03814C4.53359 1.24815 5.72586 0.830265 7.00002 0.830265C9.10837 0.830265 11.0144 2.01438 11.9634 3.84607L11.4461 3.54741C11.2474 3.43201 10.9932 3.50036 10.8788 3.69947C10.7644 3.89836 10.8323 4.15172 11.0308 4.26634L12.5183 5.12515C12.5842 5.16351 12.656 5.18086 12.726 5.18086C12.8689 5.18086 13.0085 5.10583 13.0855 4.9733L13.9445 3.48549C14.0588 3.28664 13.991 3.03336 13.7926 2.9187C13.5936 2.80312 13.3397 2.87256 13.2254 3.07056L12.8372 3.7429C11.8009 1.4813 9.52696 0 7.00002 0Z" fill="white"/>
												<path d="M1.96942 2.36296C2.18825 2.30825 2.41602 2.43372 2.47557 2.65685L2.91985 4.31546C2.97964 4.53801 2.8474 4.76458 2.62697 4.82424L2.62455 4.82487C2.59083 4.8333 2.55563 4.83845 2.51887 4.83845C2.33568 4.83845 2.16777 4.7166 2.11786 4.5311L1.97008 3.97952C1.59745 4.73462 1.40287 5.56762 1.40287 6.42742C1.40287 8.79841 2.90247 10.9168 5.13357 11.6985C5.34985 11.7743 5.4632 12.0111 5.3878 12.2274C5.32795 12.3986 5.16751 12.5055 4.99592 12.5055C4.95031 12.5055 4.90345 12.4979 4.85824 12.4822C2.29503 11.5834 0.572608 9.15027 0.572608 6.42742C0.572608 5.35461 0.836484 4.31684 1.34063 3.39063L0.52059 3.61031C0.303291 3.66525 0.073595 3.53965 0.0140737 3.31582C-0.0448668 3.09417 0.0867159 2.86749 0.307956 2.80783L1.96942 2.36296Z" fill="white"/>
												<path d="M13.0123 6.01227C12.7831 6.01227 12.5971 6.19821 12.5971 6.4274C12.5971 9.25286 10.4923 11.5964 7.76843 11.972L8.15214 11.5883C8.31411 11.4263 8.31411 11.1632 8.15214 11.0013C7.99017 10.8393 7.72708 10.8393 7.56511 11.0013L6.41992 12.1464C6.25795 12.3084 6.25795 12.5715 6.41992 12.7335L7.56558 13.8791C7.64657 13.9593 7.75275 14 7.85891 14C7.96493 14 8.07157 13.9594 8.15236 13.8779C8.31411 13.7159 8.31403 13.453 8.15214 13.2911L7.68013 12.8191C10.9056 12.4782 13.4274 9.74172 13.4274 6.4274C13.4274 6.19821 13.2415 6.01227 13.0123 6.01227Z" fill="white"/>
											</svg>
											<span style="display:block;line-height:48px; text-align:center;width: 139px;">Review & Sign</span>
										</a>
									</td>
								</tr>
								<tr>
									<td align="center">
										<p style="margin-top:25px;margin-bottom: 0;color:#969696;font-size:0.75rem;font-weight: 300;">Document Id:${docID} </p>
									</td>
								</tr>
								<tr>
									<td align="center">
										<div style="margin-top:40px;display: flex;justify-content: center;">
											 
											<div class="notifications" style="vertical-align:top;padding-left: 5px;text-align: center;">
												<p style="margin: 0;font-size: 12px;font-weight: 300;line-height: 15px;">Warning: To prevent unauthorized users from accessing this document, please do not forward this email.</p>
											</div>
										<div>
									</td>
								</tr>
							</tbody>
							 
						</table>
					</div>
				</td>
			</tr>
		</tbody>
	</table>`.replaceAll('\n', '');
	};

	const handleFormData = async (data) => {
		try {
			const createdContact = await API.graphql(
				graphqlOperation(createFormData, { input: data })
			);

			let SERVICE_ID = 'service_vaq8uod';
			let TEMPLATE_ID = 'template_u5kdsd6';
			let USER_ID = 'user_KwfqxwXe6qZrqhnRmjiJ6';
			let receiverId = createdContact.data.createFormData.id;
			let docLink = `${base_url}/formSubmission/${receiverId}`;
			let emailData = {
				subject: `${data.formName} has been sent for e-signature`,
				from_name: agent.name,
				to_name: data.receiverName,
				reply_to: agent.email,
				to_email: data.receiverEmail,
				html: getTemplate(agent.name, agent.email, data.formName, docLink, receiverId)
			};
			try {
				formEventsHandler(receiverId, 'SENT', [
					{ name: data.receiverName, email: data.receiverEmail },
					{ name: agent.name, email: agent.email }
				]);
			} catch (err) {
				console.log('audit trail error', err);
			}

			emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
				function (response) {
					const forms = [...formItems, createdContact.data.createFormData];
					onFormItemsUpdate(forms);
				},
				function (err) {
					console.log(err);
				}
			);
		} catch (err) {
			console.log('Error creating Formdata', err);
		}


		let updateContactId = updatedContacts.filter(function (item) {
			if (item.id) {
				item.isActive = false;
			}
			return item;
		});

		setUpdatedContacts(updateContactId);

	};

	const formSelection = () => {
		return (
			<Modal show={formModal} animation={false} onHide={() => onHandleFormModal(formModal)}>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-options">
					{updatedFormTypes.map((item) => (
						<Form.Check
							id={item.id}
							label={item.title}
							type="checkbox"
							checked={item.isActive}
							onChange={() => handleFormCheck(item.id)}
						/>
					))}
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => hanldeContactSelection()}
						// onClick={() => emailSend("simarjots9@gmail.com")}
						variant="outline-secondary  pop-btn d-flex ml-auto mr-auto">
						Next
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const clientSelection = () => {
		return (
			<Modal show={formModal} animation={false} onHide={() => onHandleFormModal(formModal)}>
				<Modal.Header closeButton className="pop-header">
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Form.Group controlId="formBasicSearch">
					<Form.Control
						type="search"
						placeholder="Search"
						name={input}
						onChange={(e) => handleSearch(e.target.value)}
					/>
				</Form.Group>
				<Modal.Body className="modal-options">
					{/* {contactList === undefined  ? */}

					<div className="contactsList">
						{updatedContacts.map((item) => (
							<Form.Check
								id={item.id}
								label={item.name}
								type="checkbox"
								checked={item.isActive}
								onChange={() => onhandleContactMethod(item.id)}
							/>
						))}
					</div>

					<div
						className="d-flex ml-auto mr-auto justify-content-center add-client"
						style={{ cursor: 'pointer' }}
						onClick={handleShow}>
						<IconPlus /> Add a new client
					</div>
					<CreateContactForm
						className="py-5"
						show={show}
						handleClose={handleClose}
						setShow={setShow}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => handleSecondForm()}
						variant="outline-secondary  pop-btn d-flex ml-auto mr-auto">
						Next
					</Button>{' '}
				</Modal.Footer>
			</Modal>
		);
	};

	const formSubmitted = () => {
		return (
			<Modal show={formModal} animation={false} onHide={() => onHandleFormModal(formModal)}>
				<Modal.Header closeButton className="pop-header">
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-options">
					<h4 className="d-flex ml-auto mr-auto justify-content-center">
						Your form has been sent !
					</h4>
					{/* <Button variant="outline-secondary mt-4 d-flex ml-auto mr-auto">
            View REBNY COVID Liability Form
          </Button>{" "} */}
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => onHandleFormModal(formModal)}
						variant="outline-secondary  pop-btn d-flex ml-auto mr-auto">
						Close
					</Button>{' '}
				</Modal.Footer>
			</Modal>
		);
	};

	const handleModalState = () => {
		switch (currentState) {
			case 1:
				return formSelection();
			case 2:
				return clientSelection();
			case 3:
				return formSubmitted();

			default:
				return 'Not Found!';
		}
	};
	return handleModalState();
};

export default SendForm;
