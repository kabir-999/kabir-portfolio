import { careerMilestones } from '../data/club'
import { projectById } from '../data/projects'
import type { MilestoneKind } from '../types'

const tags: Record<MilestoneKind, string> = {
  education: 'Kick-off',
  leadership: 'Armband',
  competition: 'Full time',
  experience: 'Transfer',
  certification: 'Training',
  project: 'Signing',
}

/** News ticker built from the career data, newest first. Nothing here is typed in twice. */
const twin = projectById('twinformer')
const items = [
  ...(twin ? [{ id: 'twin', tag: 'New signing', text: `${twin.shortName} joins the squad as #${twin.kitNumber}`, when: 'Oct 2026' }] : []),
  ...[...careerMilestones].reverse().map((m) => ({ id: m.id, tag: tags[m.kind], text: m.title, when: m.period })),
]

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="m-0 flex shrink-0 list-none items-center gap-10 p-0 pr-10" aria-hidden={hidden || undefined}>
      {items.map((i) => (
        <li key={i.id} className="flex items-center gap-3 whitespace-nowrap text-sm">
          <span className="bg-neon px-2 py-0.5 font-display text-xs font-bold uppercase text-[#04120a]">{i.tag}</span>
          <span>{i.text}</span>
          <span className="text-mist">{i.when}</span>
        </li>
      ))}
    </ul>
  )
}

export default function MatchdayTicker() {
  return (
    <section aria-label="Matchday news" className="ticker surface col-span-full overflow-hidden py-2.5">
      <div className="ticker-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
