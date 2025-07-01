# 🌌 NASA Data Explorer

Explore the universe like never before with the **NASA Data Explorer** — a full-stack web application built using React and Node.js (Express).  
This interactive platform integrates NASA’s open APIs to bring stunning space imagery and data visualization to your fingertips.

---

## 🚀 Live Demo

🌐 View the deployed app on Vercel:  
[https://nasa-data-explorer-wheat.vercel.app](https://nasa-data-explorer-wheat.vercel.app)

---

## 📂 Project Structure

```
├── frontend/         # React UI for NASA data interaction
├── backend/          # Node.js + Express API proxy server
└── README.md         # You're here!
```

---

## ✨ Features

### 🔭 APIs Integrated
- Astronomy Picture of the Day (APOD)
- Mars Rover Photos
- Earth Polychromatic Imaging Camera (EPIC)
- Near Earth Object Web Service (NeoWs)
- NASA Image and Video Library

### 📊 Data Visualization
- Charts and graphs for EPIC and NEO APIs
- Interactive image galleries and date pickers

### 🧠 Smart UI
- Responsive layout and animated elements
- Filters, search inputs, modals, and randomizers
- Smooth loading states and error handling

### 🔧 Backend
- Acts as a middleware between frontend and NASA APIs
- Secure `.env` file for API key handling
- Rate-limit-friendly design

---

## 🛠️ Getting Started

### 🔗 Clone the Repo

```bash
git clone https://github.com/your-username/nasa-data-explorer.git
cd nasa-data-explorer
```

### 📦 Install Dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

### 🔑 Add Your NASA API Key

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_NASA_API_KEY=your_actual_key_here
```

Create a `.env` file in the `backend/` directory (if needed):

```env
NASA_API_KEY=your_actual_key_here
PORT=5000
```

---

## 🧪 Run Locally

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## ✅ Testing

Tests are written using **Jest** and **React Testing Library**.

```bash
cd frontend
npm test
```

---

## 📦 Deployment

- **Frontend**: Vercel  
- **Backend**: (Optional - for proxying) Render / Cyclic / Railway / localhost  
- Vercel is configured with environment variables through the dashboard.

---

## 🧠 Technologies Used

- **Frontend**: React, Chart.js, Recharts, DateFns, Lottie, CSS3  
- **Backend**: Node.js, Express, dotenv  
- **Testing**: Jest, React Testing Library  
- **Deployment**: Vercel (Frontend), GitHub (Repo)
