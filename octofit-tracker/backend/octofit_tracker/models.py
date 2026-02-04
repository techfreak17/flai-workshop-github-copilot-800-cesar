from django.db import models


class User(models.Model):
    """User model for OctoFit Tracker"""
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    team = models.CharField(max_length=100, blank=True)
    total_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.name


class Team(models.Model):
    """Team model for OctoFit Tracker"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    total_points = models.IntegerField(default=0)
    members_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    """Activity model for OctoFit Tracker"""
    ACTIVITY_TYPES = (
        ('running', 'Running'),
        ('walking', 'Walking'),
        ('cycling', 'Cycling'),
        ('swimming', 'Swimming'),
        ('strength_training', 'Strength Training'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)
    duration_minutes = models.IntegerField()
    distance_km = models.FloatField(blank=True, null=True)
    calories_burned = models.IntegerField()
    points_earned = models.IntegerField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.user.name} - {self.activity_type}"


class Leaderboard(models.Model):
    """Leaderboard model for OctoFit Tracker"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    team = models.CharField(max_length=100)
    rank = models.IntegerField()
    total_points = models.IntegerField()
    activities_count = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.rank}. {self.user.name}"


class Workout(models.Model):
    """Workout suggestion model for OctoFit Tracker"""
    DIFFICULTY_LEVELS = (
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_LEVELS)
    duration_minutes = models.IntegerField()
    expected_calories = models.IntegerField()
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.title
