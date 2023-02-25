import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInChanged } from "../data/dataSlice";

export default function Login(props) {
  const [student, setStudent] = useState();
  const dispatch = useDispatch();

  const selectName = props.studentnames.map((name) => {
    return (
      <option key={name} value={name}>
        {name}
      </option>
    );
  });

  return (
    <>
      {/* {<div>Selecteer je naam om verder te gaan</div>} */}
      <div className="loginDiv">
        Choose your name to login: <br />
        <select
          value="students"
          id="selectStudent"
          onChange={(e) => {
            setStudent(e.target.value);
            dispatch(loggedInChanged({ bool: true, name: e.target.value }));
          }}
        >
          <option key="choose" value="choose"></option>
          {selectName}
        </select>
        {typeof student === "string" ? (
          <div className="welkom"> Welkom {student}!</div>
        ) : null}
      </div>
    </>
  );
}
