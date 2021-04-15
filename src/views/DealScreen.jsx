import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import * as Yup from "yup";
import Badge from "react-bootstrap/Badge";
import Header from "../components/header/header";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { API, graphqlOperation } from "aws-amplify";
import { listContacts } from "../graphql/queries";
import { createContact } from "../graphql/mutations";
import {IconGears} from "../assets/icons/icons";
 import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AppContext from "../context/appContext"


const FormsScreen = () => {
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [error, setError] = useState(false);
  const handleShow = () => setShow(true);

  const { contacts, onUpdateContacts} = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      companyName: "",
      // type:''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter valid name!"),
      email: Yup.string().email("Please enter valid email!").required("Please enter valid email!"),
      companyName: Yup.string().required("Please enter your company name!"),
      // type: Yup.string().required("Select the type!"),
    }),
    onSubmit: (values) => {
      handleContactCreation(values)

    },
  });

  const handleContactCreation = async (values) => {
  
    const data = {
      agentId:"1",
      name:values.name,
      email:values.email
    }
    try {
      const createdContact = await API.graphql(
       graphqlOperation(createContact, { input: data })  );
       const newContacts = [...contacts,createdContact.data.createContact]
       onUpdateContacts(newContacts)
       console.log(createdContact.data.createContact);
       
    } catch (err) {
      console.log(err,"Error creating contact");
    }

  }

  useEffect(() => {
    handleContact();
  }, []);

  const handleContact = async () => {
    try {
      const listContactsData = await API.graphql(graphqlOperation(listContacts));
      console.log(listContactsData.data.listContacts.items);
      onUpdateContacts(listContactsData.data.listContacts.items)
    
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container fluid className="px-0">
      <Header />
    <Container>
      <Breadcrumb className="title-bar">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Deals</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="pt-4">
        <Col md={6} className="align-items-center col-md-6 d-flex">
          <h5 className="mr-3">Deals</h5>
          <IconGears />
          <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                2021
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Col>
        <Col md={6}>
            <Row>
                <Col md={6} className="deal-right"> 
                <ul>
                    <li>Deals Closed: 4</li>
                    <li>Closed PnL: $40,000</li>
                    <li>Closed earnings: $20,000</li>
                </ul>
                </Col>
                <Col md={6} className="deal-right">
                <ul>
                    <li>Contract PnL: $20,000</li>
                    <li>Offer Accepted PnL: $10,000</li>
                    <li>Active PnL: $120,000</li>
                </ul>
                </Col>
            </Row>
        </Col>
    </Row>
      <Table bordered hover className="deals-form mt-4">
        <thead>
          <tr>
            <th>
              <Form.Check className="check-head"></Form.Check>
            </th>
            <th>Clients</th>
            <th>Property</th>
            <th>Deal type</th>
            <th>Price ($)</th>
            <th>Fee (%)</th>
            <th>PnL($)</th>
            <th>Split($)</th>
            <th>Status</th>
            <th>Disclosure</th>
            <th>Expiry</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>
            <Form.Check className="check-head"></Form.Check>
          </td>
            <td>[John S]</td>
            <td>[865 Uni]</td>
            <td>Seller</td>
            <td>1,000,000</td>
            <td>3%</td>
            <td>30,000</td>
            <td>15000</td>
            <td>Contract</td>
            <td>Done</td>
            <td>6/1/21</td>
            <td>3/29 He sa</td>
        </tr>
        <tr>
          <td>
            <Form.Check className="check-head"></Form.Check>
          </td>
            <td>[Bob Sm]</td>
            <td>[945 Wall]</td>
            <td>Seller</td>
            <td>1,000,000</td>
            <td>1%</td>
            <td>10,000</td>
            <td>7,500</td>
            <td>Offer Ac</td>
            <td>Done</td>
            <td>6/1/21</td>
            <td>3/29 He sa</td>
        </tr>
         
        </tbody>
      </Table>
    </Container>
    </Container>
  );
};

export default FormsScreen;
