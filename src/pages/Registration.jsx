import React, { useState } from 'react';
import axios from '../axiosInstance';
import { Formik, FastField } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  divider: {
    margin: `${theme.spacing(4)}px ${theme.spacing(10)}px`,
  },
}));

const Registration = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const { state: locationState } = location;

  const [modalOpen, setModalOpen] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Ime je obavezno')
      .max(100, 'Ime ne može sadržavati više od 100 znakova'),
    surname: yup
      .string()
      .required('Prezime je obavezno')
      .max(100, 'Prezime ne može sadržavati više od 100 znakova'),
    email: yup
      .string()
      .required('Email je obavezan')
      .email('E-mail mora biti pravilno formatiran')
      .max(255, 'E-mail ne može sadržavati više od 255 znakova'),
    address: yup
      .string()
      .required('Adresa je obavezna')
      .max(255, 'Adresa ne može sadržavati više od 255 znakova'),
    city: yup
      .string()
      .required('Grad je obavezan')
      .max(255, 'Grad ne može sadržavati više od 255 znakova'),
    postal_code: yup
      .string()
      .required('Poštanski broj je obavezan')
      .max(50, 'Poštanski broj ne može sadržavati više od 50 znakova'),
    country: yup
      .string()
      .required('Država je obavezna')
      .max(255, 'Država ne može sadržavati više od 255 znakova'),
    phone: yup
      .string()
      .required('Broj mobitela je obavezan')
      .max(100, 'Broj mobitela ne može sadržavati više od 100 znakova'),
    company: yup
      .string()
      .required('Tvrtka je obavezna')
      .max(255, 'Ime tvrtke ne može sadržavati više od 255 znakova'),
    oib: yup
      .string()
      .required('OIB je obavezan')
      .max(50, 'OIB ne može sadržavati više od 50 znakova'),
    iban: yup
      .string()
      .required('IBAN je obavezan')
      .max(50, 'IBAN ne može sadržavati više od 100 znakova'),
    password: yup
      .string()
      .required('Lozinka je obavzena')
      .min(6, 'Lozinka mora sadržavati barem 6 znakova')
      .max(255, 'Lozinka ne može sadržavati više od 255 znakova'),
    password_repeat: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Potvrda lozinke mora biti jednaka lozinki'
      )
      .required('Ponovljena lozinka je obavezna'),
  });

  const redirectToLogin = () => {
    setModalOpen(false);
    history.push({
      pathname: '/prijava',
      state: {
        fromCheckout: locationState?.fromCheckout && true,
      },
    });
  };

  if (token) {
    return <Redirect to="korisnicki-racun" />;
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Registracija</title>
      </Helmet>
      <PageBreadcrumbs titles={['Registracija']} />
      <Container maxWidth="md">
        <div className={classes.root}>
          <Typography color="textPrimary" className="mb-2" variant="h6">
            Novi korisnik
          </Typography>
          <Typography color="textPrimary" className="mb-4" variant="body2">
            Svi podaci su obavezni
          </Typography>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              email: '',
              address: '',
              city: '',
              postal_code: '',
              country: '',
              phone: '',
              company: '',
              oib: '',
              iban: '',
              password: '',
              password_repeat: '',
            }}
            onSubmit={(values, actions) => {
              const {
                name,
                surname,
                email,
                address,
                city,
                postal_code,
                country,
                phone,
                company,
                oib,
                iban,
                password,
              } = values;
              axios
                .post('/auth/register', {
                  name,
                  surname,
                  email,
                  address,
                  city,
                  postal_code,
                  country,
                  phone,
                  company,
                  oib,
                  iban,
                  password,
                })
                .then(() => {
                  setModalOpen(true);
                })
                .catch((err) => {
                  actions.setSubmitting(false);
                  actions.setErrors({
                    authError:
                      err.response.data?.errors?.email[0] ||
                      err.response.data?.message ||
                      'Došlo je do greške, pokušajte ponovo',
                  });
                });
            }}
            validationSchema={validationSchema}
          >
            {({ errors, touched, handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <FastField
                        fullWidth
                        name="company"
                        id="company"
                        label="Tvrtka"
                        variant="outlined"
                        component={TextField}
                        helperText={
                          errors.company && touched.company && errors.company
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FastField
                        fullWidth
                        name="country"
                        id="country"
                        label="Država"
                        variant="outlined"
                        component={TextField}
                        helperText={
                          errors.country && touched.country && errors.country
                        }
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FastField
                        component={TextField}
                        name="oib"
                        fullWidth
                        label="OIB"
                        variant="outlined"
                        helperText={errors.oib && touched.oib && errors.oib}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FastField
                        component={TextField}
                        name="iban"
                        fullWidth
                        label="IBAN"
                        variant="outlined"
                        helperText={errors.iban && touched.iban && errors.iban}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider className={classes.divider} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <FastField
                        component={TextField}
                        name="name"
                        fullWidth
                        label="Ime"
                        variant="outlined"
                        helperText={errors.name && touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FastField
                        component={TextField}
                        name="surname"
                        fullWidth
                        label="Prezime"
                        variant="outlined"
                        helperText={
                          errors.surname && touched.surname && errors.surname
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FastField
                        component={TextField}
                        name="address"
                        fullWidth
                        label="Adresa"
                        variant="outlined"
                        helperText={
                          errors.address && touched.address && errors.address
                        }
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <FastField
                        component={TextField}
                        name="city"
                        fullWidth
                        label="Mjesto"
                        variant="outlined"
                        helperText={errors.city && touched.city && errors.city}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FastField
                        component={TextField}
                        name="postal_code"
                        fullWidth
                        label="Poštanski broj"
                        variant="outlined"
                        helperText={
                          errors.postal_code &&
                          touched.postal_code &&
                          errors.postal_code
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FastField
                        component={TextField}
                        name="phone"
                        fullWidth
                        label="Mobitel"
                        variant="outlined"
                        helperText={
                          errors.phone && touched.phone && errors.phone
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                      <FastField
                        component={TextField}
                        name="email"
                        fullWidth
                        label="E-Mail"
                        variant="outlined"
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FastField
                        component={TextField}
                        name="password"
                        fullWidth
                        label="Lozinka"
                        type="password"
                        variant="outlined"
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12} className="mb-4">
                      <FastField
                        component={TextField}
                        name="password_repeat"
                        fullWidth
                        label="Potvrda lozinke"
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
                  {errors.authError && (
                    <Typography
                      style={{ textAlign: 'right' }}
                      className="mb-2"
                      color="secondary"
                    >
                      {errors.authError}
                    </Typography>
                  )}
                  <Button
                    style={{ float: 'right' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="mb-4"
                  >
                    Registriraj se
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
      <Dialog
        style={{ textAlign: 'center' }}
        open={modalOpen}
        onClose={redirectToLogin}
      >
        <DialogTitle>Uspješno ste se registrirali!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hvala Vam na uspješnoj registraciji! Sada se možete prijaviti sa
            svojim e-mailom i lozinkom!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={redirectToLogin} color="primary" autoFocus>
            Razumijem
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Registration;
