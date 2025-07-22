
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from '../context/theme-context'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme()

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded-full bg-gray-800 text-yellow-400 hover:bg-gray-700 transition"
      aria-label="Alternar tema"

      title="Alternar tema"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {mode === 'dark' ? <SunIcon size={24} /> : <MoonIcon size={24} />}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
