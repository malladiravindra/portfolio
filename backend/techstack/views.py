from rest_framework.response import Response
from rest_framework.views import APIView

from .models import StackCategory
from .serializers import StackCategorySerializer


class TechStackView(APIView):
    """GET /api/techstack/ — all categories, each with its list of items, in display order."""

    def get(self, request, *args, **kwargs):
        categories = StackCategory.objects.prefetch_related('items').all()
        return Response(StackCategorySerializer(categories, many=True).data)
