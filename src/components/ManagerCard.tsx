import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { careerMilestones, manager, photos, teamTrophies } from '../data/club'
import { projects } from '../data/projects'
import { Crest } from './Brand'

const count = (kind: string) => careerMilestones.filter((m) => m.kind === kind).length

/** Counts up to `target` once on mount; jumps straight there when motion is reduced. */
function useCountUp(target: number, decimals: number) {
  const reduced = useReducedMotion() || document.documentElement.classList.contains('reduce-motion')
  const [v, setV] = useState(reduced ? target : 0)
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1)
      setV(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, reduced])
  return (reduced ? target : v).toFixed(decimals)
}

function Stat({ label, value }: { label: string; value: number }) {
  const shown = useCountUp(value, 0)
  return (
    <div className="flex items-baseline justify-center gap-2">
      <dd className="m-0 font-display text-2xl font-bold leading-none">{shown}</dd>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">{label}</dt>
    </div>
  )
}

/** Ultimate-Team-style card for the manager. Every number is counted from the data, never typed in. */
export default function ManagerCard() {
  const p = photos.portrait
  const rating = useCountUp(parseFloat(manager.education.cgpa), 2)
  return (
    <figure
      className="m-0 w-full max-w-[17rem] md:justify-self-end"
      aria-label="Manager card"
    >
      <div
        className="relative text-[#2b1d06]"
        style={{
          background:
            'radial-gradient(120% 55% at 50% 0%, rgba(255,255,255,0.45), transparent 60%), linear-gradient(160deg, #dcc577 0%, #c3a24d 48%, #9c7a2c 100%)',
          clipPath: 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 26px 100%, 0 calc(100% - 26px))',
          boxShadow: 'inset 0 0 0 3px rgba(43,29,6,0.35)',
        }}
      >
        <div className="relative h-[18rem] overflow-hidden">
          <img
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            className="absolute inset-y-0 right-0 h-full w-[70%] border-l-2 border-[#2b1d06]/40 object-cover object-top"
           
          />
          <div className="absolute left-0 top-5 flex w-[30%] flex-col items-center leading-none">
            <span className="font-display text-[1.7rem] font-bold">{rating}</span>
            <span className="mt-1 font-display text-xs font-bold tracking-[0.12em]">CGPA</span>
            <span className="mt-2 h-px w-8 bg-[#2b1d06]/60" />
            <span className="mt-2 font-display text-base font-bold">AI/ML</span>
            <span className="mt-2 h-px w-8 bg-[#2b1d06]/60" />
            <span className="mt-2 text-xs font-bold tracking-[0.12em]">IND</span>
            <span className="mt-2"><Crest size={28} title="" /></span>
          </div>
        </div>
        <div className="px-4 pb-4 pt-3 text-center">
          <p className="border-b border-[#2b1d06]/50 pb-1 font-display text-2xl font-bold uppercase leading-none tracking-[0.04em]">{manager.name}</p>
          <dl className="m-0 mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5 border-[#2b1d06]/50">
            <Stat label="Players" value={projects.length} />
            <Stat label="Transfers" value={count('experience')} />
            <Stat label="Certs" value={count('certification')} />
            <Stat label="Armbands" value={count('leadership')} />
            <Stat label="Finals" value={count('competition')} />
            <Stat label="Trophies" value={teamTrophies.length} />
          </dl>
        </div>
      </div>
    </figure>
  )
}
