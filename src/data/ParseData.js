import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart2 from "../Chart2";
import Chart3 from "../Chart3";
import * as d3 from "d3";

function ParseData() {
  const storeData = useSelector((state) => state.data);

  const loading =
    storeData.length === 0 ? (
      <div>Ik bevat geen data...</div>
    ) : (
      <div>Ik bevat data!</div>
    );
  console.log(storeData);

  let Evelyn = storeData.studentdata.filter((item) => item.name === "Evelyn");
  console.log(Evelyn);

  return (
    <div>
      Ik ben het ParseData component.
      {loading}
      {/* <Chart2 data={Evelyn} /> */}
      <Chart3 data={storeData} />
    </div>
  );
}

export default ParseData;
