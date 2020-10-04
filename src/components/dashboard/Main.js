import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Cards from '../util/Cards';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Main() {
  const classes = useStyles();
  const [allData, setallData] = useState([]);

  useEffect(() => {
    async function fetchAllRecords() {
      const response = await (await fetch("https://disease.sh/v3/covid-19/all?allowNull=true")).json();
      setallData(response)
    }
    fetchAllRecords();
  }, [])

  return (
    <div className={classes.root}>
      Covid19 stats here -
      <Grid container spacing={2}>
        <Grid item xs>
          <Cards type="Total Cases" case_count={allData.cases} tcolor="#C4C4CA" />
        </Grid>
        <Grid item xs>
          <Cards type="Total Active Cases" case_count={allData.active} tcolor="#F88930" />
        </Grid>
        <Grid item xs>
          <Cards type="Deaths" case_count={allData.deaths} tcolor="#F64444"/>
        </Grid>
        <Grid item xs>
          <Cards type="Total Recovered" case_count={allData.recovered} tcolor="#5DE240" />
        </Grid>
      </Grid>
      <br /> <Divider /> <br />
      Charts comes here
    </div>
  )
}
