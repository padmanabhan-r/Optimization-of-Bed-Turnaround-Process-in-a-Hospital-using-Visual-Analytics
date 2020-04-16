import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.scss';
import Home from './components/home_new';
import Navbar from './components/navbar';
import Header from './components/header';
// import DailyStatus from './components/DailyStatus';
import Turnaround from './components/turnaround';
import TableauChart from './components/tableauchart';
import HeatmapChart from './components/bedcapacity/heatmappt';

const history = require('history').createBrowserHistory;

function App() {
  // Add a new page simply by adding a new entry in this array.
  const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Summary Status',
      animationDelayForNavbar: 0.1,
    },
    {
      pageLink: '/turnaround',
      view: Turnaround, //Turnaround,
      displayName: 'Bed Turnaround',
      animationDelayForNavbar: 0.4,
    },
    {
      pageLink: '/bedstatus',
      view: TableauChart, //Replace with the right componet
      displayName: 'Bed Status Map',
      animationDelayForNavbar: 0.3,
    },
    {
      pageLink: '/bedcapacity',
      view: HeatmapChart, //Replace with the right componet
      displayName: 'Bed Capacity Planning(Potential Discharges/Transfers)',
      animationDelayForNavbar: 0.5,
    },
    {
      pageLink: '/about',
      view: React.Fragment, //Replace with the right componet
      displayName: 'About',
      animationDelayForNavbar: 0.5,
    },
  ];

  return (
    <div className="App">
      <Header />
      <Router history={history}>
        <Route
          render={({location}) => (
            <div className="Almighty-Router">
              <Navbar pages={pages} />
              <Route exact path="/" render={() => <Redirect to="/" />} />
              <Switch location={location}>
                {pages.map((page, i) => {
                  return (
                    <Route
                      exact
                      path={page.pageLink}
                      component={page.view}
                      key={i}
                    />
                  );
                })}
              </Switch>
            </div>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
