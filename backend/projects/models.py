from django.db import models


class Project(models.Model):
    class Status(models.TextChoices):
        SHIPPED = 'shipped', 'Shipped'
        LABS = 'labs', 'Labs'

    slug = models.SlugField(max_length=80, unique=True)
    name = models.CharField(max_length=150)
    tagline = models.CharField(max_length=300)
    description = models.TextField()
    link = models.URLField(blank=True, help_text='Repo/live link. Left blank, the frontend falls back to your GitHub profile.')
    featured = models.BooleanField(default=False)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.SHIPPED)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self) -> str:
        return self.name


class ProjectTech(models.Model):
    """One tech badge on a project card, e.g. "Django REST Framework"."""

    project = models.ForeignKey(Project, related_name='tech', on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Project tech badges'

    def __str__(self) -> str:
        return self.name
