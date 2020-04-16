import React from 'react';
import {Sector, Cell, PieChart, Pie} from 'recharts';

const GaugeChart = () => {
  const width = 500;
  const height = 200;
  const chartValue = 52;
  const colorData = [
    {
      value: 34,
      color: '#fec44f',
    },
    {
      value: 10,
      color: '#82ca9d',
    },
  ];

  const activeSectorIndex = colorData
    .map((cur, index, arr) => {
      const curMax = [...arr]
        .splice(0, index + 1)
        .reduce((a, b) => ({value: a.value + b.value})).value;
      return chartValue > curMax - cur.value && chartValue <= curMax;
    })
    .findIndex((cur) => cur);

  const sumValues = colorData.map((cur) => cur.value).reduce((a, b) => a + b);
  const arrowData = [
    {value: chartValue},
    {value: 15},
    {value: chartValue - sumValues},
  ];

  const pieProps = {
    startAngle: 180,
    endAngle: 0,
    cx: width / 2 - 10,
    cy: width / 3.3,
  };

  const pieRadius = {
    innerRadius: (width / 2) * 0.5,
    outerRadius: (width / 2) * 0.6,
  };

  const Arrow = ({cx, cy, midAngle, outerRadius}) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + width * 0.03) * cos;
    const my = cy + (outerRadius + width * 0.03) * sin;
    return (
      <g>
        <circle
          cx={cx - 5}
          cy={cy - 10}
          r={width * 0.05}
          fill="#666"
          stroke="none"
        />
        <path
          d={`M${cx - 5},${cy - 10}L${mx},${my}`}
          strokeWidth="6"
          stroke="#666"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  };

  const ActiveSectorMark = ({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  }) => {};

  return (
    <div className="fadeInUp raisedbox" style={{animationDelay: '1.3s'}}>
      <h2 align="center">
        {' '}
        Occupancy Rate : 75% <br /> Total beds : 48
      </h2>
      <PieChart width={500} height={200}>
        <Pie
          activeIndex={activeSectorIndex}
          activeShape={ActiveSectorMark}
          data={colorData}
          fill="#8884d8"
          {...pieRadius}
          {...pieProps}
        >
          {colorData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorData[index].color} />
          ))}
        </Pie>
        <Pie
          stroke="none"
          activeIndex={1}
          activeShape={Arrow}
          data={arrowData}
          outerRadius={pieRadius.innerRadius}
          fill="none"
          {...pieProps}
        />
        <text
          x={width - 100}
          y={130}
          textSize="16px"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="archia"
        >
          Empty Beds:12
        </text>
        <text
          x={width - 400}
          y={100}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="archia"
        >
          Occupied Beds:36
        </text>
      </PieChart>
    </div>
  );
};

export default GaugeChart;
