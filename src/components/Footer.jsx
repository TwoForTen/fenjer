import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/fenjer_logo.svg';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    marginTop: 'auto',
  },
  footerRoot: {
    borderRadius: '0',
    boxShadow: 'none',
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    // textAlign: 'center',
  },
  logoContainer: {
    width: '150px',
    height: 'auto',
  },
  grid: {
    width: '100%',
    margin: '0',
  },
  copyright: {
    textAlign: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Paper className={classes.footerRoot}>
        <Container>
          <Grid container spacing={6} className={classes.grid}>
            <Grid item md={4} xs={12}>
              <div className={classes.logoContainer}>
                <img src={logo} alt="fenjer_logo" />
              </div>
            </Grid>
            <Grid item md={4} xs={6}>
              <Typography variant="subtitle2">Odaberite</Typography>
              <List className="mt-3">
                <ListItem>
                  <Link to="o-nama">
                    <Typography variant="body2">O Nama</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/maticni-podaci">
                    <Typography variant="body2">Matični Podaci</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/uvjeti-prodaje">
                    <Typography variant="body2">Uvjeti Prodaje</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/proizvodi">
                    <Typography variant="body2">Proizvodi</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/kontakt">
                    <Typography variant="body2">Kontakt</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={4} xs={6}>
              <Typography variant="subtitle2">Kontakt Podaci</Typography>
              <List className="mt-3">
                <ListItem>
                  <Typography variant="body2">Info: +385 98 283 610</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Info: +385 98 437 649</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Info: Upisati Broj</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Fax: Upisati Fax</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Email: Upisati Email</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} className={classes.copyright}>
              <Typography variant="body2">
                COPYRIGHT 2020 DEKORACIJE MAVRIN D.O.O., SVA PRAVA ZADRŽANA.
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.copyright}>
              <Typography variant="caption" color="textSecondary">
                Dekoracije Mavrin d.o.o., Sjedište: Dravska 26 A, 10040 Zagreb,
                Hrvatska - OIB: 90083475889 Upisan u registar trgovačkog suda u
                Zagrebu: Tt-17/22039-4, MBS: 081103509 - IBAN
                HR8724840081135037396 Raiffeisenbank Austria d.d. - Temeljni
                kapital: 20.000,00 upisan u cijelosti - član uprave: Mario
                Mavrin
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </footer>
  );
};

export default Footer;
