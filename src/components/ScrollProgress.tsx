import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * A hairline progress bar pinned under the navbar, tracking scroll position.
 * Deliberately minimal — 2px, low-contrast, transform-only (scaleX) so it's
 * effectively free to animate.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.1 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-accent/60 dark:bg-accent-dark/60"
    />
  )
}
