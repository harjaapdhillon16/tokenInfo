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
  const { contacts,agent, onEditContact } = useContext(AppContext);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      id:data.id,
      name: data.name,
      email: data.email,
      companyName: data.companyName,
      phoneNum: data.phoneNum,
      roleInCompany: data.roleInCompany,
      // agentId: data.agentId,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter valid name!"),
      email: Yup.string()
        .email("Please enter valid email!")
        .required("Please enter valid email!"),
      phoneNum: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "to short")
      .max(10, "to long"),
      // roleInCompany: Yup.string().required("Your role in Company"),
      // agentId: Yup.string().required("Enter your valid agent id"),
      
    }),
    onSubmit: (values) => {
      handleContactCreation({values});
    },
  });

  const handleContactCreation = async (values) => {


    console.log("edit values",values);
    
    const updateData = {
      id: data.id,
      agentId: agent.id,
      name: values.values.name,
      email: values.values.email,
      phoneNum: values.values.phoneNum,
      roleInCompany: values.values.roleInCompany,
      companyName: values.values.companyName,
    };
    
    console.log('values', updateData);
    


  try {
    const editContacts = await API.graphql(
      graphqlOperation(updateContact, { input: updateData })
    );
    console.log("editContacts afte hit",editContacts);
       let listcontacts = [...contacts];
       const index = listcontacts.findIndex(function (item){
      if(item.id === editContacts.data.updateContact.id){
        return item;
      }
    })
    listcontacts[index] = editContacts.data.updateContact;
    // console.log("after update the ",listcontacts);
    onEditContact(listcontacts);

    // let i =  contacts.findIndex(contact => contact.id = editContacts.data.updateContact.id);
    // console.log(i);
    // console.log(console[i]);

    //  onEditContact(editContacts.data.updateContact)



    // if(updateData.id === editContacts.data.updateContact.id){
    // const updateContacts = [...contacts, editContacts.data.updateContact];
    //   console.log('updateContacts', updateContacts);
      
    // }
    
    setShow(false);
  } catch (err) {
    console.log(err, "Error updating contact"); 
  }
};
 
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center m-auto">
          Edit Contact
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
            {formik.touched.name && formik.errors.name && (
              <Form.Text className="text-error">{formik.errors.name}</Form.Text>
            )}
            <Form.Control
              className="mb-3"
              name="name"
              value={formik.values.name}
              type="text"
              placeholder="Enter your name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            


          {/* {formik.touched.agentId && formik.errors.agentId && (
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
          /> */}
          {formik.touched.email && formik.errors.email && (
            <Form.Text className="text-error">{formik.errors.email}</Form.Text>
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
          {formik.touched.phoneNum && formik.errors.phoneNum && (
            <Form.Text className="text-error">
              {formik.errors.phoneNum}
            </Form.Text>
          )}
          <Form.Control
            className="mb-3"
            name="phoneNum"
            value={formik.values.phoneNum}
            type="number"
            placeholder="Enter your valid phone number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              name="roleInCompany"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.roleInCompany}
            >
              <option>Select</option>
              <option>Buyer</option>
              <option>Agent</option>
              <option>Seller</option>
              <option>Landlord</option>
              <option>Tenant</option>
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
