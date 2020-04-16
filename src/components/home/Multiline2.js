import React, { Component } from 'react';
import * as d3 from 'd3';
import data from '../../data/csvjson_multiline2.json';

//Credit : template code from : https://www.d3-graph-gallery.com/graph/stackedarea_template.html
class Multiline2 extends Component {

  constructor(props) {
    super(props)
    this.myRef = React.createRef();
  }



  componentDidMount() {
    this.drawChart();
  }

  // componentDidUpdate() {
  //   this.drawChart()
  // }

  drawChart() {

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = 500 - margin.left - margin.right,
      height = 465 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(this.myRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var parseDate = d3.timeParse("%d-%b");

    

    data.forEach(function (d) {
      d.date = parseDate(d.date);
    });

    console.log(data);

    // var ndata = d3.nest();
    //   ndata.forEach(function (d) {
    //     // d.date = formatDate(parseTime(d.key));
    //      d.keys = d.key;    

    //   });

    var keys = d3.keys(data[0]).slice(1);
    console.log(keys);
    // color palette
    var color = d3.scaleOrdinal()
      .domain(keys)
      .range(["#8c510a", "#35978f", "#d8b365"]);

    //stack the data?
    var stackedData = d3.stack()
      .keys(keys)
      (data)



    //////////
    // AXIS //
    //////////

    // Add X axis
    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return (d.date); }))
      .range([0, width]);
    var xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))

    // Add X axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("font-family", "archia")
      .attr("x", width)
      .attr("y", height + 40)
      .text("Time (date)");

    // Add Y axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -10)
      .text("Num of Patients")
      .attr("text-anchor", "start")
      .attr("font-family", "archia")

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 20])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y).ticks(8))



    //////////
    // BRUSHING AND CHART //
    //////////

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);

    // Add brushing
    var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the scatter variable: where both the circles and the brush take place
    var areaChart = svg.append('g')
      .attr("clip-path", "url(#clip)")

    // Area generator
    var area = d3.area()
      .x(function (d) { return x(d.data.date); })
      .y0(function (d) { return y(d[0]); })
      .y1(function (d) { return y(d[1]); })
      .curve(d3.curveMonotoneX)

    // Show the areas
    areaChart
      .selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
      .attr("class", function (d) { return "myArea " + d.key })
      .style("fill", function (d) { return color(d.key); })
      .attr("d", area)

    // Add the brushing
    areaChart
      .append("g")
      .attr("class", "brush")
      .call(brush);

    var idleTimeout
    function idled() { idleTimeout = null; }

    // A function that update the chart for given boundaries
    function updateChart() {

      var extent = d3.event.selection

      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if (!extent) {
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain(d3.extent(data, function (d) { return d.date; }))
      } else {
        x.domain([x.invert(extent[0]), x.invert(extent[1])])
        areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and area position
      xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
      areaChart
        .selectAll("path")
        .transition().duration(1000)
        .attr("d", area)
    }



    //////////
    // HIGHLIGHT GROUP //
    //////////

    // What to do when one group is hovered
    var highlight = function (d) {
      console.log(d)
      // reduce opacity of all groups
      d3.selectAll(".myArea").style("opacity", .1)
      // expect the one that is hovered
      d3.select("." + d).style("opacity", 1)
    }

    // And when it is not hovered anymore
    var noHighlight = function (d) {
      d3.selectAll(".myArea").style("opacity", 1)
    }



    //////////
    // LEGEND //
    //////////

    // Add one dot in the legend for each name.
    var size = 20
    svg.selectAll("myrect")
      .data(keys)
      .enter()
      .append("rect")
      .attr("x", 300)
      .attr("y", function (d, i) { return  i * (size) - 33}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d) { return color(d) })
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(keys)
      .enter()
      .append("text")
      .attr("x", 300 + size * 1.2)
      .attr("y", function (d, i) { return + i * (size) + (size / 2) - 33 }) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function (d) { return color(d) })
      .text(function (d) { return d })
      .attr("text-anchor", "left")
      .attr("font-family", "archia")
      .style("alignment-baseline", "middle")
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

  }

  render() {
    return (
      <div className="fadeInUp raisedbox" style={{ animationDelay: '1.3s' }} ref={this.myRef} ></div>
    )
  }
};



export default Multiline2;
