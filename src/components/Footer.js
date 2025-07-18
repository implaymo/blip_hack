import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#about">About Us</a>
          <a href="#terms">Terms & Conditions</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#responsible">Responsible Gaming</a>
          <a href="#support">Support</a>
          <a href="#contact">Contact</a>
        </div>
        
        <p>&copy; 2024 BetMaster. All rights reserved. | 18+ Only | Gamble Responsibly</p>
        
        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <p>
            <i className="fas fa-shield-alt"></i> Licensed and regulated | 
            <i className="fas fa-lock" style={{ marginLeft: '1rem' }}></i> Secure payments | 
            <i className="fas fa-headset" style={{ marginLeft: '1rem' }}></i> 24/7 Support
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 