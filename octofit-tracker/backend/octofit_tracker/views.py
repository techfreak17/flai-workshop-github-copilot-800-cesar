from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from octofit_tracker.serializers import (
    UserSerializer, TeamSerializer, ActivitySerializer,
    LeaderboardSerializer, WorkoutSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for User management
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['get'])
    def by_team(self, request):
        team = request.query_params.get('team', None)
        if team:
            queryset = self.queryset.filter(team=team)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'error': 'Team parameter required'}, status=status.HTTP_400_BAD_REQUEST)


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Team management
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Activity logging and tracking
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    @action(detail=False, methods=['get'])
    def by_user(self, request):
        user_id = request.query_params.get('user_id', None)
        if user_id:
            queryset = self.queryset.filter(user_id=user_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'error': 'User ID parameter required'}, status=status.HTTP_400_BAD_REQUEST)


class LeaderboardViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Leaderboard
    """
    queryset = Leaderboard.objects.all().order_by('rank')
    serializer_class = LeaderboardSerializer
    
    @action(detail=False, methods=['get'])
    def by_team(self, request):
        team = request.query_params.get('team', None)
        if team:
            queryset = self.queryset.filter(team=team)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'error': 'Team parameter required'}, status=status.HTTP_400_BAD_REQUEST)


class WorkoutViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Personalized Workout Suggestions
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    @action(detail=False, methods=['get'])
    def by_difficulty(self, request):
        difficulty = request.query_params.get('difficulty', None)
        if difficulty:
            queryset = self.queryset.filter(difficulty=difficulty)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'error': 'Difficulty parameter required'}, status=status.HTTP_400_BAD_REQUEST)
