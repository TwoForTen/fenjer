import React from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import showroom_img from '../assets/showroom.jpg';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '100%',
  },
  showroomImg: {
    width: '100%',
    height: 'auto',
    borderRadius: 'inherit',
  },
}));

const ShowroomCard = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper
      // onClick={() => {
      //   history.push(`/showroom/${showroom_id}`);
      // }}
      className={classes.paperRoot}
    >
      <img
        className={classes.showroomImg}
        src={showroom_img}
        alt="showroom_image"
      />
    </Paper>
  );
};

export default ShowroomCard;
