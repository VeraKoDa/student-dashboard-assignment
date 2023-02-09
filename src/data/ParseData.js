import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useSelector, useDispatch } from "react-redux";
import csvdata from "./Studenten_mock_data.csv";
import { dataAdded } from "./dataSlice";
import Chart from "../Chart";
import Chart2 from "../Chart2";
import Chart3 from "../Chart3";

function ParseData(props) {
  return (
    <div>
      Ik ben het ParseData component.
      <br />
      <Chart />
      <Chart2 />
      {/* <Chart3 /> */}
    </div>
  );
}

export default ParseData;
