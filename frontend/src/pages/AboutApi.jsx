import React from "react";
import "./AboutApi.css";

// Importing relevant icons for each API card
import { FaSatellite, FaCameraRetro, FaSpaceShuttle, FaCloud } from "react-icons/fa";

// Importing React Router hook to navigate between routes
import { useNavigate } from "react-router-dom";

// Array of NASA APIs to display on the page
const apiData = [
  {
    icon: <FaSatellite />,
    title: "EPIC - Earth Polychromatic Imaging Camera",
    description: "Daily imagery and data from NASA's EPIC instrument onboard the DSCOVR satellite.",
    route: "/epic", // Route to redirect on click
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
];

// Main component rendering the About APIs page
const AboutApi = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="about-api-container">
      <h1 className="gradient-heading">About the NASA APIs</h1>
      <p className="intro">
        Explore powerful public APIs provided by NASA. These APIs offer real-time data, images, and scientific discoveries directly from space.
      </p>

      {/* Grid of clickable API cards */}
      <div className="api-grid">
        {apiData.map((api, index) => (
          <div
            className="api-card"
            key={index}
            onClick={() => navigate(api.route)} // Navigate to the route on click
            style={{ cursor: "pointer" }} // Pointer cursor on hover
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
