import React from 'react';
import { Helmet } from 'react-helmet-async';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import PromotedProducts from '../components/PromotedProducts';

import { makeStyles } from '@material-ui/core/styles';

import imageOne from '../assets/home_carousel1.jpg';
import imageTwo from '../assets/home_carousel2.jpg';
import imageThree from '../assets/home_carousel3.jpg';
import imageFour from '../assets/home_carousel4.png';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '0',
    paddingTop: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();
  // const CAROUSEL_IMAGES = [imageOne, imageTwo, imageThree, imageFour];

  //TODO:: CAROUSEL COMPONENT
  return (
    <>
      <Helmet>
        <title>Fenjer.hr</title>
      </Helmet>
      <Carousel
        className="mb-4 mt-4"
        showThumbs={false}
        showStatus={false}
        autoPlay
        interval={3000}
        infiniteLoop
      >
        <div>
          <img src={imageOne} />
        </div>
        <div>
          <img src={imageTwo} />
        </div>
        <div>
          <img src={imageThree} />
        </div>
        <div>
          <img src={imageFour} />
        </div>
      </Carousel>

      <PromotedProducts />
    </>
  );
};

export default Home;
