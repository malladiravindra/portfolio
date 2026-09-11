# Ravindra Babu Malladi — Portfolio

A clean, modern developer portfolio. React + TypeScript + Tailwind + Framer Motion, built with Vite.
Positioned as a Python/Django + React/Next.js full stack developer, with a light/dark theme toggle.

## Backend

`backend/` has a small Django + DRF API for the contact form (validation,
spam honeypot, rate limiting, email notification, admin panel to view
submissions). The Contact section's form submits to it directly — see
[`backend/README.md`](backend/README.md) for setup.

## Before you deploy — a few things to check

1. **Backend running**: the contact form POSTs to `VITE_API_URL` (see `.env.example`,
   defaults to `http://127.0.0.1:8000`). Start `backend/` (see its README) so submissions
   actually go through, and set `VITE_API_URL` to your deployed API's URL in production.
2. **Resume**: drop your PDF at `public/resume.pdf` (see the placeholder note in that
   folder). The "Resume" buttons in the Nav and Hero link to `/resume.pdf`.
3. **Phone number**: `src/data/site.ts` has an empty `phone` field, currently unused in
   the UI — add it there and wire it in if you want a phone link shown somewhere.

Everything else (name, role, email, GitHub, LinkedIn, projects, experience, education,
skills) is already wired up in `src/data/`.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy

`dist/` is a static build — drop it on any static host:

- **Vercel**: import the repo, framework preset "Vite", no config needed.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: `npm run build`, push `dist/` to a `gh-pages` branch (or use an action).

Set `VITE_API_URL` as an environment variable on whichever host you use, pointing at
your deployed Django backend, so the contact form keeps working in production.

## Project structure

```
src/
  components/   UI sections (Nav, Hero, About, Stack, Projects, FeaturedProject,
                 ExperienceTimeline, Education, Contact, Footer, SectionHeader,
                 SkillCard, ProjectCard, ThemeToggle, ...)
  data/         Content — edit these to update copy without touching components
    site.ts       name, role, contact links, resume path, nav items
    techstack.ts  curated skills, grouped by category
    projects.ts   project cards (source of truth for all project content)
    timeline.ts   experience + education entries
  hooks/        useTheme (light/dark persistence)
```

## Customizing

- **Colors**: `tailwind.config.js` — a single `accent` color plus Tailwind's default
  slate palette. Dark mode uses Tailwind's standard `dark:` class-based variant
  (toggled on `<html>` by `useTheme`).
- **Copy**: everything user-facing lives in `src/data/*.ts` — no JSX digging required
  for routine updates.
- **Projects with a real repo link**: add a `link` field to any entry in
  `src/data/projects.ts`; cards without one link to your GitHub profile instead.
- **Featured project**: `src/components/FeaturedProject.tsx` pulls the
  `budget-management-platform` project by slug — change the slug there to feature
  a different project.
