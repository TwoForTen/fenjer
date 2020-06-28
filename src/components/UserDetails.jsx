import React from 'react';
import axios from '../axiosInstance';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { userLogout } from '../actions/auth';
import { setLoading } from '../actions/loading';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  textInput: {
    marginBottom: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(4)}px ${theme.spacing(10)}px`,
  },
}));

const UserDetails = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    password: yup.string().required().min(6),
    password_repeat: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required(),
  });

  const {
    email,
    company,
    name,
    surname,
    city,
    postal_code,
    mobile_phone,
  } = user;

  return (
    <>
      <div className={classes.root}>
        <Typography color="textPrimary" className="mb-4" variant="h6">
          Korisnički račun
        </Typography>
        <TextField
          fullWidth
          label="E-mail"
          name="email"
          variant="outlined"
          defaultValue={email}
          disabled
          className={classes.textInput}
        />
        <Formik
          validationSchema={validationSchema}
          initialValues={{ password: '', password_repeat: '' }}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      name="password"
                      fullWidth
                      label="Nova zaporka"
                      type="password"
                      variant="outlined"
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      component={TextField}
                      name="password_repeat"
                      fullWidth
                      label="Ponovljena zaporka"
                      type="password"
                      variant="outlined"
                      helperText={
                        errors.password_repeat &&
                        touched.password_repeat &&
                        errors.password_repeat
                      }
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
        <Divider className={classes.divider} />
        <Typography color="textPrimary" className="mb-4" variant="h6">
          Podaci o tvrtki
        </Typography>
        <TextField
          fullWidth
          label="Tvrtka"
          name="company"
          variant="outlined"
          defaultValue={company}
          disabled
          className={classes.textInput}
        />
        <TextField
          fullWidth
          label="Kontakt osoba"
          name="name"
          variant="outlined"
          defaultValue={`${name} ${surname}`}
          disabled
          className={classes.textInput}
        />
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Grad"
              name="city"
              variant="outlined"
              defaultValue={city}
              disabled
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Poštanski broj"
              name="postal_code"
              variant="outlined"
              defaultValue={postal_code}
              disabled
              className={classes.textInput}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Broj mobitela"
          name="mobile_phone"
          variant="outlined"
          defaultValue={mobile_phone}
          disabled
          className={classes.textInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(setLoading());
            axios
              .post('/auth/logout')
              .then(() => {
                dispatch(setLoading());
                dispatch(userLogout(history));
              })
              .catch(() => dispatch(setLoading()));
          }}
        >
          Odjava
        </Button>
      </div>
    </>
  );
};

export default UserDetails;
