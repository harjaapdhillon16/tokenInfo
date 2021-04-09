import React, { useState, useContext } from "react";
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { IconMenu } from "../../assets/icons/icons";
import UserIcon from "../../assets/icons/images/user-icon.png";
import { Dropdown } from "react-bootstrap";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import SendForm from "../sendForm/sendForm";
import AppContext from "../../context/appContext";
const Header = () => {
  const { user } = useContext(AppContext);
  const [formModal, setFormModal] = useState(false);

  const handleFormModal = (value) => {
    setFormModal(!value);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row className="header">
      <Col className="top-head">
        <Navbar collapseOnSelect expand="lg pt-3">
          <div className="">
            <IconMenu />
          </div>
        </Navbar>
      </Col>
      <Col md={6} className="account">
        <div class=" d-flex ml-auto pt-3 p-2">
          <Button variant="outline-secondary invite mr-3" onClick={handleShow}>
            Invite
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
              <h4>Share an invite link to use CribFox</h4>
              <p>Convenient web link you can share via messaging.</p>
              <InputGroup className="mb-2">
              <FormControl id="inlineFormInputGroup" placeholder="agent.cribfox.com/invite/chris_oliver" />
              <InputGroup.Prepend>
                  <InputGroup.Text><a href="#">Copy</a></InputGroup.Text>
              </InputGroup.Prepend>
               </InputGroup>
               <div className="border-top mt-4 pt-3">
               <h4>Invite a fellow agent by email</h4>
              <p>Save inbox space by having your counterparts use CribFox with their clients.</p>
              <InputGroup className="mb-2">
              <FormControl id="inlineFormInputGroup" placeholder="Email address(es), separated by commas" />
              <InputGroup.Prepend>
                  <InputGroup.Text><a href="#">Send</a></InputGroup.Text>
              </InputGroup.Prepend>
               </InputGroup>
               </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          <Button className="send" onClick={() => handleFormModal(formModal)}>
            Send Form
          </Button>
          <Dropdown>
            <Dropdown.Toggle className="drop-btn">
              <span>{user.attributes.email}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{user.username}</Dropdown.Item>
              <Dropdown.Item>
                <div className="signout-btn">
                  <AmplifySignOut />
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="profile">
            <img src={UserIcon} fluid />
          </div>
        </div>
      </Col>
      <SendForm formModal={formModal} onHandleFormModal={handleFormModal} />
    </Row>
  );
};

export default Header;
