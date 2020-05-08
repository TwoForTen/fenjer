import React, { useState } from 'react';
import { Formik } from 'formik';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
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

  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
          <Formik>
            {() => {
              return (
                <form>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Tvrtka" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel className="mb-2" id="država">
                          Država
                        </InputLabel>
                        <Select
                          label="Država"
                          labelId="država"
                          onChange={handleChange}
                          value={age}
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
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField fullWidth label="OIB" variant="outlined" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField fullWidth label="IBAN" variant="outlined" />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider className={classes.divider} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField fullWidth label="Ime" variant="outlined" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField fullWidth label="Prezime" variant="outlined" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField fullWidth label="Adresa" variant="outlined" />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField fullWidth label="Mjesto" variant="outlined" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Poštanski broj"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField fullWidth label="Mobitel" variant="outlined" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField fullWidth label="Telefon" variant="outlined" />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField fullWidth label="E-Mail" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Lozinka"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} className="mb-4">
                      <TextField
                        fullWidth
                        label="Potvrda lozinke"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    style={{ float: 'right' }}
                    variant="contained"
                    color="primary"
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
