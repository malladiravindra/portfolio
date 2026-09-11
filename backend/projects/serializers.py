from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    tech = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['slug', 'name', 'tagline', 'description', 'tech', 'link', 'featured', 'status']

    def get_tech(self, project: Project) -> list[str]:
        return [t.name for t in project.tech.all()]
