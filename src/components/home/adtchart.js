import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import data from '../../data/unit_bed_status';

class ADTChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: data,
    };
  }

  render() {
    return (
      <div className="fadeInUp raisedbox" style={{animationDelay: '1.3s'}}>
        <Bar
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false,
            legend: {
              position: 'right',
              labels: {
                fontColor: 'black',
                fontFamily: 'archia',
                fontSize: 9,
              },
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    fontColor: 'black',
                    fontSize: 9,
                    fontFamily: 'archia',
                  },
                  ticks: {
                    fontColor: 'black',
                    fontSize: 12,
                    fontFamily: 'archia',
                  },
                  gridLines: {color: 'black'},
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Number of Patients',
                    fontColor: 'black',
                    fontSize: 12,
                    fontFamily: 'archia',
                  },
                  ticks: {
                    fontColor: 'black',
                    fontSize: 12,
                    fontFamily: 'archia',
                  },
                  responsive: true,
                },
              ],
            },
          }}
          height={200}
        />
      </div>
    );
  }
}

export default ADTChart;
