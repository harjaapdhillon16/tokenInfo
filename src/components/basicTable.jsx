import React, { useMemo } from 'react';
import {useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from "./columns/column";
import { Container } from "react-bootstrap";
import {handleContactCreation,dr} from "../views/Contact";
import './table.css'

export const BasicTable = (item) => {
    console.log('values:', item);
    const data = React.useMemo(
        () => [
          {
            col1: item.name,
            col2: 'World',
            col3: 'demo',
            col4: 'demo1',
          },
          {
            col1: 'react-table',
            col2: 'rocks',
            col3: 'dfhduvi',
            col4: 'fjgf',
          },
          {
            col1: 'whatever',
            col2: 'you want',
            col3: 'fjngjd',
            col4: 'sski',
          },
          {
            col1: 'znkf',
            col2: 'frjgir',
            col3: 'hyyyyy',
            col4: 'test',
          },
        ],
        []
      )
    
      const columns = React.useMemo(
        () => [
          {
            Header: 'Column 1',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Column 2',
            accessor: 'col2',
          },
          {
            Header: 'Column 3',
            accessor: 'col3',
          },
          {
            Header: 'Column 4',
            accessor: 'col4',
          },
        ],
        []
      )
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data},
        useFilters,
        useSortBy
        )
      
      return (
          <Container>
          
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                    <span>
+                       {column.isSorted ? (column.isSortedAsec ? '🔽' : '🔼') : ''}
+                   </span>

                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
        </table>
        </Container>
      )
}

