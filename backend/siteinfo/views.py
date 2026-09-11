from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import ProfileSerializer


class ProfileView(APIView):
    """GET /api/profile/ — hero/contact identity block."""

    def get(self, request, *args, **kwargs):
        profile = Profile.load()
        return Response(ProfileSerializer(profile).data)
