import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
import {scaleOrdinal} from 'd3-scale';
import {schemeCategory10} from 'd3-scale-chromatic';
// import data from '../../data/turnaround_data';

const colors = scaleOrdinal([
  '#402D54',
  '#fa9fb5',
  '#c51b8a',
  '#c994c7',
  '#756bb1',
  '#fec44f',
]).range();

const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const getAggdata = (data) => {
  let result = [];
  data.reduce(function (res, value) {
    if (!res[value.unit]) {
      // res[value.unit] = { unit: value.unit, TurnaroundTimeHours: 0, Count: 0, Avg: 0 };
      res[value.unit] = {
        unit: value.unit,
        TurnaroundTimeHours: 0,
        AllVal: [],
        Median: 0,
      };
      result.push(res[value.unit]);
    }
    res[value.unit].TurnaroundTimeHours += value.TurnaroundTimeHours;
    // res[value.unit].Count += 1;
    // res[value.unit].Avg = (res[value.unit].TurnaroundTimeHours / res[value.unit].Count).toFixed(2);
    res[value.unit].AllVal.push(value.TurnaroundTimeHours);
    res[value.unit].Median = median(res[value.unit].AllVal).toFixed(2);
    return res;
  }, {});
  return result;
};

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
  y + height
} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const {fill, x, y, width, height} = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

class Turnunit extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = data;
  // }
  
  renderTooltip = (props) => {
    const {active, payload} = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #999',
            margin: 0,
            padding: 10,
          }}
        >
          <p>
            Turnaround Time for {data.unit} : {data.Median} hrs
          </p>
        </div>
      );
    }

    return null;
  };

  render() {
    const {data} = this.props;
    return (
      <div className="fadeInUp raisedbox" style={{animationDelay: '1.3s'}}>
        <BarChart
          width={500}
          height={200}
          data={getAggdata(data)}
          margin={{
            top: 20,
            right: 60,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="unit"
            value="unit"
            tick={{fontSize: 12, fontFamily: 'archia'}}
          />
          <Tooltip
            cursor={{strokeDasharray: '3 3'}}
            wrapperStyle={{zIndex: 100, fontSize: '12px', fontFamily: 'archia'}}
            content={this.renderTooltip}
          />
          <YAxis
            label={{
              value: 'TAT(hrs)',
              angle: -90,
              position: 'Left',
              fontFamily: 'archia',
              fontSize: 12,
            }}
            tick={{fontSize: 12, fontFamily: 'archia'}}
          />
          <Bar
            dataKey="Median"
            fill="#8884d8"
            label={{position: 'top', fontFamily: 'archia', fontSize: 12}}
          >

          <Tooltip wrapperStyle={{fontFamily: 'archia'}} />
          <Legend
            wrapperStyle={{fontSize: '12px', fontFamily: 'archia'}}
            align="center"
          />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
         
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default Turnunit;
