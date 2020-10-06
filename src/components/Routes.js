import React from 'react'
import { Route , Redirect} from "react-router-dom";
import { Divider } from '@material-ui/core';

import TopNav from './topnav/TopNav';
import Main from './dashboard/Main';
import CovidTable from './stats/CovidTable';

import './navbar.css';


function Routes() {
  return (
    <div className="body">
      <div className="topnav">
       <TopNav />
      </div>
      <div className="divider">
        <br /> <Divider />
      </div>
      <div className="main-content">
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Main} />
        <Route path="/covid-table" component={CovidTable} />
      </div>
    </div>
  )
}

export default Routes

