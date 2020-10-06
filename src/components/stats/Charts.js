import { Grid } from '@material-ui/core';
import React from 'react';
import {Line} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function Charts(props) {
  const classes = useStyles();

  const data = {
    labels: props.data.xlabel,
    datasets: []
  }
  const chartOptions =  {
    tooltips: {
       mode: 'index',
       intersect: false
    },
    hover: {
       mode: 'index',
       intersect: false
    }
  };
  for (const dataset in props.data.datasets){
    const label = props.data.datasets[dataset]['label']
    const lcolor = props.data.datasets[dataset]['bgcolor']
    data.datasets.push({
      label: label,
      fill: false,
      lineTension: 0.1,
      backgroundColor: lcolor,
      borderColor: lcolor,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: lcolor,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: lcolor,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: props.data.datasets[dataset]['data']
    })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper elevation={3}>
            <Line data={data} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}