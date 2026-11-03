import { manager, photos } from '../data/club'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../types'

const stats: { label: string; category: ProjectCategory }[] = [
  { label: 'CV', category: 'Computer Vision' },
  { label: 'BCK', category: 'Backend Systems' },
  { label: 'DAT', category: 'Data Pipelines' },
  { label: 'NLP', category: 'Applied ML & NLP' },
]

/** Team-of-the-Year style card. Stats are project counts per category, counted from the data. */
export default function TotyCard() {
  const p = photos.night
  return (
    <figure className="m-0 flex min-h-0 w-full flex-1" aria-label="Player card">
      <div
        className="h-full w-full p-[3px]"
        style={{
          background: 'linear-gradient(160deg, #f3e2a0, #b8923a 45%, #f3e2a0)',
          clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))',
        }}
      >
        <div
          className="relative flex h-full flex-col text-[#f3e2a0]"
          style={{
            background:
              'radial-gradient(90% 60% at 50% 25%, rgba(120,150,255,0.45), transparent 70%), linear-gradient(170deg, #1a2f78 0%, #0e1b4a 55%, #090f2b 100%)',
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          }}
        >
          <div className="relative min-h-52 flex-1 overflow-hidden">
            <img src={p.src} alt={p.alt} width={p.width} height={p.height} className="absolute inset-0 h-full w-full object-cover object-[50%_28%]" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0e1b4a] via-transparent to-transparent" />
            <div className="absolute left-3 top-3 flex flex-col items-center leading-none">
              <span className="font-display text-4xl font-bold text-white drop-shadow">26</span>
              <span className="mt-1 font-display text-sm font-bold tracking-[0.1em] text-white drop-shadow">AI/ML</span>
            </div>
          </div>
          <div className="px-3 pb-3 text-center">
            <p className="border-b border-[#f3e2a0]/50 pb-1.5 font-display text-2xl font-bold uppercase leading-none tracking-[0.04em]">{manager.name}</p>
            <dl className="m-0 mt-3 grid grid-cols-4 gap-1">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="m-0 font-display text-2xl font-bold leading-none text-white">{projects.filter((x) => x.categories.includes(s.category)).length}</dd>
                  <dt className="mt-0.5 text-[0.65rem] font-semibold tracking-[0.1em]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </figure>
  )
}
