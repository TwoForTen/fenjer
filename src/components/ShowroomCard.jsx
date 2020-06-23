import React from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import showroom_img from '../assets/showroom.jpg';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    width: '250px',
    height: '250px',
    backgroundImage: `url(${showroom_img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  showroomImg: {
    width: '100%',
    height: 'auto',
  },
}));

const ShowroomCard = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid item md={3} sm={4} xs={6}>
      <Paper
        // onClick={() => {
        //   history.push(`/showroom/${showroom_id}`);
        // }}
        className={classes.paperRoot}
      ></Paper>
    </Grid>
  );
};

export default ShowroomCard;
