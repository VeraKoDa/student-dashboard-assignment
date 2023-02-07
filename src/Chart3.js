import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BarChart from "./graphs/BarChart";

function Chart3(data) {
  const studentData = useSelector((state) => state.data);
  const testData = [
    { name: "Evelyn", assignment: "SCRUM", difficulty: "3", fun: "4"},
{ name: "Evelyn", assignment: "W1D1-1", difficulty: "3",  fun: "3" },
 { name: "Evelyn", assignment: "W1D2-1", difficulty: "1",  fun: "5" },
 { name: "Evelyn", assignment: "W1D2-2", difficulty: "1",  fun: "4"},
     { name: "Evelyn", assignment: "W1D2-3", difficulty: "2",  fun: "4" },
     { name: "Evelyn", assignment: "W1D2-4", difficulty: "3", fun: "2" },
     { name: "Evelyn", assignment: "W1D2-5", difficulty: "3", fun: "1" },
 ]
  // const dataWithoutHeader = studentData.slice(1);
  // let test = FileAttachment("us-population-state-age.csv").csv({ typed: true });
  const svgRef = useRef();
  console.log(studentData[0]);
  // Copyright 2021 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/grouped-bar-chart
  function GroupedBarChart(
    data,
    {
      x = (d, i) => {
        console.log(d, i)
       return i}, // given d in data, returns the (ordinal) x-value
      y = (d) => d, // given d in data, returns the (quantitative) y-value
      z = () => 1, // given d in data, returns the (categorical) z-value
      title, // given d in data, returns the title text
      marginTop = 30, // top margin, in pixels
      marginRight = 0, // right margin, in pixels
      marginBottom = 30, // bottom margin, in pixels
      marginLeft = 40, // left margin, in pixels
      width = 640, // outer width, in pixels
      height = 400, // outer height, in pixels
      xDomain, // array of x-values
      xRange = [marginLeft, width - marginRight], // [xmin, xmax]
      xPadding = 0.1, // amount of x-range to reserve to separate groups
      yType = d3.scaleLinear, // type of y-scale
      yDomain, // [ymin, ymax]
      yRange = [height - marginBottom, marginTop], // [ymin, ymax]
      zDomain, // array of z-values
      zPadding = 0.05, // amount of x-range to reserve to separate bars
      yFormat, // a format specifier string for the y-axis
      yLabel, // a label for the y-axis
      colors = d3.schemeTableau10, // array of colors
    } = {}
  ) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
    console.log(X, Y, Z);
    // Compute default domains, and unique the x- and z-domains.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    if (zDomain === undefined) zDomain = Z;
    xDomain = new d3.InternSet(xDomain);
    zDomain = new d3.InternSet(zDomain);

    // Omit any data not present in both the x- and z-domain.
    const I = d3
      .range(X.length)
      .filter((i) => xDomain.has(X[i]) && zDomain.has(Z[i]));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
    const xzScale = d3
      .scaleBand(zDomain, [0, xScale.bandwidth()])
      .padding(zPadding);
    const yScale = yType(yDomain, yRange);
    const zScale = d3.scaleOrdinal(zDomain, colors);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = (i) => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, (d) => d);
      const T = title;
      title = (i) => T(O[i], i, data);
    }

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel)
      );

    const bar = svg
      .append("g")
      .selectAll("rect")
      .data(I)
      .join("rect")
      .attr("x", (i) => xScale(X[i]) + xzScale(Z[i]))
      .attr("y", (i) => yScale(Y[i]))
      .attr("width", xzScale.bandwidth())
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      .attr("fill", (i) => zScale(Z[i]));

    if (title) bar.append("title").text(title);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    return Object.assign(svg.node(), { scales: { color: zScale } });
  }

  useEffect(() => {
    let ratingSlice = { name: "Wie ben je?", assignment: "Welke opdracht of welk project lever je nu in?", difficulty: "Hoe moeilijk vond je deze opdracht?", fun: "Hoe leuk vond je deze opdracht?"}

    let ratingValues = Object.values(ratingSlice).slice(2);
    let ratingObjects = Object.keys(ratingSlice).slice(2);
    console.log(ratingValues, ratingObjects);

    svgRef.current = GroupedBarChart(testData, {
      x: (d) => d.assignment,
      y: (d) => d.difficulty,
      z: () => ratingObjects,
      // xDomain: d3.groupSort(ratingObjects, D => d3.sum(D, d => -D)),
      /*yFormat: "%", */
      yLabel: "rating",
      height: 500,
      colors: d3.schemeSpectral[ratingValues.length],
      title: "testje",
      zDomain: ratingValues,
    });
    /* console.log(chart); */
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default Chart3;
