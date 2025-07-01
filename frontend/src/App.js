// Importing necessary dependencies from React and React Router
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Importing the navigation bar component
import Navbar from './components/Navbar';

// Importing a global fallback loader to be shown while lazy-loaded components load
import GlobalLoader from './components/GlobalLoader'; // ✅ Custom loading animation

// Lazy loading each page component to optimize performance
const Home = lazy(() => import('./pages/Home'));
const AboutApi = lazy(() => import('./pages/AboutApi'));
const Apod = lazy(() => import('./pages/Apod'));
const MarsRover = lazy(() => import('./pages/MarsRover'));
const LibrarySearch = lazy(() => import('./pages/LibrarySearch'));
const Epic = lazy(() => import('./pages/Epic'));
const Neo = lazy(() => import('./pages/Neo'));

// Main App component
function App() {
  return (
    // BrowserRouter wraps the entire app to enable client-side routing
    <Router>
      {/* Persistent navigation bar at the top */}
      <Navbar />

      {/* Suspense displays fallback UI while lazy-loaded components are being fetched */}
      <Suspense fallback={<GlobalLoader />}> {/* ✅ Custom animated loader */}
        <Routes>
          {/* Defining route paths and corresponding components */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutApi />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/mars" element={<MarsRover />} />
          <Route path="/epic" element={<Epic />} />
          <Route path="/neo" element={<Neo />} />
          <Route path="/search" element={<LibrarySearch />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Exporting the App component as the default export
export default App;
