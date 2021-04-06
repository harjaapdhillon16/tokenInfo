import React, { useEffect, useState, useContext } from "react";
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from "../assets/icons/icons"
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";

const FormsScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, []);


  return (

    <Container>
      <Breadcrumb className="title-bar">
        <Breadcrumb.Item >
        <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Contacts</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="pt-4">
        <Col md={6}>
        <h5>Contacts</h5>
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-center">
           <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Search" />
            </Form.Group>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn px-4">
               Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="outline-secondary add-contact">Add Contact</Button>
          </div>
        </Col>
      </Row>
      <Table  bordered hover className="contact-table mt-4">
  <thead>
    <tr>
      <th>
        <Form.Check className="check-head"></Form.Check>
      </th>
      <th>
      <Dropdown>
              <Dropdown.Toggle className="drop-btn px-4">
               Name
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
        </th>
      <th>Email</th>
      <th>Phone</th>
      <th>
      <Dropdown>
              <Dropdown.Toggle className="drop-btn px-4">
               Company
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </th>
      <th>
      <Dropdown>
              <Dropdown.Toggle className="drop-btn px-4">
              Title
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </th>
      <th>
      <Dropdown>
              <Dropdown.Toggle className="drop-btn px-4">
               Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </th>
      <th>
      <Dropdown>
              <Dropdown.Toggle className="drop-btn px-4">
               Created
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </th>
      <th>
      <Dropdown>
              <Dropdown.Toggle className="drop-btn px-4">
               Last Update
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
      <Form.Check className="check-head"></Form.Check>
      </td>
      <td>John Smith</td>
      <td>john@smith.com</td>
      <td>9175527895</td>
      <td>Smith & Wesson</td>
      <td>Director</td>
      <td>Buyer</td>
      <td>8/1/2020</td>
      <td>3/31/2021</td>
    </tr>
    <tr>
      <td>
      <Form.Check className="check-head"></Form.Check>
      </td>
      <td>Jane Smith</td>
      <td>jane@smith.com</td>
      <td>9175527495</td>
      <td>Elliman</td>
      <td>Licensed</td>
      <td>Agent</td>
      <td>8/2/2020</td>
      <td>3/30/2021</td>
    </tr>
    <tr>
      <td>
      <Form.Check className="check-head"></Form.Check>
      </td>
      <td>Dorian Gra</td>
      <td>dorian@smith.com</td>
      <td>9175521895</td>
      <td>CVX Intl</td>
      <td>Analyst</td>
      <td>Seller</td>
      <td>11/1/2020</td>
      <td>3/29/2021</td>
    </tr>
  
  </tbody>
</Table>
    

    </Container>

  );
};

export default FormsScreen;
