import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet-async';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

import useDataFetch from '../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  navList: {
    color: theme.palette.text.secondary,
    position: 'sticky',
    top: '80px',
  },
  sectionTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  sectionContainer: {
    paddingBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  sectionSubtitle: {
    fontWeight: 'bold',
  },
  sectionList: {
    paddingLeft: theme.spacing(1),
  },
  googleMaps: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(10),
  },
  centeredContainer: {
    textAlign: 'center',
    margin: theme.spacing(3),
  },
  interactiveLink: {
    width: 'fit-content',
  },
}));

const scrollIntoView = (element) => {
  window.scrollTo({
    top:
      document.getElementById(element).offsetTop -
      document.querySelector('header').offsetHeight,
    behavior: 'smooth',
  });
};

const Contact = () => {
  const classes = useStyles();
  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  const [value, setValue] = useState(0);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      return entries.map((entry) => {
        if (entry.isIntersecting) {
          setValue(() => {
            return +entry.target.id.split('index')[1];
          });
        }
      });
    },
    { rootMargin: `-66px 0px -${window.innerHeight - 90}px 0px` }
  );

  const contactData =
    useDataFetch({
      method: 'GET',
      url: '/contact',
    }) || {};

  const {
    email,
    fax,
    field_sales,
    headquarters,
    headquarters_address,
    headquarters_oib,
    phones,
    working_hours,
  } = contactData;

  useEffect(() => {
    const sections = document.querySelectorAll('.contact-section');
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () =>
      sections.forEach((section) => {
        sectionObserver.unobserve(section);
      });
  }, [contactData]);

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Kontakt</title>
      </Helmet>
      <PageBreadcrumbs titles={['Kontakt']} />
      <Container>
        {_.isEmpty(contactData) ? (
          <div className={classes.centeredContainer}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={3} style={{ display: breakpoint && 'none' }}>
              <List className={classes.navList}>
                <ListItem
                  button
                  selected={value === 0}
                  onClick={() => scrollIntoView('index0')}
                >
                  <Typography variant="h6" component="span" color="inherit">
                    Kontakt
                  </Typography>
                </ListItem>
                <ListItem
                  button
                  selected={value === 1}
                  onClick={() => scrollIntoView('index1')}
                >
                  <Typography variant="h6" component="span" color="inherit">
                    Sjedište tvrtke
                  </Typography>
                </ListItem>
                {field_sales &&
                  field_sales.map((field_sale, index) => {
                    return (
                      <ListItem
                        button
                        selected={value === 2 + index}
                        onClick={() => scrollIntoView(`index${2 + index}`)}
                        key={field_sale.name}
                      >
                        <Typography
                          variant="h6"
                          component="span"
                          color="inherit"
                        >
                          {field_sale.name}
                        </Typography>
                      </ListItem>
                    );
                  })}
                <ListItem
                  button
                  selected={value === 2 + (field_sales?.length || 0)}
                  onClick={() =>
                    scrollIntoView(`index${2 + (field_sales?.length || 0)}`)
                  }
                >
                  <Typography variant="h6" component="span" color="inherit">
                    Lokacija
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={breakpoint ? 12 : 9}>
              <div
                id="index0"
                className={`${classes.sectionContainer} contact-section`}
              >
                <Typography
                  className={classes.sectionTitle}
                  color="textPrimary"
                  variant="h6"
                  element="h2"
                >
                  Kontakt
                </Typography>
                {phones && (
                  <div className={classes.sectionList}>
                    <Typography
                      className={classes.sectionSubtitle}
                      color="textPrimary"
                      variant="body1"
                    >
                      Telefon:
                    </Typography>
                    <ul>
                      {phones.map((phone) => {
                        return (
                          <li
                            className={classes.interactiveLink}
                            key={phone.number}
                          >
                            <a href={`tel:${phone.number}`}>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                {phone.number}
                              </Typography>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {fax && (
                  <div className={classes.sectionList}>
                    <Typography
                      className={classes.sectionSubtitle}
                      color="textPrimary"
                      variant="body1"
                    >
                      Fax:
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {fax}
                    </Typography>
                  </div>
                )}
                {email && (
                  <div
                    className={`${classes.sectionList} ${classes.interactiveLink}`}
                  >
                    <Typography
                      className={classes.sectionSubtitle}
                      color="textPrimary"
                      variant="body1"
                    >
                      E-mail:
                    </Typography>
                    <a href={`mailto: ${email}`}>
                      <Typography variant="subtitle1" color="textSecondary">
                        {email}
                      </Typography>
                    </a>
                  </div>
                )}
                {working_hours && (
                  <div className={classes.sectionList}>
                    <Typography
                      className={classes.sectionSubtitle}
                      color="textPrimary"
                      variant="body1"
                    >
                      Radno vrijeme:
                    </Typography>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: working_hours,
                      }}
                      variant="subtitle1"
                      color="textSecondary"
                    ></Typography>
                  </div>
                )}
              </div>
              <div
                id="index1"
                className={`${classes.sectionContainer} contact-section`}
              >
                <Typography
                  className={classes.sectionTitle}
                  color="textPrimary"
                  variant="h6"
                  element="h2"
                >
                  Sjedište tvrtke
                </Typography>
                {headquarters && (
                  <div className={classes.sectionList}>
                    <Typography
                      className={classes.sectionSubtitle}
                      color="textPrimary"
                      variant="body1"
                    >
                      {headquarters}
                    </Typography>
                  </div>
                )}
                {headquarters_oib && (
                  <div className={classes.sectionList}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`OIB: ${headquarters_oib}`}
                    </Typography>
                  </div>
                )}
                {headquarters_address && (
                  <div className={classes.sectionList}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {headquarters_address}
                    </Typography>
                  </div>
                )}
              </div>
              {field_sales &&
                field_sales.map((field_sale, index) => {
                  return (
                    <div
                      id={`index${2 + index}`}
                      className={`${classes.sectionContainer} contact-section`}
                      key={field_sale.name}
                    >
                      <Typography
                        className={classes.sectionTitle}
                        color="textPrimary"
                        variant="h6"
                        element="h2"
                      >
                        {field_sale.name}
                      </Typography>
                      <div className={classes.sectionList}>
                        <Typography
                          className={classes.sectionSubtitle}
                          color="textPrimary"
                          variant="body1"
                        >
                          Područje:
                        </Typography>
                        <ul>
                          {field_sale.areas.split(',').map((area) => {
                            return (
                              <li key={area}>
                                <Typography
                                  variant="subtitle1"
                                  color="textSecondary"
                                >
                                  {area}
                                </Typography>
                              </li>
                            );
                          })}
                        </ul>
                        {field_sale.phone && (
                          <div className={classes.interactiveLink}>
                            <Typography
                              className={classes.sectionSubtitle}
                              color="textPrimary"
                              variant="body1"
                            >
                              Mobitel:
                            </Typography>
                            <a href={`tel:${field_sale.phone}`}>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                {field_sale.phone}
                              </Typography>
                            </a>
                          </div>
                        )}
                        {field_sale.email && (
                          <div className={classes.interactiveLink}>
                            <Typography
                              className={classes.sectionSubtitle}
                              color="textPrimary"
                              variant="body1"
                            >
                              E-mail:
                            </Typography>
                            <a href={`mailto: ${field_sale.email}`}>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                {field_sale.email}
                              </Typography>
                            </a>
                          </div>
                        )}
                        <Typography
                          className={classes.sectionSubtitle}
                          color="textPrimary"
                          variant="body1"
                        >
                          Obilazak komercijaliste:
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {field_sale.tour}
                        </Typography>
                      </div>
                    </div>
                  );
                })}

              <iframe
                allowFullScreen
                className={`contact-section ${classes.googleMaps}`}
                id={`index${2 + (field_sales?.length || 0)}`}
                frameBorder="0"
                height="450"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAxHcVuajrRGTFmp5bS6NHK8JHA6JlyXH8
          &q=Slavonska%20Avenija%2052&language=hr"
                title="Maps"
                width="100%"
              ></iframe>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Contact;
