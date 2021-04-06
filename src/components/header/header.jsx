import React, {useState} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Navbar } from "react-bootstrap";
import { IconMenu } from "../../assets/icons/icons";
import UserIcon from "../../assets/icons/images/user-icon.png";
import { Dropdown } from "react-bootstrap";
import { AmplifySignOut } from '@aws-amplify/ui-react';
import SendForm from "../sendForm/sendForm";
const Header = () => {
  const [formModal,setFormModal] = useState(false);
     
  const handleFormModal = (value) => {
    setFormModal(!value)
  }

    return ( 
        <Row className="header">
        <Col   className="top-head">
        <Navbar collapseOnSelect expand="lg pt-3">
        <div className="">
                <IconMenu />
        </div>
    </Navbar>
        </Col>
        <Col md={6} className="account">
          <div class=" d-flex ml-auto pt-3 p-2">
          <Button variant="outline-secondary invite mr-3">Invite</Button>
          <Button className="send" onClick={()=>handleFormModal(formModal)}>Send Form</Button>
          <Dropdown>
            <Dropdown.Toggle className="drop-btn">
              <span>Chris Oliver</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
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
        <SendForm formModal={formModal}  onHandleFormModal={handleFormModal} />
      </Row>
     );
}
 
export default Header;