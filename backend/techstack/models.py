from django.db import models


class StackCategory(models.Model):
    """A grouping in the tech stack section, e.g. "backend", "databases"."""

    key = models.SlugField(max_length=60, unique=True, help_text='e.g. "apis_and_auth" — matches frontend grouping')
    label = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Stack categories'

    def __str__(self) -> str:
        return self.label


class StackItem(models.Model):
    """A single technology within a StackCategory, e.g. "Django REST Framework"."""

    category = models.ForeignKey(StackCategory, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self) -> str:
        return self.name
