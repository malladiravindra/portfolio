from django.contrib import admin
from django.urls import include, path
from django.http import JsonResponse


def root_health(request):
    return JsonResponse({
        "status": "ok",
        "message": "Portfolio backend API is running successfully."
    })


urlpatterns = [
    path('', root_health, name='root-health'),
    path('admin/', admin.site.urls),
    path('api/contact/', include('contact.urls')),
    path('api/profile/', include('siteinfo.urls')),
    path('api/techstack/', include('techstack.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/timeline/', include('timeline.urls')),
]

