import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Modal,
  InputGroup,
  Form,
  Row,
  Col,
  Button,
  FormControl
} from "react-bootstrap";
import AppContext from "../../context/appContext";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import * as emailjs from "emailjs-com";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import 'react-multi-email/style.css';

const InviteForm = ({ show, handleClose, setShow}) => {
 const { user } = useContext(AppContext);
 console.log(user);
 console.log(user.attributes.email)
 let base_url = window.location.origin;
 const [emails, setEmails] = useState([]);
 const [copied, setCopied] = useState(false);

 const sharedWithEmails=()=>{
    console.log(emails);
    let SERVICE_ID = "service_tjry678";
    let TEMPLATE_ID = "template_difn49p";
    let USER_ID = "user_xtMibwUvYsK5NraUVFG1J";

    let emailData = {
        from_name: user.username,
        to_name: "noreply",
        message:"www.cribfox.com",
        reply_to: user.attributes.email,
        to_email: emails,
    };
    console.log(emailData);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
        function (response) {
          console.log(response);
          console.log(response.status, response.text);
        },
        function (err) {
          console.log(err);
        }
    );
 }
 console.log(copied);
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4">
            <h4>Share a link to the signed form</h4>
            <p>Convenient web link you can share via messaging. No registration required to view.</p>

            <InputGroup className="mb-2 mr-4">
                <FormControl 
                    id="inlineFormInputGroup " 
                    placeholder="www.cribfox.com" 
                    value="www.cribfox.com"
                /> 
                
                <CopyToClipboard className="mt-1 pl-2 clipboard" text="www.cribfox.com"
                    onCopy={() => setCopied(true)}>
                    <div>Copy</div>
                </CopyToClipboard>

            </InputGroup>

            <div className="border-top mt-4 pt-3">
                <h4>Email a copy of the signed form</h4>
                <p>The recipient will be able to view the online document without needing to register</p>
                <Form>
                    <InputGroup className="mb-2">
                        <ReactMultiEmail
                            className="mr-2"
                            placeholder="placeholder"
                            emails={emails}
                            onChange={(_emails) => {
                                setEmails(_emails);
                            }}
                            validateEmail={email => {
                                return isEmail(email); 
                            }}
                            getLabel={(
                                email,
                                index,
                                removeEmail,
                            ) => {
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
                                className="m-auto px-2"
                                disabled={emails.length <= 0}
                                onClick={()=> sharedWithEmails()}
                            >
                                Send
                            </Button>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form>
            </div>
        </Modal.Body>
        
        <Modal.Footer>
        </Modal.Footer>
  </Modal>
  );
};

export default InviteForm;
