import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getFormData, getAgent } from '../graphql/queries';
import Form1 from '../forms/form1/Form1';
import Form2 from '../forms/form2/Form2';
import Form3 from '../forms/form3/Form3';
import Form4 from '../forms/form4/Form4';
import Form5 from '../forms/form5/form5';
import Form6 from '../forms/form6/form6';
import Loader from '../components/Loader/Loader';
import AuditTrail from '../components/AuditTrail';
import ReactToPdf from 'react-to-pdf';
import { Row, Col } from 'react-bootstrap';
import { updateFormData } from '../graphql/mutations';
import formEventsHandler from '../utils/formEventsHelpers';
import { toast } from 'react-toastify';
import { signedEmail } from '../components/emailTemplates/formSentEmail';
import { decode } from '../utils/base64';
import { sendEmail } from '../utils/email';
const FormController = (props) => {
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState([]);
	const [viewMode, setViewMode] = useState(false);
	const [agentInfo, setAgentInfo] = useState('');

	const isSignee = props.match.params.id.length > 40;
	const formDataId = isSignee ? decode(props.match.params.id).formDataId : props.match.params.id;

	let base_url = window.location.origin;

	const { innerWidth: width, innerHeight: height } = window;
	let x = width;
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
					id: formDataId
				})
			);

			let formData = getFormsData.data.getFormData;
			delete formData.createdAt;
			delete formData.updatedAt;

			setFormData(formData);

			const { getFormData: data } = getFormsData.data;

			if (!isSignee || data.status === 'SIGNED') {
				setViewMode(true);
			} else {
				setViewMode(false);
				sendViewStatus(data);
				getAgentDetail(data.senderId);
			}
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const getAgentDetail = async (id) => {
		try {
			const agentinfo = await API.graphql(
				graphqlOperation(getAgent, {
					id: id
				})
			);

			if (agentinfo.data.getAgent !== '') {
				setAgentInfo(agentinfo.data.getAgent);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const sendViewStatus = async (formDataArg) => {
		if (formDataArg.status === 'SENT') {
			let data = { ...formDataArg };
			data.status = 'VIEWED';
			handleFormSubmission(data, 'VIEWED');
		}
	};

	const handleFormSubmission = (data, type) => {
		try {
			API.graphql(graphqlOperation(updateFormData, { input: data })).then((editForm) => {
				if (!isSignee) return;
				formEventsHandler(editForm.data.updateFormData.id, type, [
					{
						name: editForm.data.updateFormData.receiverName,
						email: editForm.data.updateFormData.receiverEmail
					}
				]).then(() => {
					if (type === 'SIGNED') {
						toast.success('Form Signed Successfully!');

						let receiverId = formData.id;
						setViewMode(true);
						console.log(data);
						setFormData(data);

						let doclink = `${base_url}/formSubmission/${receiverId}`;

						// let emailData = {
						// 	subject: `Everyone has signed ${formData.formName}`,
						// 	from_name: 'Cribfox',
						// 	to_name: [formData.receiverName, agentInfo.name],
						// 	// message: `Form has been signed ${base_url}/formSubmission/${receiverId}`,
						// 	reply_to: 'team@cribfox.com',
						// 	to_email: [formData.receiverEmail, agentInfo.email],
						// 	html: signedEmail(
						// 		formData.formName,
						// 		formData.receiverName,
						// 		formData.receiverEmail,
						// 		doclink
						// 	)
						// };
						let emailParams = {
							subject: `Everyone has signed ${formData.formName}`,
							reply_to: 'team@cribfox.com',
							to_email: [formData.receiverEmail, agentInfo.email],
							html: signedEmail(
								formData.formName,
								formData.receiverName,
								formData.receiverEmail,
								doclink
							)
						};

						try {
							sendEmail(emailParams);
							setTimeout(() => {
								window.location.reload();
							}, 1500);
						} catch (err) {
							console.log('Error creating Formdata', err);
						}
					}
				});
			});
		} catch (err) {
			if (type === 'SIGNED') {
				toast.error('Please try again!');
			}
			console.log(err, 'Error updating Form data');
		}
	};

	const renderFormType = (formtype) => {
		console.log(formtype);
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

			case 'New York State Disclosure Form for Buyer and Seller':
				return (
					<Form4
						formData={formData}
						viewMode={viewMode}
						onFormSubmission={handleFormSubmission}
					/>
				);
			case 'New York State Disclosure Form for Landlord and Tenant ':
				return (
					<Form6
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

	return (
		<>
			<div className="" ref={ref}>
				{renderFormType(formData.formName)}
				<AuditTrail formDataId={formDataId} />
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
