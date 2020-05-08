import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: theme.spacing(6),
    marginBottom: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
  },
  formRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(7),
    marginBottom: theme.spacing(2),
  },
  textInput: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
}));

const Prijava = () => {
  const classes = useStyles();
  return (
    <Container className="mt-4">
      <Paper className={classes.paperRoot}>
        <Grid container spacing={10}>
          <Grid sm={6} xs={12} item>
            <Typography className="mb-4" variant="h6">
              Prijava korisinika
            </Typography>
            <Formik>
              {() => {
                return (
                  <form className={classes.formRoot}>
                    <TextField
                      className={classes.textInput}
                      label="Korisničko ime"
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textInput}
                      label="Zaporka"
                      type="password"
                      variant="outlined"
                    />
                    <Button variant="contained" color="primary">
                      Prijava
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <Link>
              <Typography variant="caption">Zaboravili ste zaporku?</Typography>
            </Link>
          </Grid>
          <Grid sm={6} xs={12} item>
            <Typography className="mb-4" variant="h6">
              Niste registrirani korisnik?
            </Typography>
            <Link to="/registracija">
              <Button color="primary" variant="contained">
                Registriraj se
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Prijava;
