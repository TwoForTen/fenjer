import React from 'react';
import { useHistory } from 'react-router-dom';

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
    '&:hover > $showroomMask': {
      opacity: '1',
      cursor: 'pointer',
    },
  },
  showroomImg: {
    width: '100%',
    height: 'auto',
    borderRadius: 'inherit',
  },
  showroomMask: {
    height: '100%',
    width: '100%',
    borderRadius: 'inherit',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    top: '0',
    left: '0',
    opacity: '0',
    transition: '300ms',
  },
}));

const ShowroomCard = ({ arrangement }) => {
  const classes = useStyles();
  const history = useHistory();

  const { id, img } = arrangement;

  return (
    <Paper
      onClick={() => {
        history.push(`/showroom/${id}`);
      }}
      className={classes.paperRoot}
    >
      <div className={classes.showroomMask}>
        <Typography>Pogledaj više</Typography>
      </div>
      <img
        className={classes.showroomImg}
        src={process.env.REACT_APP_PROD_URL + img}
        alt="showroom_image"
      />
    </Paper>
  );
};

export default ShowroomCard;
