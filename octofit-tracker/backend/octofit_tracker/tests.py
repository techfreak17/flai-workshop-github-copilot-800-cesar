from django.test import TestCase
from django.contrib.auth.models import User as DjangoUser
from rest_framework.test import APIClient
from rest_framework import status
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    """Test cases for User model"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='A test team'
        )
    
    def test_create_user(self):
        """Test creating a user"""
        user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password='hashed_password',
            team='Test Team',
            total_points=100
        )
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.total_points, 100)
    
    def test_user_email_unique(self):
        """Test that user email is unique"""
        User.objects.create(
            name='User 1',
            email='unique@example.com',
            password='password1'
        )
        with self.assertRaises(Exception):
            User.objects.create(
                name='User 2',
                email='unique@example.com',
                password='password2'
            )


class TeamModelTest(TestCase):
    """Test cases for Team model"""
    
    def test_create_team(self):
        """Test creating a team"""
        team = Team.objects.create(
            name='Team Marvel',
            description='Marvel superheroes',
            total_points=1000,
            members_count=5
        )
        self.assertEqual(team.name, 'Team Marvel')
        self.assertEqual(team.members_count, 5)
    
    def test_team_name_unique(self):
        """Test that team name is unique"""
        Team.objects.create(name='Team A')
        with self.assertRaises(Exception):
            Team.objects.create(name='Team A')


class ActivityModelTest(TestCase):
    """Test cases for Activity model"""
    
    def setUp(self):
        self.user = User.objects.create(
            name='Activity User',
            email='activity@example.com',
            password='password'
        )
    
    def test_create_activity(self):
        """Test creating an activity"""
        activity = Activity.objects.create(
            user=self.user,
            activity_type='running',
            duration_minutes=30,
            distance_km=5.0,
            calories_burned=300,
            points_earned=100,
            date='2026-02-04'
        )
        self.assertEqual(activity.activity_type, 'running')
        self.assertEqual(activity.calories_burned, 300)


class WorkoutModelTest(TestCase):
    """Test cases for Workout model"""
    
    def test_create_workout(self):
        """Test creating a workout"""
        workout = Workout.objects.create(
            title='Morning Run',
            description='A refreshing morning run',
            difficulty='easy',
            duration_minutes=30,
            expected_calories=300,
            instructions='Run at moderate pace'
        )
        self.assertEqual(workout.title, 'Morning Run')
        self.assertEqual(workout.difficulty, 'easy')


class APIEndpointsTest(TestCase):
    """Test cases for REST API endpoints"""
    
    def setUp(self):
        self.client = APIClient()
        
        # Create test data
        self.team = Team.objects.create(
            name='Team Test',
            description='Test team',
            total_points=0
        )
        
        self.user = User.objects.create(
            name='Test User',
            email='testuser@example.com',
            password='password',
            team='Team Test',
            total_points=500
        )
        
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='running',
            duration_minutes=30,
            calories_burned=300,
            points_earned=100,
            date='2026-02-04'
        )
        
        self.workout = Workout.objects.create(
            title='Test Workout',
            description='Test workout',
            difficulty='medium',
            duration_minutes=45,
            expected_calories=400,
            instructions='Test instructions'
        )
    
    def test_api_root_endpoint(self):
        """Test API root endpoint"""
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
    
    def test_users_endpoint(self):
        """Test users API endpoint"""
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test User')
    
    def test_teams_endpoint(self):
        """Test teams API endpoint"""
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Team Test')
    
    def test_activities_endpoint(self):
        """Test activities API endpoint"""
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['activity_type'], 'running')
    
    def test_workouts_endpoint(self):
        """Test workouts API endpoint"""
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Workout')
    
    def test_create_user_via_api(self):
        """Test creating a user via API"""
        data = {
            'name': 'New User',
            'email': 'newuser@example.com',
            'password': 'newpassword',
            'team': 'Team Test',
            'total_points': 0
        }
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'New User')
    
    def test_create_activity_via_api(self):
        """Test creating an activity via API"""
        data = {
            'user': self.user.id,
            'activity_type': 'cycling',
            'duration_minutes': 60,
            'distance_km': 10.0,
            'calories_burned': 500,
            'points_earned': 150,
            'date': '2026-02-05'
        }
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['activity_type'], 'cycling')
