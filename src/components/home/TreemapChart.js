
import React, { Component } from 'react';
import * as d3 from 'd3';
// import data from '../../data/hospital_tree2.json';
import { extent } from "d3";

//Credit :  https://www.d3-graph-gallery.com/graph/treemap_custom.html

class TreemapChart extends Component {

  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.state = this.props;
  }

  componentDidMount() {
    const { data } = this.props;
    console.log("Tree");
    console.log(data[0])
    this.drawChart(data[0]);
  }

  componentDidUpdate() {
    const { data } = this.props;
    // document.getElementById(this.myRef).innerHTML="";
    // element.parentNode.removeChild(element);
    this.drawChart(data[0]);
  }

  drawChart(data) {


    var margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 490 - margin.left - margin.right,
      height = 430 - margin.top - margin.bottom;

      // document.getElementById(this.myRef.current).innerHTML="";
    var svg = d3.select(this.myRef.current);
    svg.selectAll("*").remove();

    // append the svg object to the body of the page
    svg = d3.select(this.myRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Give the data to this cluster layout:
    console.log(data);
    var root = d3.hierarchy(data).count((d) => d.value) // Here the size of each leave is given in the 'value' field in input data


    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap()
      .size([width, height])
      .paddingTop(20)
      //paddingRight(7)
      .paddingInner(2)      // Padding between each rectangle
      // .paddingOuter(6)
      // .padding(20)
      (root)

    // prepare a color scale
    var color = d3.scaleOrdinal()
      .domain(["General", "Emergency", "SpecialCare", "Surgical", "Emergency", "Maternity", "Intensive Care"])
      .range(["#402D54", "#D18975", "#8FD175", "#c994c7", "#756bb1", "#fec44f"])

    var myColor = d3.scaleOrdinal().domain(["Dirty", "Cleaning", "Ready", "Occupied"])
      .range(["#b2182b", "#fd7e1499", "#41ab5d", "#4575b4"])

    // And a opacity scale
    var opacity = d3.scaleLinear()
      .domain([10, 30])
      .range([.5, 1])


    // Add tooltip  
    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("font-family", "archia")
      .style("font-size", "14px")
      .style("z-index", "10")
    // .style("visibility", "hidden") ;

    var hover = d3.select("rect")
      .append("div")
      .attr("class", "hover");

    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .attr("fill", function (d) { return myColor(d.data.status) })
      .attr("opacity", function (d) { return opacity(d.data.status) })
      .on("mouseover", d => {
        tooltip.style("visibility", "visible").style("color", "yellow").style("display", "inline-block").text(d.data.status);


      })


      .on("mousemove", d => hover.style("fill", "orange"))
      .on("mouseout", d => {
        tooltip.style("visibility", "hidden");
        // d3.select(this.rect).attr("fill", "green") 
      })

      .on("mousemove", d => tooltip.style("top", (d3.event.pageY - 20) + "px").style("left", (d3.event.pageX + 10) + "px").text("Status: "+d.data.status));



    // and to add the text labels
    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", function (d) { return d.x0 + 25 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 + 20 })    // +20 to adjust position (lower)
      .attr("text", function (d) { return d.data.name })
      .attr("font-size", "9px")
      .attr("font-family", "archia")
      .attr("fill", "black")

    // and to add the inside labels
    svg
      .selectAll("titles")
      .data(root.descendants().filter(function (d) { return d.depth == 2 }))
      .enter()
      .append("text")
      .attr("x", function (d) { return d.x0 + 4 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 + 15 })    // +20 to adjust position (lower)
      .text(function (d) { return d.data.name })
      .attr("font-size", "9px")
      .attr("fill", "black")
      .attr("font-family", "archia")

    // Add title for the 3 groups
    svg
      .selectAll("titles")
      .data(root.descendants().filter(function (d) { return d.depth == 1 }))
      .enter()
      .append("text")
      .attr("x", function (d) { return d.x0 })
      .attr("y", function (d) { return d.y0 + 10 })
      .text(function (d) { return d.data.name+" - Beds:" + d.data.value })
      .attr("font-size", "10px")
      // .attr("font-weight","60px")
      .attr("font-family", "archia")
      .attr("fill", "black")

    // Add title for the 3 groups
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 5)    // +20 to adjust position (lower)
      .text("Hospital Layout: 5 Units - 44 Beds")
      .attr("font-size", "19px")
      .attr("font-family", "archia")
      .attr("fill", "black")

     }


  render() {
    // const { data } = this.props;
    // const { data } = this.props;
    // this.drawChart(data[0]);
    return (
      <div className="fadeInUp raisedbox" style={{ animationDelay: '1.3s' }} ref={this.myRef} />
    )
  }
};



export default TreemapChart;


