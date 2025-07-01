// Import React and React Hooks
import React, { useState, useEffect } from "react";
// Import CSS specific to this page
import "./MarsRover.css";

// NASA API key (replace with real key in production)
const API_KEY = process.env.REACT_APP_NASA_API_KEY;

const MarsRover = () => {
  // === State Variables ===
  const [camera, setCamera] = useState("FHAZ"); // selected camera type
  const [date, setDate] = useState("2020-07-01"); // Earth date input
  const [photos, setPhotos] = useState([]); // fetched photos
  const [error, setError] = useState(""); // error messages
  const [loading, setLoading] = useState(false); // loading status
  const [modalImg, setModalImg] = useState(null); // modal image view

  // === Fetch default photos on initial load ===
  useEffect(() => {
    fetchPhotos(date, camera);
  }, []);

  // === Fetch photos from NASA Mars Rover API ===
  const fetchPhotos = async (targetDate, targetCamera) => {
    setError("");       // reset any previous errors
    setPhotos([]);      // clear previous photos
    setLoading(true);   // show loading

    try {
      // Build API URL using selected date and camera
      const endpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${targetDate}&camera=${targetCamera}&api_key=${API_KEY}`;
      const res = await fetch(endpoint);  // make request
      const data = await res.json();      // parse JSON response
      setLoading(false);                  // stop loading

      // If photos found, update state; else show error
      if (data.photos && data.photos.length > 0) {
        setPhotos(data.photos);
      } else {
        setError("No photos found for the selected criteria.");
      }
    } catch (err) {
      // Catch and show fetch errors
      setLoading(false);
      setError("Failed to fetch data. Please try again.");
    }
  };

  // === Handle form submission to fetch new photos ===
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    fetchPhotos(date, camera);
  };

  // === Generate a random date between Curiosity's landing and today ===
  const getRandomDate = () => {
    const start = new Date("2012-08-06"); // Curiosity's landing
    const end = new Date();               // today
    const random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return random.toISOString().split("T")[0]; // format as YYYY-MM-DD
  };

  // === Handle random photo fetch ===
  const handleRandom = () => {
    const random = getRandomDate(); // generate date
    setDate(random);                // update UI
    fetchPhotos(random, camera);   // fetch photos
  };

  // === Main JSX UI ===
  return (
    <div className="mars-rover-container">
      {/* Title & Intro */}
      <h1 className="gradient-heading">Mars Rover Photos</h1>
      <p className="intro">Explore Mars with Curiosity! Use Earth date to search images.</p>

      {/* === Search Form === */}
      <form className="rover-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="camera">Camera:</label>
          <select id="camera" value={camera} onChange={(e) => setCamera(e.target.value)}>
            <option value="FHAZ">Front Hazard</option>
            <option value="RHAZ">Rear Hazard</option>
            <option value="NAVCAM">Navigation</option>
            <option value="MAST">Mast</option>
            <option value="CHEMCAM">ChemCam</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="earth-date">Earth Date:</label>
          <input
            id="earth-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Submit and Random Day Buttons */}
        <button type="submit">Search</button>
        <button type="button" onClick={handleRandom}>🎲 Random Day</button>
      </form>

      {/* === Feedback UI === */}
      {loading && <div className="loader">Loading...</div>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* === Photo Gallery === */}
      <div className="photo-gallery">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card"
            onClick={() => setModalImg(photo.img_src)} // open modal
          >
            <img src={photo.img_src} alt={photo.camera.full_name} />
            <p>{photo.camera.full_name}</p>
          </div>
        ))}
      </div>

      {/* === Modal for full-size photo === */}
      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="modal-content">
            <img src={modalImg} alt="Mars Full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsRover;
