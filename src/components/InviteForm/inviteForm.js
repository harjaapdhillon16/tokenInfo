import React, { useEffect, useState, useContext } from 'react';
import { Container, Modal, InputGroup, Form, Row, Col, Button, FormControl } from 'react-bootstrap';
import AppContext from '../../context/appContext';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import * as emailjs from 'emailjs-com';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-multi-email/style.css';
import { toast } from 'react-toastify';
import { inviteEmail } from '../emailTemplates/formSentEmail';
import { sendEmail } from '../../utils/email';

const InviteForm = ({ show, handleClose, setShow }) => {
	const { user, agent } = useContext(AppContext);
	let base_url = window.location.origin;
	const [emails, setEmails] = useState([]);
	const [copied, setCopied] = useState(false);

	// const getTemplate = (signUser, signUserEmail, docurl) => {
	// 	return `<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
	//     <tbody>
	//         <tr>
	//             <td>
	//                 <div class="wrapper" style="max-width: 600px;margin: 20px auto;padding: 28px 42px 48px;background-color: #fff;box-shadow: 0px 4px 15px rgba(40, 43, 45, 0.05);">
	//                     <table class="body-wrapper" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
	//                         <tbody>
	//                             <tr align="center">
	//                                 <td class="logo">
	//                                 <span style="padding:40px 0 30px;margin: 0;font-size: 50px;font-weight: 300;line-height: 28px;"> CribFox</span>
	//                                 </td>
	//                             </tr>

	//                             <tr>
	//                                 <td align="center">
	//                                     <p style="padding:40px 0 30px;margin: 0;font-size: 18px;font-weight: 300;line-height: 25px;"> ${signUser} (${signUserEmail}) has sent you a Cribfox signature application
	//                                     </p>
	//                                 </td>
	//                             </tr>

	//                             <tr>
	//                                 <td align="center">

	//                                     <a href="${docurl}" style="width: 139px;height: 48px;margin: 20px auto 0;background: #002C59;color: #fff;font-size: 14px;font-weight: 500;display: flex;align-items: center;text-decoration: none;justify-content: center;border-radius:6px;">
	//                                         <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
	//                                             <path d="M7.00002 0C5.536 0 4.16245 0.481105 3.02968 1.39118C2.85136 1.53466 2.82232 1.79565 2.9659 1.97492C3.10995 2.15394 3.371 2.18024 3.54946 2.03814C4.53359 1.24815 5.72586 0.830265 7.00002 0.830265C9.10837 0.830265 11.0144 2.01438 11.9634 3.84607L11.4461 3.54741C11.2474 3.43201 10.9932 3.50036 10.8788 3.69947C10.7644 3.89836 10.8323 4.15172 11.0308 4.26634L12.5183 5.12515C12.5842 5.16351 12.656 5.18086 12.726 5.18086C12.8689 5.18086 13.0085 5.10583 13.0855 4.9733L13.9445 3.48549C14.0588 3.28664 13.991 3.03336 13.7926 2.9187C13.5936 2.80312 13.3397 2.87256 13.2254 3.07056L12.8372 3.7429C11.8009 1.4813 9.52696 0 7.00002 0Z" fill="white"/>
	//                                             <path d="M1.96942 2.36296C2.18825 2.30825 2.41602 2.43372 2.47557 2.65685L2.91985 4.31546C2.97964 4.53801 2.8474 4.76458 2.62697 4.82424L2.62455 4.82487C2.59083 4.8333 2.55563 4.83845 2.51887 4.83845C2.33568 4.83845 2.16777 4.7166 2.11786 4.5311L1.97008 3.97952C1.59745 4.73462 1.40287 5.56762 1.40287 6.42742C1.40287 8.79841 2.90247 10.9168 5.13357 11.6985C5.34985 11.7743 5.4632 12.0111 5.3878 12.2274C5.32795 12.3986 5.16751 12.5055 4.99592 12.5055C4.95031 12.5055 4.90345 12.4979 4.85824 12.4822C2.29503 11.5834 0.572608 9.15027 0.572608 6.42742C0.572608 5.35461 0.836484 4.31684 1.34063 3.39063L0.52059 3.61031C0.303291 3.66525 0.073595 3.53965 0.0140737 3.31582C-0.0448668 3.09417 0.0867159 2.86749 0.307956 2.80783L1.96942 2.36296Z" fill="white"/>
	//                                             <path d="M13.0123 6.01227C12.7831 6.01227 12.5971 6.19821 12.5971 6.4274C12.5971 9.25286 10.4923 11.5964 7.76843 11.972L8.15214 11.5883C8.31411 11.4263 8.31411 11.1632 8.15214 11.0013C7.99017 10.8393 7.72708 10.8393 7.56511 11.0013L6.41992 12.1464C6.25795 12.3084 6.25795 12.5715 6.41992 12.7335L7.56558 13.8791C7.64657 13.9593 7.75275 14 7.85891 14C7.96493 14 8.07157 13.9594 8.15236 13.8779C8.31411 13.7159 8.31403 13.453 8.15214 13.2911L7.68013 12.8191C10.9056 12.4782 13.4274 9.74172 13.4274 6.4274C13.4274 6.19821 13.2415 6.01227 13.0123 6.01227Z" fill="white"/>
	//                                         </svg>
	//                                         <span style="display:block;line-height:48px; text-align:center;width: 139px;">Go to Application</span>
	//                                     </a>
	//                                 </td>
	//                             </tr>

	//                             <tr>
	//                                 <td align="center">
	//                                     <div style="margin-top:40px;padding:0 0 50px;border-bottom:1px #E2E8F0 solid;display: flex;justify-content: center;">

	//                                         <div class="notifications" style="width:350px;vertical-align:top;padding-left: 5px;text-align: left;"><p style="font-size: 12px;margin: 0;font-weight: 500;line-height: 15px;">Warning</p>
	//                                             <p style="margin: 0;font-size: 12px;font-weight: 300;line-height: 15px;">To prevent unauthorized users from accessing this document, please do not forward this email.</p>
	//                                         </div>
	//                                     <div>
	//                                 </td>
	//                             </tr>
	//                         </tbody>

	//                     </table>
	//                 </div>
	//             </td>
	//         </tr>
	//     </tbody>
	// </table>`.replaceAll('\n', '');
	// };

	const sharedWithEmails = () => {
		// console.log(emails);

		let docLink = window.location.origin;
		let emailSubject = `${agent.name} invited you to collaborate on Cribfox`;
		// let emailData = {
		//   subject: emailSubject,
		//   from_name: user.username,
		//   to_name: "noreply",
		//   reply_to: user.attributes.email,
		//   to_email: emails,
		//   html: inviteEmail(agent.name, agent.email, docLink),
		// };

		let emailParam = {
			subject: emailSubject,
			reply_to: user.attributes.email,
			to_email: emails,
			html: inviteEmail(agent.name, agent.email, docLink)
		};
		try {
			sendEmail(emailParam);
			setEmails([]);
			handleClose();
			toast.success('Invite share successfully!');
		} catch (err) {
			console.log(err);
		}
		// emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
		//   function (response) {
		//
		//     // console.log(response);
		//     // console.log(response.status, response.text);
		//   },
		//   function (err) {
		//     console.log(err);
		//   }
		// );
	};

	const onCopyText = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 500);
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title></Modal.Title>
			</Modal.Header>

			<Modal.Body className="px-4">
				<h4>Share an invite link to use Cribfox</h4>
				<p>Convenient web link you can share via messaging.</p>

				<InputGroup className="mb-2 mr-4">
					<FormControl
						id="inlineFormInputGroup "
						placeholder="www.cribfox.com"
						value="www.cribfox.com"
					/>

					<CopyToClipboard
						className="mt-1 pl-2 clipboard"
						text="www.cribfox.com"
						onCopy={onCopyText}>
						<div>{copied ? 'Copied!' : 'Copy'}</div>
					</CopyToClipboard>
				</InputGroup>

				<div className="border-top mt-4 pt-3">
					<h4>Invite a fellow agent by email</h4>
					<p>Save inbox space by having your counterparts use Cribfox with their clients</p>
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

							<InputGroup.Prepend className="send-form-btn">
								<Button
									variant="outline-secondary"
									className="m-auto px-2"
									disabled={emails.length <= 0}
									onClick={() => sharedWithEmails()}>
									Send
								</Button>
							</InputGroup.Prepend>
						</InputGroup>
					</Form>
				</div>
			</Modal.Body>

			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};

export default InviteForm;
