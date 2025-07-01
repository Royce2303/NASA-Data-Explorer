import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // We'll make this in the next step

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <nav>
          <Link to="/">APOD</Link>
          <Link to="/mars">Mars</Link>
          <Link to="/epic">EPIC</Link>
          <Link to="/neo">NEO</Link>
          <Link to="/search">Library</Link>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}

export default Layout;
