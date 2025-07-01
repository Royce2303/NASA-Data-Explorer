import React, { useState, useEffect } from "react";
import "./epic.css";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

const API_KEY = process.env.REACT_APP_NASA_API_KEY;

const Epic = () => {
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2024-06-01");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEpicData = async (date) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        setImages([]);
        setError("No data available for selected date.");
      }
    } catch (err) {
      setError("Failed to fetch EPIC data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpicData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const chartData = {
    labels: images.map((img) => img.date.split(" ")[1]), // time portion
    datasets: [
      {
        label: "Latitude",
        data: images.map((img) => img.centroid_coordinates.lat),
        fill: false,
        borderColor: "#4fd1c5",
        tension: 0.4,
      },
      {
        label: "Longitude",
        data: images.map((img) => img.centroid_coordinates.lon),
        fill: false,
        borderColor: "#7f5af0",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="epic-container">
      <h1 className="gradient-heading">EPIC Earth Imagery Viewer 🌍</h1>

      <div className="epic-date-picker">
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {loading && <p className="loader">Loading EPIC images...</p>}
      {error && <p className="error">{error}</p>}

      <div className="epic-grid">
        {images.map((img, i) => {
          const baseUrl = `https://epic.gsfc.nasa.gov/archive/natural/${selectedDate.replaceAll("-", "/")}/png/${img.image}.png`;
          return (
            <div key={i} className="epic-card">
              <img src={baseUrl} alt={img.caption} />
              <div className="epic-info">
                <p><strong>Time:</strong> {img.date.split(" ")[1]}</p>
                <p><strong>Lat:</strong> {img.centroid_coordinates.lat.toFixed(2)} | <strong>Lon:</strong> {img.centroid_coordinates.lon.toFixed(2)}</p>
              </div>
              <a className="epic-link" href={baseUrl} target="_blank" rel="noreferrer">View Full Image ↗</a>
            </div>
          );
        })}
      </div>

      {images.length > 0 && (
        <div className="epic-chart">
          <h2 className="gradient-heading">Satellite Position Over Time</h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Epic;
