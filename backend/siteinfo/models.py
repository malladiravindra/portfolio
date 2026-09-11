from django.db import models


class Profile(models.Model):
    """
    The hero/contact identity block (name, role, links, tagline) — mirrors
    the frontend's src/data/site.ts. Deliberately a singleton: there's one
    portfolio owner, so there's exactly one row (pk=1, enforced in save()).
    """

    name = models.CharField(max_length=150)
    handle = models.CharField(max_length=60, help_text='e.g. "malladiravindra" — used as @handle')
    role = models.CharField(max_length=150)
    role_sub = models.CharField(max_length=200, help_text='e.g. "Python / Django + React / JavaScript"')
    location = models.CharField(max_length=150)

    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)

    github_url = models.URLField()
    github_handle = models.CharField(max_length=150, help_text='Display text, e.g. "github.com/handle"')
    linkedin_url = models.URLField()
    linkedin_handle = models.CharField(max_length=150)

    resume_url = models.CharField(
        max_length=300,
        default='/resume.pdf',
        help_text='Path or URL to the resume file the frontend links to.',
    )
    tagline = models.CharField(max_length=300)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profile'

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        self.pk = 1  # singleton
        super().save(*args, **kwargs)

    @classmethod
    def load(cls) -> 'Profile':
        """Get the singleton row, creating an empty one if it doesn't exist yet."""
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
