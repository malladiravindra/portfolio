from django.db import migrations

# (key, label, [items...]) — mirrors src/data/techstack.ts
STACK = [
    ('languages', 'languages', ['Python 3', 'JavaScript (ES6+)']),
    ('backend', 'backend', ['Django', 'Django REST Framework', 'FastAPI', 'Django Channels', 'Celery']),
    ('frontend', 'frontend', ['React', 'AngularJS', 'HTML5', 'CSS']),
    ('databases', 'databases', ['PostgreSQL', 'MySQL', 'SQLite']),
    ('apis_auth', 'apis_and_auth', ['REST API design', 'JWT', 'OAuth 2.0', 'RBAC', 'OpenAPI']),
    ('realtime', 'realtime_async', ['WebSockets', 'Redis', 'Celery', 'Django Channels']),
    ('testing', 'testing', ['Playwright (E2E)', 'Selenium', 'Pytest']),
    ('tools', 'tools', ['Git / GitHub', 'Postman', 'VS Code']),
]


def seed(apps, schema_editor):
    StackCategory = apps.get_model('techstack', 'StackCategory')
    StackItem = apps.get_model('techstack', 'StackItem')

    for order, (key, label, items) in enumerate(STACK):
        category, _ = StackCategory.objects.update_or_create(key=key, defaults={'label': label, 'order': order})
        category.items.all().delete()
        for item_order, name in enumerate(items):
            StackItem.objects.create(category=category, name=name, order=item_order)


def unseed(apps, schema_editor):
    StackCategory = apps.get_model('techstack', 'StackCategory')
    StackCategory.objects.filter(key__in=[key for key, _, _ in STACK]).delete()


class Migration(migrations.Migration):
    dependencies = [('techstack', '0001_initial')]
    operations = [migrations.RunPython(seed, unseed)]
