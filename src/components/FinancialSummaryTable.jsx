import React, { useEffect, useState } from "react";
import data from "../data/tableData.json";

const FinancialSummaryTable = () => {
  const [tableData, setTableData] = useState(data);
  useEffect(() => {
    console.log(tableData.Sheet1);
  }, []);

  return <div>FinancialSummaryTable</div>;
};

export default FinancialSummaryTable;
