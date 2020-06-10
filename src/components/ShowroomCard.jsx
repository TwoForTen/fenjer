import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    width: '250px',
    height: '250px',
  },
}));

const ShowroomCard = () => {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Paper className={classes.paperRoot}></Paper>
    </Grid>
  );
};

export default ShowroomCard;
