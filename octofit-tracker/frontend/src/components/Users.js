import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching users from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users data received:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Users array:', usersData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
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
          <h4 className="alert-heading">Error Loading Users</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🧙 Heroes of the Realm</h2>
        <span className="badge bg-primary">{users.length} Heroes</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">⚔️ Rank</th>
              <th scope="col">🧙 Hero Name</th>
              <th scope="col">📜 Scroll Address</th>
              <th scope="col">⚡ Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id || user.id || index}>
                <td>⚔️ {index + 1}</td>
                <td>
                  <strong>
                    <i className="bi bi-person-badge-fill me-2"></i>
                    🧙 {user.name}
                  </strong>
                </td>
                <td>📜 {user.email}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">⚔️ View Legend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="alert alert-info" role="alert">
          🧙 No heroes have joined the realm yet. Be the first legendary warrior to sign up!
        </div>
      )}
    </div>
  );
}

export default Users;
