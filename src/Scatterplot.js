import React, { useState, useContext } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import { tooltipContext } from "./useTooltip";

const Circle = styled.circle`
  fill: steelblue;
  fill-opacity: 0.6;
  stroke: steelblue;
  stroke-width: 1px;
  cursor: pointer;
  &:hover {
    fill: orange;
  }
`;

const ForeignObject = styled.foreignObject`
  background: white;
  font-size: 9px;
  text-align: left;
  div {
    box-shadow: 10px 10px 8px #888888;
  }
`;

const Tooltip = ({ x, y, info }) => (
  <ForeignObject x={x + 10} y={y + 10} width={100} height={50}>
    <div>
      <strong>{info.name}</strong>
      <p>
        {info.state} {info.zipCode}
      </p>
      <p style={{ color: info.color }}>
        {info.number1.toFixed(2)}, {info.number2.toFixed(2)}
      </p>
    </div>
  </ForeignObject>
);

export default ({
  x,
  y,
  width,
  height,
  data,
  xDimension,
  yDimension,
  padding = 10
}) => {
  const { tooltip, setTooltip } = useContext(tooltipContext);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xDimension))
    .range([padding, width - padding]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yDimension))
    .range([padding, height - padding]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {data.map(d => (
        <Circle
          key={d.id}
          cx={xScale(xDimension(d))}
          cy={yScale(yDimension(d))}
          r={3}
          onMouseOver={() => setTooltip(d)}
          onMouseOut={() => setTooltip(false)}
        />
      ))}
      {tooltip && (
        <Tooltip
          x={xScale(xDimension(tooltip))}
          y={yScale(yDimension(tooltip))}
          info={tooltip}
        />
      )}
    </g>
  );
};
