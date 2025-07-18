import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <i className="fas fa-dice"></i> BetMaster
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#sports">Sports</a>
          </li>
          <li className="nav-item">
            <a href="#live">Live Betting</a>
          </li>
          <li className="nav-item">
            <a href="#casino">Casino</a>
          </li>
          <li className="nav-item">
            <a href="#promotions">Promotions</a>
          </li>
          <li className="nav-item">
            <a href="#results">Results</a>
          </li>
        </ul>
        
        <div className="nav-buttons">
          <Link to="/profile" className="btn btn-primary">
            <i className="fas fa-user"></i> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 