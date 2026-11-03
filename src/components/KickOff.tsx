import { useEffect } from 'react'
import { motion } from 'motion/react'

const SWAP_AT = 1250
const DONE_AT = 1900

function Ball({ size }: { size: number }) {
  const rot = [0, 72, 144, 216, 288]
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="48" fill="#fff" stroke="#0b1118" strokeWidth="2" />
      <polygon points="50,30 69,44 62,66 38,66 31,44" fill="#0b1118" />
      {rot.map((r) => (
        <g key={r} transform={`rotate(${r} 50 50)`}>
          <line x1="50" y1="30" x2="50" y2="21" stroke="#0b1118" strokeWidth="2" />
          <polygon points="50,6 58,12 55,21 45,21 42,12" fill="#0b1118" />
        </g>
      ))}
    </svg>
  )
}

/**
 * Splash-to-home transition. The ball rolls across, "KICK OFF" flashes, and the
 * home screen is swapped in underneath while the overlay is still opaque.
 */
export default function KickOff({ onSwap, onDone }: { onSwap: () => void; onDone: () => void }) {
  useEffect(() => {
    const a = window.setTimeout(onSwap, SWAP_AT)
    const b = window.setTimeout(onDone, DONE_AT)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [onSwap, onDone])

  const roll = (delay: number) => ({
    initial: { x: '-18vw', rotate: 0 },
    animate: { x: '110vw', rotate: 1080 },
    transition: { duration: 1.25, delay, ease: [0.35, 0.1, 0.6, 1] as const },
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-hidden bg-pitch-950 will-change-[opacity]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: DONE_AT / 1000, times: [0, 0.12, 0.72, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(31,107,58,0.55),transparent_65%)]" />
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-30" focusable="false">
        <g fill="none" stroke="#fff" strokeWidth="0.8">
          <line x1="0" y1="150" x2="400" y2="150" />
          <circle cx="200" cy="150" r="42" />
          <rect x="130" y="108" width="140" height="92" />
        </g>
      </svg>

      <div className="absolute left-0 top-[58%] -translate-y-1/2">
        {[0.16, 0.1, 0.05].map((d, i) => (
          <motion.div key={d} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0.32 - i * 0.1 }} {...roll(d)}>
            <Ball size={92} />
          </motion.div>
        ))}
        <motion.div className="relative will-change-transform" {...roll(0.2)}>
          <Ball size={92} />
        </motion.div>
      </div>

      <motion.p
        className="absolute inset-x-0 top-[30%] text-center font-display text-[clamp(3rem,12vw,8rem)] font-bold uppercase leading-none tracking-[0.04em] text-white"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 1], scale: [0.6, 1.05, 1] }}
        transition={{ delay: 0.45, duration: 0.6 }}
      >
        Kick <span className="text-neon">off</span>
      </motion.p>
    </motion.div>
  )
}
