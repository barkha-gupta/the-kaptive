import React, { useEffect, useState } from "react";
import data from "../data/tableData.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FinancialSummaryTable = () => {
  const [tableData, setTableData] = useState(data.Sheet1);

  const columnData = [
    "Cashflow",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <h2>Financial Summary Table</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columnData.map((colName, i) => (
                <TableCell key={i}>{colName}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Overhead}</TableCell>
                <TableCell align="right">{row.Jan.toFixed(2)}</TableCell>
                <TableCell align="right">{row.Feb.toFixed(2)}</TableCell>
                <TableCell align="right">{row.March.toFixed(2)}</TableCell>
                <TableCell align="right">{row.April.toFixed(2)}</TableCell>
                <TableCell align="right">{row.May.toFixed(2)}</TableCell>
                <TableCell align="right">{row.June.toFixed(2)}</TableCell>
                <TableCell align="right">{row.July.toFixed(2)}</TableCell>
                <TableCell align="right">{row.August.toFixed(2)}</TableCell>
                <TableCell align="right">{row.September.toFixed(2)}</TableCell>
                <TableCell align="right">{row.October.toFixed(2)}</TableCell>
                <TableCell align="right">{row.November.toFixed(2)}</TableCell>
                <TableCell align="right">{row.December.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FinancialSummaryTable;
