from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contact/', include('contact.urls')),
    path('api/profile/', include('siteinfo.urls')),
    path('api/techstack/', include('techstack.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/timeline/', include('timeline.urls')),
    path('api/certifications/', include('certifications.urls')),
    path('api/services/', include('services.urls')),
]

