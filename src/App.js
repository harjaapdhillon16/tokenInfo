// import logo from './logo.svg';
import './App.css';
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from "./assets/icons/icons"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from "./assets/icons/images/user-icon.png";
import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
// import { AppContext } from "./context/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container fluid>
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
          <img src={Image} fluid />
          </div>
        </div>
        </Col>
      </Row>
      
      <Container>
      <Row>
        <Col md={12} className="dashboardCards pt-5">
          <h1>Chris Oliver</h1>
          <div className="d-flex">
          <h6 className="pt-1">HomeDax Real Estate</h6>
          <Dropdown>
            <Dropdown.Toggle className="drop-btn pt-0 pl-5">
             New York
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mt-4">
            <Card.Body>
              <div className="cardBoxIcon">
                < IconEmail />
              </div>
              <Card.Title>
                <h6>Clients</h6>
              </Card.Title>
              <Card.Text>
                Add clients, edit clients info and view history.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-4">
            <Card.Body>
              <div className="cardBoxIcon ">
                <IconBuilding />
              </div>
              <Card.Title>
                <h6>Forms</h6>
              </Card.Title>
              <Card.Text>
                View status, download signed forms and send reminders
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-4">
            <Card.Body>
              <div className="cardBoxIcon">
                <IconSmartphone />
              </div>
              <Card.Title>
                <h6>Account</h6>
              </Card.Title>
              <Card.Text>
                Review and update your account information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>


      </Row>

    </Container>
    </Container>
  );
}
export default App;