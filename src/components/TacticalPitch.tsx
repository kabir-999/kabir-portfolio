import { motion } from 'motion/react'
import type { Formation, Project } from '../types'

interface Props {
  formation: Formation
  projects: Project[]
  selectedId: string | null
  dimmedIds?: Set<string>
  reduceMotion: boolean
  onSelect: (projectId: string) => void
}

function PitchMarkings() {
  return (
    <svg viewBox="0 0 680 1050" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
      <g fill="none" stroke="rgba(238,243,230,0.55)" strokeWidth="3">
        <rect x="2" y="2" width="676" height="1046" />
        <line x1="2" y1="525" x2="678" y2="525" />
        <circle cx="340" cy="525" r="91.5" />
        {/* Attacking end (top) */}
        <rect x="138.5" y="2" width="403" height="163" />
        <rect x="248.5" y="2" width="183" height="55" />
        <path d="M266.9 165A91.5 91.5 0 0 0 413.1 165" />
        {/* Own goal end (bottom) */}
        <rect x="138.5" y="885" width="403" height="163" />
        <rect x="248.5" y="993" width="183" height="55" />
        <path d="M413.1 885A91.5 91.5 0 0 0 266.9 885" />
        {/* Corners */}
        <path d="M2 12A10 10 0 0 0 12 2M668 2A10 10 0 0 0 678 12M2 1038A10 10 0 0 1 12 1048M678 1038A10 10 0 0 0 668 1048" />
      </g>
      <g fill="rgba(238,243,230,0.7)">
        <circle cx="340" cy="525" r="4" />
        <circle cx="340" cy="110" r="4" />
        <circle cx="340" cy="940" r="4" />
      </g>
    </svg>
  )
}

export default function TacticalPitch({ formation, projects, selectedId, dimmedIds, reduceMotion, onSelect }: Props) {
  const byId = new Map(projects.map((p) => [p.id, p]))
  const move = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 130, damping: 20 }

  return (
    <div
      role="group"
      aria-label={`Tactical pitch, ${formation.name} formation`}
      className="pitch-stripes relative mx-auto aspect-[68/105] w-full max-w-[560px] overflow-hidden lg:h-[max(28rem,calc(100svh-16rem))] lg:w-auto lg:max-w-full border border-bone/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
    >
      <PitchMarkings />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(238,243,230,0.1),transparent_60%)]" />

      {formation.slots.map((slot) => {
        const project = slot.projectId ? byId.get(slot.projectId) : undefined
        const pos = { left: `${slot.x}%`, top: `${slot.y}%` }

        if (!project) {
          return (
            <div
              key={`vacant-${formation.id}-${slot.id}`}
              role="img"
              aria-label={`Open ${slot.code} slot. No project assigned yet.`}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={pos}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-bone/40 font-display text-xs font-semibold tracking-wider text-bone/60 sm:h-12 sm:w-12">
                {slot.code}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-wide text-bone/60">Open slot</span>
            </div>
          )
        }

        const selected = project.id === selectedId
        return (
          <motion.button
            key={`p-${project.id}`}
            type="button"
            initial={false}
            animate={pos}
            transition={move}
            onClick={() => onSelect(project.id)}
            aria-pressed={selected}
            aria-label={`${project.name}. Playing ${slot.code}. ${selected ? 'Selected.' : 'Open profile.'}`}
            className={`group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-opacity ${dimmedIds?.has(project.id) && !selected ? 'opacity-25' : ''}`}
          >
            <span
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 font-display text-lg font-bold shadow-[0_6px_14px_rgba(0,0,0,0.55)] transition-transform group-hover:scale-110 sm:h-12 sm:w-12 sm:text-xl ${
                selected ? 'scale-110 border-neon bg-neon text-pitch-950 ring-4 ring-neon/30' : 'border-bone/80 bg-pitch-800 text-bone'
              }`}
            >
              {project.kitNumber}
              <span className="absolute -right-2 -top-2 rounded-sm bg-pitch-950 px-1 text-[9px] font-semibold uppercase leading-4 tracking-wide text-neon">
                {slot.code}
              </span>
            </span>
            <span
              className={`mt-1 max-w-[74px] rounded-sm px-1 text-center text-[10px] font-semibold leading-tight sm:max-w-[104px] sm:text-xs ${
                selected ? 'bg-neon text-pitch-950' : 'bg-pitch-950/80 text-bone'
              }`}
            >
              {project.shortName}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
