import React, { useMemo, useContext,useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns/column";
import { Container, Table, Button } from "react-bootstrap";
import { handleContactCreation, dr } from "../views/Contact";
import "./table.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Moment from "react-moment";
import CreateContactForm from "../components/createContactForm/createContactForm";
import AppContext from "../context/appContext";
import { Link} from "react-router-dom"

export const BasicTable = ({tableData,onDeleteContact}) => {
 
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  

  const data = React.useMemo(() => tableData, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Agent ID",
        accessor: "agentId", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: (props) => <Link to={`/contactdetail/${props.row.original.id}`}>{ props.value }</Link>
      },
      {
        Header: "Email",
        accessor: "email", // accessor is the "key" in the data
      },
      {
        Header: "Phone Number",
        accessor: "phoneNum", // accessor is the "key" in the data
      },
      {
        Header: "Company Name",
        accessor: "companyName", // accessor is the "key" in the data
      },
      {
        Header: "Role In Company",
        accessor: "roleInCompany", // accessor is the "key" in the data
      },
      {
        Header: "Type",
        accessor: "type", // accessor is the "key" in the data
      },
      {
        Header: "Created at",
        accessor: "createdAt", // accessor is the "key" in the data
        Cell: (props) => <Moment format="YYYY/MM/DD">{props.value}</Moment>,
      },
      {
        Header: "Updated at",
        accessor: "updatedAt", // accessor is the "key" in the data
        Cell: (props) => <Moment format="YYYY/MM/DD">{props.value}</Moment>,
      },
      {
        id: "delete",
        accessor: (str) => "delete",
      },
    ],
    []
  );
  // const [gridApi, setGridApi] = useState(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy);

 
  return (
    <Container className="p-0">
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>AgentID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Company Name</th>
      <th>Role in Company</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map(item =>  <tr>
      <td>{item.agentId}</td>
      <td>
      <Link to={`./ContactDetail/${item.id}`}>{item.name}</Link>
      </td>
      <td>{item.email}</td>
      <td>{item.phoneNum}</td>
      <td>{item.companyName}</td>
      <td>{item.roleInCompany}</td>
      <td>{item.type}</td>
      <td>
      <Button variant="danger"  onClick={()=>onDeleteContact(item.id)}>Delete</Button>
      <Button
                variant="outline-secondary"
                onClick={handleShow}
              >
                Edit
              </Button>
              <CreateContactForm
            show={show}
            handleClose={handleClose}
            setShow={setShow}
          />
      </td>
    </tr> )}
  </tbody>
</Table>
      {/* <Table striped bordered hover className="contact-table mt-4"
        {...getTableProps()}
        style={{ border: "solid 1px blue" }}
      >
  <thead>
  {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                 
                    background: "#f5f5f5",
                    color: "black",
                    fontWeight: "bold",
                    padding:10

                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedAsec ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
  </thead>
  <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
</tbody>
</Table> */}
    </Container>
  );
};
