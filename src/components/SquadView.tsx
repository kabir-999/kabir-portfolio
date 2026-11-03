import { useEffect, useRef, useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import { formations, formationById } from '../data/formations'
import { projects, projectById } from '../data/projects'
import type { ProjectCategory } from '../types'
import { useMediaQuery } from '../hooks/useMediaQuery'
import FormationSelector from './FormationSelector'
import PlayerProfile from './PlayerProfile'
import TacticalPitch from './TacticalPitch'

interface Props {
  formationId: string
  selectedId: string | null
  reduceMotion: boolean
  onFormationChange: (id: string) => void
  onSelect: (id: string | null) => void
}

/** Full-screen sheet on small screens. Uses native <dialog> for focus trap + Escape + focus return. */
function ProfileSheet({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto border-0 bg-pitch-900 p-0 text-bone sm:ml-auto sm:max-w-xl sm:border-l sm:border-bone/15"
    >
      {open && <div className="p-5 pb-16">{children}</div>}
    </dialog>
  )
}

const scoutFilters: ProjectCategory[] = ['Computer Vision', 'Backend Systems', 'Data Pipelines', 'Applied ML & NLP']
const byKit = [...projects].sort((a, b) => a.kitNumber - b.kitNumber)

export default function SquadView({ formationId, selectedId, reduceMotion, onFormationChange, onSelect }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [scout, setScout] = useState<ProjectCategory | null>(null)
  const dimmedIds = new Set(scout ? projects.filter((p) => !p.categories.includes(scout)).map((p) => p.id) : [])
  const step = (dir: 1 | -1) => {
    const i = byKit.findIndex((p) => p.id === selectedId)
    onSelect(byKit[(i < 0 ? (dir === 1 ? 0 : byKit.length - 1) : (i + dir + byKit.length) % byKit.length)].id)
  }
  const formation = formationById(formationId)
  const selected = selectedId ? projectById(selectedId) : undefined
  const bench = projects.filter((p) => !formation.slots.some((s) => s.projectId === p.id))
  const slot = selected ? formation.slots.find((s) => s.projectId === selected.id) : undefined

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (e.metaKey || e.ctrlKey || e.altKey || t?.closest('input, textarea, select')) return
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
      else if (e.key === 'Escape' && selectedId) onSelect(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const profile = selected && (
    <PlayerProfile
      project={selected}
      slotCode={slot?.code}
      formationName={formation.name}
      onClose={() => onSelect(null)}
      onPrev={() => step(-1)}
      onNext={() => step(1)}
      headingId={isDesktop ? 'player-h-side' : 'player-h-sheet'}
    />
  )

  const benchList = (
    <section aria-labelledby="bench-h" className="flex flex-wrap items-center gap-2">
      <h2 id="bench-h" className="eyebrow w-full">Substitutes bench</h2>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {bench.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              aria-pressed={p.id === selectedId}
              aria-label={`${p.name}. On the bench. ${p.id === selectedId ? 'Selected.' : 'Open profile.'}`}
              className={`flex min-h-9 items-center gap-2 border px-2.5 text-left transition-colors ${p.id === selectedId ? 'border-neon bg-neon text-[#04120a]' : 'border-bone/25 hover:border-bone'} ${dimmedIds.has(p.id) && p.id !== selectedId ? 'opacity-30' : ''}`}
            >
              <span className={`font-display text-lg font-bold ${p.id === selectedId ? 'text-[#04120a]' : 'text-neon'}`}>{p.kitNumber}</span>
              <span className="text-sm font-semibold">{p.shortName}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )

  const scoutBar = (
    <div role="group" aria-label="Scouting filter" className="flex flex-wrap items-center gap-2">
      <span className="eyebrow">Scout by</span>
      {scoutFilters.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={scout === c}
          onClick={() => setScout(scout === c ? null : c)}
          className={`chip min-h-9 cursor-pointer transition-colors ${scout === c ? '!border-neon !bg-neon !text-[#04120a]' : 'hover:border-neon'}`}
        >
          {c}
        </button>
      ))}
    </div>
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold uppercase sm:text-4xl">The Squad</h1>
        </div>

        <div className="mt-3">
          <FormationSelector formations={formations} value={formationId} onChange={onFormationChange} />
        </div>

        <div className="mt-4">
          <TacticalPitch formation={formation} projects={projects} selectedId={selectedId} dimmedIds={dimmedIds} reduceMotion={reduceMotion} onSelect={onSelect} />
        </div>
      </div>

      <div className="grid content-start gap-3">
        {scoutBar}
        {benchList}
        {/* Desktop: persistent side panel */}
        {isDesktop && (
          <aside aria-label="Selected player" className="scout-panel min-h-[22rem] p-5">
            {profile ?? (
              <div className="flex min-h-[18rem] flex-col items-center justify-center gap-3 text-center text-[#3b2a08]">
                <MousePointerClick size={30} aria-hidden="true" />
                <p className="font-display text-xl font-bold uppercase text-[#14100a]">Select a player</p>
                <p className="max-w-xs text-sm">Choose a marker or a substitute, or press the right arrow key to start browsing.</p>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* Smaller screens: modal sheet */}
      {!isDesktop && (
        <ProfileSheet open={Boolean(selected)} onClose={() => onSelect(null)} label={selected ? `${selected.name} profile` : 'Player profile'}>
          {profile}
        </ProfileSheet>
      )}

      <p role="status" className="visually-hidden">
        {selected ? `Opened profile: ${selected.name}` : ''}
      </p>
    </div>
  )
}
