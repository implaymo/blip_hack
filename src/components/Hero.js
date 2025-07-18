import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <h1>The Ultimate Sports Betting Experience</h1>
        <p>
          Join millions of sports fans and bet on your favorite teams with the best odds, 
          instant payouts, and 24/7 customer support.
        </p>
        <div className="hero-cta">
          <a href="#signup" className="btn btn-primary">
            <i className="fas fa-rocket"></i> Start Betting Now
          </a>
          <a href="#events" className="btn btn-outline">
            <i className="fas fa-calendar-alt"></i> View Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 