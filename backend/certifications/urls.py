from django.urls import path

from .views import CertificationListView

urlpatterns = [
    path('', CertificationListView.as_view(), name='certification-list'),
]
