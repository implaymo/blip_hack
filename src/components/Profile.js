import React, { useState, useEffect } from 'react';

const Profile = () => {
  // Sample user data - in a real app, this would come from an API or state management
  const userStats = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    availableBalance: 1250.50,
    totalGambled: 8750.00,
    totalWins: 25,
    totalLosses: 15,
    netAmount: -500.00, // positive means profit, negative means loss
    winRate: 62.5, // 25/(25+15) = 62.5%
    memberSince: 'January 2023',
    lastMonthBetAmount: 625.00, // 50% do account balance - mais realista  
    averageBetLast30Days: 20.83, // 625/30 = 20.83
    averageDayBet: 3.2, // Bets per day
    currentStopLoss: 500.00,
    stopLossEnabled: true,
    totalDeposited: 10000.00, // Increased to make math work
    totalWithdrawn: 500.00, // 10000 - 8750 + 500 - 500 = 1250 ✓
    lastDepositAmount: 500.00,
    lastDepositDate: '3 days ago',
    accountBalance: 1250.50 // Current account balance: Deposits - Gambling + Winnings - Withdrawals
  };

  // Live spend tracker state
  const [sessionStart] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionSpent] = useState(87.50); // Amount spent in current session
  const [isSessionActive] = useState(true);
  
  // Responsible gambling popup state
  const [showControlPopup, setShowControlPopup] = useState(false);
  const [lastPopupTime, setLastPopupTime] = useState(new Date());

  // Update current time every second for live tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Responsible gambling popup timer (every 15 seconds for testing - normally 30 minutes)
  useEffect(() => {
    const checkPopupTimer = setInterval(() => {
      const now = new Date();
      const timeSinceLastPopup = now - lastPopupTime;
      
      // Show popup every 15 seconds (15000ms) - in production this would be 30 minutes (1800000ms)
      if (timeSinceLastPopup >= 15000 && !showControlPopup) {
        setShowControlPopup(true);
        setLastPopupTime(now);
      }
    }, 1000);

    return () => clearInterval(checkPopupTimer);
  }, [lastPopupTime, showControlPopup]);

  const handleControlResponse = (stillInControl) => {
    setShowControlPopup(false);
    setLastPopupTime(new Date());
    
    if (!stillInControl) {
      // In a real app, this could redirect to help resources or pause betting
      alert('Take a break! Remember to gamble responsibly.');
    }
  };

  // Calculate session duration in minutes
  const sessionDurationMs = currentTime - sessionStart;
  const sessionDurationMinutes = Math.max(sessionDurationMs / (1000 * 60), 0.1); // Minimum 0.1 to avoid division by zero
  
  // Calculate spend rate per minute
  const spendPerMinute = sessionSpent / sessionDurationMinutes;
  
  // Format session duration for display
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="profile-page">
      {/* Responsible Gambling Control Popup */}
      {showControlPopup && (
        <div className="popup-overlay">
          <div className="control-popup">
            <div className="popup-header">
              <i className="fas fa-shield-alt"></i>
              <h2>Responsible Gambling Check</h2>
            </div>
            
                         <div className="popup-content">
               <h3>Are you still in control?</h3>
               <p>
                 You've been betting for a while. It's important to take regular breaks 
                 and ensure you're still enjoying yourself responsibly.
               </p>
               
               {!userStats.stopLossEnabled && (
                 <div className="stop-loss-warning">
                   <div className="warning-header">
                     <i className="fas fa-shield-alt"></i>
                     <h4>⚠️ STOP LOSS REQUIRED</h4>
                   </div>
                   <p>
                     <strong>Before placing more bets, you must set a stop loss limit.</strong>
                   </p>
                   <p>
                     Once set, your stop loss will be <strong>locked for 15 minutes</strong> to prevent 
                     impulsive changes during emotional betting.
                   </p>
                   <button className="btn btn-primary stop-loss-setup">
                     <i className="fas fa-shield-alt"></i>
                     Set Stop Loss Now
                   </button>
                 </div>
               )}
              
                             <div className="popup-stats">
                 <div className="popup-stat">
                   <span className="stat-label">Session Time:</span>
                   <span className="stat-value">{formatDuration(sessionDurationMs)}</span>
                 </div>
                 <div className="popup-stat">
                   <span className="stat-label">Amount Spent:</span>
                   <span className="stat-value">${sessionSpent.toFixed(2)}</span>
                 </div>
                 <div className="popup-stat">
                   <span className="stat-label">Stop Loss Status:</span>
                   <span className={`stat-value ${userStats.stopLossEnabled ? 'success' : 'danger'}`}>
                     {userStats.stopLossEnabled ? 'ACTIVE' : 'NOT SET'}
                   </span>
                 </div>
               </div>
            </div>
            
            <div className="popup-actions">
              <button 
                className="btn btn-success"
                onClick={() => handleControlResponse(true)}
              >
                <i className="fas fa-check"></i>
                Yes, I'm in control
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleControlResponse(false)}
              >
                <i className="fas fa-pause"></i>
                I need a break
              </button>
            </div>
            
            <div className="popup-footer">
              <p>
                <i className="fas fa-info-circle"></i>
                Remember: Only bet what you can afford to lose. Gambling should be fun, not stressful.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="profile-details">
              <h1>{userStats.name}</h1>
              <p>{userStats.email}</p>
              <p className="member-since">Member since {userStats.memberSince}</p>
            </div>
          </div>
          
          <div className="account-balance-section">
            <div className="current-balance">
              <h2>Current Account Balance</h2>
              <div className="balance-amount">
                <i className="fas fa-wallet"></i>
                {userStats.accountBalance.toFixed(2)}
              </div>
              <div className="balance-status">
                <span className="status-text">
                  <i className="fas fa-shield-check"></i>
                  Account Verified
                </span>
              </div>
            </div>
            
            <div className="cashier-summary">
              <h3>Account Activity</h3>
                              <div className="cashier-stats">
                  <div className="cashier-stat">
                    <span className="label">Total Deposited:</span>
                    <span className="value positive">${userStats.totalDeposited.toFixed(2)}</span>
                  </div>
                  <div className="cashier-stat">
                    <span className="label">Total Withdrawn:</span>
                    <span className="value">${userStats.totalWithdrawn.toFixed(2)}</span>
                  </div>
                  <div className="cashier-stat">
                    <span className="label">Last Deposit:</span>
                    <span className="value">${userStats.lastDepositAmount.toFixed(2)} ({userStats.lastDepositDate})</span>
                  </div>
                </div>
            </div>
            
            <div className="balance-actions">
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i> Deposit
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-minus"></i> Withdraw
              </button>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h2 className="section-title">
            <i className="fas fa-exclamation-triangle"></i> Spending Reality Check
          </h2>
          
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon">
                <i className="fas fa-coins"></i>
              </div>
              <div className="stat-content">
                <h3>Total Gambled</h3>
                <div className="stat-value">
                  ${userStats.totalGambled.toFixed(2)}
                </div>
                <p className="stat-description">All-time spending on gambling</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-calendar-month"></i>
              </div>
              <div className="stat-content">
                <h3>30-Day Spending</h3>
                <div className="stat-value">
                  ${userStats.lastMonthBetAmount.toFixed(2)}
                </div>
                <p className="stat-description">
                  {((userStats.lastMonthBetAmount / userStats.accountBalance) * 100).toFixed(0)}% of current balance
                </p>
              </div>
            </div>

            <div className="stat-card">
              <div className={`stat-icon ${userStats.netAmount >= 0 ? 'success' : 'danger'}`}>
                <i className={`fas ${userStats.netAmount >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
              </div>
              <div className="stat-content">
                <h3>Overall Result</h3>
                <div className={`stat-value ${userStats.netAmount >= 0 ? 'success' : 'danger'}`}>
                  {userStats.netAmount >= 0 ? '+' : ''}${userStats.netAmount.toFixed(2)}
                </div>
                <p className="stat-description">
                  {userStats.netAmount >= 0 ? 'You are ahead' : 'You are behind'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="reality-check-summary">
            <div className={`check-message ${userStats.netAmount < 0 ? 'critical' : 'warning'}`}>
              <i className="fas fa-exclamation-triangle"></i>
              <div className="message-content">
                <h4>🚨 SPENDING ALERT</h4>
                <div className="quick-facts">
                  <div className="fact-item">
                    <span className="fact-label">Total Wins:</span>
                    <span className="fact-value success">
                      ${(userStats.totalGambled + userStats.netAmount).toFixed(0)}
                    </span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Total Losses:</span>
                    <span className="fact-value critical">
                      ${userStats.totalGambled.toFixed(0)}
                    </span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Net Result:</span>
                    <span className={`fact-value ${userStats.netAmount >= 0 ? 'success' : 'critical'}`}>
                      {userStats.netAmount >= 0 ? '+' : ''}${userStats.netAmount.toFixed(0)}
                    </span>
                  </div>
                </div>
                
                {userStats.netAmount < 0 && (
                  <div className="alert-message critical">
                    💰 YOU ARE BEHIND - You've lost more than you've won
                  </div>
                )}
                {userStats.netAmount >= 0 && (
                  <div className="alert-message warning">
                    ⚡ STAY ALERT - Monitor your gambling carefully
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="live-tracker-section">
          <h2 className="section-title">
            <i className="fas fa-clock"></i> Live Spend Tracker
          </h2>
          
          <div className="live-tracker-container">
            <div className="tracker-status">
              <div className={`status-indicator ${isSessionActive ? 'active' : 'inactive'}`}>
                <div className="status-dot"></div>
                <span>{isSessionActive ? 'Live Session' : 'Session Paused'}</span>
              </div>
            </div>

            <div className="tracker-stats">
              <div className="tracker-stat primary">
                <div className="stat-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <div className="stat-content">
                  <h3>Spend Rate</h3>
                  <div className={`stat-value ${spendPerMinute > 10 ? 'danger' : spendPerMinute > 5 ? 'warning' : 'success'}`}>
                    ${spendPerMinute.toFixed(2)}/min
                  </div>
                  <p className="stat-description">Current spending rate</p>
                </div>
              </div>

              <div className="tracker-stat">
                <div className="stat-icon">
                  <i className="fas fa-stopwatch"></i>
                </div>
                <div className="stat-content">
                  <h3>Session Duration</h3>
                  <div className="stat-value">
                    {formatDuration(sessionDurationMs)}
                  </div>
                  <p className="stat-description">Active betting time</p>
                </div>
              </div>

              <div className="tracker-stat">
                <div className="stat-icon">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <div className="stat-content">
                  <h3>Session Spent</h3>
                  <div className="stat-value">
                    ${sessionSpent.toFixed(2)}
                  </div>
                  <p className="stat-description">Total this session</p>
                </div>
              </div>
            </div>

            <div className="spend-rate-indicator">
              <div className="rate-bar">
                <div className="rate-label">Spending Pace:</div>
                <div className="rate-visual">
                  <div 
                    className={`rate-fill ${spendPerMinute > 10 ? 'high' : spendPerMinute > 5 ? 'medium' : 'low'}`}
                    style={{ width: `${Math.min((spendPerMinute / 20) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="rate-status">
                  {spendPerMinute > 10 ? 'High' : spendPerMinute > 5 ? 'Moderate' : 'Low'}
                </div>
              </div>
            </div>

            <div className="tracker-alerts">
              {spendPerMinute > 10 && (
                <div className="alert danger">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>High spending rate detected! Consider taking a break.</span>
                </div>
              )}
              {spendPerMinute > 5 && spendPerMinute <= 10 && (
                <div className="alert warning">
                  <i className="fas fa-info-circle"></i>
                  <span>Moderate spending pace. Monitor your budget.</span>
                </div>
              )}
            </div>

            <div className="tracker-controls">
              <button className="btn btn-outline">
                <i className="fas fa-pause"></i> Pause Session
              </button>
              <button className="btn btn-danger">
                <i className="fas fa-stop"></i> End Session
              </button>
            </div>
          </div>
        </div>

        <div className="stop-loss-section">
          <h2 className="section-title">
            <i className="fas fa-shield-alt"></i> Risk Management
          </h2>
          
          <div className="stop-loss-container">
            <div className="stop-loss-info">
              <div className="stop-loss-header">
                <h3>Stop Loss Protection</h3>
                <div className="stop-loss-toggle">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={userStats.stopLossEnabled}
                      onChange={() => {}}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <span className={`toggle-status ${userStats.stopLossEnabled ? 'enabled' : 'disabled'}`}>
                    {userStats.stopLossEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              
              <p className="stop-loss-description">
                Set a daily loss limit to help manage your betting. When reached, betting will be restricted for 15 minutes.
              </p>
              
              <div className="stop-loss-controls">
                <div className="stop-loss-input-group">
                  <label>Daily Stop Loss Limit</label>
                  <div className="input-with-currency">
                    <span className="currency-symbol">$</span>
                    <input 
                      type="number" 
                      value={userStats.currentStopLoss}
                      onChange={() => {}}
                      className="stop-loss-input"
                      min="0"
                      step="10"
                    />
                  </div>
                </div>
                
                <button className="btn btn-primary stop-loss-save">
                  <i className="fas fa-save"></i> Update Limit
                </button>
              </div>
              
              <div className="stop-loss-stats">
                <div className="stop-loss-stat">
                  <span className="stat-label">Today's Losses:</span>
                  <span className="stat-value danger">$125.00</span>
                </div>
                <div className="stop-loss-stat">
                  <span className="stat-label">Remaining Limit:</span>
                  <span className="stat-value">$375.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h2 className="section-title">
            <i className="fas fa-history"></i> Recent Activity
          </h2>
          
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success">
                <i className="fas fa-check"></i>
              </div>
              <div className="activity-content">
                <h4>Won bet on Lakers vs Warriors</h4>
                <p>Basketball • Yesterday</p>
                <div className="activity-amount success">+$45.00</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon danger">
                <i className="fas fa-times"></i>
              </div>
              <div className="activity-content">
                <h4>Lost bet on Manchester United vs Liverpool</h4>
                <p>Football • 2 days ago</p>
                <div className="activity-amount danger">-$25.00</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-plus"></i>
              </div>
              <div className="activity-content">
                <h4>Deposited funds</h4>
                <p>Payment • 3 days ago</p>
                <div className="activity-amount">+$200.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 