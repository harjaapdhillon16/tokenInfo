import React, { useEffect, useState, useContext } from "react";
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from "../assets/icons/icons"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const FormsScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, []);


  return (

    <Container>
      <Breadcrumb className="title-bar">
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="">Form</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12} className="dashboardCards pt-5">
          <div className="d-flex">
            <h5>Forms</h5>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                All Statuses
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                All clients
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                All forms
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                Most recent
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
    <Row className="w-100 border-bottom pb-3 mt-5 ">
        <Col md={5}><h6>REBNY COVID Liability Form</h6> 
        
        Mila Kunas
        </Col>
        <Col md={3} className="text-center">
          <Badge variant="secondary sent-option text-center">Sent</Badge>{' '}
        </Col>
        <Col md={4} className="text-right">
         <Button variant="outline-secondary options">View Form</Button>{' '}
         <Button variant="outline-secondary options">Reminder Sent !</Button>{' '}
         <div className="mt-4"> 
         <Button variant="outline-secondary options">Share Form</Button>{' '}
         <Button variant="outline-secondary options">Share Link</Button>{' '}
         </div>
        </Col>
      </Row>
      <Row className="w-100 border-bottom pb-3 mt-5 ">
        <Col md={5}><h6>REBNY COVID Health Screening Form</h6> 
        
        Tom Cruise
        <p>435 Fifth Avenue, Apt 4, New York, NY 10345</p>
        </Col>
        <Col md={3} className="text-center">
          <Badge variant="secondary sent-option text-center">Signed</Badge>{' '}
        </Col>
        <Col md={4} className="text-right">
         <Button variant="outline-secondary options">View Form</Button>{' '}
         <Button variant="outline-secondary options">Download PDF</Button>{' '}
         <div className="mt-4"> 
         <Button variant="outline-secondary options">Share Form</Button>{' '}
         <Button variant="outline-secondary options">Share Link</Button>{' '}
         </div>
        </Col>
      </Row>
      <Row className="w-100 border-bottom pb-3 mt-5 ">
        <Col md={5}><h6>View New York State Housing Discrim</h6> 
        
        Jack Ryan
        <p>435 Fifth Avenue, Apt 4, New York, NY 10345</p>
        </Col>
        <Col md={3} className="text-center">
          <Badge variant="secondary sent-option text-center">Viewed</Badge>{' '}
        </Col>
        <Col md={4} className="text-right">
         <Button variant="outline-secondary options">View Form</Button>{' '}
         <Button variant="outline-secondary options">Send</Button>{' '}
         <div className="mt-4"> 
         <Button variant="outline-secondary options">Share Form</Button>{' '}
         <Button variant="outline-secondary options">Share Link</Button>{' '}
         </div>
        </Col>
      </Row>
      <Row className="w-100 border-bottom pb-3 mt-5 ">
        <Col md={5}><h6>REBNY COVID Liability Form</h6> 
        
        George Clooney
        </Col>
        <Col md={3} className="text-center">
          <Badge variant="secondary sent-option text-center">Sent</Badge>{' '}
        </Col>
        <Col md={4} className="text-right">
         <Button variant="outline-secondary options">View Form</Button>{' '}
         <Button variant="outline-secondary options">Send Reminder</Button>{' '}
        </Col>
      </Row>

    </Container>

  );
};

export default FormsScreen;
