import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Navbar } from "react-bootstrap";
import { IconMenu } from "../../assets/icons/icons";
import UserIcon from "../../assets/icons/images/user-icon.png";
import { Dropdown } from "react-bootstrap";
const Header = () => {
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
        <Button className="send">Send Form</Button>
          <Dropdown>
            <Dropdown.Toggle className="drop-btn">
              <span>Chris Oliver</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="profile">
          <img src={UserIcon} fluid />
          </div>
        </div>
        </Col>
      </Row>
     );
}
 
export default Header;