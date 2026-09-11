// Shared button styles so every CTA across the site (Nav, Hero, Contact,
// FeaturedProject, ...) gets the same hover/press micro-interaction instead
// of each component re-inventing its own. Transform + opacity only — no
// width/height/top/left — so these stay cheap to animate.
//
// Padding is deliberately left out here and added at each call site (Tailwind
// resolves same-property utility classes by stylesheet order, not by their
// order in a className string, so baking one padding in and appending
// another to override it is unreliable).
const base =
  'inline-flex items-center gap-2 rounded-md text-sm font-semibold transition-all duration-300 ease-out ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]'

export const btnPrimary =
  `${base} bg-slate-900 text-white hover:bg-slate-700 ` +
  `dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200`

export const btnSecondary =
  `${base} border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 ` +
  `dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white`

export const btnGhost = `${base} text-slate-700 hover:text-accent dark:text-slate-200 dark:hover:text-accent-dark`
