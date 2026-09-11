from django.contrib import admin

from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'email', 'updated_at']

    def has_add_permission(self, request):
        # Singleton — no "add another" once one row exists.
        return not Profile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
