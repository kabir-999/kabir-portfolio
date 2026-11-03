import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, SkipForward } from 'lucide-react'
import { photos } from '../data/club'
import { Crest } from './Brand'

interface Props {
  reduceMotion: boolean
  onEnter: () => void
  onKickOff: () => void
}

const TAGLINE = 'Every project a player. Every decision a match.'

function Stadium() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <img src="/photos/bernabeu.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_35%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-pitch-950/30 via-pitch-950/40 to-pitch-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,9,15,0.8)_100%)]" />
    </div>
  )
}

export default function IntroExperience({ reduceMotion, onEnter, onKickOff }: Props) {
  const [ready, setReady] = useState(reduceMotion)
  const enterRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (reduceMotion) return
    const t = window.setTimeout(() => setReady(true), 1700)
    return () => window.clearTimeout(t)
  }, [reduceMotion])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEnter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onEnter])

  useEffect(() => {
    if (ready) enterRef.current?.focus()
  }, [ready])

  const fade = (delay: number, y = 14) =>
    reduceMotion
      ? { initial: false as const }
      : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } }

  return (
    <section aria-label="KABIR FC introduction" className="grain relative min-h-svh w-full overflow-hidden">
      <Stadium />

      <button type="button" onClick={onEnter} className="btn absolute right-4 top-4 z-20 !min-h-11 text-sm sm:right-8 sm:top-6">
        <SkipForward size={16} aria-hidden="true" /> Skip intro
      </button>

      <div className="relative z-10 mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          {...(reduceMotion
            ? { initial: false as const }
            : { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as const } })}
        >
          <Crest size={104} />
        </motion.div>

        <motion.h1 {...fade(0.5)} className="mt-6 text-[clamp(3.5rem,14vw,8rem)] font-bold uppercase leading-[0.9] tracking-[0.04em]">
          Kabir <span className="text-neon">FC</span>
        </motion.h1>
        <motion.p {...fade(0.8)} className="eyebrow mt-3 !text-base !tracking-[0.5em]">
          The Career Mode
        </motion.p>
        <motion.p {...fade(1.1)} className="mt-6 max-w-md text-lg text-mist">
          {TAGLINE}
        </motion.p>
        <motion.figure {...fade(1.25)} className="m-0 mt-8 flex items-center gap-4 text-left">
          <img src={photos.tunnel.src} alt={photos.tunnel.alt} width={photos.tunnel.width} height={photos.tunnel.height} className="h-24 w-[4.5rem] fut-photo object-cover object-top" />
          <figcaption>
            <span className="eyebrow block">Manager</span>
            <span className="font-display text-2xl font-bold uppercase">Kabir Mathur</span>
            <span className="block text-sm text-mist">{photos.tunnel.caption}</span>
          </figcaption>
        </motion.figure>

        <motion.div {...fade(1.4)} className="mt-10 h-14">
          {ready && (
            <button ref={enterRef} type="button" onClick={onKickOff} className="btn btn-primary !min-h-14 !px-8 !text-lg">
              Enter club <ArrowRight size={20} aria-hidden="true" />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
