from rest_framework import serializers

from .models import StackCategory


class StackCategorySerializer(serializers.ModelSerializer):
    # Flattened to a list of names to match the frontend's StackGroup shape
    # ({ key, label, items: string[] }) — items.all() is prefetched by the view.
    items = serializers.SerializerMethodField()

    class Meta:
        model = StackCategory
        fields = ['key', 'label', 'items']

    def get_items(self, category: StackCategory) -> list[str]:
        return [item.name for item in category.items.all()]
