import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities data received:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities array:', activitiesData);
        setActivities(activitiesData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
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
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getActivityEmoji = (type) => {
    const emojiMap = {
      'Running': '🏃',
      'Cycling': '🚴',
      'Swimming': '🏊',
      'Weightlifting': '🏋️',
      'Yoga': '🧘',
      'HIIT': '⚡',
      'Walking': '🚶',
      'Hiking': '🥾',
      'Boxing': '🥊',
      'CrossFit': '💪'
    };
    return emojiMap[type] || '⚔️';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>⚔️ Quest Log</h2>
        <span className="badge bg-primary">{activities.length} Quests Completed</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">📜 Quest</th>
              <th scope="col">🧙 Hero</th>
              <th scope="col">⚔️ Battle Type</th>
              <th scope="col">⏱️ Duration</th>
              <th scope="col">📅 Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity._id || activity.id || index}>
                <td>#{index + 1}</td>
                <td><strong>🧙 {activity.user_name || `Hero #${activity.user}`}</strong></td>
                <td><span className="badge bg-info">{getActivityEmoji(activity.activity_type)} {activity.activity_type}</span></td>
                <td>⏱️ {activity.duration_minutes} mins</td>
                <td>📅 {activity.date ? new Date(activity.date + 'T00:00:00').toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activities.length === 0 && (
        <div className="alert alert-info" role="alert">
          📜 No quests recorded yet. Begin your heroic journey and log your first battle!
        </div>
      )}
    </div>
  );
}

export default Activities;
