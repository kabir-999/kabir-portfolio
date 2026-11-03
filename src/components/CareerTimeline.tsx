import { Award, Briefcase, Crown, FolderGit2, GraduationCap, Medal, Trophy } from 'lucide-react'
import { useState, type ComponentType } from 'react'
import { careerMilestones, photos, teamTrophies } from '../data/club'
import type { MilestoneKind } from '../types'

type Filter = MilestoneKind

const icons: Record<MilestoneKind, ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' }>> = {
  education: GraduationCap,
  experience: Briefcase,
  competition: Medal,
  certification: Award,
  project: FolderGit2,
  leadership: Crown,
}

const filters: { id: Filter; label: string }[] = [
  { id: 'education', label: 'Clubs' },
  { id: 'experience', label: 'Transfers' },
  { id: 'leadership', label: 'Armbands' },
  { id: 'competition', label: 'Finals' },
  { id: 'certification', label: 'Certs' },
]

export default function CareerTimeline() {
  const [filter, setFilter] = useState<Filter>('education')
  const shown = careerMilestones.filter((m) => m.kind === filter)

  return (
    <div>
      <p className="eyebrow">Career mode</p>
      <h1 className="mt-1 text-3xl font-bold uppercase sm:text-4xl">Career timeline</h1>

      <div role="group" aria-label="Filter milestones" className="mt-3 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className={`chip min-h-10 cursor-pointer !px-4 !text-sm transition-colors ${filter === f.id ? '!border-neon !bg-neon !text-[#04120a] ts-none' : 'hover:border-neon'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <ol className="relative m-0 grid list-none gap-2 p-0 before:absolute before:bottom-4 before:left-[1.05rem] before:top-4 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-[#e8c36a] before:via-[#efe0a8] before:to-white/70" aria-label="Career milestones">
          {shown.map((m) => {
            const Icon = icons[m.kind]
            return (
              <li key={m.id} className="relative pl-12">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2 z-10 flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full border-[3px] border-[#e8c36a] ${m.current ? 'bg-[#e8c36a] text-[#1a1305] ring-4 ring-[#e8c36a]/30' : 'bg-[#0a1a12] text-[#e8c36a]'}`}
                >
                  <Icon size={16} />
                </span>
                <div className="border-l-4 border-[#e8c36a]/80 px-4 py-2">
                  <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#e8c36a]">
                    {m.period}
                    {m.current && <span className="chip !border-[#e8c36a]/60 !py-0 !text-[#e8c36a]">Current</span>}
                  </p>
                  <p className="font-display text-lg font-bold uppercase leading-tight">{m.title}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <section aria-labelledby="trophy-h">
          <p className="eyebrow">Trophy cabinet</p>
          <h2 id="trophy-h" className="mt-0.5 text-3xl font-bold uppercase">Department trophies</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
            <img src={photos.trophies.src} alt={photos.trophies.alt} width={photos.trophies.width} height={photos.trophies.height} loading="lazy" className="fut-photo h-auto w-full self-start" />
            <ul className="m-0 grid list-none content-start gap-3 p-0" aria-label="Department trophies">
              {teamTrophies.map((t) => (
                <li key={t.id} className="flex items-center gap-3 border border-[#e8c36a]/80 px-4 py-3">
                  <Trophy size={26} className="shrink-0 text-[#e8c36a]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-bold uppercase leading-tight">{t.title}</span>
                    {'note' in t && <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#e8c36a]">{t.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
