import React from "react";
import { useSelector } from "react-redux";

import Students from "./Students.js";
import Chart from "../graphs/Chart";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import FilterButtons from "../graphs/Filter.js";

function Dashboard() {
  const studentData = useSelector((state) => state.data.studentdata);
  const user = useSelector((state) => state.data.loggedInStudent);

  let students = [];

  studentData.forEach((element) => {
    if (!students.includes(element.name) && element.name !== user) {
      students.push(element.name);
    }
  });

  return (
    <>
      <div>
        <p>Click on a student to see their personal chart.</p>
        <Students students={students} />
      </div>
      <div>
        <Chart />
      </div>
    </>
  );
}

export default Dashboard;
