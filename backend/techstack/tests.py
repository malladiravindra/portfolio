from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import StackCategory


class TechStackViewTests(APITestCase):
    def test_returns_all_categories_with_items_in_order(self):
        response = self.client.get(reverse('techstack'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), StackCategory.objects.count())

        first = response.data[0]
        self.assertEqual(first['key'], 'languages')
        self.assertEqual(first['items'], ['Python 3', 'JavaScript (ES6+)'])

    def test_backend_category_has_expected_items(self):
        response = self.client.get(reverse('techstack'))
        backend = next(c for c in response.data if c['key'] == 'backend')

        self.assertIn('Django', backend['items'])
        self.assertIn('Django REST Framework', backend['items'])

    def test_query_count_stays_flat_regardless_of_category_count(self):
        # prefetch_related should mean 2 queries total (categories + items),
        # not N+1 as categories grow.
        with self.assertNumQueries(2):
            self.client.get(reverse('techstack'))
