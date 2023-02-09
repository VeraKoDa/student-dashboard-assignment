import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
/* import BarChart from "./graphs/BarChart"; */

function Chart2() {
  const stData = useSelector((state) => state.data.studentData);

  const [studentData, setStudentData] = useState(stData);

  console.log(studentData);

  const testdata = [
    { name: "a", number: 2, rating: 5 },
    { name: "b", number: 1, rating: 5 },
    { name: "c", number: 3, rating: 4 },
    { name: "d", number: 4, rating: 4 },
    { name: "e", number: 5, rating: 2 },
  ];
  const svgRef = useRef();

  useEffect(() => {
    const test = (input) => {
      const w = 400;
      const h = 200;
      const groups = d3.map(testdata, (d) => d.group).keys;
      const subgroups = studentData;
      console.log("data: ", studentData);

      const svg = d3 // create svg format
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", h)
        .style("overflow", "visible") // show / don't show x & y data (visible or not)
        .style("background-color", "#c6daf6")
        .style("color", "#edbc09") // text-color of x & y data
        .style("padding", 0) // background behind y-data (ticks) & x-data
        .style("margin-left", 40);

      const xScale = d3 // create the values of x & y
        .scaleBand()
        .domain(groups) // val returns value of array, i returns indexnr. of array
        .range([0, w])
        .padding([0.3]); // space between bars

      const yScale = d3
        .scaleLinear()
        .domain([0, 5] /* testdata.map((val, i) => val.number) */)
        .range([h, 0]);

      const xAxis = d3.axisBottom(xScale).ticks(0);
      const yAxis = d3.axisLeft(yScale).ticks(5); // ticks = number of values on y axis

      svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);

      svg
        .append("g")
        .call(yAxis)
        // .call((g) => g.select(".domain").remove())
        /* .call((g) => g.append("text")) */

        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("test");

      const xSubgroup = d3
        .scaleBand()
        .domain(subgroups)
        .range([0, xAxis.bandwidth()])
        .padding([0.05]);

      const color = d3.scaleOrdinal().domain(subgroups);

      svg
        .selectAll("svg")
        .data(testdata)
        .join("rect")
        .attr("x", (v, i) => xScale(v.name))
        .attr("y", (v, i) => yScale(v.number))
        .attr("width", xScale.bandwidth())
        .attr("height", (val) => h - yScale(val.number))
        .attr("fill", "darkblue")
        .attr("rx", "5");
    };
    test(testdata);
  }, [testdata]);

  return <svg ref={svgRef}></svg>;
}

export default Chart2;
