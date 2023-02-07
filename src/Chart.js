import React, { Component } from "react";
import * as d3 from "d3";
/* import { BarChart } from "@d3/bar-chart"; */

class Chart extends Component {
  constructor(props) {
    super();
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let accesToRef = d3.select(this.myRef.current);
    accesToRef.style("background-color", "green");
  }

  render() {
    return (
      <>
        <div ref={this.myRef}>Testing Refs</div>
      </>
    );
  }
}

export default Chart;
