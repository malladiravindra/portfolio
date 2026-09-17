from rest_framework import serializers

from .models import TimelineEntry


class TimelineEntrySerializer(serializers.ModelSerializer):
    bullets = serializers.SerializerMethodField()
    technologies = serializers.SerializerMethodField()

    class Meta:
        model = TimelineEntry
        fields = ['hash', 'type', 'title', 'org', 'meta', 'bullets', 'technologies']

    def get_bullets(self, entry: TimelineEntry) -> list[str]:
        return [b.text for b in entry.bullets.all()]

    def get_technologies(self, entry: TimelineEntry) -> list[str]:
        return [t.name for t in entry.technologies.all()]
