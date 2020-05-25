import React from 'react';
import { Helmet } from 'react-helmet-async';

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

const Terms = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Uvjeti Prodaje</title>
      </Helmet>
      <PageBreadcrumbs titles={['Uvjeti prodaje']} />
      <div className={classes.paragraphContainer}>
        <Typography color="textPrimary" variant="h6" element="h2">
          Besplatna dostava:
        </Typography>
        <Typography color="textPrimary" variant="body1" paragraph>
          Dostava je besplatna za narudžbe veće od 500 kuna na području cijele
          Hrvatske.
        </Typography>
        <Typography color="textPrimary" variant="h6" element="h2">
          Naručivanje:
        </Typography>
        <Typography color="textPrimary" variant="body1" paragraph>
          Svakog radnog dana od 6 do 14 sati telefonom (01/napisati)
          <br />
          <br />U bilo koje vrijeme telefaxom na 01/24 10 739, te na e-mail:
          napisati mail ili putem interneta na adres: www.dekoracijemavrin.hr
          <br />
          <br />
          Osobnim dolaskom u veleprodajni centar, Slavonska Avenija 52, Zagreb
          <br />
          <br />
          Za područje Zagreba isporuka je u roku od 24 sata, za kupce izvan
          Zagreba narudžbe se primaju najkasnije 48 sati od primitka narudžbe,
          osim ako nije naznačeno drugačije
        </Typography>
      </div>
    </>
  );
};

export default Terms;
