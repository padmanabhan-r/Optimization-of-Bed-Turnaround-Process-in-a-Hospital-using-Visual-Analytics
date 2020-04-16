import React, { Component } from 'react'
import { Layout } from 'antd';
import TurnUnit from './turnaround/turnunit';
import TurnHr from './turnaround/turnhr';
import TurnHr2 from './turnaround/turnhr2';
import TurnMonth from './turnaround/turnmonth';
import TurnDate from './turnaround/turndate';
import data from '../data/turnaround_data';
import big_data from '../data/turn_big';
import FilterComp from './filtercomp/filtercomp'
import moment from 'moment';

const dateFormat = 'DD-MMM';

export class Turnaround extends Component {

  constructor(props) {
    super(props);
    this.state = {
      includedUnit: ['1N', '1S', '1W', 'BP', 'SCU'],
      GreaterThanDate: moment('01-Jan', dateFormat),
      LessThanDate: moment('31-Dec', dateFormat)
    }
  }

  changeIncludedUnit = value => {
    this.setState({
      includedUnit: value
    })
  }

  changeDate = value => {
    this.setState({
      GreaterThanDate: moment(value[0], dateFormat),
      LessThanDate: moment(value[1], dateFormat)
    })
  }

  render() {
    const { includedUnit, GreaterThanDate, LessThanDate } = this.state;
    const filteredData = data.filter(d => includedUnit.indexOf(d.unit) !== -1)
      .filter(d => moment(d.Date,dateFormat) >= GreaterThanDate && moment(d.Date,dateFormat) <= LessThanDate);
    const filteredBigData = big_data.filter(d => includedUnit.indexOf(d.unit) !== -1)
      .filter(d => moment(d.date,dateFormat) >= GreaterThanDate && moment(d.date,dateFormat) <= LessThanDate);

    return (
      <div>
        <div>
          <FilterComp
            changeDate={this.changeDate}
            changeIncludedUnit={this.changeIncludedUnit}
          />
          <React.Fragment>
            <div
              className="timeseries-header fadeInUp"
              style={{ animationDelay: '1s' }}
            >
              <h2>BTAT UnitWise Summary</h2>
            </div>
            <TurnUnit data={filteredData} />
            {/* <div
              className="timeseries-header fadeInUp"
              style={{ animationDelay: '1s' }}
            >
              <h2>BTAT Monthly Summary</h2>
            </div>
            <TurnMonth data={filteredData} /> */}
            <div
              className="timeseries-header fadeInUp"
              style={{ animationDelay: '1s' }}
            >
              <h2>BTAT Daily Summary</h2>
            </div>
            <TurnDate data={filteredData} />
          </React.Fragment>
          <div>
            <React.Fragment>
              <div
                className="timeseries-header fadeInUp"
                style={{ animationDelay: '1s' }}
              >
                <h2>BTAT Hourly Summary</h2>
              </div>
              <TurnHr2 data={filteredBigData} />
            </React.Fragment>
          </div>
        </div>

      </div>
    )
  }
}

export default Turnaround;
