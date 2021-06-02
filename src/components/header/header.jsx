import React, { useState, useContext } from "react";
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { IconMenu } from "../../assets/icons/icons";
import UserIcon from "../../assets/icons/images/user-icon.png";
import { Dropdown } from "react-bootstrap";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import SendForm from "../sendForm/sendForm";
import InviteForm from "../InviteForm/inviteForm";
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
          <Button className="send mr-3" 
           onClick={() => handleShow()}>
            Invite
          </Button>
          <InviteForm
            show={show}
            handleClose={handleClose}
            setShow={setShow}
          />
          {/* <ShareForm
          show={show}
          handleClose={handleClose}
          setShow={setShow}
          // formData={shareFormItem}
        /> */}
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
