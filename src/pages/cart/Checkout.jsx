import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Formik, Form } from 'formik';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

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
import { showSnackbar } from '../../actions/snackbar';

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
    token,
  } = user;

  const validationSchema = yup.object().shape({
    delivery_info: yup.object().shape({
      company: yup.string().required('Ime tvrtke je obavezno'),
      email: yup
        .string()
        .required('E-mail je obavezan')
        .email('Mora biti valjani e-mail'),
      name: yup.string().required('Ime je obavezno'),
      surname: yup.string().required('Prezime je obavezno'),
      city: yup.string().required('Grad je obavezan'),
      postal_code: yup.string().required('Poštanski broj je obavezan'),
      mobile_phone: yup
        .string()
        .required('Broj mobitela je obavezan')
        .matches(
          /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
          'Mora biti valjani broj mobitela'
        ),
      address: yup.string().required('Adresa je obavezna'),
    }),
    bill_info:
      !billCheckbox &&
      yup.object().shape({
        company: yup.string().required('Ime tvrtke je obavezno'),
        email: yup
          .string()
          .required('E-mail je obavezan')
          .email('Mora biti valjani e-mail'),
        name: yup.string().required('Ime je obavezno'),
        surname: yup.string().required('Prezime je obavezno'),
        city: yup.string().required('Grad je obavezan'),
        postal_code: yup.string().required('Poštanski broj je obavezan'),
        mobile_phone: yup
          .string()
          .required('Broj mobitela je obavezan')
          .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            'Mora biti valjani broj mobitela'
          ),
        address: yup.string().required('Adresa je obavezna'),
      }),
  });

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
          <Formik
            enableReinitialize
            initialValues={{
              delivery_info: {
                company: user.purchase?.delivery_info?.company || company || '',
                email: user.purchase?.delivery_info?.email || email || '',
                name: user.purchase?.delivery_info?.name || name || '',
                surname: user.purchase?.delivery_info?.surname || surname || '',
                address: user.purchase?.delivery_info?.address || address || '',
                city: user.purchase?.delivery_info?.city || city || '',
                postal_code:
                  user.purchase?.delivery_info?.postal_code ||
                  postal_code ||
                  '',
                mobile_phone:
                  user.purchase?.delivery_info?.mobile_phone ||
                  mobile_phone ||
                  '',
              },
              bill_info: {
                company: user.purchase?.bill_info?.company || '',
                email: user.purchase?.bill_info?.email || '',
                name: user.purchase?.bill_info?.name || '',
                surname: user.purchase?.bill_info?.surname || '',
                address: user.purchase?.bill_info?.address || '',
                city: user.purchase?.bill_info?.city || '',
                postal_code: user.purchase?.bill_info?.postal_code || '',
                mobile_phone: user.purchase?.bill_info?.mobile_phone || '',
              },
            }}
            validateOnChange={false}
            validateOnMount
            onSubmit={(values) => {
              if (token) {
                dispatch(
                  storePurchase({
                    delivery_info: values.delivery_info,
                    bill_info: billCheckbox
                      ? values.delivery_info
                      : values.bill_info,
                    note: note?.length > 0 && note,
                  })
                );
                history.push({
                  pathname: '/zavrsetak-kupnje/pregled-narudzbe',
                  state: { fromCheckout: true },
                });
              } else {
                dispatch(
                  showSnackbar({
                    message: 'Niste prijavljeni.',
                    severity: 'error',
                  })
                );
              }
            }}
            validationSchema={validationSchema}
            innerRef={deliverRef}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => {
              return (
                <Form key="deliver">
                  <Grid container spacing={6}>
                    <Grid item container md={6} xs={12} spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="textPrimary">
                          Podaci za dostavu
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.company"
                          label="Tvrtka"
                          variant="outlined"
                          value={values?.delivery_info?.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.company &&
                            touched?.delivery_info?.company &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.company &&
                            touched?.delivery_info?.company &&
                            errors?.delivery_info?.company
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.email"
                          label="E-mail"
                          variant="outlined"
                          value={values?.delivery_info?.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.email &&
                            touched?.delivery_info?.email &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.email &&
                            touched?.delivery_info?.email &&
                            errors?.delivery_info?.email
                          }
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.name"
                          label="Ime"
                          variant="outlined"
                          value={values?.delivery_info?.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.name &&
                            touched?.delivery_info?.name &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.name &&
                            touched?.delivery_info?.name &&
                            errors?.delivery_info?.name
                          }
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.surname"
                          label="Prezime"
                          variant="outlined"
                          value={values?.delivery_info?.surname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.surname &&
                            touched?.delivery_info?.surname &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.surname &&
                            touched?.delivery_info?.surname &&
                            errors?.delivery_info?.surname
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.address"
                          label="Adresa"
                          variant="outlined"
                          value={values?.delivery_info?.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.address &&
                            touched?.delivery_info?.address &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.address &&
                            touched?.delivery_info?.address &&
                            errors?.delivery_info?.address
                          }
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.city"
                          label="Mjesto"
                          variant="outlined"
                          value={values?.delivery_info?.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.city &&
                            touched?.delivery_info?.city &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.city &&
                            touched?.delivery_info?.city &&
                            errors?.delivery_info?.city
                          }
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.postal_code"
                          label="Poštanski broj"
                          variant="outlined"
                          value={values?.delivery_info?.postal_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.postal_code &&
                            touched?.delivery_info?.postal_code &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.postal_code &&
                            touched?.delivery_info?.postal_code &&
                            errors?.delivery_info?.postal_code
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="delivery_info.mobile_phone"
                          label="Mobitel"
                          variant="outlined"
                          value={values?.delivery_info?.mobile_phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.delivery_info?.mobile_phone &&
                            touched?.delivery_info?.mobile_phone &&
                            true
                          }
                          helperText={
                            errors?.delivery_info?.mobile_phone &&
                            touched?.delivery_info?.mobile_phone &&
                            errors?.delivery_info?.mobile_phone
                          }
                        />
                      </Grid>
                    </Grid>
                    {!billCheckbox && (
                      <Grid item container md={6} xs={12} spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="textPrimary">
                            Podaci za račun
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.company"
                            label="Tvrtka"
                            variant="outlined"
                            value={values?.bill_info?.company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.company &&
                              touched?.bill_info?.company &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.company &&
                              touched?.bill_info?.company &&
                              errors?.bill_info?.company
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.email"
                            label="E-mail"
                            variant="outlined"
                            value={values?.bill_info?.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.email &&
                              touched?.bill_info?.email &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.email &&
                              touched?.bill_info?.email &&
                              errors?.bill_info?.email
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.name"
                            label="Ime"
                            variant="outlined"
                            value={values?.bill_info?.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.name &&
                              touched?.bill_info?.name &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.name &&
                              touched?.bill_info?.name &&
                              errors?.bill_info?.name
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.surname"
                            label="Prezime"
                            variant="outlined"
                            value={values?.bill_info?.surname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.surname &&
                              touched?.bill_info?.surname &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.surname &&
                              touched?.bill_info?.surname &&
                              errors?.bill_info?.surname
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.address"
                            label="Adresa"
                            variant="outlined"
                            value={values?.bill_info?.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.address &&
                              touched?.bill_info?.address &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.address &&
                              touched?.bill_info?.address &&
                              errors?.bill_info?.address
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.city"
                            label="Mjesto"
                            variant="outlined"
                            value={values?.bill_info?.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.city &&
                              touched?.bill_info?.city &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.city &&
                              touched?.bill_info?.city &&
                              errors?.bill_info?.city
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.postal_code"
                            label="Poštanski broj"
                            variant="outlined"
                            value={values?.bill_info?.postal_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.postal_code &&
                              touched?.bill_info?.postal_code &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.postal_code &&
                              touched?.bill_info?.postal_code &&
                              errors?.bill_info?.postal_code
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="bill_info.mobile_phone"
                            label="Mobitel"
                            variant="outlined"
                            value={values?.bill_info?.mobile_phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.bill_info?.mobile_phone &&
                              touched?.bill_info?.mobile_phone &&
                              true
                            }
                            helperText={
                              errors?.bill_info?.mobile_phone &&
                              touched?.bill_info?.mobile_phone &&
                              errors?.bill_info?.mobile_phone
                            }
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Form>
              );
            }}
          </Formik>
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
            defaultValue={user.purchase?.note || ''}
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
              <Typography
                variant="body1"
                color={!payment_deadline && 'secondary'}
              >
                {payment_deadline
                  ? `Odgoda plaćanja na ${payment_deadline} dana`
                  : 'Prijavite se kako bi izračunali vašu odgodu plaćanja'}
              </Typography>
            </div>
          </Paper>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => {
              if (deliverRef.current) {
                if (_.isEmpty(deliverRef.current.errors)) {
                  deliverRef.current.handleSubmit();
                } else {
                  dispatch(
                    showSnackbar({
                      message: 'Provjerite jesu li sva polja ispravna.',
                      severity: 'error',
                    })
                  );
                }
              }
            }}
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
