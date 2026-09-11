from rest_framework import serializers

from .models import TimelineEntry


class TimelineEntrySerializer(serializers.ModelSerializer):
    bullets = serializers.SerializerMethodField()

    class Meta:
        model = TimelineEntry
        fields = ['hash', 'type', 'title', 'org', 'meta', 'bullets']

    def get_bullets(self, entry: TimelineEntry) -> list[str]:
        return [b.text for b in entry.bullets.all()]
