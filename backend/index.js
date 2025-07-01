require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());



const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/apod', async (req, res) => {
  try {
    const { date } = req.query; // optional date in format 'YYYY-MM-DD'
    
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_API_KEY,
        ...(date && { date }) // only add date if it's present
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('NASA API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

app.get('/api/mars', async (req, res) => {
  try {
    const { sol = 1000, rover = 'curiosity' } = req.query; // default to sol 1000
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: {
        sol, // Martian day
        api_key: process.env.NASA_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('NASA Mars API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});
app.get('/api/epic', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/EPIC/api/natural/images', {
      params: {
        api_key: process.env.NASA_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('EPIC API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
});
app.get('/api/neo', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        api_key: process.env.NASA_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('NEO API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});
app.get('/api/library', async (req, res) => {
  try {
    const { q = 'moon' } = req.query; // default search term
    const response = await axios.get('https://images-api.nasa.gov/search', {
      params: { q },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Library API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch NASA media' });
  }
});

