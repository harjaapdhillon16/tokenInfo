import React, { useEffect, useState, useContext } from "react";
import { IconChecked } from "../assets/icons/icons";
import { Container, Row, Col, Card, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const FormsScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  return (
    <Container>
      <Breadcrumb className="title-bar">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">Account</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12} className="pt-5">
            <h5>Account</h5>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Row className="border-bottom py-4">
            <Col md={7}>
              <h5>Your Name</h5>
              Chris Oliver
            </Col>
            <Col md={5} className="text-right">
              <Link>
                <h6>Edit</h6>
              </Link>
            </Col>
          </Row>
          <Row className="border-bottom py-4">
            <Col md={7}>
              <h5>Email address</h5>
              chris.oliver@gmail.com
            </Col>
            <Col md={5} className="text-right">
              <Link>
                <h6>Edit</h6>
              </Link>
            </Col>
          </Row>
          <Row className="border-bottom py-4">
            <Col md={7}>
              <h5>Brokerage</h5>
              HomeDax Real Estate
            </Col>
            <Col md={5} className="text-right">
              <Link>
                <h6>Edit</h6>
              </Link>
            </Col>
          </Row>
          <Row className="border-bottom py-4">
            <Col md={7}>
              <h5>State of licensure</h5>
              New York
            </Col>
            <Col md={5} className="text-right">
              <Link>
                <h6>Edit</h6>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="pt-4">
          <Card>
          <IconChecked />
            <Card.Body>
              <Card.Title className="pt-3">
                  <h6>Confirm Account Info</h6></Card.Title>
              <Card.Text>
                Review and update your account information
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormsScreen;
