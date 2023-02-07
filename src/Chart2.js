import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useSelector } from "react";
/* import BarChart from "./graphs/BarChart"; */

function Chart2(data) {
  const testdata = [1, 2, 3, 4, 5];
  const svgRef = useRef();

  useEffect(() => {
    const test = (input) => {
      const w = 800;
      const h = 200;
      const svg = d3 // create svg format
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", h)
        .style("overflow", "visible") // show / don't show x & y data (visible or not)
        .style("background-color", "#c6daf6")
        .style("color", "#edbc09") // text-color of x & y data
        .style("padding", 0) // background behind y-data (ticks) & x-data
        .style("margin-left", 50);

      const xScale = d3 // create the values of x & y
        .scaleBand()
        .domain(data.data.map((val, i) => i)) // val returns value of array, i returns indexnr. of array
        .range([0, w])
        .padding([0.3]); // space between bars

      const yScale = d3.scaleLinear().domain([0, 5]).range([h, 10]);

      const xAxis = d3.axisBottom(xScale).ticks(data.data.length);
      const yAxis = d3.axisLeft(yScale).ticks(5); // ticks = number of values on y axis


      svg   // voeg x-as toe
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${h})`);
      svg // voeg y-as toe
        .append("g")
        .call(yAxis)
        .call((g) => {
          g.append("text")
          .attr("x", -50)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("test")
        })
        
      svg
        .selectAll("svg")
        .data(data.data)
        .join("rect")
        .attr("x", (v, i) => xScale(i))
        .attr("y", (v, i) => yScale(v.difficulty))
        .attr("width", xScale.bandwidth())
        .attr("height", (val) => h - yScale(val.difficulty))
        .attr("fill", "darkblue");
        
    };
    test(data);
  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default Chart2;
