import React from 'react';
import { Helmet } from 'react-helmet-async';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import useDataFetch from '../hooks/useDataFetch';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  paragraphContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
  },
}));

const LegalDocs = () => {
  const classes = useStyles();

  const data = useDataFetch({
    url: '/master-data',
    method: 'GET',
  });

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Matični Podaci</title>
      </Helmet>
      <PageBreadcrumbs titles={['Matični podaci']} />
      {data ? (
        <div className={classes.paragraphContainer}>
          <Typography color="textPrimary" variant="h4" element="h2">
            DEKORACIJE MAVRIN d.o.o.
          </Typography>
          <Typography color="textSecondary" variant="body1" paragraph>
            Veleprodaja i maloprodaja cvijeća
          </Typography>
          <Typography color="textSecondary" variant="body1" paragraph>
            Osnovano: {data.founded}
            <br />
            Adresa središnjice: {data.headquarters_address}
            <br />
            Sud upisa: {data.registered_in_court}
            <br />
            OIB: {data.oib}
            <br />
            <br />
            Temeljni kapital je{' '}
            {new Intl.NumberFormat('hr-HR', {
              style: 'currency',
              currency: 'HRK',
            }).format(data.starting_capital)}
            <br />
            Uprava: {data.corporate}
          </Typography>
          <Typography color="textPrimary" variant="h6" element="h2">
            Besplatna dostava:
          </Typography>
          <Typography color="textSecondary" variant="body1" paragraph>
            Žiro račun: {data.giro}
            <br />
            IBAN: {data.iban}
          </Typography>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }} className="mt-4 mb-4">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default LegalDocs;
