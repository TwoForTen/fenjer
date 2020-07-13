import React from 'react';
import { Helmet } from 'react-helmet-async';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import PromotedProducts from '../components/PromotedProducts';

import imageOne from '../assets/home_carousel1.jpg';
import imageTwo from '../assets/home_carousel2.jpg';
import imageThree from '../assets/home_carousel3.jpg';
import imageFour from '../assets/home_carousel4.png';

const Home = () => {
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
          <img src={imageOne} alt="slika_prva" />
        </div>
        <div>
          <img src={imageTwo} alt="slika_druga" />
        </div>
        <div>
          <img src={imageThree} alt="slika_treća" />
        </div>
        <div>
          <img src={imageFour} alt="slika_četvrta" />
        </div>
      </Carousel>

      <PromotedProducts />
    </>
  );
};

export default Home;
