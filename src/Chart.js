import React, { Component, useRef } from "react";
import { useEffect } from "react";
import * as d3 from "d3";

function Chart() {
  const grafiek = useRef();

  const testdata = [
    { name: "a", number: 2, rating: 5 },
    { name: "b", number: 1, rating: 5 },
    { name: "c", number: 3, rating: 4 },
    { name: "d", number: 4, rating: 4 },
    { name: "e", number: 5, rating: 2 },
  ];

  const test = testdata.columns;
  console.log(test);

  useEffect(() => {
    console.log("in useEffect");
  });

  return (
    <>
      <svg ref={grafiek}>Testing Refs</svg>
    </>
  );
}

export default Chart;
