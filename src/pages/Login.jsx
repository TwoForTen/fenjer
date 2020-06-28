import React, { useState } from 'react';
import axios from '../axiosInstance';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import PromotedProducts from '../components/PromotedProducts';

import { userLogin } from '../actions/auth';
import { setLoading } from '../actions/loading';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: theme.spacing(6),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
  },
  formRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(7),
    marginBottom: theme.spacing(2),
  },
  textInput: {
    marginBottom: theme.spacing(3),
  },
  forgotPasswordButton: {
    textTransform: 'initial',
    padding: theme.spacing(1),
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
}));

const validationSchema = yup.object().shape({
  email: yup.string().email('Mora biti valjan E-mail'),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.loading);

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const { state: locationState } = location;

  const handleClose = () => {
    setPasswordModalOpen(false);
    setTimeout(() => {
      setSuccessMessage(false);
      setEmailValue('');
    }, 500);
  };

  if (token) {
    return <Redirect to="/korisnicki-racun" />;
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Prijava</title>
      </Helmet>
      <Paper className={classes.paperRoot}>
        <Grid container spacing={10}>
          <Grid sm={6} xs={12} item>
            <Typography className="mb-4" variant="h6">
              Prijava korisnika
            </Typography>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={({ email, password }, actions) => {
                const body = {
                  email,
                  password,
                };
                dispatch(setLoading());
                axios
                  .post(`${process.env.REACT_APP_PROD_URL}api/auth/login`, body)
                  .then((res) => {
                    dispatch(setLoading());
                    localStorage.setItem(
                      '_jwt',
                      JSON.stringify(res.data.access_token)
                    );
                    const expiration = new Date(
                      new Date().getTime() + res.data.expires_in * 1000
                    );
                    localStorage.setItem('expiration_date', expiration);
                    dispatch(userLogin(res.data));
                    history.push(
                      locationState?.fromCheckout ? '/zavrsetak-kupnje' : '/'
                    );
                  })
                  .catch((err) => {
                    dispatch(setLoading());
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
                      fullWidth
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
                      fullWidth
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
            <Button
              className={classes.forgotPasswordButton}
              variant="text"
              size="small"
              onClick={() => setPasswordModalOpen(true)}
            >
              Zaboravili ste lozinku?
            </Button>
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
      <Dialog open={passwordModalOpen} onClose={handleClose}>
        <DialogTitle>
          {!successMessage ? 'Zaboravili ste lozinku?' : 'Uspijeh!'}
        </DialogTitle>
        <DialogContent>
          {!successMessage ? (
            <>
              <DialogContentText>
                Molimo Vas da unesete e-mail svog korisničkog računa kako bi
                obnovili Vašu lozinku.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="E-mail"
                type="email"
                variant="outlined"
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
                error={!!emailError}
                helperText={emailError && emailError}
                fullWidth
              />
            </>
          ) : (
            <DialogContentText>
              E-mail s poveznicom za promjenu lozinke je uspješno poslan na{' '}
              <strong>{emailValue}</strong>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions className="mt-2 mb-1 mr-3">
          {!successMessage ? (
            <>
              <Button
                variant="outlined"
                onClick={handleClose}
                color="secondary"
              >
                Odustani
              </Button>
              <Button
                endIcon={loading && <CircularProgress size={18} />}
                disabled={loading}
                disableElevation
                variant="contained"
                onClick={handleClose}
                color="secondary"
                onClick={() => {
                  // TODO: Convert To useReducer !!!!
                  validationSchema
                    .validate({
                      email: emailValue,
                    })
                    .then((res) => {
                      setEmailError('');
                      dispatch(setLoading());
                      axios
                        .post('/auth/send-password-reset-link', res)
                        .then(() => {
                          setSuccessMessage(true);
                          dispatch(setLoading());
                        })
                        .catch((err) => {
                          dispatch(setLoading());
                          setEmailError(err.response.data.message);
                        });
                    })
                    .catch((err) => setEmailError(err.message));
                }}
              >
                Potvrdi
              </Button>
            </>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleClose}>
              U redu
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
