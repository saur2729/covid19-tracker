import React from 'react'
import { Route } from "react-router-dom";
import { Divider } from '@material-ui/core';

import TopNav from './topnav/TopNav';
import Main from './dashboard/Main';
import CovidTable from './charts/CovidTable';

import './navbar.css';


function Routes() {
  return (
    <div className="body">
      <div className="topnav">
       <TopNav />
      </div>
      <div className="divider">
        <br /> <Divider /> <br />
      </div>
      <div className="main-content">
        <Route path="/home" component={Main} />
        <Route path="/covid-table" component={CovidTable} />
      </div>
    </div>
  )
}

export default Routes

