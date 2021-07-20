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
import formEventsHandler from "../../utils/formEventsHelpers";
import {
  sendTemplateToReceiver,
  sendTemplateToSender,
} from "../emailTemplates/formSentEmail";
import { encode } from "../../utils/base64";
import { sendEmail } from "../../utils/email";

const SendForm = ({ formModal, onHandleFormModal }) => {
  const [currentState, handleCurrentState] = useState(1);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [moreOptions, setMoreOptions] = useState(false);
  const [mainType, setMainType] = useState("");
  const [optionNo, setOptionNo] = useState("");
  const [optionName, setOptionName] = useState("");
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
          graphqlOperation(listContacts, {
            filter: { agentId: { eq: agent.id } },
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
    console.log("current state", currentState);
    handleCurrentState(currentState + 1);
  };

  const handleMultipleFormsData = (formid, formData, agent) => {
    const date = new Date();
    let newDate = JSON.stringify(date);
    newDate = newDate.slice(1, 11);

    let data = [];

    if (formid === 1) {
      data[0] = "name";
      data[1] = formData.name;
      data[2] = "name_of_real_estate";
      data[3] = agent.name;
      data[4] = "real_estate_brockerage_company";
      data[5] = agent.brokerageName;
      data[6] = "date";
      data[7] = "";
    } else if (formid === 2) {
      data[0] = "senderName";
      data[1] = agent.name;
      data[2] = "senderCompany";
      data[3] = agent.brokerageName;
      data[4] = "signerName";
      data[5] = formData.name;
      data[6] = "date";
      data[7] = "";
    } else if (formid === 4) {
      data[0] = "name";
      data[1] = formData.name;
      data[2] = "date";
      data[3] = "";
      data[4] = "property_address";
      data[5] = "";
      data[6] = "real_estate_name";
      data[7] = agent.name;
      data[8] = "name_of_brockerage_company";
      data[9] = agent.brokerageName;
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

  const handleSecondForm = (nextStep) => {
    debugger
    let selectedForms = updatedFormTypes.filter(
      (item) => item.isActive === true
    );
    const checkFirstForm = selectedForms.filter(item => item.title === "New York State Disclosure Form for Buyer and Seller")
    const checkSecondForm = selectedForms.filter(item => item.title === "New York State Disclosure Form for Landlord and Tenant ")
    if (nextStep === 2) {
      if (checkFirstForm.length > 0) {
        handleCurrentState(3);
        return;
      }
      if (checkSecondForm.length > 0) {
        handleCurrentState(4);
        return;
      }
    }
    else if (nextStep === 3) {
      if (checkSecondForm.length > 0) {
        handleCurrentState(4);
        return;
      }
    }
    handleCurrentState(5);
    handleFormSubmission(selectedForms);
  };

  const handleFormSubmission = (selectedForms) => {
    debugger
    let selectedcontacts = updatedContacts.filter(
      (item) => item.isActive === true
    );
    setContactList(selectedcontacts);

    let finalData = [];

    selectedcontacts.map((item) => {
      selectedForms.map(function (form) {
        let finalObject = {};
        finalObject.senderId = agent.id;
        finalObject.receiverId = item.id;
        finalObject.receiverName = item.name;
        finalObject.receiverEmail = item.email;
        finalObject.formName = form.title;
        finalObject.status = "SENT";
        finalObject.data = handleMultipleFormsData(form.id, item, agent);
        finalData = [...finalData, finalObject];


      });
    });
    // if (finalData.length > 0) {
    //   finalData.map((item) => {
    //     handleFormData(item);
    //   });
    // }
  }

  const handleFormData = async (data) => {
    try {
      const createdContact = await API.graphql(
        graphqlOperation(createFormData, { input: data })
      );
      const formDataId = createdContact.data.createFormData.id;
      const senderLink = `${base_url}/formSubmission/${formDataId}`;
      const recieverLink = `${base_url}/formSubmission/${encode({
        formDataId,
        isContact: true,
      })}`;

      // let emailDataForReceiver = {
      // 	subject: `${data.formName} Signature requested by ${agent.email}`,
      // 	from_name: agent.name,
      // 	to_name: data.receiverName,
      // 	reply_to: agent.email,
      // 	to_email: data.receiverEmail,
      // 	html: sendTemplateToReceiver(
      // 		agent.name,
      // 		agent.email,
      // 		data.formName,
      // 		recieverLink,
      // 		formDataId
      // 	)
      // };

      // let emailDataForSender = {
      // 	subject: `${data.formName} has been sent for e-signature`,
      // 	from_name: 'CribFox',
      // 	to_name: agent.name,
      // 	reply_to: 'team@cribfox.com',
      // 	to_email: agent.email,
      // 	html: sendTemplateToSender(
      // 		data.formName,
      // 		data.receiverName,
      // 		data.receiverEmail,
      // 		senderLink,
      // 		formDataId
      // 	)
      // };
      try {
        formEventsHandler(formDataId, "SENT", [
          { name: data.receiverName, email: data.receiverEmail },
          { name: agent.name, email: agent.email },
        ]);
      } catch (err) {
        console.log("audit trail error", err);
      }

      let senderParam = {
        subject: `${data.formName} has been sent for e-signature`,
        reply_to: "team@cribfox.com",
        to_email: agent.email,
        html: sendTemplateToSender(
          data.formName,
          data.receiverName,
          data.receiverEmail,
          senderLink,
          formDataId
        ),
      };
      let receiverParam = {
        subject: `${data.formName} Signature requested by ${agent.email}`,
        reply_to: agent.email,
        to_email: data.receiverEmail,
        html: sendTemplateToReceiver(
          agent.name,
          agent.email,
          data.formName,
          recieverLink,
          formDataId
        ),
      };
      // let testMail = {
      // 		subject: 'hello',
      // 		reply_to: 'faisalarshed28@gmail.com',
      // 		to_email: 'testingCribMailinator.com',
      // 		html: '<h2>hey here!</h2>'
      // 	}
      // 	sendEmail(testMail);
      sendEmail(receiverParam);
      sendEmail(senderParam);
      // handleEmailTransfer(emailDataForReceiver);
      // handleEmailTransfer(emailDataForSender);

      const forms = [...formItems, createdContact.data.createFormData];
      onFormItemsUpdate(forms);
    } catch (err) {
      console.log("Error creating Formdata", err);
    }

    let updateContactId = updatedContacts.filter(function (item) {
      if (item.id) {
        item.isActive = false;
      }
      return item;
    });

    setUpdatedContacts(updateContactId);
  };

  const handleCheckBox = (data) => {
    console.log("data coming from function", data);
    if (moreOptions === false) {
      setMoreOptions(true);
      setOptionNo(data);
    }
    else {
      setMoreOptions(false);
      setOptionNo(0);
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

          <div
            className="d-flex ml-auto mr-auto justify-content-center add-client"
            style={{ cursor: "pointer" }}
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
            onClick={() => handleSecondForm(2)}
            variant="outline-secondary  pop-btn d-flex ml-auto mr-auto"
          >
            Next
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    );
  };

  const selectedForms = () => {

    let selectedForms = updatedFormTypes.filter(
      (item) => item.isActive === true
    );
    console.log("selected forms", selectedForms)
    return (

      selectedForms.map((form) => <span type="button" class="btn btn-light bg-white border-dark py-2 my-2 w-100">{form.title}</span>)
    )
  }

  const selectedContacts = () => {

    return (
      contactList.map((contact) => <div>

        <h5>{contact.name}</h5>
        {selectedForms()}
      </div>)
    )
  }

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
        <Modal.Body className="modal-options px-4">
          <h4 className="d-flex ml-auto mr-auto justify-content-center">
            Your form has been sent !
          </h4>
          <div className="d-flex flex-column my-4">
            {selectedContacts()}
          </div>

          {/* <Button variant="outline-secondary mt-4 d-flex ml-auto mr-auto">
            View REBNY COVID Liability Form
          </Button>{" "} */}
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
  const additionalFormFields = () => {
    return (
      <Modal
        show={formModal}
        animation={false}
        onHide={() => onHandleFormModal(formModal)}
      >
        <Modal.Title className="text-center py-3 border-bottom">
          Additional Form Fields
        </Modal.Title>
        <Modal.Body className="modal-options">
          <h5 className="px-3 mb-4">New York Agency Disclosure Form For Buyer and Seller</h5>
          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="radio"
              name="option"
              onChange={() => setMainType(`I'm acting in the interest of the Seller`)}
              label="I'm acting in the interest of the Seller"
            />
          </Form.Group>
          {(mainType == `I'm acting in the interest of the Seller`) &&
            <div className="ml-5">
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox1"
              >
                <Form.Check type="radio"
                  name="option1"
                  label="As the Seller’s Agent"
                  onChange={() => setOptionNo(`As the Seller’s Agent`)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox2"
              >
                <Form.Check type="radio"
                  name="option1"
                  label="As the Broker’s Agent"
                  onChange={() => setOptionNo(`As the Seller’s Agent`)}
                />
              </Form.Group>
            </div>
          }

          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox3"
          >
            <Form.Check
              type="radio"
              label="I'm acting in the interest of the Buyer"
              name="option"
              onChange={() => setMainType(`I'm acting in the interest of the Buyer`)}
            />
          </Form.Group>
          {(mainType == `I'm acting in the interest of the Buyer`) &&
            <div className="ml-5">
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox4"
              >
                <Form.Check type="radio"
                  name="option1"
                  label="As the Seller’s Agent"
                  onChange={() => setOptionNo(`As the Seller’s Agent`)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox5"
              >
                <Form.Check type="radio"
                  name="option1"
                  label="As the Broker’s Agent"
                  onChange={() => setOptionNo(`As the Broker’s Agent`)}
                />
              </Form.Group>
            </div>
          }
          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox6"
          >
            <Form.Check
              type="radio"
              label="I'm acting as a dual agent"
              name="option"
              onChange={() => setMainType(`I'm acting as a dual agent`)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox7"
          >
            <Form.Check
              type="radio"
              label="I'm acting as a dual agent with designated sales agent"
              name="option"
              onChange={() => setMainType(`I'm acting as a dual agent with designated sales agent`)}
            />
          </Form.Group>
          {(mainType == `I'm acting as a dual agent with designated sales agent`) &&
            <div className="ml-5">
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox8"
              >
                <Form.Check type="radio"
                  name="option1"
                  label="Advance informed consent dual agency"
                  onChange={() => setOptionNo(`Advance informed consent dual agency`)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox9"

              >
                <Form.Check type="radio"
                  name="option1"
                  label="Advance informed consent to dual agency with designated sales agents"
                  onChange={() => setOptionNo(`Advance informed consent to dual agency with designated sales agents`)}
                />
              </Form.Group>
            </div>
          }
          {
            (optionNo == `Advance informed consent to dual agency with designated sales agents`) &&
            <div className="mx-4">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="name of agent representing buyer" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control type="text" placeholder="name of agent representing seller" />
              </Form.Group>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleSecondForm(3)}
            variant="outline-secondary  pop-btn d-flex ml-auto mr-auto"
          >
            Next
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    );
  };


  const additionalFormFields2 = () => {
    return (
      <Modal
        show={formModal}
        animation={false}
        onHide={() => onHandleFormModal(formModal)}
      >
        <Modal.Title className="text-center py-3 border-bottom">
          Additional Form Fields
        </Modal.Title>
        <Modal.Body className="modal-options">
          <h5 className="px-3 mb-4">New York State Disclosure Form for Landlord and Tenant</h5>
          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="radio"
              name="option"
              onChange={() => setMainType(`I'm acting in the interest of the Landlord`)}
              label="I'm acting in the interest of the Landlord"
            />
          </Form.Group>
          {(mainType == `I'm acting in the interest of the Landlord`) &&
            <div className="ml-5">
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox1"

              >
                <Form.Check
                  type="radio"
                  name="option"
                  label="As the Landlord’s Agent"
                  onChange={() => setOptionNo(`As the Landlord’s Agent`)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox2"
              >
                <Form.Check
                  type="radio"
                  label="As the Broker’s Agent"
                  name="option"
                  onChange={() => setOptionNo(`As the Broker’s Agent`)}
                />
              </Form.Group>
            </div>
          }

          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox3"
          >
            <Form.Check
              type="radio"
              label="I'm acting in the interest of the Tenant"
              onChange={() => setMainType(`I'm acting in the interest of the Tenant`)}
              name="option"

            />
          </Form.Group>
          {(mainType == `I'm acting in the interest of the Tenant`) &&
            <div className="ml-5">
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox4"
              >
                <Form.Check
                  type="radio"
                  label="As the Tenant’s Agent"
                  name="option1"
                  onChange={() => setOptionNo(`As the Tenant’s Agent`)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox5"
              >
                <Form.Check
                  type="radio"
                  label="As the Broker’s Agent"
                  name="option1"
                  onChange={() => setOptionNo(`As the Broker’s Agent`)}
                />
              </Form.Group>
            </div>
          }
          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox6"
          >
            <Form.Check
              type="radio"
              label="I'm acting as a dual agent"
              name="option"
              onChange={() => setMainType(`I'm acting as a dual agent`)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 check-fields"
            controlId="formBasicCheckbox7"
          >
            <Form.Check
              type="radio"
              label="I'm acting as a dual agent with designated sales agent"
              name="option"
              onChange={() => setMainType(`I'm acting as a dual agent with designated sales agent`)}
            />
          </Form.Group>
          {(mainType == `I'm acting as a dual agent with designated sales agent`) &&
            <div className="ml-5">
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox8"
              >
                <Form.Check
                  type="radio"
                  label="Advance informed consent dual agency"
                  name="option1"
                  onChange={() => setOptionNo(`Advance informed consent dual agency`)}

                />
              </Form.Group>
              <Form.Group
                className="mb-3 check-inside"
                controlId="formBasicCheckbox9"
              >
                <Form.Check
                  type="radio"
                  name="option1"
                  label="Advance informed consent to dual agency with designated sales agents"
                  onChange={() => setOptionNo(`Advance informed consent to dual agency with designated sales agents`)}
                />
              </Form.Group>
            </div>
          }{
            (optionNo == `Advance informed consent to dual agency with designated sales agents`) &&
            <div className="mx-4">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="name of agent representing buyer" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control type="text" placeholder="name of agent representing seller" />
              </Form.Group>
            </div>
          }

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
  const handleModalState = () => {
    switch (currentState) {
      case 1:
        return formSelection();
      case 2:
        return clientSelection();
      case 3:
        return additionalFormFields();
      case 4:
        return additionalFormFields2();
      case 5:
        return formSubmitted();
      default:
        return "Not Found!";
    }
  };
  return handleModalState();
};

export default SendForm;
