from django.contrib import admin

from .models import TimelineEntry, TimelineBullet


class TimelineBulletInline(admin.TabularInline):
    model = TimelineBullet
    extra = 1


@admin.register(TimelineEntry)
class TimelineEntryAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'org', 'meta', 'hash', 'order']
    list_filter = ['type']
    ordering = ['order']
    inlines = [TimelineBulletInline]
