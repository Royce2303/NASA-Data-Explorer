import React from 'react';
import Lottie from 'lottie-react';
import epicLoader from '../assets/epic-loader.json';
import './GlobalLoader.css';

const GlobalLoader = () => (
  <div className="global-loader">
    <Lottie animationData={epicLoader} loop autoplay style={{ height: 200, width: 200 }} />
  </div>
);

export default GlobalLoader;
