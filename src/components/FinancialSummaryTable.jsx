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
    <div className="container">
      <header>
        <h2>Financial Summary Table</h2>
      </header>
      <TableContainer
        sx={{
          maxWidth: "1235px",
          maxHeight: "565px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columnData.map((colName, i) => (
                <TableCell
                  sx={{
                    backgroundColor: "#d2ddf3",
                    color: "#1e1f91",
                    fontWeight: "700",
                    borderTop: "0.5px solid #e9edf8",
                    borderBottom: "0.5px solid #e9edf8",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                  key={i}
                >
                  {colName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ minWidth: "180px", fontWeight: 600 }}>
                  {row.Overhead}
                </TableCell>
                {[
                  "Jan",
                  "Feb",
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
                ].map((month, i) => (
                  <TableCell
                    key={month}
                    sx={{
                      border: "1px solid ##f1f1f1",
                      minWidth: "150px",
                      backgroundColor: i % 2 === 0 ? "#f9f9f9" : "inherit",
                    }}
                  >
                    {row[month].toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FinancialSummaryTable;
