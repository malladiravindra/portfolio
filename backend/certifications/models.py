from django.db import models


class Certification(models.Model):
    """A professional certification/credential shown on the portfolio."""

    title = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    issue_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-issue_date', 'id']

    def __str__(self) -> str:
        return f'{self.title} — {self.issuing_organization}'
