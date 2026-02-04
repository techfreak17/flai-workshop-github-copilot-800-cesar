from rest_framework import serializers
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'team', 'total_points', 'created_at', 'updated_at']


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'total_points', 'members_count', 'created_at', 'updated_at']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration_minutes', 'distance_km', 'calories_burned', 'points_earned', 'date', 'created_at', 'updated_at']


class LeaderboardSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'user_name', 'team', 'rank', 'total_points', 'activities_count', 'updated_at']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'title', 'description', 'difficulty', 'duration_minutes', 'expected_calories', 'instructions', 'created_at', 'updated_at']
