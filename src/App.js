import "./App.css";
import Papa from "papaparse";
import csvdata from "./data/Studenten_mock_data.csv";
import ParseData from "./data/ParseData.js";
import { useSelector, useDispatch } from "react-redux";
import { dataAdded } from "./data/dataSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.data);

  useEffect(() => {
    const newParseData = async () => {
      const loadedData = await parse();
      return loadedData;
    };
    newParseData();
  }, []);

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

  console.log("app");
  console.log(storeData);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hallo! Welkom :-D </p>
        <p></p>
        <ParseData />
      </header>
    </div>
  );
}

export default App;
