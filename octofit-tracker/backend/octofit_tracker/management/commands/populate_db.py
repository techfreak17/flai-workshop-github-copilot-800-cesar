from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Deleted existing data'))

        # Create teams
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Superheroes from the Marvel Universe',
            total_points=0,
            members_count=0
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='Superheroes from the DC Universe',
            total_points=0,
            members_count=0
        )

        self.stdout.write(self.style.SUCCESS('Created teams'))

        # Create superhero users
        marvel_heroes = [
            ('Iron Man', 'ironman@marvel.com', 'Team Marvel'),
            ('Captain America', 'captainamerica@marvel.com', 'Team Marvel'),
            ('Thor', 'thor@marvel.com', 'Team Marvel'),
            ('Black Widow', 'blackwidow@marvel.com', 'Team Marvel'),
            ('Hulk', 'hulk@marvel.com', 'Team Marvel'),
        ]

        dc_heroes = [
            ('Superman', 'superman@dc.com', 'Team DC'),
            ('Batman', 'batman@dc.com', 'Team DC'),
            ('Wonder Woman', 'wonderwoman@dc.com', 'Team DC'),
            ('The Flash', 'flash@dc.com', 'Team DC'),
            ('Green Lantern', 'greenlantern@dc.com', 'Team DC'),
        ]

        users = []
        for name, email, team in marvel_heroes + dc_heroes:
            user = User.objects.create(
                name=name,
                email=email,
                password='hashed_password_123',
                team=team,
                total_points=random.randint(500, 5000)
            )
            users.append(user)

        self.stdout.write(self.style.SUCCESS('Created superhero users'))

        # Create activities for each user
        activity_types = ['running', 'walking', 'cycling', 'swimming', 'strength_training']
        for user in users:
            for _ in range(5):
                activity = Activity.objects.create(
                    user=user,
                    activity_type=random.choice(activity_types),
                    duration_minutes=random.randint(30, 120),
                    distance_km=round(random.uniform(1, 10), 2),
                    calories_burned=random.randint(200, 800),
                    points_earned=random.randint(50, 300),
                    date=datetime.now().date() - timedelta(days=random.randint(0, 30))
                )

        self.stdout.write(self.style.SUCCESS('Created activities'))

        # Create leaderboard entries
        sorted_users = sorted(users, key=lambda u: u.total_points, reverse=True)
        for rank, user in enumerate(sorted_users, 1):
            activities_count = Activity.objects.filter(user=user).count()
            leaderboard = Leaderboard.objects.create(
                user=user,
                team=user.team,
                rank=rank,
                total_points=user.total_points,
                activities_count=activities_count
            )

        self.stdout.write(self.style.SUCCESS('Created leaderboard entries'))

        # Create workout suggestions
        workouts_data = [
            {
                'title': 'Morning Run',
                'description': 'A refreshing 5km run in the morning to start your day',
                'difficulty': 'easy',
                'duration_minutes': 30,
                'expected_calories': 300,
                'instructions': '1. Warm up for 5 minutes\n2. Run at moderate pace for 20 minutes\n3. Cool down for 5 minutes'
            },
            {
                'title': 'HIIT Training',
                'description': 'High-intensity interval training for maximum calorie burn',
                'difficulty': 'hard',
                'duration_minutes': 45,
                'expected_calories': 500,
                'instructions': '1. Warm up for 5 minutes\n2. 30 seconds of intense exercise, 30 seconds rest (repeat 8 times)\n3. Cool down for 5 minutes'
            },
            {
                'title': 'Yoga Flow',
                'description': 'Relaxing yoga session to improve flexibility and balance',
                'difficulty': 'easy',
                'duration_minutes': 60,
                'expected_calories': 200,
                'instructions': '1. Sun salutations\n2. Standing poses\n3. Seated stretches\n4. Savasana'
            },
            {
                'title': 'Strength Training',
                'description': 'Build muscle with compound exercises',
                'difficulty': 'medium',
                'duration_minutes': 50,
                'expected_calories': 400,
                'instructions': '1. Warm up\n2. Squats (3 sets)\n3. Deadlifts (3 sets)\n4. Bench Press (3 sets)\n5. Cool down'
            },
            {
                'title': 'Cycling Adventure',
                'description': 'Outdoor cycling at moderate intensity',
                'difficulty': 'medium',
                'duration_minutes': 60,
                'expected_calories': 450,
                'instructions': '1. Ride at moderate pace for 60 minutes\n2. Stay hydrated\n3. Maintain steady heart rate'
            },
        ]

        for workout_data in workouts_data:
            Workout.objects.create(**workout_data)

        self.stdout.write(self.style.SUCCESS('Created workout suggestions'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
