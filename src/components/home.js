import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TimeSeries from './home/timeseries';
import ADTChart from '../components/home/adtchart';
// import TreeM from './treem';
import GaugeChart from '../components/home/gauge';
import StackedBarR from '../components/home/stackedbar';
import WaitTimeBar from '../components/home/waittimebar';
import Multiline2 from '../components/home/Multiline2';

// import data from '../data/data.json'
// import data from '../data/data.json'

function Home(props) {
  // const [states, setStates] = useState([]);
  // const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [graphOption] = useState(2);
  // const [lastUpdated, setLastUpdated] = useState('');
  const [timeseries, setTimeseries] = useState([]);
  // const [deltas, setDeltas] = useState([]);
  const [timeseriesMode] = useState(false);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [response] = await Promise.all([axios.get('data.json')]);
      // setStates(response.data.statewise);
      setTimeseries(response.data.cases_time_series);
      // setLastUpdated(response.data.statewise[0].lastupdatedtime);
      // setDeltas(response.data.key_values[0]);
      // setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Home">
      <div className="home-left">
        {fetched && (
          <React.Fragment>
            <div
              className="timeseries-header fadeInUp"
              style={{animationDelay: '1s'}}
            >
              <h2>Admissions, Discharges And Transfer Today</h2>
            </div>
            <ADTChart />
            <div
              className="timeseries-header fadeInUp"
              style={{animationDelay: '1s'}}
            >
              <h2>Current Occupancy Rate</h2>
            </div>
            <GaugeChart />
          </React.Fragment>
        )}
      </div>
      <div className="home-middle">
        {fetched && (
          <React.Fragment>
            <div
              className="timeseries-header fadeInUp"
              style={{animationDelay: '1s'}}
            >
              <h2>Unitwise Current Bed Status</h2>
            </div>
            <StackedBarR />
            <div
              className="timeseries-header fadeInUp"
              style={{animationDelay: '1s'}}
            >
              <h2> Wait Time in Emergency (Current week)</h2>
            </div>
            <WaitTimeBar />
          </React.Fragment>
        )}
      </div>
      <div className="home-right">
        {fetched && (
          <React.Fragment>
            <div
              className="timeseries-header fadeInUp"
              style={{animationDelay: '1s'}}
            >
              <h2>Admissions, Discharges And Transfer Summary</h2>
            </div>
            {/* <TimeSeries
              timeseries={timeseries}
              type={graphOption}
              mode={timeseriesMode}
            /> */}
            <Multiline2 />
          </React.Fragment>
        )}
      </div>
      {/* <div className="home-right raisedbox">
        {fetched && (
          <React.Fragment>
            <div
              className="timeseries-header fadeInUp"
              style={{ animationDelay: '1s' }}
            >
              <h1>Admissions, Discharges And Transfer Summary</h1>
              <div className="tabs">

                <div
                >
                  <h4>Recent Status</h4>
                </div>
              </div>
              <Chart1 />
            </div>
            <div
              className="timeseries-header fadeInUp"
              style={{animationDelay: '1s'}}
            >
              <h2>Admissions, Discharges And Transfer Summary</h2>
              <div className="tabs">
                <div>
                  <h4>Last Two Months</h4>
                </div>
              </div>
              <TimeSeries
                timeseries={timeseries}
                type={graphOption}
                mode={timeseriesMode}
              />
            </div>
          </React.Fragment>
        )}
      </div> */}
    </div>
  );
}

export default Home;
