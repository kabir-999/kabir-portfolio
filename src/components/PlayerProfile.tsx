import { Check, ChevronLeft, ChevronRight, ExternalLink, X, Code, Globe } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Project } from '../types'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#2b1d06]/40 pt-2">
      <h3 className="font-display text-[0.95rem] font-bold uppercase tracking-[0.12em] text-[#4a3000]">{title}</h3>
      <div className="mt-1 text-[1.05rem] leading-snug text-[#140e03]">{children}</div>
    </section>
  )
}

interface Props {
  project: Project
  slotCode?: string
  formationName?: string
  onClose?: () => void
  onPrev?: () => void
  onNext?: () => void
  headingId?: string
}

/** Fixed-layout scout card: every project shows the same five sections, so the card never changes size. */
export default function PlayerProfile({ project: p, slotCode, formationName, onClose, onPrev, onNext, headingId = 'player-h' }: Props) {
  const link = p.links[0]
  return (
    <article aria-labelledby={headingId} className="flex flex-col gap-3">
      <header className="flex items-center gap-4 pb-1">
        <span className="font-display text-4xl font-bold leading-none text-[#0b0801]">{p.kitNumber}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2e1f00]">
            {slotCode ? `${slotCode} · ${formationName}` : 'Substitute'} · prefers {p.naturalPosition}
          </p>
          <h2 id={headingId} className="mt-0.5 line-clamp-2 font-display text-xl font-bold uppercase leading-tight text-[#0b0801] sm:text-2xl">{p.name}</h2>
        </div>
        {(onPrev || onNext) && (
          <div className="flex shrink-0">
            <button type="button" onClick={onPrev} aria-label="Previous player" className="flex h-11 w-11 items-center justify-center border border-[#1a1305]/55 hover:border-[#1a1305]"><ChevronLeft size={18} aria-hidden="true" /></button>
            <button type="button" onClick={onNext} aria-label="Next player" className="-ml-px flex h-11 w-11 items-center justify-center border border-[#1a1305]/55 hover:border-[#1a1305]"><ChevronRight size={18} aria-hidden="true" /></button>
          </div>
        )}
        {onClose && (
          <button type="button" onClick={onClose} aria-label={`Close ${p.shortName} profile`} className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#1a1305]/55 hover:border-[#1a1305]">
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </header>

      <div className="grid content-start gap-3">
        <Section title="Problem it solves"><p className="line-clamp-2">{p.problem}</p></Section>
        <Section title="Overview"><p className="line-clamp-3">{p.overview}</p></Section>
        {p.approach.length > 0 && (
          <Section title="Architecture">
            <ul className="m-0 list-disc space-y-0.5 pl-4">
              {p.approach.map((a) => <li key={a}><span className="line-clamp-2">{a}</span></li>)}
            </ul>
          </Section>
        )}
        <Section title="Skills used">
          <ul className="m-0 grid list-none grid-cols-3 gap-x-3 gap-y-0.5 p-0 text-[1rem]">
            {p.tech.slice(0, 6).map((t) => (
              <li key={t} className="flex items-center gap-1.5"><Check size={13} className="shrink-0 text-[#14100a]" aria-hidden="true" /> <span className="truncate">{t}</span></li>
            ))}
          </ul>
        </Section>
        {p.results.length > 0 && (
          <Section title="Results">
            <dl className="m-0 grid grid-cols-4 gap-x-3">
              {p.results.slice(0, 4).map((r) => (
                <div key={r.label} className="min-w-0">
                  <dd className="m-0 font-display text-2xl font-bold leading-none text-[#0b0801]">{r.value}</dd>
                  <dt className="mt-0.5 truncate text-[0.75rem] text-[#2e1f00]">{r.label}</dt>
                </div>
              ))}
            </dl>
          </Section>
        )}
      </div>

      {link && (
        <a href={link.href} target="_blank" rel="noopener noreferrer" className="btn !min-h-10 self-start !text-sm">
          {link.kind === 'live' ? <Globe size={15} aria-hidden="true" /> : <Code size={15} aria-hidden="true" />}
          {link.label}
          <ExternalLink size={13} aria-hidden="true" />
          <span className="visually-hidden">(opens in a new tab)</span>
        </a>
      )}
    </article>
  )
}
