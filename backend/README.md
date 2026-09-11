# Portfolio backend

A Django + Django REST Framework API that backs the whole portfolio site's
content — profile, tech stack, projects, experience/education — plus the
contact form. Every endpoint is a `rest_framework.views.APIView` subclass
(no generics, no viewsets/routers) — explicit `get`/`post` methods per view,
by design.

The frontend currently reads its content from `src/data/*.ts` and doesn't
call this API yet — see **Wiring up the React frontend** below.

## What's here

```
backend/
  config/            Project settings, urls, wsgi/asgi
  siteinfo/          Profile singleton — name, role, links, tagline (mirrors site.ts)
  techstack/         StackCategory -> StackItem (mirrors techstack.ts)
  projects/          Project -> ProjectTech (mirrors projects.ts)
  timeline/          TimelineEntry -> TimelineBullet — experience + education (mirrors timeline.ts)
  contact/           ContactMessage — the contact form endpoint
  requirements.txt
  .env.example
```

Each of the five apps follows the same shape: `models.py` (schema),
`serializers.py` (validation / flattening relations to plain lists for the
frontend), `views.py` (`APIView` subclasses), `admin.py` (registered in
Django admin, with inlines for the *-to-many bits), and `migrations/`
(`0001_initial.py` for schema, `0002_seed_*.py` — a data migration seeding
the exact content already in `src/data/*.ts`).

Content lives in the database (editable via `/admin/`) and ships pre-seeded
with the same copy currently hardcoded in the frontend's `src/data/` files,
via data migrations — running `migrate` on a fresh database reproduces the
live site's content exactly, no manual data entry needed.

## API endpoints

All read-only (`GET`) except the contact form.

| Endpoint | Returns |
|---|---|
| `GET /api/profile/` | Hero/contact identity block (single object) |
| `GET /api/techstack/` | List of `{ key, label, items: string[] }` |
| `GET /api/projects/` | List of projects, each with a flattened `tech: string[]` |
| `GET /api/projects/<slug>/` | One project by slug, `404` if unknown |
| `GET /api/timeline/` | List of experience/education entries, each with a flattened `bullets: string[]` |
| `POST /api/contact/` | Contact form submission — see below |

Why `APIView` instead of `generics.ListAPIView` / viewsets: it's a deliberate
choice for this project, not an oversight — every view spells out its HTTP
methods and return shape directly, no framework magic to trace through.

## Setup

```bash
cd backend
python -m venv venv
./venv/Scripts/activate        # Windows (PowerShell: venv\Scripts\Activate.ps1)
# source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
cp .env.example .env           # then edit .env — see below
python manage.py migrate
python manage.py createsuperuser   # to view submissions at /admin/
python manage.py runserver
```

Server runs at `http://127.0.0.1:8000/`. See **API endpoints** above.

### Environment variables (`.env`)

Copied from `.env.example`. The important ones:

- `SECRET_KEY` — generate a real one for anything beyond local dev.
- `CORS_ALLOWED_ORIGINS` — must include the frontend's origin
  (`http://localhost:5173` for `npm run dev`, your deployed domain in prod).
- `EMAIL_HOST` — leave blank locally and emails print to the console instead
  of sending (see `EMAIL_BACKEND` in `config/settings.py`). Set real SMTP
  values (e.g. a Gmail app password, SendGrid, etc.) to actually send mail.
- `CONTACT_RECIPIENT_EMAIL` — where form submissions get emailed.
- `DATABASE_URL` — optional. Unset = local SQLite file. Set to a Postgres
  URL (`postgres://user:pass@host:port/db`) for staging/production.

## The contact form endpoint, in detail

**`POST /api/contact/`**

Request body:
```json
{
  "name": "Jordan Lee",
  "email": "jordan@company.com",
  "subject": "Full Stack role",
  "message": "Loved your portfolio — got 20 minutes this week for a call?"
}
```

- `subject` is optional; `name`, `email`, `message` are required.
- `message` must be at least 10 characters.
- Success → `201` with `{"detail": "Thanks — message sent."}`.
- Validation failure → `400` with field-level errors, e.g. `{"email": ["Enter a valid email address."]}`.
- Rate limit: 5 requests/hour per IP → `429` past that.
- There's also a `website` field the serializer accepts but never displays:
  it's a honeypot. Real visitors never fill it (the frontend should keep it
  visually hidden); if it arrives non-empty, the API returns the same `201`
  success response but silently discards the submission — bots get no
  signal that anything went differently.

## Tests

```bash
python manage.py test          # all apps — 19 tests
python manage.py test contact  # or scope to one app
```

## Wiring up the React frontend

The frontend still reads from `src/data/*.ts` and doesn't call any of this
yet — none of the components fetch. Wiring it up means, per section:
replace the static import with a `fetch` to the matching endpoint (ideally
behind a small hook so each component doesn't repeat the fetch/loading/error
boilerplate). The shapes match `src/data/*.ts` closely on purpose — e.g.
`GET /api/projects/` returns the same `{ slug, name, tagline, description,
tech, link, featured, status }` shape as `projects.ts`'s `Project` type — so
each swap should be close to a drop-in replacement for its `import`.

The one exception is the contact form: `Contact.tsx` currently only has
clickable links, no form to submit. That needs a new component, e.g.:

```tsx
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

async function submitContactForm(data: { name: string; email: string; subject?: string; message: string }) {
  const res = await fetch(`${API_URL}/api/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error((await res.json())?.detail ?? 'Something went wrong')
  return res.json()
}
```

Remember to include a hidden `website` input in that form (styled off-screen,
not `display: none`, so real screen readers/autofill still leave it blank)
for the honeypot to work. Ask if you'd like this form built into the site.

## Deploying

This is a standard Django app — `gunicorn config.wsgi` behind Nginx, or any
platform that runs a WSGI app (Railway, Render, Fly.io, a plain VPS). Point
`DATABASE_URL` at a real Postgres instance and set `DEBUG=False` with a real
`ALLOWED_HOSTS` before going live.
