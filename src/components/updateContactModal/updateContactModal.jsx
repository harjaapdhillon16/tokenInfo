import React, { useEffect, useState, useContext } from "react";

import { IconPlus } from "../../assets/icons/icons";
import {
  Container,
  Modal,
  InputGroup,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import AppCard from "../card/card";
import Header from "../header/header";
import AppContext from "../../context/appContext";
import { API, graphqlOperation } from "aws-amplify";
import { listContacts } from "../../graphql/queries";
import { createContact, updateContact } from "../../graphql/mutations";
import { useFormik } from "formik";
import * as Yup from "yup";


const UpdateContactForm = ({ show, handleClose, setShow, data }) => {
  console.log('editdata:', data);
  const { contacts, onEditContact } = useContext(AppContext);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      id:data.id,
      name: data.name,
      email: data.email,
      companyName: data.companyName,
      phoneNum: data.phoneNum,
      roleInCompany: data.roleInCompany,
      agentId: data.agentId,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter valid name!"),
      email: Yup.string()
        .email("Please enter valid email!")
        .required("Please enter valid email!"),
      phoneNum: Yup.string()
      .required("Enter your valid phone number!")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "to short")
      .max(10, "to long"),
      roleInCompany: Yup.string().required("Your role in Company"),
      agentId: Yup.string().required("Enter your valid agent id"),
      
    }),
    onSubmit: (values) => {
      handleContactCreation({values});
    },
  });

  const handleContactCreation = async (values) => {
    
    // const updateData = {
    //   id: data.id,
    //   agentId: values.agentId,
    //   name: values.name,
    //   email: values.email,
    //   phoneNum: values.phoneNum,
    //   roleInCompany: values.roleInCompany,
    //   companyName: values.companyName,
    // };
    console.log(values);


  try {
    const editContacts = await API.graphql(
      graphqlOperation(updateContact, { input: values })
    );
    console.log('editContacts', editContacts);
    // if(updateData.id === editContacts.id){
    //   const updateContacts = [...contacts, editContacts.data.updateContact];
    // }
    // const updateContacts = [...contacts, editContacts.data.updateContact];
    // console.log('updateContacts', updateContacts);

    // onEditContact(updateContacts);
    // console.log(editContacts.data.updateContact);
    // setShow(false);
  } catch (err) {
    console.log(err, "Error updating contact"); 
  }
};
 
  return (
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
              <Form.Text className="text-error">{formik.errors.name}</Form.Text>
            )}


          {formik.touched.agentId && formik.errors.agentId && (
            <Form.Text className="text-error">
              {formik.errors.agentId}
            </Form.Text>
          )}
          <Form.Control
            className="mb-3"
            name="agentId"
            value={formik.values.agentId}
            type="text"
            placeholder="Enter agent id"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

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
            <Form.Text className="text-error">{formik.errors.email}</Form.Text>
          )}

          <div>
            <Form.Control
              className="mb-3"
              name="companyName"
              value={formik.values.companyName}
              type="text"
              placeholder="Company name (optional)"
              onChange={formik.handleChange}
            />
          </div>

          <Form.Control
            className="mb-3"
            name="phoneNum"
            value={formik.values.phoneNum}
            type="number"
            placeholder="Enter your valid phone number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.phoneNum && formik.errors.phoneNum && (
            <Form.Text className="text-error">
              {formik.errors.phoneNum}
            </Form.Text>
          )}

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              name="roleInCompany"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.roleInCompany}
            >
              <option>Buyer</option>
              <option>Agent</option>
              <option>Seller</option>
            </Form.Control>
          </Form.Group>
          {formik.touched.roleInCompany && formik.errors.roleInCompany && (
            <Form.Text className="text-error">
              {formik.errors.roleInCompany}
            </Form.Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="m-auto px-5"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateContactForm;
