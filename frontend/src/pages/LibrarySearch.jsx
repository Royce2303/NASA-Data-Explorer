// Import necessary React modules and component CSS
import React, { useState, useEffect } from "react";
import "./Library.css";

// Main component for NASA Image and Video Library
const Library = () => {
  // State for search query and selected media type (image/video/audio)
  const [query, setQuery] = useState("galaxy");

  // State for selected media type (default: image)
  const [mediaType, setMediaType] = useState("image");

  // State to hold the results returned from the API
  const [results, setResults] = useState([]);

  // State to store the user's recent queries from localStorage
  const [recentQueries, setRecentQueries] = useState([]);

  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load recent queries from localStorage and preload results for "galaxy"
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentQueries")) || [];
    setRecentQueries(saved);
    handleSearch("galaxy", "image"); // Preload images on first load
  }, []);

  // Update and persist recent queries in localStorage (limit 5)
  const updateRecentQueries = (newQuery) => {
    if (!newQuery.trim()) return;
    const updated = [newQuery, ...recentQueries.filter((q) => q !== newQuery)].slice(0, 5);
    localStorage.setItem("recentQueries", JSON.stringify(updated));
    setRecentQueries(updated);
  };

  // Clear all recent queries from both state and localStorage
  const clearRecent = () => {
    localStorage.removeItem("recentQueries");
    setRecentQueries([]);
  };

  // Perform the actual API search using the NASA Images API
  const handleSearch = async (overrideQuery = query, overrideType = mediaType) => {
    if (!overrideQuery.trim()) return;

    setLoading(true);     // Show loading indicator
    setError("");         // Clear previous error
    setResults([]);       // Clear previous results

    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=${overrideQuery}&media_type=${overrideType}`
      );
      const data = await res.json();

      const items = data?.collection?.items || [];
      setResults(items);           // Store search results
      updateRecentQueries(overrideQuery); // Save to recent
    } catch (err) {
      setError("Failed to fetch results. Please try again."); // Handle error
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="library-container">
      {/* Page Header */}
      <h1 className="gradient-heading">NASA Image and Video Library</h1>
      <p className="intro">
        Search NASA’s official archive of images and media content.
      </p>

      {/* Search Controls */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter a keyword (e.g. moon, apollo)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
        <button onClick={() => handleSearch()}>Search</button>
      </div>

      {/* Display Recent Queries */}
      {recentQueries.length > 0 && (
        <div className="recent-queries">
          <div className="recent-header">
            <p>Recent Searches:</p>
            <button className="clear-btn" onClick={clearRecent}>
              Clear
            </button>
          </div>
          <div className="query-chips">
            {recentQueries.map((q, i) => (
              <button key={i} onClick={() => handleSearch(q, mediaType)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Display loading/error message */}
      {loading && <p className="loader">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Render the search results */}
      <div className="media-grid">
        {results.map((item, index) => {
          const data = item.data[0];                      // Metadata for the media
          const link = item.links ? item.links[0].href : ""; // Thumbnail or media preview

          return (
            <div className="media-card" key={index}>
              {/* Render image if available */}
              {link && <img src={link} alt={data.title} />}
              <h4>{data.title}</h4>
              {/* Link to open original asset on NASA */}
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                View on NASA ↗
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export component
export default Library;
