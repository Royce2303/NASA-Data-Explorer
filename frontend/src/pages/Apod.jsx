// Importing React and necessary hooks
import React, { useState, useEffect } from "react";

// Importing the component-specific CSS
import "./apod.css";

// Functional component to display NASA's Astronomy Picture of the Day
const Apod = () => {
  // State for the APOD data fetched from the API
  const [apodData, setApodData] = useState(null);

  // State to track the selected date, initialized to today's date
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);

  // Loading state to display a loading message while fetching data
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the APOD API for a given date
  const fetchApod = async (date) => {
    setLoading(true); // Begin loading
    try {
      // Call NASA's APOD API with the selected date and demo API key
     const API_KEY = process.env.REACT_APP_NASA_API_KEY;
	const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);

      const data = await res.json();
      setApodData(data); // Store the fetched data
    } catch (err) {
      console.error("Error fetching APOD data:", err); // Log any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch the APOD data when the component mounts or selectedDate changes
  useEffect(() => {
    fetchApod(selectedDate);
  }, [selectedDate]);

  // Handle date selection change from the input field
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Display a loading message while the data is being fetched
  if (loading) {
    return <div className="apod-loading">Loading NASA's picture of the day...</div>;
  }

  // Render the APOD content
  return (
    <div className="apod-container">
      {/* Page Title */}
      <h1 className="apod-title">Astronomy Picture of the Day</h1>

      {/* Date selector input */}
      <div className="apod-date-picker">
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          max={new Date().toISOString().split("T")[0]} // Prevent future date selection
          onChange={handleDateChange}
        />
      </div>

      {/* Display APOD data if available */}
      {apodData && (
        <div className="apod-card">
          {/* Image or Video rendering based on media type */}
          {apodData.media_type === "image" ? (
            <img className="apod-image" src={apodData.url} alt={apodData.title} />
          ) : (
            <iframe
              className="apod-video"
              src={apodData.url}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              title="NASA Video"
            />
          )}

          {/* Information section with title, description, and buttons */}
          <div className="apod-info">
            <h2>{apodData.title}</h2>
            <p className="apod-date">{apodData.date}</p>
            <p className="apod-desc">{apodData.explanation}</p>
            <div className="apod-buttons">
              {/* Button to view full image in a new tab */}
              {apodData.media_type === "image" && (
                <a
                  className="apod-btn"
                  href={apodData.hdurl || apodData.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Full Image
                </a>
              )}
              {/* Button to open original link on NASA */}
              <a className="apod-btn" href={apodData.url} target="_blank" rel="noreferrer">
                Open in NASA →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the Apod component
export default Apod;
