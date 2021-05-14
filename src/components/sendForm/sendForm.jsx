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
  const [input, setInput] = useState('');
  const [contactList, setContactList] = useState();
  

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

  //get contacts list
  const handleContactTypes = () => {
    console.log(contacts);
    setUpdatedContacts(contacts);
  };

  const handleSearch = (val) => {
    let filtered = [];
    console.log(val);
    if (val !== ""){
      filtered = updatedContacts.filter(item => {
        return item.name.toLowerCase().includes(val.toLowerCase())
      })
    }else{
      filtered = contacts;
    }
  
    setInput(val);
    setUpdatedContacts(filtered);
  }

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

    const date = new Date();
    let newDate = JSON.stringify(date)
    newDate = newDate.slice(1,11); 

    let data = [];

    if (formid === 1) {      
      data[0] = "name";
      data[1] = formData.name;
      data[2] = "name_of_real_estate";
      data[3] = formData.companyName;
      data[4] = "real_estate_brockerage_company";
      data[5] = formData.companyName;
      data[6] = "date";
      data[7] = newDate;
      
    } else if (formid === 2) {

      data[0] = "name";
      data[1] = formData.name;
      data[2] = "name_of_real_estate_company";
      data[3] = formData.companyName;
      data[4] = "account_type";
      data[5] = "";
      data[6] = "real_estate_brockerage_company";
      data[7] = "";
      data[8] = "firstdate";
      data[9] = "";
      data[10] = "lastdate";
      data[11] = "";

    } else if (formid === 3) {

      data[0] = "name";
      data[1] = formData.name;
      data[2] = "date";
      data[3] = "";
      data[4] = "property_address";
      data[5] = "";
      data[6] = "real_estate_name";
      data[7] = formData.companyName;
      data[8] = "name_of_brockerage_company";
      data[9] = "";
    }
    return data;
  };

  const handleSecondForm = () => {
     handleCurrentState(currentState + 1)
    let selectedforms = updatedFormTypes.filter(
      (item) => item.isActive === true
    );
    let selectedcontacts = updatedContacts.filter(
      (item) => item.isActive === true
    );

    // let today = Date.now();
    let today = new Date();
    console.log(today);

    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log(time);

    // let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today);
    // console.log(timestamp);

    let finalData = [];
    
    selectedcontacts.map((item) => {
      selectedforms.map(function (form) {

        let finalObject = {};
        finalObject.senderId = user.username;
        finalObject.receiverId = item.id;
        finalObject.receiverName = item.name;
        finalObject.receiverEmail = item.email;
        finalObject.formName = form.title;
        finalObject.status = "SENT";

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
        to_name: data.receiverName,
        message:`http://localhost:3000/formSubmission/${receiverId}`,
        reply_to: user.attributes.email,
        to_email:data.receiverEmail
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

    } catch (err) {
      console.log("Error creating Formdata", err);
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
          
          <div className="d-flex ml-auto mr-auto justify-content-center add-client">
            {/* <IconPlus /> Add a new client */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleSecondForm()}
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
