import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  arc as d3Arc,
  hierarchy as d3Hierarchy,
  scaleLinear as d3ScaleLinear,
  scaleSqrt as d3ScaleSqrt,
  select as d3Select,
  interpolate as d3Interpolate,
  path as d3Path,
  // event as d3Event,
} from "d3";
import * as d3 from "d3";
import { hsl as d3Hsl } from "d3-color";
import { partition as d3Partition } from "d3-hierarchy";
import { transition as d3Transition } from "d3";

const Sunburst = ({
  tooltip = true,
  radianCutoff = 0.001,
  transitionDuration = 500,
  key_member = "key",
  font_size = 12,
  child_brightness = 0.5,
  data,
  width,
  height,
  count_member,
  tooltipX = 20,
  tooltipY = 20,
  saturation = 0.5,
  lightness = 0.5,
  domId,
  onMouseover,
  onMouseout,
  onClick,
  labelFunc,
  condensedLabelFunc,
  onCellClick,
}) => {
  const colorFunc = (node, current_color) => current_color;
  const tooltipFunc = (data) => data.name;

  const lastClickRef = useRef(null);
  const radius = Math.min(width, height) / 2;
  const y = d3ScaleSqrt().range([0, radius]);
  const x = d3ScaleLinear().range([0, 2 * Math.PI]);
  const arc = d3Arc()
    .startAngle((d) => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
    .endAngle((d) => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
    // .innerRadius((d) => Math.max(0, y(d.y0)))
    .innerRadius((d) => Math.max(0, d.depth === 0 ? y(d.y0) - 60 : y(d.y0)))
    .outerRadius((d) => Math.max(0, y(d.y1)));
  const partition = d3Partition();
  const hueDXScale = d3ScaleLinear().domain([0, 1]).range([0, 360]);
  const domIdRef = useRef(
    domId || `sunburst-wrapper-${Math.round(Math.random() * 1e12)}`
  );
  const svgRef = useRef(null);
  const tooltipDomRef = useRef(null);
  const lastSelectRef = useRef(null);

  function handleClick(event, d) {
    const label = _getLabelText(d);
    if (typeof onCellClick === "function") {
      onCellClick(label);
    }
  }

  useEffect(() => {
    _create();
    return () => {};
  }, []);

  useEffect(() => {
    _create();
  }, [data, width, height, radianCutoff]);

  const _create = () => {
    if (!data) return;

    const root = d3Hierarchy(data).sum((d) => d.value);

    const dataForPartition = partition(root)
      .descendants()
      .filter((d) => d.x1 - d.x0 > radianCutoff);

    if (!svgRef.current) {
      const w = width;
      const h = height;

      const el = d3Select(`#${domIdRef.current}`);

      svgRef.current = el.append("svg");
      const svgSelection = svgRef.current;
      svgSelection
        .classed("sunburst-svg", true)
        .style("width", `${w}px`)
        .style("height", `${h}px`)
        .style("fill", " #E9EAEF")
        .attr("viewBox", `${-w / 2} ${-h / 2} ${w} ${h}`);

      const gSlices = svgSelection
        .selectAll("g")
        .data(dataForPartition)
        .enter()
        .append("g");

      gSlices.exit().remove();

      const key = key_member;
      gSlices
        .append("path")
        .attr("class", (d) => {
          const cursor =
            !d.parent || !d.children ? " cursor-pointer" : " cursor-pointer";
          const evenodd = d.depth % 2 ? "even-row" : "odd-row";
          return `sunburst-main-arc${cursor} ${evenodd}`;
        })
        .attr("id", (d, i) => (key ? `mainArc-${d.data[key]}` : `mainArc-${i}`))
        .style("fill", (d) => (d.parent ? _colorize(d) : "#284B80"));

      if (labelFunc) {
        gSlices
          .append("path")
          .attr("class", "sunburst-hidden-arc")
          .attr("id", (_, i) => `hiddenArc${i}`)
          .attr("d", _middleArcLine)
          .style("fill", "none");

        const text = gSlices
          .append("text")
          .style("pointer-events", "none")
          .style("dominant-baseline", "middle")
          .style("text-anchor", "middle");

        text
          .append("textPath")
          .attr("startOffset", "50%")
          .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
          .text((d) => _getLabelText(d) || "")
          .style("font-size", "12px");
      }
    }

    tooltip && _setTooltips();
    _update(root);
  };

  const _update = (d, i, a) => {
    if (lastSelectRef.current && a && lastSelectRef.current == a[i].id) return;

    lastSelectRef.current = a && a[i].id;

    const transition = svgRef.current
      .transition()
      .duration(transitionDuration)
      .tween("scale", function () {
        const xd = d3Interpolate(x.domain(), [d.x0, d.x1]);
        const yd = d3Interpolate(y.domain(), [d.y0, 1]);
        const yr = d3Interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
        return function (t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
        };
      });

    transition
      .selectAll("path.sunburst-hidden-arc")
      .attrTween("d", (d) => () => _middleArcLine(d));

    transition
      .selectAll("path.sunburst-main-arc")
      .attrTween("d", (d) => () => {
        const arcPath = arc(d);
        return arcPath;
      })
      .on("end", (e, i, a) => {
        if (!arc.innerRadius()(e)) return;

        const arcText = d3Select(a[i].parentNode).select("text textPath");
        arcText
          .transition(transitionDuration / 2)
          .attr("opacity", 1)
          .text((d) => _getLabelText(d));
      });
  };

  const _textFits = (d, label) => {
    if (!label) return false;
    const angle = (arc.endAngle()(d) - arc.startAngle()(d)) * (180 / Math.PI);
    const radius = arc.outerRadius()(d);
    const arclength = 2 * Math.PI * radius * (angle / 360);
    return label.length * font_size < arclength;
  };

  const _getLabelText = (d) => {
    let label;
    label = labelFunc && labelFunc(d);
    if (_textFits(d, label)) return label;
    label = condensedLabelFunc && condensedLabelFunc(d);
    if (_textFits(d, label)) return label;
    return "No Label";
    // return null;
  };

  const _middleArcLine = (d) => {
    const halfPi = Math.PI / 2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI;

    if (invertDirection) angles.reverse();

    const path = d3Path();

    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
  };

  const _inDomain = (d) => {
    const d0 = x.domain()[0];
    const d1 = x.domain()[1];
    if (d.x0 < d0) return false;
    if (d.x1 > d1) return false;
    return true;
  };

  const _setTooltips = () => {
    tooltipDomRef.current = d3Select(`#${domIdRef.current}`)
      .append("div")
      .attr("class", "sunburst-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("opacity", "0")
      .style("text-align", "center")
      .style("border-radius", "8px")
      .style("pointer-events", "none")
      .style("background", "lightsteelblue")
      .style("padding", "3px");

    const dx = tooltipX;
    const dy = tooltipY;

    svgRef.current.selectAll("path.sunburst-main-arc").on("click", handleClick);
  };

  const _colorize = (d) => {
    const colorMap = {
      0: "#284B80",
      1: "#4C6A97",
      2: "#7089AE",
      3: " #94A7C6",
    };

    const depth = Math.min(d.depth, Object.keys(colorMap).length - 1);
    return colorMap[depth];
  };

  return (
    <div className="sunburst-container">
      <div className="sunburst-wrapper" id={domIdRef.current}></div>
    </div>
  );
};

export default Sunburst;
