import "./App.css";
import Papa from "papaparse";
import csvdata from "./data/Studenten_mock_data.csv";
import ParseData from "./data/ParseData.js";
import Chart from "./Chart";
import Chart2 from "./Chart2";
import { useSelector, useDispatch } from "react-redux";
import { dataAdded } from "./data/dataSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  /* const storeData = useSelector((state) => state.data); */
  const [data, setdata] = useState([]);

  useEffect(() => {
    function parse() {
      const newdata = new Promise((error) => {
        Papa.parse(csvdata, {
          download: true,
          header: false,
          delimiter: `;`,
          complete: (results) => {
            dispatch(dataAdded(results.data));
          },
          error: (err) => error(err),
        });
      });
      return newdata;
    }

    const newParseData = async () => await parse();
    newParseData();
  }, []);

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
