import React from 'react';
import axios from '../axiosInstance';
import { Formik, FastField } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select } from 'formik-material-ui';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

import { showSnackbar } from '../actions/snackbar';

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

const COUNTRIES = ['Hrvatska', 'Španjolska', 'Kina', 'Italija', 'Novi Zeland'];

const Registration = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const { state: locationState } = location;

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().required().email(),
    address: yup.string().required(),
    city: yup.string().required(),
    postal_code: yup.string().required(),
    country: yup.string().required(),
    mobile_phone: yup.string().required(),
    company: yup.string().required(),
    oib: yup.string().required(),
    iban: yup.string().required(),
    password: yup.string().required().min(6),
    password_repeat: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required(),
  });

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
              mobile_phone: '',
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
                mobile_phone,
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
                  mobile_phone,
                  company,
                  oib,
                  iban,
                  password,
                })
                .then(() => {
                  history.push({
                    pathname: '/prijava',
                    state: {
                      fromCheckout: locationState?.fromCheckout && true,
                    },
                  });
                  dispatch(
                    showSnackbar({
                      message:
                        'Registracija uspješna. Sada se možete prijaviti.',
                      severity: 'success',
                    })
                  );
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
                      <FormControl
                        variant="outlined"
                        fullWidth
                        error={errors.country && touched.country && true}
                      >
                        <InputLabel className="mb-2" id="država">
                          Država
                        </InputLabel>
                        <FastField
                          label="Država"
                          labelId="država"
                          name="country"
                          component={Select}
                          variant="outlined"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {COUNTRIES.map((country) => {
                            return (
                              <MenuItem value={country} key={country}>
                                {country}
                              </MenuItem>
                            );
                          })}
                        </FastField>
                        <FormHelperText>
                          {errors.country && touched.country && errors.country}
                        </FormHelperText>
                      </FormControl>
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
                        name="mobile_phone"
                        fullWidth
                        label="Mobitel"
                        variant="outlined"
                        helperText={
                          errors.mobile_phone &&
                          touched.mobile_phone &&
                          errors.mobile_phone
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
                    <Typography className="mb-2" color="secondary">
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
    </>
  );
};

export default Registration;
