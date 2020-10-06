import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Charts from '../stats/Charts';


export default function CountryStats({match, location}) {
  let params = useParams()
  const [chartData, setchartData] = useState([]);
  const [chartError, setchartError] = useState(false);
  // const [countryID, setcountryID] = useState('')

  // setcountryID(params.countryID)
  // for fetching the chart data
  const countryID = params.countryID
  const chartDetails = {}
  const currMonth = new Date().getMonth();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].slice(0, currMonth+1)

  const casesArr = new Array(currMonth+1).fill(0);
  const recoveredArr = new Array(currMonth+1).fill(0);
  const deathsArr = new Array(currMonth+1).fill(0);

  useEffect(() => {
    async function fetchAllRecords() {
      const response = await (await fetch("https://disease.sh/v3/covid-19/historical/"+ countryID +"?lastdays=all")).json();
      response.message === "Country not found or doesn't have any historical data" ? setchartError(true) :  setchartError(false)
      setchartData(response["timeline"])
    }
    fetchAllRecords();
  }, [countryID])

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
    <div>
      <h1>Stats for : {params.countryID}</h1>
      <Grid container spacing={2}>
        <Grid item xs>
          {
            chartError ?
              <h3>Couldn't find any historical records for the country code : {params.countryID}</h3> : <Charts data={chartDetails} />
          }
        </Grid>
      </Grid>
    </div>
  )
}
