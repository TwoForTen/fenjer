import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import NavButtons from '../components/NavButtons';

import notFoundLogo from '../assets/404_logo.png';
// import valovi from '../assets/valovi.svg';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    width: '100%',
    height: '0',
    paddingTop: '60%',
    backgroundImage: `url(${notFoundLogo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  // waves: {
  //   minWidth: '100vw',
  //   paddingTop: '30%',
  //   marginTop: '30%',
  //   position: 'absolute',
  //   left: '0',
  //   bottom: '0',
  //   backgroundImage: `url(${valovi})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'top',
  // },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <div className={classes.container}></div>
        <Typography variant="h6" color="textPrimary">
          Uuups, nažalost ne možemo naći stranicu koju tražite!
        </Typography>
        <NavButtons />
      </Container>
      {/* <div className={classes.waves} /> */}
    </>
  );
};

export default NotFound;
