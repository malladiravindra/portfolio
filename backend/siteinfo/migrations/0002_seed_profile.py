from django.db import migrations

PROFILE = dict(
    pk=1,
    name='Malladi Ravindra Babu',
    handle='malladiravindra',
    role='Full Stack Developer',
    role_sub='Python / Django + React / JavaScript',
    location='Hyderabad, India',
    email='malladiravindra1@gmail.com',
    phone='',
    github_url='https://github.com/malladiravindra',
    github_handle='github.com/malladiravindra',
    linkedin_url='https://linkedin.com/in/ravindra-babu-malladi',
    linkedin_handle='linkedin.com/in/ravindra-babu-malladi',
    resume_url='/resume.pdf',
    tagline="I like backends that don't fall over and frontends that don't lie to users.",
)


def seed(apps, schema_editor):
    Profile = apps.get_model('siteinfo', 'Profile')
    Profile.objects.update_or_create(pk=1, defaults={k: v for k, v in PROFILE.items() if k != 'pk'})


def unseed(apps, schema_editor):
    Profile = apps.get_model('siteinfo', 'Profile')
    Profile.objects.filter(pk=1).delete()


class Migration(migrations.Migration):
    dependencies = [('siteinfo', '0001_initial')]
    operations = [migrations.RunPython(seed, unseed)]
