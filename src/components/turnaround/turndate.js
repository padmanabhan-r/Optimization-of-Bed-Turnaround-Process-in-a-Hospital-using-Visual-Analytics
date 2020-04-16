import React, {PureComponent} from 'react';
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
// import data from '../../data/turnaround_data';
// import TurnMonth from './turnmonth';

const getAggdata = (data) => {
  let result = [];
  data.reduce(function (res, value) {
    if (!res[value.Date]) {
      res[value.Date] = {
        Date: value.Date,
        TurnaroundTimeHours: 0,
        Count: 0,
        Avg: 0,
      };
      result.push(res[value.Date]);
    }
    res[value.Date].TurnaroundTimeHours += value.TurnaroundTimeHours;
    res[value.Date].Count += 1;
    res[value.Date].Avg = (
      res[value.Date].TurnaroundTimeHours / res[value.Date].Count
    ).toFixed(2);
    return res;
  }, {});
  return result;
};

class TurnDate extends PureComponent {
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
            Turnaround Time for {data.Date} : {data.Avg} hrs
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
          height={250}
          data={getAggdata(data)}
          margin={{
            top: 20,
            right: 60,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" tick={{fontSize: 12, fontFamily: 'archia'}} />

          <YAxis  
            label={{
              value: 'TAT(hrs)',
              angle: -90,
              position: 'Left',
              fontFamily: 'archia',
              fontSize: 12,
            }}
            tick={{fontSize: 12, fontFamily: 'archia'}}
            allowDataOverflow="True"
          />
          <Tooltip
            cursor={{strokeDasharray: '3 3'}}
            wrapperStyle={{zIndex: 100, fontSize: '12px', fontFamily: 'archia'}}
            content={this.renderTooltip}
          />
          {/* <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}} /> */}
          <ReferenceLine y={2.5} stroke="#000" />
          <Brush
            dataKey="Date"
            height={30}
            stroke="#dc3545"
            tickFormatter={{fontSize: 12, fontFamily: 'archia'}}
          />
          <Bar dataKey="Avg" fill="#dc3545" />
        </BarChart>
      </div>
    );
  }
}

export default TurnDate;
