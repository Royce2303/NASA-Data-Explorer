// Import necessary React functions and styles
import React, { useEffect, useState } from "react";
import "./Neo.css";

// Replace with your actual NASA API key when deploying
const API_KEY = process.env.REACT_APP_NASA_API_KEY;


// Main component for Near Earth Object (NEO) page
const Neo = () => {
  // State to store start and end dates for API query
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // State to hold returned NEO data
  const [neoData, setNeoData] = useState([]);

  // State for any error messages
  const [error, setError] = useState("");

  // Function to fetch NEO data from NASA API for a given date range
  const fetchNeoData = async (start, end) => {
    try {
      setError(""); // Clear previous errors
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`
      );
      const data = await response.json();

      // Flatten nested NEO data structure into a single array
      if (data.near_earth_objects) {
        const flattened = Object.values(data.near_earth_objects).flat();
        setNeoData(flattened);
      } else {
        setError("No Near-Earth Object data available for this date range.");
      }
    } catch (err) {
      setError("Error fetching NEO data.");
    }
  };

  // Fetch data for today's date by default on component mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
    fetchNeoData(today, today);
  }, []);

  // Handle form submission to fetch data for selected dates
  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      fetchNeoData(startDate, endDate);
    }
  };

  return (
    <div className="neo-container">
      {/* Page Title and Description */}
      <h1 className="gradient-heading">Near Earth Objects</h1>
      <p className="intro">
        Track asteroids that come close to Earth using NASA's NEO API.
      </p>

      {/* Form to select date range */}
      <form className="neo-form" onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            className="neo-date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            className="neo-date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button type="submit" className="neo-button">
          Search
        </button>
      </form>

      {/* Error display if any */}
      {error && <p className="error">{error}</p>}

      {/* Render cards for each NEO in the selected date range */}
      <div className="neo-cards">
        {neoData.map((neo) => (
          <div key={neo.id} className="neo-card">
            <h3>{neo.name}</h3>

            <p>
              <strong>Approach Date:</strong>{" "}
              {neo.close_approach_data[0]?.close_approach_date}
            </p>

            <p>
              <strong>Estimated Diameter:</strong>{" "}
              {
                neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                  2
                )
              }{" "}
              -{" "}
              {
                neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                  2
                )
              }{" "}
              km
            </p>

            <p>
              <strong>Velocity:</strong>{" "}
              {parseFloat(
                neo.close_approach_data[0]?.relative_velocity
                  .kilometers_per_hour
              ).toFixed(2)}{" "}
              km/h
            </p>

            <p>
              <strong>Miss Distance:</strong>{" "}
              {parseFloat(
                neo.close_approach_data[0]?.miss_distance.kilometers
              ).toFixed(2)}{" "}
              km
            </p>

            {/* Display hazard status with icons */}
            <p>
              <strong>Hazardous:</strong>{" "}
              {neo.is_potentially_hazardous_asteroid ? (
                <>
                  <span style={{ color: "red" }}>❌</span> Yes
                </>
              ) : (
                <>
                  <span style={{ color: "red" }}>❌</span> No
                </>
              )}
            </p>

            {/* Link to official NASA JPL page for more info */}
            <p>
              <a
                href={neo.nasa_jpl_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e26aff", fontWeight: "bold", textDecoration: "none" }}
              >
                NASA JPL Info →
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the component
export default Neo;
