import React, { useState, useRef } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Payment from '@material-ui/icons/Payment';
import Update from '@material-ui/icons/Update';

import posta from '../../assets/posta.png';

import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import { storePurchase } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  paperRoot: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const deliverRef = useRef();
  const billRef = useRef();

  const [billCheckbox, setBillcheckbox] = useState(true);
  const [note, setNote] = useState('');

  const {
    details: {
      company,
      email,
      name,
      surname,
      city,
      postal_code,
      mobile_phone,
      address,
      payment_deadline,
    },
  } = user;

  const handleSubmit = () => {
    if (deliverRef.current) {
      deliverRef.current.handleSubmit();
    }
    if (billRef.current) {
      billRef.current.handleSubmit();
    }
    if (note?.length > 0) {
      dispatch(storePurchase({ note }));
    }

    history.push({
      pathname: '/zavrsetak-kupnje/pregled-narudzbe',
      state: { fromCheckout: true },
    });
  };

  if (!cart || cart?.length < 1) {
    return <Redirect to="/kosarica" />;
  }

  return (
    <>
      <PageBreadcrumbs titles={['Završetak kupnje']} />
      <div className={classes.containerRoot}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography className="mr-2" color="textPrimary" variant="h5">
              1
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Račun
            </Typography>
          </div>
          <Paper className={classes.paperRoot}>
            {!user.token ? (
              <>
                <Typography variant="body1">
                  Niste se još registrirali / prijavili?
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  <Link
                    to={{
                      pathname: '/prijava',
                      state: { fromCheckout: true },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className="mr-3"
                    >
                      Prijava
                    </Button>
                  </Link>
                  <Link
                    to={{
                      pathname: '/registracija',
                      state: { fromCheckout: true },
                    }}
                  >
                    <Button variant="contained" color="primary">
                      Registracija
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <Typography>{user.name}</Typography>
            )}
          </Paper>
        </div>
        <div className="mb-4">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography className="mr-2" color="textPrimary" variant="h5">
              2
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Korisnički podaci
            </Typography>
          </div>
          <FormControlLabel
            className="mb-3"
            control={
              <Checkbox
                checked={billCheckbox}
                onChange={() => setBillcheckbox((prevState) => !prevState)}
                name="checkedA"
                color="default"
              />
            }
            label={
              <Typography color="textPrimary">
                Koristi istu adresu za dostavu i za račun
              </Typography>
            }
          />
          <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                className="mb-3"
              >
                Podaci za dostavu
              </Typography>
              <Formik
                enableReinitialize
                initialValues={{
                  company: company || '',
                  email: email || '',
                  name: name || '',
                  surname: surname || '',
                  address: address || '',
                  city: city || '',
                  postal_code: postal_code || '',
                  mobile_phone: mobile_phone || '',
                }}
                onSubmit={(values, actions) => {
                  dispatch(
                    storePurchase({
                      delivery_info: values,
                      bill_info: billCheckbox
                        ? values
                        : user.purchase.bill_info,
                    })
                  );
                }}
                innerRef={deliverRef}
              >
                {({ errors, touched, values, handleChange }) => {
                  return (
                    <Form key="deliver">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="company"
                            label="Tvrtka"
                            variant="outlined"
                            value={values.company}
                            onChange={handleChange}
                            helperText={
                              errors.company &&
                              touched.company &&
                              errors.company
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="email"
                            label="E-mail"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            helperText={
                              errors.email && touched.email && errors.email
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="name"
                            label="Ime"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange}
                            helperText={
                              errors.name && touched.name && errors.name
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="surname"
                            label="Prezime"
                            variant="outlined"
                            value={values.surname}
                            onChange={handleChange}
                            helperText={
                              errors.surname &&
                              touched.surname &&
                              errors.surname
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="address"
                            label="Adressa"
                            variant="outlined"
                            value={values.address}
                            onChange={handleChange}
                            helperText={
                              errors.address &&
                              touched.address &&
                              errors.address
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="city"
                            label="Mjesto"
                            variant="outlined"
                            value={values.city}
                            onChange={handleChange}
                            helperText={
                              errors.city && touched.city && errors.city
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="postal_code"
                            label="Poštanski broj"
                            variant="outlined"
                            value={values.postal_code}
                            onChange={handleChange}
                            helperText={
                              errors.postal_code &&
                              touched.postal_code &&
                              errors.postal_code
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="mobile_phone"
                            label="Mobitel"
                            variant="outlined"
                            value={values.mobile_phone}
                            onChange={handleChange}
                            helperText={
                              errors.mobile_phone &&
                              touched.mobile_phone &&
                              errors.mobile_phone
                            }
                          />
                        </Grid>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
            {!billCheckbox && (
              <Grid item md={6} xs={12}>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  className="mb-3"
                >
                  Podaci za račun
                </Typography>
                <Formik
                  initialValues={{
                    company: '',
                    email: '',
                    name: '',
                    surname: '',
                    address: '',
                    city: '',
                    postal_code: '',
                    mobile_phone: '',
                  }}
                  innerRef={billRef}
                  onSubmit={(values, actions) => {
                    dispatch(
                      storePurchase({
                        bill_info: values,
                      })
                    );
                  }}
                >
                  {({ errors, touched, values, handleChange }) => {
                    return (
                      <Form key="bill">
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="company"
                              label="Tvrtka"
                              variant="outlined"
                              value={values.company}
                              onChange={handleChange}
                              helperText={
                                errors.company &&
                                touched.company &&
                                errors.company
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="email"
                              label="E-mail"
                              variant="outlined"
                              value={values.email}
                              onChange={handleChange}
                              helperText={
                                errors.email && touched.email && errors.email
                              }
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              name="name"
                              label="Ime"
                              variant="outlined"
                              value={values.name}
                              onChange={handleChange}
                              helperText={
                                errors.name && touched.name && errors.name
                              }
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              name="surname"
                              label="Prezime"
                              variant="outlined"
                              value={values.surname}
                              onChange={handleChange}
                              helperText={
                                errors.surname &&
                                touched.surname &&
                                errors.surname
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="address"
                              label="Adressa"
                              variant="outlined"
                              value={values.address}
                              onChange={handleChange}
                              helperText={
                                errors.address &&
                                touched.address &&
                                errors.address
                              }
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Field
                              fullWidth
                              name="city"
                              id="city"
                              label="Mjesto"
                              variant="outlined"
                              component={TextField}
                              value={values.city}
                              onChange={handleChange}
                              helperText={
                                errors.city && touched.city && errors.city
                              }
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              name="postal_code"
                              label="Poštanski broj"
                              variant="outlined"
                              value={values.postal_code}
                              onChange={handleChange}
                              helperText={
                                errors.postal_code &&
                                touched.postal_code &&
                                errors.postal_code
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="mobile_phone"
                              label="Mobitel"
                              variant="outlined"
                              value={values.mobile_phone}
                              onChange={handleChange}
                              helperText={
                                errors.mobile_phone &&
                                touched.mobile_phone &&
                                errors.mobile_phone
                              }
                            />
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </Grid>
            )}
          </Grid>
        </div>
        <div className="mb-4">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography className="mr-2" color="textPrimary" variant="h5">
              3
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Način isporuke
            </Typography>
          </div>
          <Paper
            className={classes.paperRoot}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Checkbox defaultChecked color="default" disabled />
            <div
              style={{
                backgroundColor: '#FED006',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                width: '70%',
                height: 'fit-content',
              }}
            >
              <img
                src={posta}
                alt="hrvatska_pošta"
                style={{ height: '100%' }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Typography color="textPrimary">HP - Hrvatska Pošta</Typography>
              <Typography color="textSecondary">
                Dostava u roku 2 radna dana!
              </Typography>
            </div>
          </Paper>
          <Typography className="mb-3" color="textPrimary">
            Ukoliko želite dodati komentar u vezi narudžbe, molimo da ga upišete
            u polje ispod.
          </Typography>
          <TextField
            label="Komentar"
            variant="outlined"
            multiline
            onBlur={(e) => setNote(e.target.value)}
            rows={4}
            fullWidth
          />
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography className="mr-2" color="textPrimary" variant="h5">
              4
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Način plaćanja
            </Typography>
          </div>
          <Paper className={classes.paperRoot}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* <Checkbox defaultChecked color="default" disabled /> */}
              <Payment className="mr-4" fontSize="large" />
              <Typography variant="body1">
                Plaćanje transakcijskim računom
              </Typography>
            </div>
          </Paper>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography className="mr-2" color="textPrimary" variant="h5">
              5
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Odgoda plaćanja
            </Typography>
          </div>
          <Paper className={classes.paperRoot}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* <Checkbox defaultChecked color="default" disabled /> */}
              <Update className="mr-4" fontSize="large" />
              <Typography variant="body1">{`Odgoda plaćanja na ${payment_deadline} dana`}</Typography>
            </div>
          </Paper>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="primary"
          >
            Potvrdi
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
