from django.db import models


class Service(models.Model):
    """A service offering shown on the portfolio, e.g. "Backend API Development"."""

    title = models.CharField(max_length=150)
    description = models.TextField()
    icon = models.CharField(
        max_length=60, blank=True,
        help_text='Optional lucide-react icon name, e.g. "server".',
    )
    is_active = models.BooleanField(default=True, help_text='Unchecking hides this service from the public API.')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self) -> str:
        return self.title
