from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Profile


class ProfileViewTests(APITestCase):
    def test_returns_seeded_profile(self):
        response = self.client.get(reverse('profile'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Malladi Ravindra Babu')
        self.assertEqual(response.data['email'], 'malladiravindra1@gmail.com')
        self.assertEqual(response.data['github_handle'], 'github.com/malladiravindra')

    def test_get_or_creates_when_row_missing(self):
        Profile.objects.all().delete()

        response = self.client.get(reverse('profile'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Profile.objects.count(), 1)

    def test_singleton_save_always_uses_pk_one(self):
        Profile.objects.all().delete()
        Profile.objects.create(pk=99, name='Someone Else', handle='x', role='x', role_sub='x',
                                location='x', email='x@example.com', tagline='x')

        self.assertEqual(Profile.objects.count(), 1)
        self.assertEqual(Profile.objects.first().pk, 1)
