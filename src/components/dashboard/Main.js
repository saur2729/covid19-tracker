import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Cards from '../util/Cards';
import Charts from '../stats/Charts';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Main() {
  const classes = useStyles();
  const [allData, setallData] = useState([]);
  const [chartData, setchartData] = useState([]);

  useEffect(() => {
    async function fetchAllRecords() {
      const response = await (await fetch("https://disease.sh/v3/covid-19/all?allowNull=true")).json();
      setallData(response)
    }
    fetchAllRecords();
  }, [])

  // for fetching the chart data
  const chartDetails = {}
  const currMonth = new Date().getMonth();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].slice(0, currMonth+1)

  const casesArr = new Array(currMonth+1).fill(0);
  const recoveredArr = new Array(currMonth+1).fill(0);
  const deathsArr = new Array(currMonth+1).fill(0);

  useEffect(() => {
    async function fetchAllRecords() {
      const response = await (await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")).json();
      setchartData(response)
    }
    fetchAllRecords();
  }, [])

  for (var reportType in chartData) {
    for (const records in chartData[reportType]) {
      const fetchMonth = new Date(records).getMonth()
      // get the hghest value for the current month
      if (fetchMonth === new Date().getMonth()){
        if (reportType ==='cases' && chartData[reportType][records] > casesArr[fetchMonth]) {
          casesArr[fetchMonth] = chartData[reportType][records]
        } else if (reportType ==='deaths' && chartData[reportType][records] > deathsArr[fetchMonth]) {
          deathsArr[fetchMonth] = chartData[reportType][records]
        } else if (reportType ==='recovered' && chartData[reportType][records] > recoveredArr[fetchMonth]) {
          recoveredArr[fetchMonth] = chartData[reportType][records]
        }
      }
      // fetch the records for 28 of each month
      if (new Date(records).getDate() === 28){
        if (reportType ==='cases') {
          casesArr[fetchMonth] = chartData[reportType][records]
        } else if (reportType ==='deaths') {
          deathsArr[fetchMonth] = chartData[reportType][records]
        } else if (reportType ==='recovered') {
          recoveredArr[fetchMonth] = chartData[reportType][records]
        }
      }
    }
   }

   chartDetails['xlabel'] =  months
   chartDetails['datasets'] = []
   chartDetails['datasets'].push({
     'label' : 'Total Cases',
     'bgcolor' : '#C4C4CA',
     'data' : casesArr
   })
   chartDetails['datasets'].push({
     'label' : 'Total Deaths',
     'bgcolor' : '#F64444',
     'data' : deathsArr
   })
   chartDetails['datasets'].push({
     'label' : 'Total Recovered',
     'bgcolor' : '#5DE240',
     'data' : recoveredArr
   })


   // fetching the chart data ends here

  return (
    <div className={classes.root}>
      <h1>Covid19 Stats</h1>
      <Grid container spacing={2}>
        <Grid item xs>
          <Cards type="Total Cases" case_count={casesArr.slice(-1)[0]} tcolor="#C4C4CA" />
        </Grid>
        <Grid item xs>
          <Cards type="Total Active Cases" case_count={allData.active} tcolor="#F88930" />
        </Grid>
        <Grid item xs>
          <Cards type="Deaths" case_count={deathsArr.slice(-1)[0]} tcolor="#F64444"/>
        </Grid>
        <Grid item xs>
          <Cards type="Total Recovered" case_count={recoveredArr.slice(-1)[0]} tcolor="#5DE240" />
        </Grid>
      </Grid>
      <br /> <Divider />
      <h2>Distribution of number of cases over time</h2>

      <Grid container spacing={2}>
        <Grid item xs>
          <Charts data={chartDetails} />
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs>
          <Charts data={chartDetails} />
        </Grid>
        <Grid item xs>
          <Charts data={chartDetails} />
        </Grid>
      </Grid> */}
      <br />

    </div>

  )
}
