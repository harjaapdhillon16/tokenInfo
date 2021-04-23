import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns/column";
import { Container } from "react-bootstrap";
import { handleContactCreation, dr } from "../views/Contact";
import "./table.css";
import Moment from 'react-moment';


export const BasicTable = (item) => {
  console.log("values:", item.tableData);
  const data = React.useMemo(() => item.tableData, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Agent ID",
        accessor: "agentId", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
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
        Cell: props =>  <Moment format="YYYY/MM/DD">{props.value}</Moment> 
      },
      {
        Header: "Updated at",
        accessor: "updatedAt", // accessor is the "key" in the data
        Cell: props =>  <Moment format="YYYY/MM/DD">{props.value}</Moment> 
      }
      
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <Container>
      <table  className="contact-table mt-4" {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
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
      </table>
    </Container>
  );
};
