from django.db import migrations

# Mirrors src/data/projects.ts
PROJECTS = [
    dict(
        slug='budget-management-platform',
        name='Budget Management Platform',
        tagline='A budgeting app that treats your money like a Kanban board, not a spreadsheet.',
        description=(
            "Decoupled full-stack budgeting platform — a React 19 + TypeScript frontend I built "
            "independently, talking to a Django REST Framework backend. Drag-and-drop Kanban UI, "
            "real-time WebSocket time tracking, Celery background tasks, Excel/PDF financial "
            "reporting, a Profit Margin KPI dashboard, and RBAC enforced on both layers."
        ),
        tech=['Django', 'DRF', 'React 19', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Celery', 'Redis'],
        link='',
        featured=True,
        status='shipped',
    ),
    dict(
        slug='automated-testing-suite',
        name='Automated Testing Suite',
        tagline='Retired a flaky Selenium suite; replaced it with a Playwright suite that actually sleeps at night.',
        description=(
            "Migrated an E2E suite from Selenium to Playwright with a Page Object Model, automated "
            "RBAC and WebSocket coverage using Django Channels' WebsocketCommunicator, and wired it "
            "into CI with Postgres and Redis service containers."
        ),
        tech=['Playwright', 'Django Channels', 'GitHub Actions', 'Factory Boy'],
        link='',
        featured=True,
        status='shipped',
    ),
    dict(
        slug='realtime-collaborative-editor',
        name='Real-Time Collaborative Editor',
        tagline='Two cursors, one document, zero merge conflicts.',
        description=(
            'A CRDT/OT-based collaborative text editor — Django Channels on the backend, Yjs + '
            'Monaco/CodeMirror on the frontend. Built as a career-differentiation project to get '
            'hands dirty with conflict resolution and real-time sync at the protocol level.'
        ),
        tech=['Django Channels', 'Yjs', 'Monaco Editor', 'WebSockets', 'Python'],
        link='',
        featured=False,
        status='shipped',
    ),
    dict(
        slug='assetflow',
        name='AssetFlow',
        tagline='Enterprise IT asset tracking, minus the spreadsheet chaos.',
        description=(
            'An IT Asset Management app covering assets, departments, locations, and people — full '
            'CRUD wired to real backend APIs, plus a secure auth and forgot-password flow.'
        ),
        tech=['Django', 'REST API', 'PostgreSQL', 'JWT Auth'],
        link='',
        featured=False,
        status='shipped',
    ),
    dict(
        slug='youtube-scripting-tool',
        name='Automatic YouTube Scripting Tool',
        tagline='Taught a script to do the boring 60% of content creation.',
        description=(
            'A Python automation framework that cut manual content-creation effort by 60%, saving '
            '15+ hours a week — with OAuth 2.0 authentication and carefully rate-limited API usage.'
        ),
        tech=['Python', 'YouTube Data API v3', 'OAuth 2.0'],
        link='',
        featured=False,
        status='shipped',
    ),
    dict(
        slug='linkedin-clone-ui',
        name='LinkedIn Clone UI',
        tagline='The feed, the connections, the messaging — rebuilt from scratch.',
        description=(
            'A responsive Angular UI with profile management, a social feed, connections, and '
            'messaging, composed from reusable components.'
        ),
        tech=['Angular', 'TypeScript', 'Angular Material', 'RxJS'],
        link='',
        featured=False,
        status='shipped',
    ),
    dict(
        slug='internal-dev-framework',
        name='Internal Developer Framework',
        tagline="A scaffold so the next project doesn't start from a blank folder.",
        description=(
            'A reusable pip-installable + npm-installable scaffold covering backend, frontend, and '
            'testing setup in one command — a small platform-engineering side project.'
        ),
        tech=['Python', 'Node.js', 'CLI Tooling'],
        link='',
        featured=False,
        status='labs',
    ),
]


def seed(apps, schema_editor):
    Project = apps.get_model('projects', 'Project')
    ProjectTech = apps.get_model('projects', 'ProjectTech')

    for order, data in enumerate(PROJECTS):
        # Copy + pop rather than mutate the module-level PROJECTS list, so
        # this stays safe to call more than once in the same process.
        fields = {k: v for k, v in data.items() if k != 'tech'}
        project, _ = Project.objects.update_or_create(
            slug=fields['slug'], defaults={**fields, 'order': order}
        )
        project.tech.all().delete()
        for tech_order, name in enumerate(data['tech']):
            ProjectTech.objects.create(project=project, name=name, order=tech_order)


def unseed(apps, schema_editor):
    Project = apps.get_model('projects', 'Project')
    Project.objects.filter(slug__in=[p['slug'] for p in PROJECTS]).delete()


class Migration(migrations.Migration):
    dependencies = [('projects', '0001_initial')]
    operations = [migrations.RunPython(seed, unseed)]
