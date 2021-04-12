import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { IconPlus } from "../assets/icons/icons";



const FormsScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, []);

  
  
  const formik = useFormik({
    initialValues: {
     // hotelPolicyUrl: hotel.hotelPolicyUrl,
    },
    // validationSchema: Yup.object({
    //   hotelPolicyUrl: Yup.string().url("Please enter valid URL!"),
    // }),
    onSubmit: (values) => {
      //updateHotelProperty(values);
    },
  });


  return (

    <Container>
      <Breadcrumb className="title-bar">
        <Breadcrumb.Item >
        <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Feedback</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12} className="dashboardCards pt-5">
          <div className="d-flex">
            <h5>Feedback</h5>
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
                All Clients
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                All Deal Types
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                Most Recent
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
        <Col md={5}><h6>[865 United Nations Plaza #5D]</h6> 
        <p>[John Smith]</p>
        
        Seller
        </Col>
        <Col md={3} className="text-center">
        {/* <Form.Control as="select">
        <option>Default select</option>
        </Form.Control> */}
          <Badge variant="secondary sent-option text-center">Updated</Badge>{' '}
        </Col>
        <Col md={4} className="text-right">
         <Button variant="outline-secondary options">View</Button>{' '}
         <Button variant="outline-secondary options">Share</Button>{' '}
        </Col>
      </Row>
      <Row className="w-100 border-bottom pb-3 mt-5 ">
        <Col md={5}><h6>815 Greenwich Street #PH5D</h6> 
        <p>Dylan Hofferman</p>
        
        Seller
        </Col>
        <Col md={3} className="text-center">
          <Badge variant="secondary sent-option text-center">Closed</Badge>{' '}
        </Col>
        <Col md={4} className="text-right">
         <Button variant="outline-secondary options">View</Button>{' '}
         <Button variant="outline-secondary options">Share</Button>{' '}
        </Col>
      </Row>
      <Row className="w-100 border-bottom pb-3 mt-5 ">
        <Col md={5}><h6>35-35 75th Street #403</h6> 
        
        <p>Mila Kunas, Tom Cruise</p>
        Landlord
        </Col>
        <Col md={3} className="text-center">
          <Badge variant="secondary sent-option text-center">Dead</Badge>{' '}
        </Col>
        <Col md={4} className="text-right">
         <Button variant="outline-secondary options">View</Button>{' '}
         <Button variant="outline-secondary options">Share</Button>{' '}
        </Col>
      </Row>
      <div className="d-flex ml-auto mr-auto justify-content-center add-client mt-4">
          <a href="#">
            <IconPlus /> Add a new client
        </a>
          </div>

    </Container>

  );
};

export default FormsScreen;
