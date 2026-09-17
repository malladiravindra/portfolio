import { useCallback, useEffect, useState } from 'react'
import {
  api,
  Certification,
  Profile,
  Project,
  Service,
  SkillGroup,
  TimelineEntry,
} from '../lib/api'

export type PortfolioData = {
  profile: Profile | null
  skills: SkillGroup[]
  projects: Project[]
  timeline: TimelineEntry[]
  certifications: Certification[]
  services: Service[]
}

const EMPTY: PortfolioData = {
  profile: null,
  skills: [],
  projects: [],
  timeline: [],
  certifications: [],
  services: [],
}

type State = {
  data: PortfolioData
  loading: boolean
  // Only set when the core Profile fetch fails — that's the one section
  // every other section depends on to render anything meaningful.
  error: string | null
}

export function usePortfolioData() {
  const [state, setState] = useState<State>({ data: EMPTY, loading: true, error: null })
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))

    Promise.allSettled([
      api.profile(),
      api.techstack(),
      api.projects(),
      api.timeline(),
      api.certifications(),
      api.services(),
    ]).then((results) => {
      if (cancelled) return
      const [profile, skills, projects, timeline, certifications, services] = results

      const data: PortfolioData = {
        profile: profile.status === 'fulfilled' ? profile.value : null,
        skills: skills.status === 'fulfilled' ? skills.value : [],
        projects: projects.status === 'fulfilled' ? projects.value : [],
        timeline: timeline.status === 'fulfilled' ? timeline.value : [],
        certifications: certifications.status === 'fulfilled' ? certifications.value : [],
        services: services.status === 'fulfilled' ? services.value : [],
      }

      setState({
        data,
        loading: false,
        error: profile.status === 'rejected' ? 'Could not reach the portfolio API.' : null,
      })
    })

    return () => {
      cancelled = true
    }
  }, [attempt])

  return { ...state, retry }
}
