from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(APIView):
    """GET /api/projects/ — every project, in display order."""

    def get(self, request, *args, **kwargs):
        projects = Project.objects.prefetch_related('tech').all()
        return Response(ProjectSerializer(projects, many=True).data)


class ProjectDetailView(APIView):
    """GET /api/projects/<slug>/ — a single project by slug."""

    def get(self, request, slug, *args, **kwargs):
        project = get_object_or_404(Project.objects.prefetch_related('tech'), slug=slug)
        return Response(ProjectSerializer(project).data)
