import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Payment from '@material-ui/icons/Payment';

import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import posta from '../../assets/posta.png';

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
  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.user.token);

  if (!cart || cart?.length < 1) {
    return <Redirect to="/kosarica" />;
  }

  return (
    <>
      <PageBreadcrumbs titles={['Završetak kupnje']} />
      <Container className={classes.containerRoot}>
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
            {!token ? (
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
                  <Link to="/prijava">
                    <Button
                      variant="contained"
                      color="primary"
                      className="mr-3"
                    >
                      Prijava
                    </Button>
                  </Link>
                  <Link to="/registracija">
                    <Button variant="contained" color="primary">
                      Registracija
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <Typography>Paula Mavrin</Typography>
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
              Adresa dostave
            </Typography>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedA}
                // onChange={handleChange}
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
          <Grid container spacing={0}>
            <Grid item sm={6} xs={12}>
              <Formik
                initialValues={{
                  company: '',
                  name: '',
                  surname: '',
                  address: '',
                  city: '',
                  postal_code: '',
                  mobile_phone: '',
                }}
              >
                {(errors, touched) => {
                  return (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            name="company"
                            id="company"
                            label="Tvrtka"
                            variant="outlined"
                            component={TextField}
                            helperText={
                              errors.company &&
                              touched.company &&
                              errors.company
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <Field
                            fullWidth
                            name="name"
                            id="name"
                            label="Ime"
                            variant="outlined"
                            component={TextField}
                            helperText={
                              errors.name && touched.name && errors.name
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <Field
                            fullWidth
                            name="surname"
                            id="surname"
                            label="Prezime"
                            variant="outlined"
                            component={TextField}
                            helperText={
                              errors.surname &&
                              touched.surname &&
                              errors.surname
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            name="address"
                            id="address"
                            label="Adressa"
                            variant="outlined"
                            component={TextField}
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
                            helperText={
                              errors.city && touched.city && errors.city
                            }
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <Field
                            fullWidth
                            name="postal_code"
                            id="postal_code"
                            label="Prezime"
                            variant="outlined"
                            component={TextField}
                            helperText={
                              errors.postal_code &&
                              touched.postal_code &&
                              errors.postal_code
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            name="mobile_phone"
                            id="mobile_phone"
                            label="Mobitel"
                            variant="outlined"
                            component={TextField}
                            helperText={
                              errors.mobile_phone &&
                              touched.mobile_phone &&
                              errors.mobile_phone
                            }
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Potvrdi
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
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
              <Checkbox defaultChecked color="default" disabled />
              <Payment className="ml-3 mr-4" fontSize="large" />
              <Typography variant="body1">
                Plaćanje transakcijskim računom
              </Typography>
            </div>
          </Paper>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button style={{}} variant="contained" color="primary">
            Potvrdi
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
