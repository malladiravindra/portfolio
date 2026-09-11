import { Moon, Sun } from 'lucide-react'
import { Theme } from '../hooks/useTheme'

export default function ThemeToggle({ theme, toggle }: { theme: Theme; toggle: () => void }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500
                 transition-colors hover:border-accent/40 hover:text-accent dark:border-slate-700 dark:text-slate-400"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
