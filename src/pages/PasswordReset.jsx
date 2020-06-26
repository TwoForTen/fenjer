import React, { useState } from 'react';
import _ from 'lodash';
import { useParams, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headline: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));

const PasswordReset = () => {
  const params = useParams();
  const classes = useStyles();

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    password_repeat: '',
  });

  const handleChange = (e) => {
    e.persist();
    setInputValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const schemaValidation = yup.object().shape({
    email: yup
      .string()
      .email('Mora biti valjani e-email')
      .required('E-mail je obavezan'),
    password: yup.string().required('Lozinka je obavzena').min(6),
    password_repeat: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('Ponovljena zaporka je obavezna'),
  });

  if (params.tokenSlug === '') {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={classes.headline}>
        <Typography variant="h6" color="textPrimary">
          Promjena lozinke
        </Typography>
      </div>
      <Container maxWidth="sm" className="mt-4 mb-4">
        <TextField
          type="email"
          name="email"
          label="E-mail"
          variant="outlined"
          value={inputValues.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          name="password"
          label="Nova lozinka"
          variant="outlined"
          value={inputValues.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          name="password_repeat"
          label="Potvrda lozinke"
          value={inputValues.password_repeat}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          style={{ marginLeft: 'auto', display: 'block' }}
          variant="contained"
          color="secondary"
          className="mt-3"
          onClick={() => {
            schemaValidation.validate({});
          }}
        >
          Potvrdi
        </Button>
      </Container>
    </>
  );
};

export default PasswordReset;
