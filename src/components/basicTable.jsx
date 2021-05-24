import React, { useMemo, useContext,useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns/column";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { handleContactCreation, dr } from "../views/Contact";
import "./table.css";
import Moment from "react-moment";
import { updateContact } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import UpdateContactForm from "../components/updateContactModal/updateContactModal";
import AppContext from "../context/appContext";
import { Link} from "react-router-dom"

export const BasicTable = ({tableData,onDeleteContact,data}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(true);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState('');

const  setOnEditContact = (item) => {
  console.log('modal open');
  console.log('editdata', item);
  setFormData(item)
  handleShow()
} 
const EditContact = async (item) => {
  try {
    const updateContact = await API.graphql(
      graphqlOperation(updateContact,item)
    );

    EditContact(updateContact.data.updateContact.item);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};
 
  return (
    <Container className="p-0">
      <Table striped bordered hover>
  <thead>
    <tr>
      {/* <th>AgentID</th> */}
      <th>Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Company Name</th>
      <th>Role in Company</th>
      <th>Type</th>
      <th>Created</th>
      <th>Last update</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map(item =>  <tr>
      {/* <td>{item.agentId}</td> */}
      <td>
      <Link to={`./ContactDetail/${item.id}`}>{item.name}</Link>
      </td>
      <td>{item.email}</td>
      <td>{item.phoneNum}</td>
      <td>{item.companyName}</td>
      <td>{item.roleInCompany}</td>
      <td>{item.type}</td>
      <td><Moment format="DD-MM-YYYY">{item.createdAt}</Moment></td>
      <td><Moment format="DD-MM-YYYY">{item.updatedAt}</Moment></td>
      <td className="d-flex">
      <Button variant="danger" className="mr-2" onClick={()=>onDeleteContact(item.id)}>Delete</Button>{' '}
      <Button
        variant="outline-secondary"
        onClick={()=>setOnEditContact(item)}
      >
        Edit
      </Button>
      </td>
    </tr> )}
  </tbody>
</Table>
<UpdateContactForm 
  show={show}
  handleClose={handleClose}
  setShow={setShow} 
  data={formData}
  editState={"true"}
/>
    </Container>
  );
};
