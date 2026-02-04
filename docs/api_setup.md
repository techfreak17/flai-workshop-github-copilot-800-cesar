# OctoFit Tracker API Setup - Codespace Configuration

## Overview
The OctoFit Tracker API has been configured to work seamlessly with both GitHub Codespaces and localhost environments.

## Configuration Changes

### 1. Settings Configuration (`settings.py`)
- **Dynamic ALLOWED_HOSTS**: Automatically includes the codespace URL based on the `CODESPACE_NAME` environment variable
- **CORS Configuration**: Updated to allow requests from both localhost and codespace URLs
- **Environment Detection**: Uses `os.environ.get('CODESPACE_NAME')` to detect codespace environment

### 2. URL Configuration (`urls.py`)
- **API Root Endpoint**: Returns URLs based on the environment
  - In Codespaces: Uses `https://{CODESPACE_NAME}-8000.app.github.dev`
  - In localhost: Uses the request's base URL
- **Dynamic URL Generation**: All API endpoint URLs are dynamically generated based on the environment

## API Endpoints

### Codespace URLs
- **Root**: `https://{CODESPACE_NAME}-8000.app.github.dev/`
- **Users**: `https://{CODESPACE_NAME}-8000.app.github.dev/api/users/`
- **Teams**: `https://{CODESPACE_NAME}-8000.app.github.dev/api/teams/`
- **Activities**: `https://{CODESPACE_NAME}-8000.app.github.dev/api/activities/`
- **Leaderboard**: `https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
- **Workouts**: `https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts/`

### Localhost URLs
- **Root**: `http://localhost:8000/`
- **Users**: `http://localhost:8000/api/users/`
- **Teams**: `http://localhost:8000/api/teams/`
- **Activities**: `http://localhost:8000/api/activities/`
- **Leaderboard**: `http://localhost:8000/api/leaderboard/`
- **Workouts**: `http://localhost:8000/api/workouts/`

## VS Code Launch Configuration

The `.vscode/launch.json` file includes a configuration for launching the Django backend:

```json
{
  "name": "Launch Django Backend",
  "type": "python",
  "request": "launch",
  "program": "${workspaceFolder}/octofit-tracker/backend/manage.py",
  "args": ["runserver", "0.0.0.0:8000"],
  "django": true
}
```

## Testing the API

### Using curl
```bash
# Test API root
curl -s http://127.0.0.1:8000/ -H "Accept: application/json" | python -m json.tool

# Test users endpoint
curl -s http://127.0.0.1:8000/api/users/ -H "Accept: application/json" | python -m json.tool

# Test teams endpoint
curl -s http://127.0.0.1:8000/api/teams/ -H "Accept: application/json" | python -m json.tool

# Test activities endpoint
curl -s http://127.0.0.1:8000/api/activities/ -H "Accept: application/json" | python -m json.tool

# Test leaderboard endpoint
curl -s http://127.0.0.1:8000/api/leaderboard/ -H "Accept: application/json" | python -m json.tool

# Test workouts endpoint
curl -s http://127.0.0.1:8000/api/workouts/ -H "Accept: application/json" | python -m json.tool
```

### Starting the Server

#### Option 1: VS Code Debugger
1. Open the Run and Debug panel (Ctrl+Shift+D)
2. Select "Launch Django Backend"
3. Click the green play button or press F5

#### Option 2: Command Line
```bash
cd /workspaces/flai-workshop-github-copilot-800-cesar/octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

## Environment Variables

The following environment variables are used:

- `CODESPACE_NAME`: Automatically set by GitHub Codespaces
- `DJANGO_SETTINGS_MODULE`: Set to `octofit_tracker.settings` (configured in launch.json)

## HTTPS and Certificate Handling

The configuration uses the environment variable approach to avoid HTTPS certificate issues:
- URLs are constructed using `$CODESPACE_NAME` environment variable
- ALLOWED_HOSTS is dynamically updated to include the codespace domain
- CORS settings include both HTTP (localhost) and HTTPS (codespace) origins

## Verification

All API endpoints have been tested and verified to work correctly:
- ✅ API Root endpoint returns dynamic URLs based on environment
- ✅ Users endpoint returns user data
- ✅ Teams endpoint returns team data
- ✅ Activities endpoint returns activity data
- ✅ Leaderboard endpoint returns leaderboard rankings
- ✅ Workouts endpoint returns workout suggestions
