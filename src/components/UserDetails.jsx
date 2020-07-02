import React from 'react';
import axios from '../axiosInstance';
import { Formik, FastField } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { TextField } from 'formik-material-ui';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    new_password: yup
      .string()
      .min(6, 'Lozinka mora sadržavati barem 6 znakova')
      .max(255, 'Lozinka ne može sadržavati više od 255 znakova'),
    new_password_repeat: yup
      .string()
      .oneOf(
        [yup.ref('new_password'), null],
        'Potvrda lozinke mora biti jednaka lozinki'
      ),
    password: yup.string().required('Lozinka je obavezna'),
  });

  const {
    email,
    company,
    name,
    surname,
    city,
    postal_code,
    phone,
    oib,
    iban,
    country,
    address,
  } = user;

  return (
    <>
      <div className={classes.root}>
        <Typography color="textPrimary" className="mb-4" variant="h6">
          Korisnički račun
        </Typography>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: name || '',
            surname: surname || '',
            email: email || '',
            address: address || '',
            city: city || '',
            postal_code: postal_code || '',
            country: country || '',
            phone: phone || '',
            company: company || '',
            oib: oib || '',
            iban: iban || '',
            new_password: '',
            new_password_repeat: '',
            password: '',
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            axios
              .post('/auth/update-profile', values)
              .then((res) => actions.setSubmitting(false));
          }}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FastField
                  fullWidth
                  component={TextField}
                  label="E-mail"
                  name="email"
                  variant="outlined"
                  helperText={errors.email && touched.email && errors.email}
                  className={classes.textInput}
                />
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <FastField
                      component={TextField}
                      name="new_password"
                      fullWidth
                      label="Nova lozinka"
                      type="password"
                      variant="outlined"
                      helperText={
                        errors.new_password &&
                        touched.new_password &&
                        errors.new_password
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FastField
                      component={TextField}
                      name="new_password_repeat"
                      fullWidth
                      label="Ponovljena lozinka"
                      type="password"
                      variant="outlined"
                      helperText={
                        errors.new_password_repeat &&
                        touched.new_password_repeat &&
                        errors.new_password_repeat
                      }
                    />
                  </Grid>
                </Grid>

                <Divider className={classes.divider} />
                <Typography color="textPrimary" className="mb-4" variant="h6">
                  Podaci o tvrtki
                </Typography>
                <FastField
                  fullWidth
                  component={TextField}
                  label="Tvrtka"
                  name="company"
                  variant="outlined"
                  className={classes.textInput}
                  helperText={
                    errors.company && touched.company && errors.company
                  }
                />
                <FastField
                  fullWidth
                  component={TextField}
                  label="Država"
                  name="country"
                  variant="outlined"
                  className={classes.textInput}
                  helperText={
                    errors.country && touched.country && errors.country
                  }
                />
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <FastField
                      fullWidth
                      component={TextField}
                      label="Ime"
                      name="name"
                      variant="outlined"
                      helperText={errors.name && touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FastField
                      fullWidth
                      component={TextField}
                      label="Prezime"
                      name="surname"
                      variant="outlined"
                      helperText={
                        errors.surname && touched.surname && errors.surname
                      }
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <FastField
                      fullWidth
                      component={TextField}
                      label="Grad"
                      name="city"
                      variant="outlined"
                      helperText={errors.city && touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FastField
                      fullWidth
                      component={TextField}
                      label="Poštanski broj"
                      name="postal_code"
                      variant="outlined"
                      className={classes.textInput}
                      helperText={
                        errors.postal_code &&
                        touched.postal_code &&
                        errors.postal_code
                      }
                    />
                  </Grid>
                </Grid>
                <FastField
                  fullWidth
                  component={TextField}
                  label="Adresa"
                  name="address"
                  variant="outlined"
                  className={classes.textInput}
                  helperText={
                    errors.address && touched.address && errors.address
                  }
                />
                <FastField
                  fullWidth
                  component={TextField}
                  label="Broj mobitela"
                  name="phone"
                  variant="outlined"
                  className={classes.textInput}
                  helperText={errors.phone && touched.phone && errors.phone}
                />
                <FastField
                  fullWidth
                  component={TextField}
                  label="OIB"
                  name="oib"
                  variant="outlined"
                  className={classes.textInput}
                  helperText={errors.oib && touched.oib && errors.oib}
                />
                <FastField
                  fullWidth
                  component={TextField}
                  label="IBAN"
                  name="iban"
                  variant="outlined"
                  className={classes.textInput}
                  helperText={errors.iban && touched.iban && errors.iban}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  disabled={isSubmitting}
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                  disabled={isSubmitting}
                >
                  Ažuriraj račun
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Potvrdite lozinku</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Molimo Vas upišite lozinku kako bi ažurirali Vaš profil:
                    </DialogContentText>
                    <FastField
                      fullWidth
                      type="password"
                      margin="dense"
                      component={TextField}
                      label="Lozinka"
                      name="password"
                      variant="outlined"
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                    />
                  </DialogContent>
                  <DialogActions className="mt-2 mb-1 mr-3">
                    <Button
                      variant="outlined"
                      onClick={handleClose}
                      color="secondary"
                    >
                      Odustani
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      color="secondary"
                      onClick={() => {
                        handleClose();
                        handleSubmit();
                      }}
                    >
                      Potvrdi
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UserDetails;
