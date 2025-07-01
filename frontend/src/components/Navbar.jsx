// Import React and hooks
import React, { useState } from "react";

// Import navigation helper from React Router
import { NavLink } from "react-router-dom";

// Import custom styles for the navbar
import "./Navbar.css";

// Import icon components from react-icons
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";

// Navbar component definition
const Navbar = () => {
  // State to control whether mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Toggles the hamburger menu open/close state
  const toggleMenu = () => setIsOpen(!isOpen);

  // Closes menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      {/* Left brand logo and title */}
      <div className="navbar-brand">
        <span role="img" aria-label="rocket">🚀</span>{" "}
        <span className="gradient-heading">NASA Explorer</span>
      </div>

      {/* Hamburger icon for mobile menu */}
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation links */}
      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu} end>
            Home
          </NavLink>
        </li>
	<li>
          <NavLink to="/about" onClick={closeMenu}>
            About API
          </NavLink>
        </li>
        <li>
          <NavLink to="/apod" onClick={closeMenu}>
            APOD
          </NavLink>
        </li>
        <li>
          <NavLink to="/epic" onClick={closeMenu}>
            EPIC
          </NavLink>
        </li>
        <li>
          <NavLink to="/mars" onClick={closeMenu}>
            Mars
          </NavLink>
        </li>
        <li>
          <NavLink to="/neo" onClick={closeMenu}>
            NEO
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" onClick={closeMenu}>
            Library
          </NavLink>
        </li>

        {/* GitHub external link icon */}
        <li className="github-link">
          <a
            href="https://github.com/your-username/your-repo" // Replace this with your actual repo link
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

// Export Navbar for use in App.js and other components
export default Navbar;
