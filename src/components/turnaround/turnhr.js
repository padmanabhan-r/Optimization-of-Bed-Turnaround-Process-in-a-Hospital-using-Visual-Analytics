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
import data from '../../data/turnar';

// const [unit1N, unit1S, unit1W, unitBP, unitSCU] = data;

// const parseDomain = () => [
//   0,
//   Math.max(
//     Math.max.apply(
//       null,
//       unit1S.map((entry) => entry.value)
//     ),
//     Math.max.apply(
//       null,
//       unit1W.map((entry) => entry.value)
//     ),
//     Math.max.apply(
//       null,
//       unit1N.map((entry) => entry.value)
//     ),
//     Math.max.apply(
//       null,
//       unitBP.map((entry) => entry.value)
//     ),
//     Math.max.apply(
//       null,
//       unitSCU.map((entry) => entry.value)
//     )
//   ),
// ];

class TurnHr extends PureComponent {
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
            <span>Turnaround Time: {(data.value / 60).toFixed(2)} hrs</span>
          </p>
        </div>
      );
    }

    return null;
  };

  render() {
    const {data}  = this.props;
    console.log("Props",data)
    // const unit1N = data[0];
    // const unit1S = data[1];
    // const unit1W = data[2];
    // const unitBP = data[3];
    // const unitSCU = data[4];
    // let {hourData} = data;
    // console.log("hourdata", hourData)
    const [unit1N, unit1S, unit1W, unitBP, unitSCU] = data;
    const parseDomain = () => [
      0,
      Math.max(
        Math.max.apply(
          null,
          unit1N.map((entry) => entry.value)
        ),
        Math.max.apply(
          null,
          unit1S.map((entry) => entry.value)
        ),
        Math.max.apply(
          null,
          unit1W.map((entry) => entry.value)
        ),
        Math.max.apply(
          null,
          unitBP.map((entry) => entry.value)
        ),
        Math.max.apply(
          null,
          unitSCU.map((entry) => entry.value)
        )
      ),
    ];
    const domain = parseDomain();
    const range = [0, 100];


    return (
      <div className="fadeInUp raisedbox" style={{ animationDelay: '1.3s', width: 470, paddingTop: '15px', display: 'inline-block' }}>
        <ScatterChart
          width={470}
          height={30}
          // margin={{
          //   top: 20,
          //   right: 10,
          //   bottom: -10,
          //   left: 0,
          // }}
        >

          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Unit 1S',
              position: 'insideTopRight',
              fontFamily: 'archia',
              fontSize: 13
            }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
            content={this.renderTooltip}
          />
          <Scatter
            data={unit1S}
            fill="#402D54"
            shape="circle"
            line={{ stroke: 'black', strokeWidth: 1 }}
          />
        </ScatterChart>

        <ScatterChart
          width={470}
          height={30}
          // margin={{
          //   top: 20,
          //   right: 10,
          //   bottom: -10,
          //   left: 0,
          // }}
        >

          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Unit 1W',
              position: 'insideTopRight',
              fontFamily: 'archia',
              fontSize: 13
            }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
            content={this.renderTooltip}
          />
          <Scatter
            data={unit1W}
            fill="#fa9fb5"
            shape="circle"
            line={{ stroke: 'black', strokeWidth: 1 }}
          />
        </ScatterChart>

        <ScatterChart
          width={470}
          height={30}
          // margin={{
          //   top: 20,
          //   right: 10,
          //   bottom: -10,
          //   left: 0,
          // }}
        >
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Unit 1N',
              position: 'insideTopRight',
              fontFamily: 'archia',
              fontSize: 13
            }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
            content={this.renderTooltip}
          />
          <Scatter
            data={unit1N}
            fill="#c51b8a"
            shape="circle"
            line={{ stroke: 'black', strokeWidth: 1 }}
          />
        </ScatterChart>

        <ScatterChart
          width={470}
          height={30}
          // margin={{
          //   top: 20,
          //   right: 10,
          //   bottom: -10,
          //   left: 0,
          // }}
        >
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Unit BP',
              position: 'insideTopRight',
              fontFamily: 'archia',
              fontSize: 13
            }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
            content={this.renderTooltip}
          />
          <Scatter
            data={unitBP}
            fill="#c994c7"
            shape="circle"
            line={{ stroke: 'black', strokeWidth: 1 }}
          />
        </ScatterChart>

        <ScatterChart
          width={470}
          height={60}
          // margin={{
          //   top: 20,
          //   right: 10,
          //   bottom: -10,
          //   left: 0,
          // }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 9, fontFamily: 'archia' }}
            tickLine={{ transform: 'translate(0, -6)' }}
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
              value: 'Unit SCU',
              position: 'insideTopRight',
              fontFamily: 'archia',
              fontSize: 13
            }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
            content={this.renderTooltip}
          />
          <Scatter
            data={unitSCU}
            fill="#756bb1"
            shape="circle"
            line={{ stroke: 'black', strokeWidth: 1 }}
          />
        </ScatterChart>
      </div>
    );
  }
}

export default TurnHr;
