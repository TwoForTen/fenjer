import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import useDataFetch from '../hooks/useDataFetch';

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

  const data = useDataFetch({
    url: '/contact',
    method: 'GET',
  });

  return (
    <footer className={classes.footer}>
      <Paper className={classes.footerRoot}>
        <Container>
          <Grid container spacing={6} className={classes.grid}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">DEKORACIJE MAVRIN</Typography>
            </Grid>
            <Grid item md={4} xs={6}>
              <Typography variant="subtitle2">
                <strong>Odaberite</strong>
              </Typography>
              <List className="mt-3">
                <ListItem disableGutters>
                  <Link to="/o-nama">
                    <Typography variant="body2">O Nama</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link to="/maticni-podaci">
                    <Typography variant="body2">Matični Podaci</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link to="/uvjeti-prodaje">
                    <Typography variant="body2">Uvjeti Prodaje</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link to="/proizvodi">
                    <Typography variant="body2">Proizvodi</Typography>
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link to="/kontakt">
                    <Typography variant="body2">Kontakt</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={4} xs={6}>
              <Typography variant="subtitle2">
                <strong>Kontakt Podaci</strong>
              </Typography>
              <List className="mt-3">
                {data ? (
                  <>
                    {data.phones &&
                      data.phones.map((phone) => {
                        return (
                          <ListItem disableGutters key={phone.number}>
                            <a href={`tel:${phone.number}`}>
                              <Typography variant="body2">
                                Info: {phone.number}
                              </Typography>
                            </a>
                          </ListItem>
                        );
                      })}
                    {data.fax && (
                      <ListItem disableGutters>
                        <Typography variant="body2">Fax: {data.fax}</Typography>
                      </ListItem>
                    )}
                    {data.email && (
                      <ListItem disableGutters>
                        <a href={`mailto: ${data.email}`}>
                          <Typography variant="body2">
                            E-mail: {data.email}
                          </Typography>
                        </a>
                      </ListItem>
                    )}
                  </>
                ) : (
                  <>
                    <ListItem disableGutters>
                      <Skeleton variant="text" animation="wave" width={160} />
                    </ListItem>
                    <ListItem disableGutters>
                      <Skeleton variant="text" animation="wave" width={160} />
                    </ListItem>
                    <ListItem disableGutters>
                      <Skeleton variant="text" animation="wave" width={160} />
                    </ListItem>
                    <ListItem disableGutters>
                      <Skeleton variant="text" animation="wave" width={160} />
                    </ListItem>
                  </>
                )}
              </List>
            </Grid>
            <Grid item xs={12} className={classes.copyright}>
              <Typography variant="body2">
                <strong>
                  COPYRIGHT {new Date().getFullYear()} DEKORACIJE MAVRIN D.O.O.,
                  SVA PRAVA ZADRŽANA.
                </strong>
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
