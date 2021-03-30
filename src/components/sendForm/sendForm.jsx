import React, { useEffect, useState, useContext } from "react";
import {
  IconBuilding,
  IconEmail,
  IconSmartphone,
  IconMenu,
} from "../../assets/icons/icons";
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

const SendForm = ({ formModal, onHandleFormModal }) => {
  const [currentState, handleCurrentState] = useState(1);

  useEffect(() => {
    handleCurrentState(1);
  }, [formModal]);

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
          <Form.Group controlId="formBasicCheckbox1">
            <Form.Check type="checkbox" label="REBNY COVID Liability Form" />
          </Form.Group>
         
          <Form.Group controlId="formBasicCheckbox2">
            <Form.Check type="checkbox" label="REBNY COVID Health Screening Form" />
          </Form.Group>
         
          <Form.Group controlId="formBasicCheckbox3">
            <Form.Check type="checkbox" label="New York Agency Disclosure Form for Buyer and Seller" />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox4">
            <Form.Check type="checkbox" label="New York State Disclosure Form for Landlord and Tenant" />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox5">
            <Form.Check type="checkbox" label="New York State Housing Discrimination Disclosure Form" />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleCurrentState(currentState + 1)}
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
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <span>Mila Kunas</span>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <span>Tom Cruise</span>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <span>Jack Ryan</span>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <span>George Clooney</span>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <span>Morgan Freeman</span>
          </InputGroup>
          <div className="d-flex ml-auto mr-auto justify-content-center">
            <IconMenu /> Add a new client
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
