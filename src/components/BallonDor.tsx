import { ArrowUpRight } from 'lucide-react'
import { ballonDor } from '../data/club'
import { projectById } from '../data/projects'

/** Ranked list in the style of the Ballon d'Or top-ten graphic: number tile, name bar, date. */
export default function BallonDor({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section aria-labelledby="ballon-h" className="flex flex-col">
      <h2 id="ballon-h" className="text-2xl font-bold uppercase">Ballon d&apos;Or</h2>
      <ol className="m-0 mt-3 grid flex-1 list-none grid-rows-6 gap-2 p-0">
        {ballonDor.map((entry, i) => {
          const p = projectById(entry.projectId)
          if (!p) return null
          return (
            <li key={entry.projectId} className="flex min-h-12 items-stretch">
              <span className={`ts-none flex w-14 shrink-0 items-center justify-center font-display text-3xl font-bold text-[#1a1305] ${i === 0 ? 'bg-[#e8c36a]' : 'bg-[#efe0a8]'}`} aria-hidden="true">{i + 1}</span>
              <button
                type="button"
                onClick={() => onOpenProject(p.id)}
                aria-label={`Open ${p.shortName} in the Squad`}
                className="group flex min-w-0 flex-1 items-center justify-between gap-3 border border-[#e8c36a]/70 px-4 text-left transition-colors hover:bg-[#e8c36a]/15"
              >
                <span className="truncate font-display text-2xl font-bold uppercase tracking-[0.02em]">{p.shortName}</span>
                <span className="flex shrink-0 items-center gap-3 text-base text-[#e8c36a]">
                  {entry.date}
                  <ArrowUpRight size={16} aria-hidden="true" className="opacity-70 transition-opacity group-hover:opacity-100" />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
