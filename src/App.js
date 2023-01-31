import "./App.css";
import Papa from "papaparse";
import csvdata from "./data/Studenten_mock_data.csv";
import ParseData from "./data/ParseData.js";
import { useSelector, useDispatch } from "react-redux";
import { dataAdded } from "./data/dataSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  /* const storeData = useSelector((state) => state.data); */
  /* console.log(storeData); */

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
