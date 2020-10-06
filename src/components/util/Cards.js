import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minHeight: 100
  },
  title: {
    fontSize: 14,
  },
  cardcontent: {
    "&:last-child": {
      paddingBottom: 5
    }
  }
});


export default function Cards(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardcontent}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.type}
        </Typography>
        <Typography variant="h3" component="h3" align="right" style={{color: props.tcolor}}>
          {parseFloat(props.case_count).toLocaleString('en-US')}
        </Typography>
        <br/><Divider /> <br />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.sub_type} - {parseFloat(props.sub_case_count).toLocaleString('en-US')}
        </Typography>
      </CardContent>
    </Card>
  )
}

