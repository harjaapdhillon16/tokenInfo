import React, { useEffect, useState, useContext } from "react";
import {
  IconBuilding,
  IconEmail,
  IconSmartphone,
  IconMenu,
} from "../assets/icons/icons";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Header from "../components/header/header";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { listFormDatas } from "../graphql/queries";

const FormsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [formsData,setFormsData] = useState([])

  useEffect(() => {
    handleFormsData();
  }, []);

  const handleFormsData = async () => {
    try {
      const  newFormsData = await API.graphql(
        graphqlOperation(listFormDatas)
      );
        
      setFormsData(newFormsData.data.listFormDatas.items)
      console.log(newFormsData.data.listFormDatas.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Header />
      <Container>
        <Breadcrumb className="title-bar">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Form</Breadcrumb.Item>
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
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                  All clients
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                  All forms
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                  Most recent
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
    {formsData.map(item =>  <Row className="w-100 border-bottom pb-3 mt-5 ">
          <Col md={5}>
            <h6>{item.formName}</h6>

            <Link to="#">Mila Kunas</Link>
          </Col>
          <Col md={3} className="text-center">
            <Badge variant="secondary sent-option text-center">Sent</Badge>{" "}
            <p style={{ fontSize: 13 }}>1 min ago</p>
          </Col>
          <Col md={4} className="text-right">
            <Button variant="outline-secondary options">View Form</Button>
            <Button variant="outline-secondary options">Reminder Sent </Button>
          </Col>
        </Row>
        )}
          </Container>
    </Container>
  );
};

export default FormsScreen;
