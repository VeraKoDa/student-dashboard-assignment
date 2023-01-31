import React, { useState } from "react";
import Papa from "papaparse";
import { useSelector, useDispatch } from "react-redux";
import csvdata from "./Studenten_mock_data.csv";
import { dataAdded } from "./dataSlice";

function ParseData(props) {
  const dispatch = useDispatch();

  function parse() {
    const newdata = new Promise((error) => {
      Papa.parse(csvdata, {
        download: true,
        header: false,
        delimiter: `;`,
        complete: (results) => {
          console.log(results.data);
          dispatch(dataAdded(results.data));
        },
        error: (err) => error(err),
      });
    });
    return newdata;
  }
  const newParseData = async () => {
    const loadedData = await parse();
    return loadedData;
  };

  newParseData();

  return <div>Ik ben het ParseData component</div>;
}

export default ParseData;
