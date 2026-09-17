from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'name', 'short_name', 'handle', 'role', 'role_sub', 'location',
            'email', 'phone',
            'github_url', 'github_handle', 'linkedin_url', 'linkedin_handle',
            'resume_url', 'tagline',
            'short_bio', 'detailed_bio', 'profile_image',
            'availability_status', 'years_experience',
        ]
