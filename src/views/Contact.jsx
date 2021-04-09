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
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { API, graphqlOperation } from "aws-amplify";
import { listContacts } from "../graphql/queries";
import { createContact } from "../graphql/mutations";
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
    <Container>
      <Breadcrumb className="title-bar">
        <Breadcrumb.Item>
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
            <Button
              variant="outline-secondary add-contact"
              onClick={handleShow}
            >
              Add Contact
            </Button>
          </div>
        </Col>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center m-auto">
              Add New Contact
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <Form.Control
                className="mb-3"
                name="name"
                value={formik.values.name}
                type="text"
                placeholder="Enter your name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <Form.Text className="text-error">
                  {formik.errors.name}
                </Form.Text>
              )}

              <Form.Control
                className="mb-3"
                name="email"
                value={formik.values.email}
                type="text"
                placeholder="Enter your valid email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <Form.Text className="text-error">
                  {formik.errors.email}
                </Form.Text>
              )}
              <div>
                <Form.Control
                  className="mb-3"
                  name="companyName"
                  value={formik.values.companyName}
                  type="text"
                  placeholder="Company name (optional)"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <Form.Text className="text-error">
                    {formik.errors.companyName}
                  </Form.Text>
                )}
              </div>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select">
                  <option>Buyer</option>
                  <option>Agent</option>
                  <option>Seller</option>
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="m-auto px-5"
                type="submit"
                disabled={
                  !(
                    formik.isValid &&
                    formik.dirty
  
                  )                }
              >
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Row>
      <Table bordered hover className="contact-table mt-4">
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
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
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
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
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
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
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
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
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
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
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
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(item =>
          <tr>
          <td>
            <Form.Check className="check-head"></Form.Check>
          </td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>9175527895</td>
          <td>Smith & Wesson</td>
          <td>Director</td>
          <td>Buyer</td>
          <td>8/1/2020</td>
          <td>3/31/2021</td>
        </tr>
            )}
         
        </tbody>
      </Table>
    </Container>
  );
};

export default FormsScreen;
