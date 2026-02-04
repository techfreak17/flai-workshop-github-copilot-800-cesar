import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleStartWorkout = (workout) => {
    alert(`⚔️ BATTLE TRAINING INITIATED! ⚔️\n\n🗡️ Training: ${workout.title}\n💪 Difficulty: ${workout.difficulty}\n⏱️ Duration: ${workout.duration_minutes} minutes\n🔥 Energy Cost: ${workout.expected_calories} power\n\nMay the strength of legends guide you!`);
  };

  const getDifficultyEmoji = (difficulty) => {
    const emojiMap = {
      'Beginner': '🌱',
      'Easy': '🌿',
      'Intermediate': '⚔️',
      'Advanced': '🔥',
      'Expert': '💀',
      'Legendary': '👑'
    };
    return emojiMap[difficulty] || '⚔️';
  };

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts array:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>💪 Battle Training</h2>
        <span className="badge bg-primary">{workouts.length} Training Regimens</span>
      </div>
      <div className="row">
        {workouts.map((workout, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={workout._id || workout.id || index}>
            <div className="card h-100 quest-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <i className="bi bi-fire me-2"></i>
                  ⚔️ {workout.title}
                </h5>
                <div className="mb-2">
                  <span className="badge bg-info me-1">{getDifficultyEmoji(workout.difficulty)} {workout.difficulty}</span>
                  <span className="badge bg-secondary me-1">⏱️ {workout.duration_minutes} min</span>
                  <span className="badge bg-warning text-dark">🔥 {workout.expected_calories} power</span>
                </div>
                <p className="card-text flex-grow-1">📜 {workout.description}</p>
                <div className="mt-auto">
                  <button className="btn btn-primary w-100" onClick={() => handleStartWorkout(workout)}>⚔️ Begin Training</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && (
        <div className="alert alert-info" role="alert">
          💪 The training grounds are being prepared. Return soon for legendary workout regimens!
        </div>
      )}
    </div>
  );
}

export default Workouts;
