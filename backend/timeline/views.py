from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TimelineEntry
from .serializers import TimelineEntrySerializer


class TimelineView(APIView):
    """GET /api/timeline/ — experience + education entries, in display order."""

    def get(self, request, *args, **kwargs):
        entries = TimelineEntry.objects.prefetch_related('bullets').all()
        return Response(TimelineEntrySerializer(entries, many=True).data)
