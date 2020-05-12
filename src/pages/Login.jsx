import React from 'react';
import axios from '../axiosInstance';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Link, useHistory, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import PromotedProducts from './PromotedProducts';

import { userLogin } from '../actions/auth';

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

const validationSchema = yup.object().shape({
  email: yup.string().email('Mora biti valjan E-mail'),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('_jwt'));

  if (token) {
    return <Redirect to="/korisnicki-racun" />;
  }

  return (
    <Container className="mt-4">
      <Paper className={classes.paperRoot}>
        <Grid container spacing={10}>
          <Grid sm={6} xs={12} item>
            <Typography className="mb-4" variant="h6">
              Prijava korisinika
            </Typography>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={({ email, password }, actions) => {
                const body = {
                  email,
                  password,
                };
                axios
                  .post('http://localhost:8000/api/auth/login', body)
                  .then((res) => {
                    localStorage.setItem(
                      '_jwt',
                      JSON.stringify(res.data.access_token)
                    );
                    const expiration = new Date(
                      new Date().getTime() + res.data.expires_in * 1000
                    );
                    localStorage.setItem('expiration_date', expiration);
                    dispatch(userLogin(res.data));
                    history.replace('/korisnicki-racun');
                  })
                  .catch((err) => {
                    actions.setSubmitting(false);
                    actions.setErrors({
                      authError:
                        err.response?.data?.message ||
                        err.response?.data?.error ||
                        'Došlo je do greške, pokušajte ponovo',
                    });
                  });
              }}
              validationSchema={validationSchema}
            >
              {({
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
              }) => {
                return (
                  <form onSubmit={handleSubmit} className={classes.formRoot}>
                    <TextField
                      className={classes.textInput}
                      label="E-mail"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      variant="outlined"
                      error={errors.email && touched.email && true}
                      helperText={errors.email && touched.email && errors.email}
                    />
                    <TextField
                      className={classes.textInput}
                      label="Zaporka"
                      name="password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      variant="outlined"
                      error={errors.password && touched.password && true}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                    />
                    {errors.authError && (
                      <Typography className="mb-2" color="secondary">
                        {errors.authError}
                      </Typography>
                    )}
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Prijava
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <Link to="/">
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
      <PromotedProducts />
    </Container>
  );
};

export default Login;
