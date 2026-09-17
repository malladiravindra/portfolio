from django.contrib import admin

from .models import StackCategory, StackItem


class StackItemInline(admin.TabularInline):
    model = StackItem
    extra = 1
    fields = ['name', 'icon', 'proficiency', 'is_active', 'order']


@admin.register(StackCategory)
class StackCategoryAdmin(admin.ModelAdmin):
    list_display = ['label', 'key', 'order', 'item_count']
    ordering = ['order']
    inlines = [StackItemInline]

    @admin.display(description='Items')
    def item_count(self, category: StackCategory) -> int:
        return category.items.count()
