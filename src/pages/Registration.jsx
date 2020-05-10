import React from 'react';
import axios from '../axiosInstance';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
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

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().required().email(),
    address: yup.string().required(),
    city: yup.string().required(),
    postal_code: yup.string().required(),
    country: yup.string().required(),
    mobile_phone: yup.string().required(),
    telephone: yup.string().required(),
    company: yup.string().required(),
    oib: yup.string().required(),
    iban: yup.string().required(),
    password: yup.string().required().min(6),
    password_repeat: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required(),
  });

  return (
    <>
      <PageBreadcrumbs titles={['Registracija']} />
      <Container maxWidth="md">
        <div className={classes.root}>
          <Typography color="textPrimary" className="mb-2" variant="h4">
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
              telephone: '',
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
                telephone,
                company,
                oib,
                iban,
                password,
              } = values;
              axios
                .post('/register', {
                  name,
                  surname,
                  email,
                  address,
                  city,
                  postal_code,
                  country,
                  mobile_phone,
                  telephone,
                  company,
                  oib,
                  iban,
                  password,
                })
                .then((res) => history.push('/prijava'))
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
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.company}
                        label="Tvrtka"
                        variant="outlined"
                        error={errors.company && touched.company && true}
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
                        <Select
                          label="Država"
                          labelId="država"
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
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
                        </Select>
                        <FormHelperText>
                          {errors.country && touched.country && errors.country}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="oib"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.oib}
                        fullWidth
                        label="OIB"
                        variant="outlined"
                        error={errors.oib && touched.oib && true}
                        helperText={errors.oib && touched.oib && errors.oib}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="iban"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.iban}
                        fullWidth
                        label="IBAN"
                        variant="outlined"
                        error={errors.iban && touched.iban && true}
                        helperText={errors.iban && touched.iban && errors.iban}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider className={classes.divider} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        fullWidth
                        label="Ime"
                        variant="outlined"
                        error={errors.name && touched.name && true}
                        helperText={errors.name && touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="surname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.surname}
                        fullWidth
                        label="Prezime"
                        variant="outlined"
                        error={errors.surname && touched.surname && true}
                        helperText={
                          errors.surname && touched.surname && errors.surname
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        fullWidth
                        label="Adresa"
                        variant="outlined"
                        error={errors.address && touched.address && true}
                        helperText={
                          errors.address && touched.address && errors.address
                        }
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        fullWidth
                        label="Mjesto"
                        variant="outlined"
                        error={errors.city && touched.city && true}
                        helperText={errors.city && touched.city && errors.city}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="postal_code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postal_code}
                        fullWidth
                        label="Poštanski broj"
                        variant="outlined"
                        error={
                          errors.postal_code && touched.postal_code && true
                        }
                        helperText={
                          errors.postal_code &&
                          touched.postal_code &&
                          errors.postal_code
                        }
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="mobile_phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobile_phone}
                        fullWidth
                        label="Mobitel"
                        variant="outlined"
                        error={
                          errors.mobile_phone && touched.mobile_phone && true
                        }
                        helperText={
                          errors.mobile_phone &&
                          touched.mobile_phone &&
                          errors.mobile_phone
                        }
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="telephone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.telephone}
                        fullWidth
                        label="Telefon"
                        variant="outlined"
                        error={errors.telephone && touched.telephone && true}
                        helperText={
                          errors.telephone &&
                          touched.telephone &&
                          errors.telephone
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        fullWidth
                        label="E-Mail"
                        variant="outlined"
                        error={errors.email && touched.email && true}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        fullWidth
                        label="Lozinka"
                        type="password"
                        variant="outlined"
                        error={errors.password && touched.password && true}
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12} className="mb-4">
                      <TextField
                        name="password_repeat"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password_repeat}
                        fullWidth
                        label="Potvrda lozinke"
                        type="password"
                        variant="outlined"
                        error={
                          errors.password_repeat &&
                          touched.password_repeat &&
                          true
                        }
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
