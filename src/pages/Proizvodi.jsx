import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  paragraphContainer: {
    padding: theme.spacing(4) + theme.spacing(1.5),
  },
}));

const Proizvodi = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: '0' });
  }, []);

  return (
    <>
      <PageBreadcrumbs title="Proizvodi" />
      <Container>
        <div className={classes.paragraphContainer}>
          <Typography color="textPrimary" variant="h6" element="h2">
            Proizvodi
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Proizvodi;
