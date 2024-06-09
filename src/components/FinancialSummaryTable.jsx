import React, { useState, useRef } from "react";
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
import PrintIcon from "@mui/icons-material/Print";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { useReactToPrint } from "react-to-print";

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
  const [decimalValue, setDecimalValue] = useState(2);

  const componentRef = useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (selectedcurrency) => {
    if (selectedcurrency) {
      setCurrency(selectedcurrency); //setting the currency
    }
    setAnchorEl(null);
  };

  const handleDecimalChange = (event) => {
    setDecimalValue(event.target.value);
  };

  const convertValue = (value, currency) => {
    switch (currency) {
      case "EUR":
        return value * 0.85;
      case "GBP":
        return value * 0.75;
      case "USD":
      default:
        return value;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => console.log("Print successful!"),
    onPrintError: (error) => console.log(`Print error: ${error}`),
  });

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tableData);
    const [selectedRow] = items.splice(result.source.index, 1); //removing the selected item
    items.splice(result.destination.index, 0, selectedRow); //adding the selected item

    setTableData(items);
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
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel sx={{ color: "#8a8d92" }} id="decimal">
                Decimal Value
              </InputLabel>
              <Select
                labelId="decimal"
                id="select-small"
                value={decimalValue}
                label="Decimal Value"
                onChange={handleDecimalChange}
                sx={{ color: "#8a8d92" }}
              >
                <MenuItem value={0}>ZERO</MenuItem>
                <MenuItem value={1}>ONE</MenuItem>
                <MenuItem value={2}>TWO</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <Button
              id="menu-button"
              aria-controls={open ? "currency-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                maxWidth: 120,
                backgroundColor: "white",
                color: "#8a8d92",
                border: "0.5px solid #e9edf8",
              }}
            >
              Currency
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

          <div>
            <Button
              endIcon={<PrintIcon />}
              sx={{
                maxWidth: 120,
                backgroundColor: "white",
                color: "#8a8d92",
                border: "0.5px solid #e9edf8",
              }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </div>
        </div>
      </header>

      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <TableContainer
          sx={{
            maxWidth: "100%",
            maxHeight: "calc(100vh - 250px)",
            "&::-webkit-scrollbar": {
              display: "none",
              "@media print": {
                maxWidth: "210mm",
                maxHeight: "290mm",
                margin: "20px",
              },
            },
          }}
          component={Paper}
        >
          <Table stickyHeader ref={componentRef}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <DragIndicatorIcon />
                </TableCell>
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

            <Droppable
              droppableId="rows"
              type="ROW"
              direction="horizontal"
              ignoreContainerClipping={true}
            >
              {(provided) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {tableData.map((row, index) => (
                    <Draggable
                      key={index}
                      draggableId={`row-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <TableRow
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={snapshot.isDragging ? "dragactive" : ""}
                        >
                          <TableCell {...provided.dragHandleProps}>
                            <DragIndicatorIcon />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                            }}
                          >
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
                                backgroundColor:
                                  i % 2 === 0 ? "#f9f9f9" : "inherit",
                                "@media print": {
                                  fontSize: "0.8rem",
                                },
                              }}
                            >
                              {convertValue(row[month], currency).toFixed(
                                decimalValue
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
    </div>
  );
};

export default FinancialSummaryTable;
