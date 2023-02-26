import { useDispatch } from "react-redux";
import csvdata from "./Studenten_mock_data.csv";
import * as d3 from "d3";
import { dataAdded, columnsAdded } from "./dataSlice";

function ParseData() {
  const dispatch = useDispatch();

  d3.dsv(";", csvdata)
    .then((response) => {
      let students = [];
      let assignments = [];
      let studentData = [];

      response.forEach((element) => {
        if (
          !assignments.includes(
            element["Welke opdracht of welk project lever je nu in?"]
          )
        ) {
          assignments.push(
            element["Welke opdracht of welk project lever je nu in?"]
          );
        }
        if (!students.includes(element["Wie ben je?"])) {
          students.push(element["Wie ben je?"]);
        }

        const newData = {
          name: element["Wie ben je?"],
          assignment: element["Welke opdracht of welk project lever je nu in?"],
          difficulty: element["Hoe moeilijk vond je deze opdracht?"],
          fun: element["Hoe leuk vond je deze opdracht?"],
        };
        studentData.push(newData);
      });

      let columns = [];
      const objectValues = Object.keys(studentData[0]).splice(2);
      objectValues.forEach((item) => {
        columns.push({ name: item, checked: true });
      });
      dispatch(dataAdded({ studentData, students, assignments }));
      dispatch(columnsAdded(columns));
    })
    .catch((err) => console.log(err));
}

export default ParseData;
