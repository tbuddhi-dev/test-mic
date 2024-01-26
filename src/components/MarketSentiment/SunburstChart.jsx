import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { hsl as d3Hsl } from "d3-color";

const SunburstChart = () => {
  const chartRef = useRef(null);

  const data = {
    name: "Malayan Banking",
    children: [
      {
        name: "Gamuda",
        size: 10,
        children: [{ name: "Petronas Dagangan", size: 10 }],
      },
      { name: "Mara", size: 10 },
      { name: "Bursa Malaysia", size: 10 },
      { name: "Malakoff", size: 10 },
    ],
  };

  const width = 400;
  const height = 400;

  const hueDXScaleRef = useRef(d3ScaleLinear().domain([0, 1]).range([0, 360]));

  const _colorize = (d) => {
    const lightness = 0.5;
    const saturation = 0.5;
    const child_brightness = 0.5;

    let hue;
    const current = d;
    if (current.depth === 0) {
      return "#33cccc";
    }

    if (current.depth <= 1) {
      hue = hueDXScaleRef.current(d.x0);
      current.fill = d3Hsl(hue, saturation, lightness);
      return current.fill;
    }
    current.fill = current.parent.fill.brighter(child_brightness);
    const thishsl = d3Hsl(current.fill);
    hue = hueDXScaleRef.current(current.x0);
    const colorshift = thishsl.h + hue / 4;
    const c = d3Hsl(colorshift, thishsl.s, thishsl.l);
    return c;
  };

  useEffect(() => {
    // Set up the initial chart
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Define the partition layout
    const partition = d3.partition().size([2 * Math.PI, height / 2]);

    // Compute the hierarchy from the data
    const root = d3.hierarchy(data).sum((d) => d.size);

    // Apply the partition layout to the data
    partition(root);

    // Create arcs for each node
    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1);

    // Add the arcs to the chart
    const paths = svg
      .selectAll("path")
      .data(root.descendants())
      .enter()
      .append("path")
      .attr("d", arc)
      .style("fill", (d) => _colorize(d)) // Customize the arc fill color
      .style("stroke", "white") // Add stroke for better visibility
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);

    // Add labels inside the arcs
    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("startOffset", "50%")
      .attr("dy", "0.35em") // Adjust the vertical position of the label
      .attr("text-anchor", "middle")
      .style("dominant-baseline", "middle")
      .style("user-select", "none")
      .style("fill", "white") // Set the text color
      .style("font-size", (d) => (d.data.name.length >= 15 ? "10px" : "9px")) // Set the font size conditionally
      .text((d) => (d.depth === 0 ? d.data.name.toUpperCase() : ""));

    // Tooltip functions
    function handleMouseOver(event, d) {
      // Show tooltip
      const tooltip = d3.select("#tooltip");
      d3.select(this).style("cursor", "pointer");

      tooltip
        .append("div")
        .attr("class", "sunburst-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("text-align", "center")
        .style("border-radius", "8px")
        .style("pointer-events", "none")
        .style("background", "lightsteelblue")
        .style("padding", "3px")
        .style("opacity", 0.9)
        .html(d.data.name)
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    }

    function handleMouseOut(event, d) {
      // Hide tooltip on mouse out
      const tooltip = d3.select("#tooltip");
      tooltip.selectAll(".sunburst-tooltip").remove();
    }

    function handleClick(event, d) {
      if (d.depth === 0) {
        paths.style("opacity", 1);
      } else {
        paths.style("opacity", (path) => (path === d ? 1 : 0.3));
      }
    }

    // Cleanup function
    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <div className="sunburst-container">
      {/* <div ref={chartRef} style={{ margin: "auto", textAlign: "center" }}>
        <div id="tooltip"></div>
      </div> */}
    </div>
  );
};

export default SunburstChart;
