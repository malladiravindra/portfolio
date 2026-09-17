export const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

export type Profile = {
  name: string
  short_name: string
  handle: string
  role: string
  role_sub: string
  location: string
  email: string
  phone: string
  github_url: string
  github_handle: string
  linkedin_url: string
  linkedin_handle: string
  resume_url: string
  tagline: string
  short_bio: string
  detailed_bio: string
  profile_image: string
  availability_status: string
  years_experience: string
}

export type SkillGroup = {
  key: string
  label: string
  items: string[]
}

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  tech: string[]
  link: string
  image: string
  github_url: string
  live_url: string
  problem_statement: string
  key_features: string[]
  featured: boolean
  status: 'shipped' | 'labs'
  created_at: string
  updated_at: string
}

export type TimelineEntry = {
  hash: string
  type: 'experience' | 'education'
  title: string
  org: string
  meta: string
  bullets: string[]
  technologies: string[]
}

export type Certification = {
  title: string
  issuing_organization: string
  issue_date: string | null
  credential_id: string
  credential_url: string
  description: string
}

export type Service = {
  title: string
  description: string
  icon: string
}

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  website?: string
}

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  profile: () => getJSON<Profile>('/api/profile/'),
  techstack: () => getJSON<SkillGroup[]>('/api/techstack/'),
  projects: () => getJSON<Project[]>('/api/projects/'),
  timeline: () => getJSON<TimelineEntry[]>('/api/timeline/'),
  certifications: () => getJSON<Certification[]>('/api/certifications/'),
  services: () => getJSON<Service[]>('/api/services/'),

  async contact(payload: ContactPayload): Promise<void> {
    const res = await fetch(`${API_URL}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      const message =
        (body && (body.detail || Object.values(body).flat()[0])) || 'Something went wrong. Please try again.'
      throw new Error(String(message))
    }
  },
}
