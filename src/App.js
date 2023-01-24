import "./App.css";
import Papa from "papaparse";
import csvdata from "./Studenten_mock_data.csv";

/* let students; */

function App() {
  let csv = [];
  Papa.parse(csvdata, {
    download: true,
    header: true,
    delimiter: `;`,
    complete: (input) => {
      input.data.forEach((item) => csv.push(item));
    },
  });
  console.log(csv);
  const key = "Wie ben je?";
  const students = [...new Map(csv.map((item) => [item[key], item])).values()];
  console.log(students);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hallo! Welkom :-D </p>
        <p></p>
      </header>
    </div>
  );
}

export default App;
