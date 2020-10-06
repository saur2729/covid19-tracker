import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

const columns = [
  { id: 'country', label: 'Country'},
  { id: 'cases', label: 'Total Cases', format: (value) => value.toLocaleString('en-US')},
  { id: 'todayCases', label: 'Today Cases', format: (value) => value.toLocaleString('en-US')},
  { id: 'deaths', label: 'Total Deaths', format: (value) => value.toLocaleString('en-US')},
  { id: 'todayDeaths', label: 'Today Deaths', format: (value) => value.toLocaleString('en-US')},
  { id: 'recovered', label: 'Recoverd', format: (value) => value.toLocaleString('en-US')},
  { id: 'todayRecovered', label: 'Today Recovered', format: (value) => value.toLocaleString('en-US')},
  { id: 'active', label: 'Total Active', format: (value) => value.toLocaleString('en-US')},
  { id: 'casesPerOneMillion', label: 'Cases/mn', format: (value) => value.toLocaleString('en-US')},
  { id: 'deathsPerOneMillion', label: 'Deaths/mn', format: (value) => value.toLocaleString('en-US')},
  { id: 'critical', label: 'Critical', format: (value) => value.toLocaleString('en-US')}
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 700,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(2),
  },
}));

export default function CovidTable() {
  const classes = useStyles();
  const [apiData, setapiData] = useState([]);
  // const [tableRowData, settableRowData] = useState([]);

  const rows = []
  function createData(cntry, flag, iso3, cases, recovered, deaths, active, critical, todayCases, todayRecovered, todayDeaths, casesPerOneMillion, deathsPerOneMillion, updated) {
    var country = [cntry, flag, iso3]
    return {country, cases, recovered, deaths, active, critical, todayCases, todayRecovered, todayDeaths, casesPerOneMillion, deathsPerOneMillion, updated};
  }
//value.countryInfo.flag
  function addRowData() {
    for (const [index, value] of apiData.entries()) {
      rows.push(createData(value.country, value.countryInfo.flag, value.countryInfo.iso3, value.cases, value.recovered, value.deaths, value.active, value.critical, value.todayCases, value.todayRecovered, value.todayDeaths, value.casesPerOneMillion, value.deathsPerOneMillion, value.updated))
      // console.log("Pushed data for #"+index+" "+value.country)
    }
  }

  useEffect(() => {
    async function fetchAllData() {
      const response = await fetch("https://disease.sh/v3/covid-19/countries?sort=cases");
      const json = await response.json();
      setapiData(json)
    }
    fetchAllData();
  },[])

  addRowData()

  return (
    <>
    <Typography variant="h5" component="h5">Covid-19 updates for each country</Typography>
    <br />
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.country}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    function genTableCell(){
                      if (column.id === 'country'){
                        return (
                          <TableCell key={column.id} style={{display: "inline-flex"}}>
                            <Avatar variant="square" src={value[1]} className={classes.small} />
                            &nbsp; &nbsp; &nbsp;
                            <NavLink to={'/country/'+value[2]} activeStyle={{fontWeight: "bold", color: "red" }}> {value[0]}</NavLink>
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      }
                    }
                    return (
                      genTableCell()
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
    </>
  );
}