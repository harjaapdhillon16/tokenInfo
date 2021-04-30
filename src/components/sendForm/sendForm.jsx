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
import { createFormData } from "../../graphql/mutations";
import * as emailjs from "emailjs-com";

const SendForm = ({ formModal, onHandleFormModal }) => {
  const { user } = useContext(AppContext);
  const [currentState, handleCurrentState] = useState(1);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("sandalsimar@gmail.com");
  const [updatedFormTypes, setUpdatedFormTypes] = useState([]);
  const [updatedContacts, setUpdatedContacts] = useState([]);
  

  const { formsTypes, contacts, onUpdateContacts } = useContext(AppContext);

  useEffect(() => {
    handleCurrentState(1);
    handleContact();
    handleFormTypes();
    handleContactTypes();
  }, [formModal]);

  const handleFormTypes = () => {
    const updatedTypes = formsTypes.map((item) => {
      item.isActive = false;
      return item;
    });
    setUpdatedFormTypes(updatedTypes);
  };

  const handleContactTypes = () => {
    console.log(contacts);
    setUpdatedContacts(contacts);
  };

  const handleContact = async () => {
    if (contacts.length == 0) {
      try {
        const listContactsData = await API.graphql(
          graphqlOperation(listContacts)
        );

        onUpdateContacts(listContactsData.data.listContacts.items);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFormCheck = (formid) => {
    console.log("checkbox method");
    console.log(formid);
    let updateFormId = updatedFormTypes.filter(function (item) {
      if (item.id == formid) {
        item.isActive = !item.isActive;
      }
      return item;
    });

    setUpdatedFormTypes(updateFormId);
  };

  const onhandleContactMethod = (contactid) => {
    console.log("contacts method");
    console.log(contactid);
    let updateContactId = updatedContacts.filter(function (item) {
      if (item.id == contactid) {
        item.isActive = !item.isActive;
      }
      return item;
    });

    setUpdatedContacts(updateContactId);
  };

  const formData = {
    data: ["name", "Simarjot", "age", "25", "address", "Punjab"],
  };

 

  const hanldeContactSelection = () => {
    handleCurrentState(currentState + 1);
    // let SERVICE_ID = "service_tjry678";
    // let TEMPLATE_ID = "template_difn49p";
    // let USER_ID = "user_xtMibwUvYsK5NraUVFG1J";

    // let data = {
    //   from_name: "Simarjot",
    //   to_name: "Simarjot",
    //   message: "http://localhost:3000/formSubmission/1/user_xtMibwUvYsK5NraUVFG1J",
    //   reply_to: "asdasd",
    //   to_email:email,
    // };

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

    // handleFormData();
    // emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
    //   function (response) {
    //     console.log(response);
    //     console.log(response.status, response.text);
    //   },
    //   function (err) {
    //     console.log(err);
    //   }
    // );
  };

  const handleMultipleFormsData = (formid, formData) => {
    let data = [];

    if (formid === 1) {
      data.name = formData.name;
      data.date = "";
      data.name_of_real_estate = formData.companyName;
      data.real_estate_brockerage_company = "";
    } else if (formid === 2) {
      data.name = formData.name;
      data.name_of_real_estate_company = formData.companyName;
      data.account_type = "";
      data.real_estate_brockerage_company = "";
      data.firstdate = "";
      data.lastdate = "";
    } else if (formid === 3) {
      data.name = formData.name;
      data.date = "";
      data.account_type = "";
      data.property_address = "";
      data.real_estate_name = formData.companyName;
      data.name_of_brockerage_company = "";
    }
    return data;
  };

  const handleSecondForm = () => {
    //  handleCurrentState(currentState + 1)
    let selectedforms = updatedFormTypes.filter(
      (item) => item.isActive === true
    );
    let selectedcontacts = updatedContacts.filter(
      (item) => item.isActive === true
    );

    let finalData = [];
    // let data = [];
    selectedcontacts.map((item) => {
      selectedforms.map(function (form) {

        let finalObject = {};
        finalObject.senderId = "1";
        finalObject.receiverId = item.id;
        finalObject.formName = form.title;

        finalObject.data = handleMultipleFormsData(form.id, item);
        finalData = [...finalData, finalObject];
      });
    
    });
    console.log("finalData", finalData);

    if(finalData.length > 0){
      finalData.map((item) => {
        handleFormData(item)
      })
    }  
  };

  const handleFormData = async (data) => {
    console.log("handleformdata", data)

    try {
      const createdContact = await API.graphql(
        graphqlOperation(createFormData, { input: data })
      );

      console.log(createdContact);

      let SERVICE_ID = "service_tjry678";
      let TEMPLATE_ID = "template_difn49p";
      let USER_ID = "user_xtMibwUvYsK5NraUVFG1J";
      let receiverId = createdContact.data.createFormData.id;
      console.log(createdContact.data.createFormData.formName)
      
      let emailData = {
        from_name: user.username,
        to_name: data.data.name,
        message:`http://localhost:3000/formSubmission/${receiverId}`,
        reply_to: user.attributes.email,
        to_email:"test@gmail.com",
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
        function (response) {
          console.log(response);
          console.log(response.status, response.text);
        },
        function (err) {
          console.log(err);
        }
      );

      // const newContacts = [...contacts, createdContact.data.createContact];
      // onUpdateContacts(newContacts);
      // console.log(createdContact.data.createContact);
      // setShow(false);
    } catch (err) {
      console.log(err, "Error creating Formdata");
    }
  };

 

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

          <div className="d-flex ml-auto mr-auto justify-content-center add-client">
            {/* <IconPlus /> Add a new client */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleSecondForm()}
            variant="outline-secondary  pop-btn d-flex ml-auto mr-auto"
          >
            Next contact submit
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
