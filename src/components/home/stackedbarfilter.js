import React, {PureComponent} from 'react';
import StackedBarR from './stackedbar';
import PropTypes from 'prop-types';
import FilterComp from '../filtercomp/filtercomp';
import { Layout } from 'antd';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const { Content } = Layout;

const data = [
  {
    Unit: '1N',
    Occupied: 12,
    Vacant: 3,
    Total: 15,
  },
  {
    Unit: '1S',
    Occupied: 8,
    Vacant: 2,
    Total: 10,
  },
  {
    Unit: 'BP',
    Occupied: 4,
    Vacant: 1,
    Total: 5,
  },
  {
    Unit: 'SCU',
    Occupied: 2,
    Vacant: 2,
    Total: 4,
  },
  {
    Unit: '1E',
    Occupied: 3,
    Vacant: 2,
    Total: 4,
  },
  {
    Unit: '1W',
    Occupied: 8,
    Vacant: 2,
    Total: 10,
  },
];

export default class StackedbarFilter extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      includedUnit: ['1N', '1S', '1W', 'BP', 'SCU']
      
    }
  }

  changeIncludedUnit = value => {
    this.setState({
      includedUnit: value
    })
  }



  render() {

    const { includedUnit } = this.state;
    const filteredData = data.filter(d => includedUnit.indexOf(d.Unit) !== -1);
      
    return (
      <div>
        <div>
          <FilterComp
          
            changeIncludedUnit={this.changeIncludedUnit}
          />
          <React.Fragment>
            <div
              className="timeseries-header fadeInUp"
              style={{ animationDelay: '1s' }}
            >
              <h2>Unit Occupancy Rate</h2>
            </div>
            <StackedBarR data={filteredData} />
            </React.Fragment>
      </div>
      </div>
    );
  }
}
