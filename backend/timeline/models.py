from django.db import models


class TimelineEntry(models.Model):
    """One "commit" in the Experience & Education git-log timeline."""

    class EntryType(models.TextChoices):
        EXPERIENCE = 'experience', 'Experience'
        EDUCATION = 'education', 'Education'

    hash = models.CharField(max_length=12, unique=True, help_text='Short commit-style hash, e.g. "a1c9f3e"')
    type = models.CharField(max_length=12, choices=EntryType.choices)
    title = models.CharField(max_length=200, help_text='e.g. "feat: shipped full-stack modules end-to-end"')
    org = models.CharField(max_length=250, help_text='Role/degree + institution')
    meta = models.CharField(max_length=100, help_text='Date range, e.g. "Aug 2024 — Mar 2025"')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Timeline entries'

    def __str__(self) -> str:
        return f'{self.hash} — {self.title}'


class TimelineBullet(models.Model):
    """One bullet point under a TimelineEntry."""

    entry = models.ForeignKey(TimelineEntry, related_name='bullets', on_delete=models.CASCADE)
    text = models.CharField(max_length=400)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self) -> str:
        return self.text


class TimelineTech(models.Model):
    """One tech badge on a TimelineEntry, e.g. "Django" on an experience entry."""

    entry = models.ForeignKey(TimelineEntry, related_name='technologies', on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Timeline tech badges'

    def __str__(self) -> str:
        return self.name
