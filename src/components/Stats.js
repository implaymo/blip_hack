import React, { useState, useEffect } from 'react';

const Stats = () => {
  // Current session stats - in a real app, this would come from context or API
  const [sessionStats] = useState({
    sessionSpent: 87.50,
    sessionBets: 4,
    sessionWins: 2,
    sessionLosses: 2,
    sessionNetAmount: -12.50, // negative means loss, positive means profit
    averageBetSession: 21.88
  });

  // Overall stats for comparison
  const [overallStats] = useState({
    totalWins: 23,
    totalLosses: 17,
    winRate: 57.5,
    averageBetOverall: 52.67
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionStart] = useState(new Date(Date.now() - 45 * 60 * 1000)); // 45 minutes ago

  // Update time every minute for session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const sessionDurationMs = currentTime - sessionStart;
  const sessionDurationMinutes = Math.floor(sessionDurationMs / (1000 * 60));

  const formatSessionDuration = () => {
    if (sessionDurationMinutes < 60) {
      return `${sessionDurationMinutes}m`;
    } else {
      const hours = Math.floor(sessionDurationMinutes / 60);
      const minutes = sessionDurationMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  return (
    <section className="homepage-stats">
      <div className="stats-container">
        <div className="stats-header">
          <h2>
            <i className="fas fa-chart-bar"></i>
            Current Session Overview
          </h2>
          <div className="session-duration">
            <i className="fas fa-clock"></i>
            Session: {formatSessionDuration()}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="stat-content">
              <h3>Session Spent</h3>
              <div className="stat-value">
                ${sessionStats.sessionSpent.toFixed(2)}
              </div>
              <p className="stat-comparison">
                <i className="fas fa-chart-line"></i>
                {sessionStats.sessionBets} bets placed
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className={`stat-icon ${sessionStats.sessionNetAmount >= 0 ? 'success' : 'danger'}`}>
              <i className={`fas ${sessionStats.sessionNetAmount >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
            </div>
            <div className="stat-content">
              <h3>Session P&L</h3>
              <div className={`stat-value ${sessionStats.sessionNetAmount >= 0 ? 'success' : 'danger'}`}>
                {sessionStats.sessionNetAmount >= 0 ? '+' : ''}${sessionStats.sessionNetAmount.toFixed(2)}
              </div>
              <p className="stat-comparison">
                <span className="wins">
                  <i className="fas fa-check-circle"></i>
                  {sessionStats.sessionWins}W
                </span>
                <span className="losses">
                  <i className="fas fa-times-circle"></i>
                  {sessionStats.sessionLosses}L
                </span>
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-calculator"></i>
            </div>
            <div className="stat-content">
              <h3>Session Avg Bet</h3>
              <div className="stat-value">
                ${sessionStats.averageBetSession.toFixed(2)}
              </div>
              <p className="stat-comparison">
                <i className={`fas ${sessionStats.averageBetSession < overallStats.averageBetOverall ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                Overall: ${overallStats.averageBetOverall.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-percentage"></i>
            </div>
            <div className="stat-content">
              <h3>Session Win Rate</h3>
              <div className="stat-value">
                {sessionStats.sessionBets > 0 ? ((sessionStats.sessionWins / sessionStats.sessionBets) * 100).toFixed(1) : '0.0'}%
              </div>
              <p className="stat-comparison">
                <i className={`fas ${((sessionStats.sessionWins / sessionStats.sessionBets) * 100) >= overallStats.winRate ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                Overall: {overallStats.winRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="stats-summary">
          <div className="summary-card">
            <div className="summary-content">
              <h4>Session Performance</h4>
              <p>
                {sessionStats.sessionNetAmount >= 0 
                  ? `You're up $${Math.abs(sessionStats.sessionNetAmount).toFixed(2)} this session! ` 
                  : `You're down $${Math.abs(sessionStats.sessionNetAmount).toFixed(2)} this session. `}
                
                {sessionStats.sessionBets > 0 && (
                  <>
                    Your win rate is {((sessionStats.sessionWins / sessionStats.sessionBets) * 100).toFixed(1)}%
                    {((sessionStats.sessionWins / sessionStats.sessionBets) * 100) >= overallStats.winRate 
                      ? ' - above your average!' 
                      : ' - below your average.'}
                  </>
                )}
              </p>
            </div>
            
            <div className="quick-actions">
              <button className="btn btn-outline">
                <i className="fas fa-pause"></i>
                Take a Break
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-chart-pie"></i>
                View Full Stats
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 