from django.contrib import admin
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team', 'total_points', 'created_at')
    list_filter = ('team', 'created_at')
    search_fields = ('name', 'email')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'email', 'password')
        }),
        ('Team & Points', {
            'fields': ('team', 'total_points')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_points', 'members_count', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Team Information', {
            'fields': ('name', 'description')
        }),
        ('Statistics', {
            'fields': ('total_points', 'members_count')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'date', 'duration_minutes', 'calories_burned', 'points_earned')
    list_filter = ('activity_type', 'date', 'user')
    search_fields = ('user__name', 'activity_type')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Activity Details', {
            'fields': ('user', 'activity_type', 'date')
        }),
        ('Metrics', {
            'fields': ('duration_minutes', 'distance_km', 'calories_burned', 'points_earned')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('rank', 'user', 'team', 'total_points', 'activities_count')
    list_filter = ('team', 'updated_at')
    search_fields = ('user__name', 'team')
    readonly_fields = ('updated_at',)
    fieldsets = (
        ('Ranking', {
            'fields': ('rank', 'user', 'team')
        }),
        ('Statistics', {
            'fields': ('total_points', 'activities_count')
        }),
        ('Timestamp', {
            'fields': ('updated_at',)
        }),
    )


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty', 'duration_minutes', 'expected_calories', 'created_at')
    list_filter = ('difficulty', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Workout Information', {
            'fields': ('title', 'description', 'difficulty')
        }),
        ('Details', {
            'fields': ('duration_minutes', 'expected_calories', 'instructions')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
