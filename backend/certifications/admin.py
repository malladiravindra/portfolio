from django.contrib import admin

from .models import Certification


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'issuing_organization', 'issue_date', 'order']
    list_filter = ['issuing_organization']
    search_fields = ['title', 'issuing_organization', 'credential_id']
    ordering = ['order']
