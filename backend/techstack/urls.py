from django.urls import path

from .views import TechStackView

urlpatterns = [
    path('', TechStackView.as_view(), name='techstack'),
]
