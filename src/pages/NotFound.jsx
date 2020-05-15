import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import notFoundLogo from '../assets/404_logo.png';

const useStyles = makeStyles((theme) => ({
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
  buttonsContainer: {
    display: 'flex',
    margin: `${theme.spacing(6)}px 0`,
  },
  buttonLink: {
    margin: `0 ${theme.spacing(2)}px`,
    minWidth: '160px',
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <div className={classes.container}></div>
      <Typography variant="h6" color="textPrimary">
        Uuups, nažalost ne možemo naći stranicu koju tražite!
      </Typography>
      <div className={classes.buttonsContainer}>
        <Link to="/" className={classes.buttonLink}>
          <Button fullWidth variant="contained" color="primary">
            Početna
          </Button>
        </Link>
        <Link to="/kontakt" className={classes.buttonLink}>
          <Button fullWidth variant="contained" color="secondary">
            Kontakt
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
