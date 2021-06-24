import React, { useEffect, useState, useContext } from 'react';
import { Container, Modal, InputGroup, Form, Row, Col, Button, FormControl } from 'react-bootstrap';
import AppContext from '../../context/appContext';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import * as emailjs from 'emailjs-com';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-multi-email/style.css';
import { toast } from 'react-toastify';

const ShareForm = ({ show, handleClose, setShow, formData, url }) => {
	let base_url = window.location.origin;
	const [emails, setEmails] = useState([]);
	const [copied, setCopied] = useState(false);
	const { user, agent } = useContext(AppContext);

	const getTemplate = (formName, signUser, signUserEmail, docurl) => {
		return `<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
					<td>
						<div class="wrapper" style="max-width: 600px;margin: 20px auto;padding: 28px 42px 48px;background-color: #fff;box-shadow: 0px 4px 15px rgba(40, 43, 45, 0.05);">
							<table class="body-wrapper" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr align="center">
										<td class="logo">
										<span style="padding:40px 0 30px;margin: 0;font-size: 50px;font-weight: 300;line-height: 28px;"> CribFox</span>
										</td>
									</tr>
									 
									<tr>
										<td align="center">
											<p style="padding:40px 0 30px;margin: 0;font-size: 18px;font-weight: 300;line-height: 25px;"> ${signUser} (${signUserEmail}) has sent you a document 
											</p>
										</td>
									</tr>
									
									 
									  
									<tr>
										<td align="center">
										<h4>${formName}<h4>
											<a href="${docurl}" style="width: 139px;height: 48px;margin: 20px auto 0;background: #002C59;color: #fff;font-size: 14px;font-weight: 500;display: flex;align-items: center;text-decoration: none;justify-content: center;border-radius:6px;">
												 
												<span style="display:block;line-height:48px; text-align:center;width: 139px;">View document</span>
											</a>
										</td>
									</tr>
									
									<tr>
										<td align="center">
											<div style="margin-top:40px;padding:0 0 50px;border-bottom:1px #E2E8F0 solid;display: flex;justify-content: center;">
												 
												<div class="notifications" style="width:350px;vertical-align:top;padding-left: 5px;text-align: left;"><p style="font-size: 12px;margin: 0;font-weight: 500;line-height: 15px;">Warning</p>
													<p style="margin: 0;font-size: 12px;font-weight: 300;line-height: 15px;">To prevent unauthorized users from accessing this document, please do not forward this email.</p>
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

	const sharedWithEmails = () => {
		let updateData = formData;

		// let SERVICE_ID = 'service_tjry678';
		// let TEMPLATE_ID = 'template_difn49p';
		// let USER_ID = 'user_xtMibwUvYsK5NraUVFG1J';
		let SERVICE_ID = 'service_vaq8uod';
		let TEMPLATE_ID = 'template_u5kdsd6';
		let USER_ID = 'user_KwfqxwXe6qZrqhnRmjiJ6';
		let docLink = `${base_url}/formSubmission/${url}`;
		console.log('view document url', docLink);
		let emailData = {
			subject: `You have received a document through Cribfox`,
			from_name: user.username,
			to_name: formData.receiverName,
			reply_to: user.attributes.email,
			to_email: emails,
			html: getTemplate(updateData.formName, agent.name, agent.email, docLink)
		};

		emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
			function (response) {
				toast.success('Email Send Successfully!');
				setEmails([]);
			},
			function (err) {
				console.log(err);
				toast.warning('Email not Send Successfully!');
			}
		);
	};
	const onCopyText = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 500);
	};

	return (
		<Modal show={show} onHide={() => handleClose(show)}>
			<Modal.Header closeButton>
				<Modal.Title></Modal.Title>
			</Modal.Header>

			<Modal.Body className="px-4">
				<h4>Share a link to the signed form</h4>
				<p>
					Convenient web link you can share via messaging. No registration required to view.
				</p>

				<InputGroup className="mb-2 mr-4">
					<FormControl
						id="inlineFormInputGroup "
						placeholder="agent.cribfox.com/invite/chris_oliver"
						value={`${base_url}/formSubmission/${url}`}
					/>

					<CopyToClipboard
						className="mt-1 pl-2 clipboard"
						text={`${base_url}/formSubmission/${url}`}
						onCopy={onCopyText}>
						<div>{copied ? "Copied!" : "Copy" }</div>
					</CopyToClipboard>
					
				</InputGroup>

				<div className="border-top mt-4 pt-3">
					<h4>Email a copy of the signed form</h4>
					<p>
						The recipient will be able to view the online document without needing to register
					</p>
					<Form>
						<InputGroup className="mb-2">
							<ReactMultiEmail
								className="mr-2"
								placeholder="Email address(es), separated by commas"
								emails={emails}
								onChange={(_emails) => {
									setEmails(_emails);
								}}
								validateEmail={(email) => {
									return isEmail(email);
								}}
								getLabel={(email, index, removeEmail) => {
									return (
										<div data-tag key={index}>
											{email}
											<span data-tag-handle onClick={() => removeEmail(index)}>
												×
											</span>
										</div>
									);
								}}
							/>

							<InputGroup.Prepend>
								<Button
									variant="outline-secondary"
									className="m-auto px-2 cf-black"
									disabled={emails.length <= 0}
									onClick={() => sharedWithEmails()}>
									Send
								</Button>
								{/* <InputGroup.Text><a href="#" onClick={() => sharedWithEmails()}>Send</a></InputGroup.Text> */}
							</InputGroup.Prepend>
						</InputGroup>
					</Form>
				</div>
			</Modal.Body>

			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};

export default ShareForm;
