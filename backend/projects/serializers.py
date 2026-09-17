from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    tech = serializers.SerializerMethodField()

    key_features = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'slug', 'name', 'tagline', 'description', 'tech', 'link', 'image',
            'github_url', 'live_url', 'problem_statement', 'key_features',
            'featured', 'status', 'created_at', 'updated_at',
        ]

    def get_tech(self, project: Project) -> list[str]:
        return [t.name for t in project.tech.all()]

    def get_key_features(self, project: Project) -> list[str]:
        return [line.strip() for line in project.key_features.splitlines() if line.strip()]
