import React from 'react';
import axios from '../axiosInstance';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { showSnackbar } from '../actions/snackbar';

const useStyles = makeStyles((theme) => ({
  headline: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));

const PasswordReset = () => {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Mora biti valjani e-email')
      .required('E-mail je obavezan'),
    password: yup
      .string()
      .required('Lozinka je obavzena')
      .min(6, 'Lozinka mora sadržavati barem 6 znakova'),
    password_confirmation: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Potvrda lozinke mora biti jednaka lozinki'
      )
      .required('Ponovljena lozinka je obavezna'),
  });

  if (params.tokenSlug === '') {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Promjena lozinke</title>
      </Helmet>

      <div className={classes.headline}>
        <Typography variant="h6" color="textPrimary">
          Promjena lozinke
        </Typography>
      </div>
      <Container maxWidth="sm" className="mt-4 mb-4">
        <Formik
          initialValues={{
            email: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            axios
              .post('/auth/reset-password', {
                ...values,
                token: params.tokenSlug,
              })
              .then((res) => {
                history.replace('/prijava');
                dispatch(
                  showSnackbar({
                    message: res.data.message,
                    severity: 'success',
                  })
                );
              })
              .catch((err) => {
                dispatch(
                  showSnackbar({
                    message: err.response.data.message,
                    severity: 'error',
                  })
                );
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <TextField
                  type="email"
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={!!errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                  margin="normal"
                />
                <TextField
                  type="password"
                  name="password"
                  label="Nova lozinka"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password && touched.password}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="password"
                  name="password_confirmation"
                  label="Potvrda lozinke"
                  value={values.password_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  error={
                    !!errors.password_confirmation &&
                    touched.password_confirmation
                  }
                  helperText={
                    errors.password_confirmation &&
                    touched.password_confirmation &&
                    errors.password_confirmation
                  }
                  fullWidth
                  margin="normal"
                />
                <Button
                  style={{ marginLeft: 'auto', display: 'block' }}
                  variant="contained"
                  color="secondary"
                  className="mt-3"
                  type="submit"
                >
                  Potvrdi
                </Button>
              </form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default PasswordReset;
