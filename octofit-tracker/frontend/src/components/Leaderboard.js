import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard array:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
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
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'bg-light text-dark';
  };

  const getRankEmoji = (rank) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '⚔️';
  };

  const getRankTitle = (rank) => {
    if (rank === 1) return 'Grand Champion';
    if (rank === 2) return 'Elite Warrior';
    if (rank === 3) return 'Veteran Hero';
    if (rank <= 5) return 'Knight';
    return 'Adventurer';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🏆 Hall of Champions</h2>
        <span className="badge bg-primary">{leaderboard.length} Heroes</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">⚔️ Rank</th>
              <th scope="col">🧙 Champion</th>
              <th scope="col">🛡️ Guild</th>
              <th scope="col">✨ Glory Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id || entry.id || index}>
                <td>
                  <span className={`badge ${getRankBadge(index + 1)} fs-6`}>
                    {getRankEmoji(index + 1)} {index + 1}
                  </span>
                  <small className="d-block text-muted mt-1">{getRankTitle(index + 1)}</small>
                </td>
                <td><strong>⚔️ {entry.user_name}</strong></td>
                <td><span className="badge bg-secondary">🛡️ {entry.team || 'Lone Wolf'}</span></td>
                <td>
                  <span className="badge bg-success fs-6">✨ {entry.total_points} pts</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leaderboard.length === 0 && (
        <div className="alert alert-info" role="alert">
          📜 The Hall of Champions awaits its first heroes! Begin your quest to claim glory!
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
