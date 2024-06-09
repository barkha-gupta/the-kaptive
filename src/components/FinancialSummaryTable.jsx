import React, { useEffect, useState } from "react";
import data from "../data/tableData.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(0.5),
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "5px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 15,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

const FinancialSummaryTable = () => {
  const [tableData, setTableData] = useState(data.Sheet1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [currency, setCurrency] = useState("USD");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (selectedcurrency) => {
    if (selectedcurrency) {
      setCurrency(selectedcurrency); //setting the currency
    }
    setAnchorEl(null);
  };

  const convertValue = (value, currency) => {
    switch (currency) {
      case "EUR":
        return (value * 0.85).toFixed(2); // Rounding to 2 decimal places
      case "GBP":
        return (value * 0.75).toFixed(2);
      case "USD":
      default:
        return value.toFixed(2);
    }
  };

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
        <div className="actions">
          <div>
            <Button
              id="menu-button"
              aria-controls={open ? "currency-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Currency: {currency}
            </Button>
            <StyledMenu
              id="currency-menu"
              MenuListProps={{
                "aria-labelledby": "menu-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose(null)}
            >
              <MenuItem onClick={() => handleClose("USD")} disableRipple>
                <AttachMoneyIcon />
                USD
              </MenuItem>
              <MenuItem onClick={() => handleClose("EUR")} disableRipple>
                <EuroIcon />
                EUR
              </MenuItem>
              <MenuItem onClick={() => handleClose("GBP")} disableRipple>
                <CurrencyPoundIcon />
                GBP
              </MenuItem>
            </StyledMenu>
          </div>
        </div>
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
                    {convertValue(row[month], currency)}
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
