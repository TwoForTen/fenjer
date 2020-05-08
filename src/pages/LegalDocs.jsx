import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  paragraphContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4) + theme.spacing(1.5),
    },
  },
}));

const LegalDocs = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: '0' });
  }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Matični podaci']} />
      <Container>
        <div className={classes.paragraphContainer}>
          <Typography color="textPrimary" variant="h4" element="h2">
            DEKORACIJE MAVRIN d.o.o.
          </Typography>
          <Typography color="textPrimary" variant="body1" paragraph>
            Veleprodaja i maloprodaja cvijeća
          </Typography>
          <Typography color="textPrimary" variant="body1" paragraph>
            Osnovano:
            <br />
            Adresa središnjice:
            <br />
            Sud upisa:
            <br />
            OIB:
            <br />
            <br />
            Temeljni kapital je
            <br />
            Uprava:
          </Typography>
          <Typography color="textPrimary" variant="h6" element="h2">
            Besplatna dostava:
          </Typography>
          <Typography color="textPrimary" variant="body1" paragraph>
            Žiro račun:
            <br />
            IBAN:
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default LegalDocs;
