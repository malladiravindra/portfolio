from django.core import mail
from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage


class ContactMessageEndpointTests(APITestCase):
    def setUp(self):
        # DRF's throttle counters live in the cache, not the (per-test,
        # rolled-back) database — clear it so one test's requests don't
        # count against the next test's rate limit.
        cache.clear()
        self.url = reverse('contact-message')
        self.valid_payload = {
            'name': 'Priya Sharma',
            'email': 'priya@example.com',
            'subject': 'Full Stack role',
            'message': "Hey, we're hiring a Django/React developer — got 20 min this week?",
        }

    def test_valid_submission_creates_message_and_sends_email(self):
        response = self.client.post(self.url, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

        saved = ContactMessage.objects.first()
        self.assertEqual(saved.email, 'priya@example.com')
        self.assertIsNotNone(saved.ip_address)

        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('Full Stack role', mail.outbox[0].subject)

    def test_invalid_email_is_rejected(self):
        payload = {**self.valid_payload, 'email': 'not-an-email'}
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)

    def test_missing_message_is_rejected(self):
        payload = {**self.valid_payload}
        del payload['message']
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_too_short_message_is_rejected(self):
        payload = {**self.valid_payload, 'message': 'hi'}
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_honeypot_field_silently_drops_submission(self):
        payload = {**self.valid_payload, 'website': 'http://spammy-bot.example'}
        response = self.client.post(self.url, payload, format='json')

        # Looks like success to whatever (bot) submitted it...
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # ...but nothing was actually saved or emailed.
        self.assertEqual(ContactMessage.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)

    def test_rate_limit_blocks_after_five_requests_per_hour(self):
        for _ in range(5):
            response = self.client.post(self.url, self.valid_payload, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
