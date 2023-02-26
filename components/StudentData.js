import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Chart from "../graphs/Chart";

function StudentData() {
  const studentData = useSelector((state) => state.data.studentdata);
  const { state } = useLocation();

  const uniqueData = studentData.filter((elm) => elm.name === state);

  return (
    <div>
      <h3>Personal Chart from {state}</h3>
      <div></div>
      <Chart uniqueStudentData={uniqueData} student={state} yLabel={state} />
    </div>
  );
}
export default StudentData;
