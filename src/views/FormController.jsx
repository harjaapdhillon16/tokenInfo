import React, { useState, useEffect, useContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getFormData ,getAgent} from '../graphql/queries';
import Form1 from '../forms/form1/Form1';
import Form2 from '../forms/form2/Form2';
import Form3 from '../forms/form3/Form3';
import Loader from '../components/Loader/Loader';
import AuditTrail from '../components/AuditTrail';
import ReactToPdf from 'react-to-pdf';
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { updateFormData } from '../graphql/mutations';
import formEventsHandler from '../utils/formEventsHelpers';
import AppContext from '../context/appContext';
import { toast } from 'react-toastify';
import * as emailjs from 'emailjs-com';
import {globalConstants} from "../globalVariables"
import {signedEmail} from '../components/emailTemplates/formSentEmail'

const FormController = (props) => {
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState([]);
	const [viewMode, setViewMode] = useState(false);
	const { agent } = useContext(AppContext);
	const [agentInfo, setAgentInfo] = useState('');
	
	let base_url = window.location.origin;

	const {innerWidth:width,innerHeight:height} = window;
	let x  = width;
	let y = height;
	const options = {
		orientation: 'portrait',
		unit: 'px',
		format: [x, y]
	};
	const ref = React.createRef();
	useEffect(() => {
		handleForms();
	}, []);

	const handleForms = async () => {
		try {
			const getFormsData = await API.graphql(
				graphqlOperation(getFormData, {
					id: props.match.params.id
				})
			);

			let formData = getFormsData.data.getFormData;
			delete formData.createdAt;
			delete formData.updatedAt;

     
			setFormData(formData);

			checkAuthentication(getFormsData.data.getFormData);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const getAgentDetail = async id => {
		 
		try{
			const agentinfo = await API.graphql(
				graphqlOperation(getAgent, {
					id:id
				})
			);
		 
			if(agentinfo.data.getAgent !== ""){
				console.log("yes we have")
				setAgentInfo(agentinfo.data.getAgent);
			}
			
			
		}
		catch (err) {
			console.log(err);
		}

	}

	const checkAuthentication = (data) => {
		if (agent !== null || data.status === 'SIGNED') {
			setViewMode(true);
		} else {
			setViewMode(false);
			sendViewStatus(data);
			getAgentDetail(data.senderId)
			//console.log("getting agent detail",agentInfo.email);
		}
	};

	const sendViewStatus = async (formDataArg) => {
		if (formDataArg.status === 'SENT') {
			let data = {...formDataArg};
			data.status = 'VIEWED';
			handleFormSubmission(data, 'VIEWED');
		}
	};

	const handleFormSubmission =   (data, type) => {	   
		debugger 
		try {
			 API.graphql(graphqlOperation(updateFormData, { input: data })).then( (editForm) =>{
				
				formEventsHandler(editForm.data.updateFormData.id, type, [
					{ name: editForm.data.updateFormData.receiverName, email: editForm.data.updateFormData.receiverEmail }
					]).then( () => {
						if (type === 'SIGNED') {
							toast.success('Form Signed Successfully!');
							
							const { SERVICE_ID,TEMPLATE_ID,USER_ID} = globalConstants;
						 	let receiverId = formData.id;
							setViewMode(true);
							console.log(data);
							setFormData(data)
							
							let doclink = `${base_url}/formSubmission/${receiverId}`;

							let emailData = {
								subject:`Everyone has signed ${formData.formName}`,
								from_name: 'Cribfox',
								to_name: [formData.receiverName,agentInfo.name],
								// message: `Form has been signed ${base_url}/formSubmission/${receiverId}`,
								reply_to: 'info@cribfox.com',
								to_email: [formData.receiverEmail,agentInfo.email],
								html:signedEmail(formData.formName,formData.receiverName,formData.receiverEmail,doclink)
							};
							
							try {
								emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
									 
									function (response) {
										window.location.reload();

									},
									function (err) {
										console.log(err);
									}
								);
							} catch (err) {
								console.log('Error creating Formdata', err);
							}
						
						}
					}
						
					)
			}
				  
			);
			
			 

			
		} catch (err) {
			if (type === 'SIGNED') {
				toast.error('Please try again!');
			}
			console.log(err, 'Error updating Form data');
		}
	};

	const renderFormType = (formtype) => {
		console.log(formtype)
		switch (formtype) {
			case 'REBNY COVID Liability Form':
				return (
					<Form1
						formData={formData}
						viewMode={viewMode}
						onFormSubmission={handleFormSubmission}
					/>
				);
			case 'New York State Housing and Anti-Discrimination Disclosure':
				return (
					<Form2
						formData={formData}
						viewMode={viewMode}
						onFormSubmission={handleFormSubmission}
					/>
				);
			case 'REBNY COVID Health Screening Form':
				return (
					<Form3
						formData={formData}
						viewMode={viewMode}
						onFormSubmission={handleFormSubmission}
					/>
				);

			default:
				return 'Not Found!';
		}
	};

	if (loading) return <Loader />;
  console.log(globalConstants)
	return (
		<>
			<div className="" ref={ref}>
				{renderFormType(formData.formName)}
				<AuditTrail formDataId={props.match.params.id} />
			</div>

			{formData.status === 'SIGNED' && (
				<ReactToPdf
					targetRef={ref}
					filename={`${formData.formName}.pdf`}
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
		</>
	);
};
export default FormController;
