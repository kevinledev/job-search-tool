import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import EditableCellContainer from "./cells/editable_cell_container";
import ToggleCellContainer from "./cells/toggle_cell_container";
import LinkCellContainer from "./cells/link_cell_container";
import DateCellContainer from "./cells/date_cell_container";

function ContactsIndex(props) {
  useEffect(() => {
    props.getContacts();
  }, []);

  const data = React.useMemo(() => {
    return props.contacts, props.contacts;
  });

  const columns = React.useMemo(
    () => [
      //TODO adjust accessor naming depending on state
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: EditableCellContainer,
      },
      {
        Header: "Company",
        accessor: "company",
        Cell: EditableCellContainer,
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: EditableCellContainer,
      },
      {
        Header: "LinkedIn",
        accessor: "linkdin",
        Cell: LinkCellContainer,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: LinkCellContainer,
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: EditableCellContainer
      },
      {
        Header: "First Contacted",
        accessor: "firstContactDate",
        Cell: DateCellContainer
      },
      {
        Header: "Response",
        accessor: "responded",
        Cell: ToggleCellContainer
      },
      {
        Header: "Interview Date",
        accessor: "meetingDate",
        Cell: DateCellContainer
      },
      {
        Header: "Followed Up",
        accessor: "thanksFolowUp",
        Cell: ToggleCellContainer
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow 
  } = tableInstance;

  const removeContact = (contact) => {
    props.deleteContact(contact._id);
  }

  return (
    <div className="jobs-index-container">
      <div className="search-bar">search bar</div>
      <div onClick={() => props.openModal("createContact")}>Create a contact</div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td><button type="button" onClick={() => removeContact(row.original)}>Remove Contact</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  
}

export default ContactsIndex;
