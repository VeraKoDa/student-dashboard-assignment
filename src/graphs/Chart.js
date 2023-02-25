import React from "react";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FilterButtons from "./Filter";

function Chart2(props) {
  const { uniqueStudentData, student } = props;
  const { studentdata, columns, assignments } = useSelector(
    (state) => state.data
  );

  const newColumns = columns
    .filter((item) => item.checked === true)
    .map((item) => item.name);

  const svgRef = useRef();
  const graphData = filteredData();

  function filteredData() {
    const filterData = student === undefined ? studentdata : uniqueStudentData;
    let graphArray = [];

    for (let i = 0; i < assignments.length; i++) {
      const filter = filterData.filter((item) => {
        if (item.assignment === assignments[i]) {
          let newObject = {
            assignment: item.assignment,
            difficulty: [],
            fun: [],
          };
          newObject.assignment = item.assignment;
          newObject.difficulty.push(item.difficulty);
          newObject.fun.push(item.fun);
          return newObject;
        }
      });
      graphArray.push(filter);
    }
    return graphArray;
  }

  useEffect(() => {
    d3.select("svg").remove();
  }, [newColumns]);

  useEffect(() => {
    const chart = () => {
      const margin = { top: 25, right: 25, bottom: 25, left: 30 };
      const w = 950;
      const h = 300;

      const svg = d3 // create svg format
        .select(svgRef.current)
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .style("color", "darkslategray") // text-color of x & y data
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.right})`)
        .style("overflow", "visible"); // show / don't show x & y data (visible or not)

      const xScale = d3 // create the values of x & y
        .scaleBand()
        .domain(assignments) // val returns value of array, i returns indexnr. of array
        .range([0, w])
        .padding([0.1]); // space between bars
      svg
        .append("g")
        .attr("class", "xAxis")
        .call(d3.axisBottom(xScale).tickSize(0))
        .attr("transform", `translate(0, ${h})`)
        // x-Axis Text
        .selectAll("text")
        .style("text-anchor", "end")
        .style("transform", "rotate(-45deg)");

      const yScale = d3.scaleLinear().domain([0, 5]).range([h, 0]);
      svg
        .append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(yScale))
        // Graph title:
        .append("text")
        .attr("class", "yLabel")
        .attr("y", -5)
        .attr("x", w / 2)
        .attr("fill", "currentColor")
        .style("text-decoration", "underline")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .text(student ? student : "Average rating of all students");

      const xSubgroup = d3
        .scaleBand()
        .domain(newColumns)
        .range([0, xScale.bandwidth()])
        .padding([0.2]);

      const graphdata = svg
        .append("g") // group for graphdata
        .attr("class", "graphdata")
        .selectAll("g")
        .data(graphData)
        .join("g")
        .attr("transform", (d) => {
          return `translate(${xScale(d[0].assignment)}, 0)`;
        })

        .selectAll("rect")
        .data((d) => {
          return newColumns.map((key) => {
            const subTotal = d.map((item) => parseInt(item[key]));

            const average = (nums) =>
              nums.reduce((acc, num, index, array) => {
                const accValue = acc + num;
                const length = array.length;

                return index === length - 1 ? accValue / length : accValue;
              });

            const averageTotal = { key: key, value: average(subTotal) };

            return averageTotal;
          });
        })
        .join("rect")
        .attr("x", (d) => xSubgroup(d.key))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", (d) => h - yScale(d.value))
        .attr("fill", (d) => {
          return d.key === "difficulty" ? "darkorange" : "green";
        })
        .on("mouseover", function (d, i) {
          d3.select(this).transition().duration("50").attr("opacity", ".65");
        })
        .on("mouseout", function (d, i) {
          d3.select(this).transition().duration("50").attr("opacity", "1");
        })
        // text
        .append("title")
        .attr("class", "graphLabel")
        .attr("y", 0)
        .attr("x", w / 2)
        .style("font-weight", "bold")
        .text((d) => `${d.key} \n ${d.value}`);
    };
    chart(studentdata);
  }, [newColumns]);

  return (
    <>
      <div className="svgContainer">
        <FilterButtons />
        <div className="svgChart" ref={svgRef} />
      </div>
    </>
  );
}

export default Chart2;
