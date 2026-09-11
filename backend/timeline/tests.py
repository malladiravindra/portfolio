from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import TimelineEntry


class TimelineViewTests(APITestCase):
    def test_returns_all_entries_with_bullets(self):
        response = self.client.get(reverse('timeline'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), TimelineEntry.objects.count())

    def test_experience_entry_has_expected_shape(self):
        response = self.client.get(reverse('timeline'))
        experience = next(e for e in response.data if e['type'] == 'experience')

        self.assertEqual(experience['hash'], 'a1c9f3e')
        self.assertEqual(experience['org'], 'Python Full Stack Developer Intern · JSpiders, Hyderabad')
        self.assertEqual(len(experience['bullets']), 5)

    def test_education_entry_present(self):
        response = self.client.get(reverse('timeline'))
        types = [e['type'] for e in response.data]

        self.assertIn('education', types)
