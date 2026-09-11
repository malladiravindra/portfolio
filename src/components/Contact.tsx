import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Github, Linkedin, Loader2, Mail } from 'lucide-react'
import { site } from '../data/site'
import { btnPrimary, btnSecondary } from '../styles/buttons'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('submitting')
    setError(null)

    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      subject: String(data.get('subject') || ''),
      message: String(data.get('message') || ''),
      website: String(data.get('website') || ''),
    }

    try {
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
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="container-page scroll-mt-16 py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={item} className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            Contact
          </motion.p>
          <motion.h2 variants={item} className="font-heading text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Let&apos;s build something useful.
          </motion.h2>
          <motion.p variants={item} className="mt-4 max-w-md leading-relaxed text-slate-600 dark:text-slate-400">
            I&apos;m open to opportunities where I can contribute as a Python/Django or full stack developer.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className={`px-4 py-2.5 ${btnPrimary}`}>
              <Mail size={16} /> Email Me
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className={`px-4 py-2.5 ${btnSecondary}`}>
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className={`px-4 py-2.5 ${btnSecondary}`}>
              <Github size={16} /> GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Honeypot for the backend's spam check — left in the layout (not display:none)
              so it stays invisible to real visitors but still catches bots. */}
          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Subject" name="subject" />
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={4}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900
                         focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent
                         dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`px-5 py-2.5 disabled:pointer-events-none disabled:opacity-60 ${btnPrimary}`}
          >
            {status === 'submitting' && <Loader2 size={16} className="animate-spin" />}
            Send Message
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} /> Thanks — your message has been sent.
            </p>
          )}
          {status === 'error' && <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
        </motion.form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900
                   focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent
                   dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />
    </div>
  )
}
