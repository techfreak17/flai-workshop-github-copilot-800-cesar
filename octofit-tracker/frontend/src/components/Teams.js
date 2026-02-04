import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams data received:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams array:', teamsData);
        setTeams(teamsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
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
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛡️ Guilds of the Realm</h2>
        <span className="badge bg-primary">{teams.length} Guilds</span>
      </div>
      <div className="row">
        {teams.map((team, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={team._id || team.id || index}>
            <div className="card h-100 quest-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <i className="bi bi-shield-fill me-2"></i>🛡️ {team.name}
                </h5>
                <p className="card-text flex-grow-1">
                  <strong className="text-muted">⚔️ Warriors:</strong><br/>
                  <span className="badge bg-secondary me-1 mb-1">
                    🧙 {team.members_count || 0} heroes
                  </span>
                  {team.description && (
                    <small className="d-block mt-2 text-muted">📜 {team.description}</small>
                  )}
                </p>
                <button className="btn btn-primary btn-sm mt-2">⚔️ Join Guild</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teams.length === 0 && (
        <div className="alert alert-info" role="alert">
          🛡️ No guilds have been formed yet. Rally your allies and create a legendary fellowship!
        </div>
      )}
    </div>
  );
}

export default Teams;
