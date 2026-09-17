from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Certification
from .serializers import CertificationSerializer


class CertificationListView(APIView):
    """GET /api/certifications/ — every certification, in display order."""

    def get(self, request, *args, **kwargs):
        certifications = Certification.objects.all()
        return Response(CertificationSerializer(certifications, many=True).data)
