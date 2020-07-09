import React from 'react';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
    // paddingBottom: '100%',
    '&:hover > $showroomMask': {
      opacity: '1',
      cursor: 'pointer !important',
    },
  },
  showroomImg: {
    width: '100%',
    height: 'auto',
    borderRadius: 'inherit',
    objectFit: 'cover',
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

  const { id, file, type, name } = arrangement;

  console.log(type);

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
      {arrangement && type === 'image' ? (
        <img
          className={classes.showroomImg}
          src={process.env.REACT_APP_PROD_URL + file}
          alt={name}
        />
      ) : (
        type === 'video' && (
          <video
            controls={false}
            autoPlay={false}
            muted
            loop={false}
            className={classes.showroomImg}
          >
            <source
              src={process.env.REACT_APP_PROD_URL + file}
              type="video/mp4"
            />
          </video>
        )
      )}
    </Paper>
  );
};

export default ShowroomCard;
