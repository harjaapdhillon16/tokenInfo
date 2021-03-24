import logo from './logo.svg';
import './App.css';
import { IconBuilding, IconEmail, IconSmartphone } from "./assets/icons/icons"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { AppContext } from "./context/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container>
      <Row className="header">
        <Col md={6}>
          Hamburger menu
        </Col>
        <Col md={6} className="account">
        <Button variant="primary">Primary</Button>
          <Dropdown>
            <Dropdown.Toggle className="drop-btn">
              Chris Oliver
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="dashboardCards pt-5">
          <h1>Chris Oliver</h1>
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
  );
}

export default App;
// style={{ color: "white", background: "silver" }}
