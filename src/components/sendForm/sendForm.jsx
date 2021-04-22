import React, { useEffect, useState, useContext } from "react";

import { IconPlus } from "../../assets/icons/icons";
import {
  Container,
  Modal,
  InputGroup,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import AppCard from "../card/card";
import Header from "../header/header";
import AppContext from "../../context/appContext";
import { API, graphqlOperation } from "aws-amplify";
import { listContacts } from "../../graphql/queries";
import * as emailjs from "emailjs-com";

const SendForm = ({ formModal, onHandleFormModal }) => {
  const [currentState, handleCurrentState] = useState(1);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState('techaditi669@gmail.com');
  
  
  const  { formsTypes , contacts, onUpdateContacts } = useContext(AppContext);
 
  useEffect(() => {
    handleCurrentState(1);
    handleContact();
  }, [formModal]);

  const handleContact = async () => {
    
    if(contacts.length == 0){
      try {
        const listContactsData = await API.graphql(graphqlOperation(listContacts));
        console.log('listContacts', listContactsData);
        onUpdateContacts(listContactsData.data.listContacts.items)
      
      } catch (err) {
        console.log(err);
      }
    }
    
  };

  const emailSend = (email) => {
    
    let SERVICE_ID = 'service_le2r21n';
    let TEMPLATE_ID = 'template_difn49p';
    let USER_ID = 'user_xtMibwUvYsK5NraUVFG1J'; 

    let data = {
      from_name: "adad",
      to_name: "asdasd",
      message: "asdasd",
      reply_to: "asdasd",
      
      }

    {
      
    };

    // var data = {
    //   service_id: SERVICE_ID,
    //   template_id: TEMPLATE_ID,
    //   user_id: USER_ID,
    //   template_params: {
    //       'username': 'James',
    //       to_email:email,
    //   }
    // };

    // fetch('https://api.emailjs.com/api/v1.0/email/send', {
    //   type: 'POST',
    //   data: JSON.stringify(data),
    //   contentType: 'application/json'
    // }).then(function() {
    //     alert('Your mail is sent!');
    // }).catch(function(error) {
    //     alert('Oops... ' + JSON.stringify(error));
    // });

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
      function (response) {
        console.log(response);
        console.log(response.status, response.text);
      },
      function (err) {
        console.log(err);
      }
    );

  }
  console.log('contacts:', contacts);
  const formSelection = () => {
    return (
      <Modal
        show={formModal}
        animation={false}
        onHide={() => onHandleFormModal(formModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-options">
          {formsTypes.map((item) => (
            <Form.Check
             id={item.id} 
            label={item.title} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleCurrentState(currentState + 1)}
            variant="outline-secondary  pop-btn d-flex ml-auto mr-auto"
          >
            Next
          </Button>
          <Button
            onClick={() => emailSend(email)}
            variant="outline-secondary  pop-btn d-flex ml-auto mr-auto"
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const clientSelection = () => {
    return (
      <Modal
        show={formModal}
        animation={false}
        onHide={() => onHandleFormModal(formModal)}
      >
        <Modal.Header closeButton className="pop-header">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Form.Group controlId="formBasicSearch">
          <Form.Control type="search" placeholder="Search" />
        </Form.Group>
        <Modal.Body className="modal-options">

          <div className="contactsList">
            {contacts.map((item) => (
              <Form.Check id={item.id} label={item.name} />
            ))}
          </div>
          
          <div className="d-flex ml-auto mr-auto justify-content-center add-client">
          <Button
            variant="primary"
            className="m-auto px-5"
            type="submit"
            onClick={handleShow}
          >
            <IconPlus /> 
            Add a new client
          </Button>
            {/* <IconPlus /> Add a new client */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleCurrentState(currentState + 1)}
            variant="outline-secondary  pop-btn d-flex ml-auto mr-auto"
          >
            Next
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    );
  };

  const formSubmitted = () => {
    return (
      <Modal
        show={formModal}
        animation={false}
        onHide={() => onHandleFormModal(formModal)}
      >
        <Modal.Header closeButton className="pop-header">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-options">
          <h4 className="d-flex ml-auto mr-auto justify-content-center">
            Your form has been sent !
          </h4>
          <Button variant="outline-secondary mt-4 d-flex ml-auto mr-auto">
            View REBNY COVID Liability Form
          </Button>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => onHandleFormModal(formModal)}
            variant="outline-secondary  pop-btn d-flex ml-auto mr-auto"
          >
            Close
          </Button>{" "}
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
        return "Not Found!";
    }
  };
  return handleModalState();
};

export default SendForm;