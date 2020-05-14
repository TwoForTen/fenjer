import React from 'react';
import { Helmet } from 'react-helmet-async';

import PromotedProducts from '../components/PromotedProducts';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import imageOne from '../assets/home_carousel1.jpg';
import imageTwo from '../assets/home_carousel2.jpg';
import imageThree from '../assets/home_carousel3.jpg';
import imageFour from '../assets/home_carousel4.png';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '60vh',
    marginBottom: '50px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();
  const CAROUSEL_IMAGES = [imageOne, imageTwo, imageThree, imageFour];

  //TODO:: CAROUSEL COMPONENT
  return (
    <>
      <Helmet>
        <title>Fenjer</title>
      </Helmet>
      <div
        className={classes.container}
        style={{ backgroundImage: `url(${imageFour})` }}
      />
      <Container>
        <PromotedProducts />
      </Container>
    </>
  );
};

export default Home;
