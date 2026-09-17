from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(APIView):
    """GET /api/services/ — active services, in display order."""

    def get(self, request, *args, **kwargs):
        services = Service.objects.filter(is_active=True)
        return Response(ServiceSerializer(services, many=True).data)
