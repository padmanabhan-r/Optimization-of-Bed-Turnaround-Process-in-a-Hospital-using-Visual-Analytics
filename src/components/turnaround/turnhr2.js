import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
} from 'recharts';
// import data from '../../data/turn_big';


const getAggdata = (data) => {
  let result = [];
  data.reduce(function (res, value) {
    if (!res[value.hour]) {
      res[value.hour] = {
        index: value.index,
        tat: 0,
        hour: value.hour,
        Count: 0,
        Avg: 0,
      };
      result.push(res[value.hour]);
    }
    res[value.hour].tat += value.value;
    res[value.hour].Count += 1;
    res[value.hour].Avg =parseFloat((
      res[value.hour].tat / res[value.hour].Count
    ).toFixed(2));
    return res;
  }, {});
  console.log("TAT")
  console.log(result)
  return result;
};

const parseDomain = (data) => [
  0,
  Math.max(
    Math.max.apply(
      null,
      data.map((entry) => entry.value)
    )
  ),
];

class TurnHr2 extends PureComponent {

  render() {
    const {data} = this.props;
    const domain = parseDomain(data);
    const range = [0, 200];

    return (
      <div className="fadeInUp raisedbox" style={{ animationDelay: '1.3s' }}>
        <ScatterChart
          width={450}
          height={97}
          margin={{
            top: 20,
            right: 10,
            bottom: 10,
            left: -10,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 10, fontFamily: 'archia' }}
            tickLine={{ transform: 'translate(0, -6)' }}
            // label={{
            //   value: 'Hour',
            //   position: 'insideBottom',
            //   fontFamily: 'archia',
            //   fontSize: 0,
            //   padding:10
            // }}
          />
           <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{
              value: 'TAT Hourly',
              position: 'insideRight',
              fontFamily: 'archia',
              fontSize: 12,
            }}
          />
          <ZAxis type="number" dataKey="tat" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100, fontSize: '12px', fontFamily: 'archia' }}
            content={this.renderTooltip}
          />
          <Scatter
            data={getAggdata(data)}
            fill="#dc3545"
            shape="circle"
            line={{ stroke: 'black', strokeWidth: 1 }}
          />
        </ScatterChart>
      </div>
    );
  }

  //Tooltip Function
  renderTooltip = (props) => {
    const { active, payload } = props;

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
            <span>Turnaround Time: {(data.Avg / 60).toFixed(2)} hrs</span>
          </p>
        </div>
      );
    }

    return null;
  };
}

export default TurnHr2;
