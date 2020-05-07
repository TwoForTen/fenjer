import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  paragraphContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4) + theme.spacing(1.5),
    },
  },
  googleMaps: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4) + theme.spacing(1.5),
    },
  },
}));

const Kontakt = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: '0' });
  }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Kontakt']} />
      <Container>
        <div className={classes.paragraphContainer}>
          <Typography color="textPrimary" variant="h6" element="h2">
            Informacije
          </Typography>
          <Typography color="textPrimary" variant="body1" paragraph>
            Ukoliko imate upit vezan uz našu ponudu i poslovanje, slobdno nam se
            obratite putem email formulara ili na naše brojeve telefona.
          </Typography>
          <Typography color="textPrimary" variant="h6" element="h2">
            Info:
          </Typography>
          <Typography color="textPrimary" variant="body1" paragraph>
            Broj telefona mobitela
          </Typography>
          <Typography color="textPrimary" variant="h6" element="h2">
            Fax:
          </Typography>
          <Typography color="textPrimary" variant="body1" paragraph>
            Upisati fax
          </Typography>
          <Typography color="textPrimary" variant="h6" element="h2">
            Email:
          </Typography>
          <Typography color="textPrimary" variant="body1" paragraph>
            Upisati email..
          </Typography>
        </div>
        <iframe
          allowFullScreen
          className={classes.googleMaps}
          frameBorder="0"
          height="450"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAxHcVuajrRGTFmp5bS6NHK8JHA6JlyXH8
          &q=Slavonska%20Avenija%2052"
          title="Maps"
          width="100%"
        ></iframe>
      </Container>
    </>
  );
};

export default Kontakt;
