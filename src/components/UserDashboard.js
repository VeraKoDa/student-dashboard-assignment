import React from "react";

import { useSelector } from "react-redux";
import Chart from "../graphs/Chart";

function UserDashboard() {
  const user = useSelector((state) => state.data.loggedInStudent);
  const studentData = useSelector((state) => state.data.studentdata);

  const uniqueData = studentData.filter((elm) => elm.name === user);

  return (
    <>
      <div>
        <h3>Dashboard van {user}</h3>
        <div></div>
        <Chart uniqueStudentData={uniqueData} student={user} yLabel={user} />
      </div>
    </>
  );
}

export default UserDashboard;
