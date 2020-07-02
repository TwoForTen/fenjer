import React, { useEffect } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet-async';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import NavButtons from '../../components/NavButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textMargin: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  paperRoot: {
    padding: theme.spacing(4),
    width: '100%',
  },
  paperContent: {
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const OrderFinished = ({ orderError, paymentInfo }) => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Završetak Kupnje</title>
      </Helmet>
      <div className={classes.root}>
        <div style={{ textAlign: 'center' }}>
          <Typography color="textPrimary" variant="h3" component="h1">
            {orderError ? 'Uuups greška!' : 'Uspješno zaprimljena narudžba!'}
          </Typography>
          <Typography
            className={classes.textMargin}
            variant="body1"
            color="textSecondary"
            paragraph
          >
            {orderError
              ? 'Došlo je do greške prilikom izrade narudžbe, molimo Vas da se vratite nazad ili nas kontaktirajte putem mail-a ili putem mobitela'
              : 'Vaša narudžba je zaprimljena! Dobiti ćete e-mail s ostalim podacima vezanim za narudžbu. Ako imate kakvih pitanja slobodno nas kontaktirajte putem mail-a ili putem mobitela.'}
          </Typography>
        </div>
        {!_.isEmpty(paymentInfo) && !orderError && (
          <Paper className={classes.paperRoot}>
            <Typography variant="button">
              <strong>Informacije o plaćanju</strong>
            </Typography>
            <ul className={classes.paperContent}>
              <li>
                <Typography color="textSecondary">
                  {paymentInfo.headquarters}
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary">
                  {paymentInfo.headquarters_address}
                </Typography>
              </li>
              <br />
              <li>
                <Typography color="textSecondary">
                  OIB: {paymentInfo.headquarters_oib}
                </Typography>
              </li>
              <br />
              <li>
                <Typography color="textSecondary">
                  IBAN: {paymentInfo.iban}
                </Typography>
              </li>
              <br />
              <li>
                <Typography color="textSecondary">
                  Prodajni centar: {paymentInfo.name}
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary">Informacije:</Typography>
                {paymentInfo.phones.map((phone) => {
                  return (
                    <Typography key={phone.number} color="textSecondary">
                      {phone.number}
                    </Typography>
                  );
                })}
              </li>
              <li>
                <Typography color="textSecondary">
                  {paymentInfo.working_hours?.split('<br>')[0]}
                </Typography>
              </li>
            </ul>
          </Paper>
        )}
        <NavButtons />
      </div>
    </>
  );
};

export default OrderFinished;
