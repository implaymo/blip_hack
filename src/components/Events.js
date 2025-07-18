import React, { useState } from 'react';

const Events = () => {
  // Bet confirmation popup state
  const [showBetConfirmation, setShowBetConfirmation] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  
  // User spending data (in a real app, this would come from props or context)
  const userSpendingData = {
    totalGambled: 8750.00,
    accountBalance: 1250.50,
    lastMonthBetAmount: 625.00, // 50% do saldo atual - coerente
    averageBetLast30Days: 20.83, // 625/30 = 20.83
    sessionSpent: 87.50,
    stopLossEnabled: false, // This should come from user profile
    currentStopLoss: 500
  };

  const handleBetClick = (event, team, odds, betType) => {
    setSelectedBet({
      event: event,
      team: team,
      odds: odds,
      betType: betType,
      suggestedAmount: 25.00 // Default bet amount
    });
    setShowBetConfirmation(true);
  };

  const handleConfirmBet = () => {
    setShowBetConfirmation(false);
    setSelectedBet(null);
    // In a real app, this would process the bet
    alert('Bet placed successfully! Remember to gamble responsibly.');
  };

  const handleCancelBet = () => {
    setShowBetConfirmation(false);
    setSelectedBet(null);
  };
  const events = [
    {
      id: 1,
      sport: 'Football',
      date: 'Today, 8:00 PM',
      team1: 'Manchester United',
      team2: 'Liverpool',
      odds: {
        home: '2.10',
        draw: '3.25',
        away: '3.40'
      }
    },
    {
      id: 2,
      sport: 'Basketball',
      date: 'Tomorrow, 9:30 PM',
      team1: 'Lakers',
      team2: 'Warriors',
      odds: {
        home: '1.85',
        draw: null,
        away: '1.95'
      }
    },
    {
      id: 3,
      sport: 'Tennis',
      date: 'Sunday, 3:00 PM',
      team1: 'Novak Djokovic',
      team2: 'Rafael Nadal',
      odds: {
        home: '1.75',
        draw: null,
        away: '2.05'
      }
    },
    {
      id: 4,
      sport: 'Football',
      date: 'Monday, 7:45 PM',
      team1: 'Barcelona',
      team2: 'Real Madrid',
      odds: {
        home: '2.20',
        draw: '3.10',
        away: '3.25'
      }
    },
    {
      id: 5,
      sport: 'Ice Hockey',
      date: 'Tuesday, 10:00 PM',
      team1: 'Rangers',
      team2: 'Bruins',
      odds: {
        home: '2.45',
        draw: '3.80',
        away: '2.70'
      }
    },
    {
      id: 6,
      sport: 'Baseball',
      date: 'Wednesday, 7:00 PM',
      team1: 'Yankees',
      team2: 'Red Sox',
      odds: {
        home: '1.90',
        draw: null,
        away: '1.90'
      }
    }
  ];

  const featuredEvents = [
    {
      title: 'Champions League Final',
      description: 'The biggest match of the year',
      date: 'June 10, 2024'
    },
    {
      title: 'NBA Finals',
      description: 'Championship series',
      date: 'June 15, 2024'
    },
    {
      title: 'Wimbledon',
      description: 'Tennis Grand Slam',
      date: 'July 1, 2024'
    }
  ];

  return (
    <div>
      {/* Bet Confirmation Popup */}
      {showBetConfirmation && selectedBet && (
        <div className="popup-overlay">
          <div className="bet-confirmation-popup">
            <div className="popup-header">
              <i className="fas fa-exclamation-triangle"></i>
              <h2>Confirm Your Bet</h2>
            </div>
            
            <div className="popup-content">
              <div className="bet-details">
                <h3>Bet Details</h3>
                <div className="bet-info">
                  <div className="bet-match">
                    <strong>{selectedBet.event.team1} vs {selectedBet.event.team2}</strong>
                  </div>
                  <div className="bet-selection">
                    Selection: <span className="highlight">{selectedBet.team}</span>
                  </div>
                  <div className="bet-odds">
                    Odds: <span className="highlight">{selectedBet.odds}</span>
                  </div>
                </div>
                
                <div className="bet-amount-section">
                  <label>Bet Amount:</label>
                  <div className="amount-input-group">
                    <span className="currency-symbol">$</span>
                    <input 
                      type="number" 
                      value={selectedBet.suggestedAmount}
                      onChange={() => {}}
                      className="bet-amount-input"
                      min="1"
                      step="5"
                    />
                  </div>
                  <div className="potential-win">
                    Potential Win: <span className="win-amount">
                      ${(selectedBet.suggestedAmount * parseFloat(selectedBet.odds)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="stop-loss-status-section">
                <div className="status-header">
                  <i className="fas fa-shield-alt"></i>
                  <h4>Stop Loss Protection</h4>
                </div>
                
                <div className="status-display">
                  <div className={`status-indicator ${userSpendingData.stopLossEnabled ? 'active' : 'inactive'}`}>
                    <div className="status-icon">
                      <i className={`fas ${userSpendingData.stopLossEnabled ? 'fa-shield-check' : 'fa-shield-slash'}`}></i>
                    </div>
                    <div className="status-content">
                      <div className="status-label">
                        {userSpendingData.stopLossEnabled ? 'ACTIVE' : 'INACTIVE'}
                      </div>
                      <div className="status-value">
                        {userSpendingData.stopLossEnabled 
                          ? `Limit: $${userSpendingData.currentStopLoss || 500}` 
                          : 'No protection set'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="account-info">
                    <span>Account Balance: ${userSpendingData.accountBalance.toFixed(0)}</span>
                  </div>
                </div>
                
                {!userSpendingData.stopLossEnabled && (
                  <div className="protection-reminder">
                    <p>
                      <i className="fas fa-info-circle"></i>
                      Consider setting up stop loss protection to limit potential losses
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="popup-actions">
              <button 
                className="btn btn-outline"
                onClick={handleCancelBet}
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>
              <button 
                className="btn btn-success"
                onClick={handleConfirmBet}
              >
                <i className="fas fa-check"></i>
                Confirm Bet
              </button>
            </div>
            
            <div className="popup-footer">
              <p>
                <i className="fas fa-info-circle"></i>
                Gambling can be addictive. Please bet responsibly and within your means.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <section className="events-section" id="events">
        <div className="events-container">
          <h2 className="section-title">
            <i className="fas fa-trophy"></i> Popular Events
          </h2>
          
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <span className="event-sport">{event.sport}</span>
                  <span className="event-date">{event.date}</span>
                </div>
                
                <div className="event-teams">
                  <div className="teams">
                    {event.team1} <span className="vs">VS</span> {event.team2}
                  </div>
                </div>
                
                <div className="event-odds">
                  <button 
                    className="odd-button"
                    onClick={() => handleBetClick(event, event.team1, event.odds.home, 'home')}
                  >
                    <span className="odd-label">{event.team1}</span>
                    <span className="odd-value">{event.odds.home}</span>
                  </button>
                  
                  {event.odds.draw && (
                    <button 
                      className="odd-button"
                      onClick={() => handleBetClick(event, 'Draw', event.odds.draw, 'draw')}
                    >
                      <span className="odd-label">Draw</span>
                      <span className="odd-value">{event.odds.draw}</span>
                    </button>
                  )}
                  
                  <button 
                    className="odd-button"
                    onClick={() => handleBetClick(event, event.team2, event.odds.away, 'away')}
                  >
                    <span className="odd-label">{event.team2}</span>
                    <span className="odd-value">{event.odds.away}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-events">
        <div className="events-container">
          <h2 className="section-title">
            <i className="fas fa-star"></i> Featured Events
          </h2>
          
          <div className="featured-grid">
            {featuredEvents.map((event, index) => (
              <div key={index} className="featured-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>{event.date}</strong></p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleBetClick(
                    { team1: event.title, team2: 'Special Event', sport: 'Featured' }, 
                    event.title, 
                    '2.50', 
                    'featured'
                  )}
                >
                  Place Bet
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events; 