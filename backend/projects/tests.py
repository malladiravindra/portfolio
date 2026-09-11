from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Project


class ProjectListViewTests(APITestCase):
    def test_returns_all_seeded_projects(self):
        response = self.client.get(reverse('project-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Project.objects.count())
        slugs = [p['slug'] for p in response.data]
        self.assertIn('budget-management-platform', slugs)
        self.assertIn('assetflow', slugs)

    def test_project_includes_flattened_tech_list(self):
        response = self.client.get(reverse('project-list'))
        budget = next(p for p in response.data if p['slug'] == 'budget-management-platform')

        self.assertEqual(
            budget['tech'],
            ['Django', 'DRF', 'React 19', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Celery', 'Redis'],
        )
        self.assertTrue(budget['featured'])
        self.assertEqual(budget['status'], 'shipped')


class ProjectDetailViewTests(APITestCase):
    def test_returns_single_project_by_slug(self):
        response = self.client.get(reverse('project-detail', args=['assetflow']))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'AssetFlow')

    def test_unknown_slug_returns_404(self):
        response = self.client.get(reverse('project-detail', args=['does-not-exist']))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
