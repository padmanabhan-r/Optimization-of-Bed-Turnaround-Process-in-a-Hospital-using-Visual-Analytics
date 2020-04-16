import React, { Component } from 'react';
import moment from 'moment';
import TimeSeries from './home/timeseries';
import StackedBarR from '../components/home/stackedbar';
import ADTChart from '../components/home/adtchart';
import ADTChart2 from '../components/home/adtchart2';
import Turnaround from './turnaround';
import TreemapChart from '../components/home/TreemapChart'
import Multiline2 from '../components/home/Multiline2';
import FilterComp from './filtercomp/filtercomp';
import HourSlider from './filtercomp/hourslider';

import TurnUnit from './turnaround/turnunit';
import TurnHr from './turnaround/turnhr';
import TurnHr2 from './turnaround/turnhr2';
import TurnMonth from './turnaround/turnmonth';
// import TurnDate from './turnaround/turndate';
import TurnDate from './turnaround/turndate2';


//Data Imports
import data from '../data/timeseriesdata'
import bedstatusdata from '../data/bedstatusdata';
import turnaround_data from '../data/turnaround_data';
import big_data from '../data/turn_big';
import hosptree2 from '../data/hosptree2';
import turnar from '../data/turnar';
import adtdata from '../data/adtdata';


// const [unit1N, unit1S, unit1W, unitBP, unitSCU] = turnar;

const dateFormat = 'DD-MMM';

export class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            graphOption: 2,
            timeseries: data,
            timeseriesMode: false,
            includedUnit: ['1N', '1S', '1W', 'BP', 'SCU'],
            GreaterThanDate: moment('01-Jan', dateFormat),
            LessThanDate: moment('31-Dec', dateFormat),
            greaterThanHour: 1,
            lessThanHour: 24
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

    changeHour = value => {
        this.setState({
            greaterThanHour: value[0],
            lessThanHour: value[1]
        })
    }

    filData = (includedUnit, data) => {
        let result = [{
            "name": "Units",
            "children": []
        }];

        data.forEach(d => {

            d.children.forEach(e => {
                if (includedUnit.includes(e.name)) {
                    result[0].children.push(e);
                }
            }
            )
        });
        console.log("Result", result);
        return result;

    };


    filHourData = (greaterThanHour, lessThanHour, data) => {
        let result = [];
        data.forEach(d => {
            let res = [];
            res = d.filter(e => e.hour >= greaterThanHour && e.hour <= lessThanHour);
            result.push(res)
        });
        console.log("Hour-Result", result);
        return result;

    };

    render() {
        const { graphOption, timeseries, timeseriesMode, includedUnit, GreaterThanDate, LessThanDate, greaterThanHour, lessThanHour } = this.state;
        const filtered_bedstatusdata = bedstatusdata.filter(d => includedUnit.indexOf(d.Unit) !== -1);
        const filtered_adtdata = adtdata.filter(d => includedUnit.indexOf(d.unit) !== -1);
        const filteredData = turnaround_data.filter(d => includedUnit.indexOf(d.unit) !== -1)
            .filter(d => moment(d.Date, dateFormat) >= GreaterThanDate && moment(d.Date, dateFormat) <= LessThanDate);
        const filteredBigData = big_data.filter(d => includedUnit.indexOf(d.unit) !== -1)
            .filter(d => moment(d.date, dateFormat) >= GreaterThanDate && moment(d.date, dateFormat) <= LessThanDate);
        // const filtered_hosptree2 = hosptree2.filter(d => includedUnit.indexOf(d.children.name) !== -1);
        const filtered_hosptree2 = this.filData(includedUnit, hosptree2);
        const filteredHourData = this.filHourData(greaterThanHour, lessThanHour, turnar);



        return (
            <div className="Home">
                <div className="home-left">
                    <React.Fragment>
                        <FilterComp
                            changeDate={this.changeDate}
                            changeIncludedUnit={this.changeIncludedUnit}
                        />
                        <div
                            className="timeseries-header fadeInUp"
                            style={{ animationDelay: '1.3s' }}
                        >
                            <h2>Unit-wise Current Bed Status</h2>
                        </div>
                        <StackedBarR data={filtered_bedstatusdata} />
                        <div
                            className="timeseries-header fadeInUp"
                            style={{ animationDelay: '1.3s' }}
                        >
                            <h2>Bed Status Map</h2>
                        </div>
                        <TreemapChart data={filtered_hosptree2} />
                    </React.Fragment>

                </div>
                <div className="home-middle">
                    <React.Fragment>

                        <HourSlider
                            changeHour={this.changeHour}
                        />
                        <div
                            className="timeseries-header fadeInUp"
                            style={{ animationDelay: '1.3s' }}
                        >
                            <h2>BTAT Hourly Summary</h2>
                        </div>
                        <TurnHr data={filteredHourData} />
                        <div
                            className="timeseries-header fadeInUp"
                            style={{ animationDelay: '1.3s' }}
                        >
                            <h2>BTAT UnitWise Summary</h2>
                        </div>
                        <TurnUnit data={filteredData} />
                        <div
                            className="timeseries-header fadeInUp"
                            style={{ animationDelay: '1.3s' }}
                        >
                            <h2>BTAT Daily Summary</h2>
                        </div>
                        <TurnDate data={filteredData} />



                    </React.Fragment>

                </div>
                <div className="home-right">
                    <React.Fragment>
                        <div
                            className="timeseries-header fadeInUp"
                            style={{ animationDelay: '1.3s' }}
                        >
                            <h2>ADMISSIONS,DISCHARGES,TRANSFERS - Current</h2>
                        </div>
                        <ADTChart2 data={filtered_adtdata} />

                        <div
                            className="timeseries-header fadeInUp"
                            style={{ animationDelay: '1.3s' }}
                        >
                            <h2>Admissions,Discharges,Transfers Trends - All Units</h2>
                        </div>
                        {/* <TimeSeries
                            timeseries={timeseries}
                            type={graphOption}
                            mode={timeseriesMode}
                        /> */}

                        <Multiline2 />
                    </React.Fragment>

                </div>
            </div>
        )
    }
}

export default Home;


