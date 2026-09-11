from django.contrib import admin

from .models import Project, ProjectTech


class ProjectTechInline(admin.TabularInline):
    model = ProjectTech
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'status', 'featured', 'order']
    list_filter = ['status', 'featured']
    search_fields = ['name', 'slug', 'tagline', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order']
    inlines = [ProjectTechInline]
