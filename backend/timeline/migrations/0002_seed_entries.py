from django.db import migrations

# Mirrors src/data/timeline.ts
ENTRIES = [
    dict(
        hash='a1c9f3e',
        type='experience',
        title='feat: shipped full-stack modules end-to-end',
        org='Python Full Stack Developer Intern · JSpiders, Hyderabad',
        meta='Aug 2024 — Mar 2025',
        bullets=[
            'Built 3+ production-style modules end-to-end on Django + React (MVT and component architecture).',
            'Designed and integrated DRF APIs directly into React frontends.',
            'Optimized PostgreSQL/MySQL queries and schemas for datasets of 500+ records.',
            'Implemented JWT authentication and role-based access control (RBAC).',
            'Validated every API in Postman before merge, inside a Git/GitHub workflow.',
        ],
    ),
    dict(
        hash='7b2e5a1',
        type='education',
        title='feat: laid the CS foundation',
        org='B.Tech, Computer Science & Engineering · Vikas Group of Institutions (JNTU Kakinada)',
        meta='2020 — 2024',
        bullets=[
            'Core coursework in data structures, algorithms, databases, and OS.',
            'Where the "why" behind the frameworks started making sense.',
        ],
    ),
]


def seed(apps, schema_editor):
    TimelineEntry = apps.get_model('timeline', 'TimelineEntry')
    TimelineBullet = apps.get_model('timeline', 'TimelineBullet')

    for order, data in enumerate(ENTRIES):
        fields = {k: v for k, v in data.items() if k != 'bullets'}
        entry, _ = TimelineEntry.objects.update_or_create(
            hash=fields['hash'], defaults={**fields, 'order': order}
        )
        entry.bullets.all().delete()
        for bullet_order, text in enumerate(data['bullets']):
            TimelineBullet.objects.create(entry=entry, text=text, order=bullet_order)


def unseed(apps, schema_editor):
    TimelineEntry = apps.get_model('timeline', 'TimelineEntry')
    TimelineEntry.objects.filter(hash__in=[e['hash'] for e in ENTRIES]).delete()


class Migration(migrations.Migration):
    dependencies = [('timeline', '0001_initial')]
    operations = [migrations.RunPython(seed, unseed)]
