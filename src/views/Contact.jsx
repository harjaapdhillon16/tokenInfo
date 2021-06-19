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
import _ from "lodash";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { API, graphqlOperation } from "aws-amplify";
import { listContacts } from "../graphql/queries";
import { createContact, deleteContact } from "../graphql/mutations";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AppContext from "../context/appContext";
import CreateContactForm from "../components/createContactForm/createContactForm";
import { BasicTable } from "../components/basicTable";
import ContactDetail from "./ContactDetail";
import Loader from "../components/Loader/Loader";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [error, setError] = useState(false);
  const handleShow = () => setShow(true);

  const { contacts, agent, onUpdateContacts, onDeleteContact } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      companyName: "",
      // type:''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter valid name!"),
      email: Yup.string()
        .email("Please enter valid email!")
        .required("Please enter valid email!"),
      companyName: Yup.string().required("Please enter your company name!"),
      // type: Yup.string().required("Select the type!"),
    }),
    onSubmit: (values) => {
      handleContactCreation(values);
    },
  });

  const handleContactCreation = async (values) => {
    const data = {
      agentId: agent.id,
      name: values.name,
      email: values.email,
    };

    try {
      const createdContact = await API.graphql(
        graphqlOperation(createContact, { input: data })
      );
      console.log("createdContact", createdContact);
      const newContacts = [...contacts, createdContact.data.createContact];
      onUpdateContacts(newContacts);
      console.log("updated records", createdContact.data.createContact);
      setTableData(newContacts);
      console.log("tableData", tableData);
      setShow(false);
    } catch (err) {
      console.log(err, "Error creating contact");
    }
  };

  useEffect(() => {
    handleContact();
  }, []);

  const handleContact = async () => {
    try {
      const listContactsData = await API.graphql(
        graphqlOperation(listContacts,{ filter: { agentId: { eq: agent.id } } })
      );

      // onUpdateContacts(listContactsData.data.listContacts.items);
      setLoading(false);
    
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleDeleteContact = async (contactid) => {
    const data = {
      id: contactid,
    };

    try {
      const deleteContactData = await API.graphql(
        graphqlOperation(deleteContact, { input: data })
      );

      console.log('deleteContactData', deleteContactData.data.deleteContact);
      onDeleteContact(deleteContactData.data.deleteContact.id);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  

  const sorted = _.orderBy(
    contacts,
    [(user) => user.name.toLowerCase()],
    ["asc"]
  );
  console.log(sorted, contacts);
  if (loading) return <Loader />;
  return (
    <Container fluid className="p-0">
      <Header />
      
      <Container>
        <Breadcrumb className="title-bar">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Contacts</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="pt-4">
          <Col md={10}>
            <h5>Contacts</h5>
          </Col>
          <Col md={2}>
              <Button
                variant="outline-secondary add-contact"
                onClick={handleShow}
              >
                Add Contact
              </Button>
          </Col>

          <CreateContactForm
            show={show}
            handleClose={handleClose}
            setShow={setShow}
          />
          
        </Row>
        <BasicTable tableData={contacts} onDeleteContact ={handleDeleteContact} />
          </Container>
    </Container>
  );
};

export default Contacts;
