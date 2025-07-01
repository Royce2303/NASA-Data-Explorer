import React from "react";
import "./AboutApi.css";

// Icons for each API card
import { FaSatellite, FaCameraRetro, FaSpaceShuttle, FaCloud, FaPhotoVideo } from "react-icons/fa"; // 🠔 Added FaPhotoVideo for Library

// Hook to navigate between routes
import { useNavigate } from "react-router-dom";

// Array of NASA APIs
const apiData = [
  {
    icon: <FaSatellite />,
    title: "EPIC - Earth Polychromatic Imaging Camera",
    description: "Daily imagery and data from NASA's EPIC instrument onboard the DSCOVR satellite.",
    route: "/epic",
  },
  {
    icon: <FaCameraRetro />,
    title: "APOD - Astronomy Picture of the Day",
    description: "Discover the cosmos! A new image or photograph of our universe is featured daily.",
    route: "/apod",
  },
  {
    icon: <FaSpaceShuttle />,
    title: "Mars Rover Photos",
    description: "Explore Mars through images captured by NASA’s Perseverance, Curiosity, and Opportunity rovers.",
    route: "/mars",
  },
  {
    icon: <FaCloud />,
    title: "NEO - Near Earth Objects",
    description: "Track asteroids and comets that come close to Earth using NASA’s NEO API.",
    route: "/neo",
  },
  {
    // 🠔 Added Library API card
    icon: <FaPhotoVideo />,
    title: "NASA Image and Video Library",
    description: "Search NASA’s official database of over 140,000 images, videos, and audio files.",
    route: "/library",
  },
];

const AboutApi = () => {
  const navigate = useNavigate();

  return (
    <div className="about-api-container">
      <h1 className="gradient-heading">About the NASA APIs</h1>
      <p className="intro">
        Explore powerful public APIs provided by NASA. These APIs offer real-time data, images, and scientific discoveries directly from space.
      </p>

      {/* Render API cards */}
      <div className="api-grid">
        {apiData.map((api, index) => (
          <div
            className="api-card"
            key={index}
            onClick={() => navigate(api.route)}
            style={{ cursor: "pointer" }}
          >
            <div className="api-icon">{api.icon}</div>
            <h3>{api.title}</h3>
            <p>{api.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutApi;
