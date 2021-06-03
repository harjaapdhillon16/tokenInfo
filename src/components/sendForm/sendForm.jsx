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
import CreateContactForm from "../../../src/components/createContactForm/createContactForm";

const SendForm = ({ formModal, onHandleFormModal }) => {
  const [currentState, handleCurrentState] = useState(1);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState("sandalsimar@gmail.com");
  const [updatedFormTypes, setUpdatedFormTypes] = useState([]);
  const [updatedContacts, setUpdatedContacts] = useState([]);
  const [input, setInput] = useState("");
  const [contactList, setContactList] = useState();
  let base_url = window.location.origin;

  const {
    user,
    agent,
    formsTypes,
    contacts,
    onUpdateContacts,
    formItems,
    onFormItemsUpdate,
  } = useContext(AppContext);

  useEffect(() => {
    handleCurrentState(1);
    handleContact();
    handleFormTypes();
    handleContactTypes();
  }, [formModal]);

  const handleFormTypes = () => {
    console.log(formItems);
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
    if (val !== "") {
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

  const hanldeContactSelection = () => {
    handleCurrentState(currentState + 1);
  };

  const handleMultipleFormsData = (formid, formData, agent) => {
    console.log(formData);
    const date = new Date();
    let newDate = JSON.stringify(date);
    newDate = newDate.slice(1, 11);

    let data = [];

    if (formid === 1) {
      data[0] = "name";
      data[1] = formData.name;
      data[2] = "name_of_real_estate";
      data[3] = agent.stateOfLicensure;
      data[4] = "real_estate_brockerage_company";
      data[5] = agent.brokerageName;
      data[6] = "date";
      data[7] = newDate;
    } else if (formid === 2) {
      data[0] = "name";
      data[1] = formData.name;
      data[2] = "name_of_real_estate_company";
      data[3] = formData.companyName;
      data[4] = "account_type";
      data[5] = "";
      data[6] = "firstdate";
      data[7] = newDate;
      data[8] = "lastdate";
      data[9] = newDate;
    } else if (formid === 3) {
      data[0] = "name";
      data[1] = formData.name;
      data[2] = "date";
      data[3] = newDate;
      data[4] = "property_address";
      data[5] = "";
      data[6] = "real_estate_name";
      data[7] = formData.companyName;
      data[8] = "name_of_brockerage_company";
      data[9] = "";
      data[10] = "checkValueFirst";
      data[11] = "";
      data[12] = "checkValueSecond";
      data[13] = "";
      data[14] = "checkValueThird";
      data[15] = "";
      data[14] = "checkValueFourth";
      data[15] = "";
    }
    return data;
  };

  const handleSecondForm = () => {
    handleCurrentState(currentState + 1);
    let selectedforms = updatedFormTypes.filter(
      (item) => item.isActive === true
    );
    let selectedcontacts = updatedContacts.filter(
      (item) => item.isActive === true
    );

    // let today = Date.now();
    let today = new Date();
    console.log(today);

    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(time);

    // let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today);
    // console.log(timestamp);

    let finalData = [];

    selectedcontacts.map((item) => {
      selectedforms.map(function (form) {
        let finalObject = {};
        finalObject.senderId = agent.email;
        finalObject.receiverId = item.id;
        finalObject.receiverName = item.name;
        finalObject.receiverEmail = item.email;
        finalObject.formName = form.title;
        finalObject.status = "SENT";

        finalObject.data = handleMultipleFormsData(form.id, item, agent);
        finalData = [...finalData, finalObject];
      });
    });
    console.log("finalData", finalData);

    if (finalData.length > 0) {
      finalData.map((item) => {
        handleFormData(item);
      });
    }
  };

  const handleFormData = async (data) => {
    console.log("handleformdata", data);

    try {
      const createdContact = await API.graphql(
        graphqlOperation(createFormData, { input: data })
      );

      console.log(createdContact.data.createFormData);

      let SERVICE_ID = "service_eqgdpk5";
      let TEMPLATE_ID = "template_jbe48ur";
      let USER_ID = "user_8vM6h8mcNE6lwsmITnR6H";
      let receiverId = createdContact.data.createFormData.id;
      console.log(createdContact.data.createFormData.formName);

      let emailData = {
        from_name: user.username,
        to_name: data.receiverName,
        message: `${base_url}/formSubmission/${receiverId}`,
        reply_to: user.attributes.email,
        to_email: data.receiverEmail,
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
        function (response) {
          console.log(response);
          console.log(response.status, response.text);
          const forms = [...formItems, createdContact.data.createFormData];
          console.log("new form added", forms);
          onFormItemsUpdate(forms);
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
            {contacts.map((item) => (
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
            onClick={handleShow}
          >
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
