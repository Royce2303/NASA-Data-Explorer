import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/space-lottie.json';
import './Home.css';

const Home = () => {
  // Scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.querySelector(".about-section");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <div className="home-container">
        <div className="home-left">
          <h1 className="gradient-heading">NASA Data Explorer</h1>
          <p>An interactive frontend built with React using multiple endpoints from NASA's Open API platform.</p>
          <p>Explore photos from Mars, EPIC Earth imagery, near-Earth asteroids, and more.</p>
          
          {/* ✅ Updated button to scroll to About section */}
          <button className="start-button" onClick={scrollToAbout}>Get Started</button>
        </div>

        <div className="home-right">
          <Lottie animationData={animationData} loop={true} autoplay={true} style={{ height: '300px', width: '300px' }} />
        </div>
      </div>

      {/* ===== About Section ===== */}
      <section className="about-section">
        <h2 className="gradient-heading">About This App</h2>
        <p className="about-description">
          The goal of this application is to create a front-end for the REST APIs that are found in the 
          <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer"> api.nasa.gov</a> catalog.
          These APIs expose a wealth of images and information, such as data on comets, measurements of Mars,
          and real-time imagery of Earth.
        </p>

        {/* ===== Card Grid ===== */}
        <div className="card-container">

          {/* === Card 1: Image & Video Library === */}
          <div className="card">
            <h3 className="card-title gradient-heading">NASA Image and Video Library</h3>
            <p>Search NASA’s official database of over 140,000 photos. Browse stunning images of outer space, astronauts, rocket launches, and more.</p>
            <div className="card-buttons">
              <a href="/search" className="start-button">↪ Check it out</a>
              <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="start-button secondary">ℹ About API</a>
            </div>
          </div>

          {/* === Card 2: EPIC === */}
          <div className="card">
            <h3 className="card-title gradient-heading">Earth Polychromatic Imaging Camera</h3>
            <p>Daily imagery and data collected by the DSCOVR satellite’s EPIC instrument showing Earth in full view.</p>
            <div className="card-buttons">
              <a href="/epic" className="start-button">↪ Check it out</a>
              <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="start-button secondary">ℹ About API</a>
            </div>
          </div>

          {/* === Card 3: APOD === */}
          <div className="card">
            <h3 className="card-title gradient-heading">Astronomy Picture of the Day</h3>
            <p>Each day a different image or video of our fascinating universe is featured with an expert explanation.</p>
            <div className="card-buttons">
              <a href="/apod" className="start-button">↪ Check it out</a>
              <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="start-button secondary">ℹ About API</a>
            </div>
          </div>

          {/* ✅ Card 4: Mars Rover Photos */}
          <div className="card">
            <h3 className="card-title gradient-heading">Mars Rover Photos</h3>
            <p>Images taken by NASA's Curiosity, Opportunity, and Spirit rovers on Mars, organized by date and rover.</p>
            <div className="card-buttons">
              <a href="/mars" className="start-button">↪ Check it out</a>
              <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="start-button secondary">ℹ About API</a>
            </div>
          </div>

          {/* ✅ Card 5: NEO (Asteroids) */}
          <div className="card">
            <h3 className="card-title gradient-heading">Near Earth Object Web Service</h3>
            <p>Track asteroids and comets that pass close to Earth using NASA's NEO API data powered by JPL's Sentry system.</p>
            <div className="card-buttons">
              <a href="/neo" className="start-button">↪ Check it out</a>
              <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="start-button secondary">ℹ About API</a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
