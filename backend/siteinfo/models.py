from django.db import models
from django.utils import timezone


class Profile(models.Model):
    """
    The hero/about/contact identity block (name, role, bio, links, tagline)
    served to the frontend via /api/profile/. Deliberately a singleton:
    there's one portfolio owner, so there's exactly one row (pk=1, enforced
    in save()).
    """

    name = models.CharField(max_length=150)
    short_name = models.CharField(
        max_length=100, blank=True,
        help_text='Shorter display form of the name, e.g. "Ravindra Babu" — used in the hero heading and nav logo.',
    )
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

    short_bio = models.CharField(
        max_length=300, blank=True,
        help_text='One or two sentences — used in compact contexts (meta description, cards).',
    )
    detailed_bio = models.TextField(
        blank=True,
        help_text='Full About-section bio. Separate paragraphs with a blank line.',
    )
    profile_image = models.CharField(
        max_length=300, blank=True,
        help_text='Path or URL to a profile photo, if any — e.g. "/profile.jpg".',
    )
    availability_status = models.CharField(
        max_length=100, blank=True, default='Open to opportunities',
    )
    years_experience = models.DecimalField(max_digits=4, decimal_places=1, default=0)

    created_at = models.DateTimeField(default=timezone.now, editable=False)
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
