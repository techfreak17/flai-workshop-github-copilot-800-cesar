import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  console.log('App component loaded');
  console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit Logo" />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">🏰 Realm</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">⚔️ Quests</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">🏆 Hall of Fame</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">🛡️ Guilds</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">🧙 Heroes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">💪 Training</Link>
              </li>
            </ul>
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? (
                <>
                  <i className="bi bi-sun-fill"></i> Dawn
                </>
              ) : (
                <>
                  <i className="bi bi-moon-fill"></i> Dusk
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="text-center">
              <div className="mb-5">
                <img src="/octofitapp-small.png" alt="OctoFit Logo" className="hero-glow" style={{width: '140px', marginBottom: '1rem', borderRadius: '50%', border: '3px solid #d4af37'}} />
                <h1 className="display-4 fw-bold">Welcome to OctoFit Realm</h1>
                <p className="lead">🗡️ Train like a hero, become a legend! Embark on your epic fitness quest! 🗡️</p>
              </div>
              
              <div className="row mt-5 g-4">
                <div className="col-md-4">
                  <div className="card shadow-sm quest-card">
                    <div className="card-body py-4">
                      <div className="icon-wrapper">
                        <i className="bi bi-lightning-charge-fill" style={{fontSize: '2rem', color: 'var(--accent-primary)'}}></i>
                      </div>
                      <h5 className="card-title">⚔️ Epic Quests</h5>
                      <p className="card-text">Chronicle your heroic battles and legendary training sessions in the quest log.</p>
                      <Link to="/activities" className="btn btn-primary mt-2">Begin Quest</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow-sm quest-card">
                    <div className="card-body py-4">
                      <div className="icon-wrapper">
                        <i className="bi bi-trophy-fill" style={{fontSize: '2rem', color: 'var(--accent-primary)'}}></i>
                      </div>
                      <h5 className="card-title">🏆 Hall of Fame</h5>
                      <p className="card-text">Rise through the ranks and claim your place among the legendary champions!</p>
                      <Link to="/leaderboard" className="btn btn-primary mt-2">View Champions</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow-sm quest-card">
                    <div className="card-body py-4">
                      <div className="icon-wrapper">
                        <i className="bi bi-shield-fill" style={{fontSize: '2rem', color: 'var(--accent-primary)'}}></i>
                      </div>
                      <h5 className="card-title">🛡️ Join a Guild</h5>
                      <p className="card-text">Unite with fellow warriors and conquer challenges as a mighty fellowship!</p>
                      <Link to="/teams" className="btn btn-primary mt-2">Find Guild</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-4 g-4">
                <div className="col-md-6">
                  <div className="card shadow-sm quest-card">
                    <div className="card-body py-4">
                      <div className="icon-wrapper">
                        <i className="bi bi-person-badge-fill" style={{fontSize: '2rem', color: 'var(--accent-secondary)'}}></i>
                      </div>
                      <h5 className="card-title">🧙 Hero Profiles</h5>
                      <p className="card-text">Discover legendary warriors and forge alliances with heroes of the realm.</p>
                      <Link to="/users" className="btn btn-primary mt-2">Meet Heroes</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card shadow-sm quest-card">
                    <div className="card-body py-4">
                      <div className="icon-wrapper">
                        <i className="bi bi-fire" style={{fontSize: '2rem', color: 'var(--accent-secondary)'}}></i>
                      </div>
                      <h5 className="card-title">💪 Battle Training</h5>
                      <p className="card-text">Master ancient training techniques to unlock your true heroic potential!</p>
                      <Link to="/workouts" className="btn btn-primary mt-2">Start Training</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
