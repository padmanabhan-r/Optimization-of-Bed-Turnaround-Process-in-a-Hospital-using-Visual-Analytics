import React, {PureComponent} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Label,
} from 'recharts';
// import data from '../../data/turnaround_data';

const getAggdata = (data) => {
  let result = [];
  data.reduce(function (res, value) {
    if (!res[value.Month]) {
      res[value.Month] = {
        Month: value.Month,
        TurnaroundTimeHours: 0,
        Count: 0,
        Avg: 0,
      };
      result.push(res[value.Month]);
    }
    res[value.Month].TurnaroundTimeHours += value.TurnaroundTimeHours;
    res[value.Month].Count += 1;
    res[value.Month].Avg = (
      res[value.Month].TurnaroundTimeHours / res[value.Month].Count
    ).toFixed(2);
    return res;
  }, {});
  return result;
};

class TurnMonth extends PureComponent {
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
            Turnaround Time for {data.Month} : {data.Avg} hrs
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
        <LineChart
          width={500}
          height={90}
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
            dataKey="Month"
            padding={{left: 30, right: 30}}
            tick={{fontSize: 12, fontFamily: 'archia'}}
          >
            {/* <Label value="Month" offset={-5} position="insideBottom" /> */}
          </XAxis>
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
          <Tooltip
            cursor={{strokeDasharray: '3 3'}}
            wrapperStyle={{zIndex: 100, fontSize: '12px', fontFamily: 'archia'}}
            content={this.renderTooltip}
          />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="Avg"
            stroke="#007bff"
            activeDot={{r: 8}}
          />
        </LineChart>
      </div>
    );
  }
}

export default TurnMonth;
