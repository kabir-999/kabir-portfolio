import { Lightbulb, ShieldAlert, FlaskConical, ThumbsUp } from 'lucide-react'
import type { ScenarioChoice } from '../types'

function List({ items }: { items: string[] }) {
  return <ul className="m-0 list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>
}

export default function ScenarioFeedback({ choice }: { choice: ScenarioChoice }) {
  return (
    <div className="surface p-5" aria-live="polite">
      <p className="eyebrow">Analysis of this option</p>
      <p className="mt-2 flex items-start gap-3 text-lg">
        <Lightbulb size={22} className="mt-1 shrink-0 text-neon" aria-hidden="true" />
        <span><strong className="font-semibold">Why choose it: </strong>{choice.why}</span>
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <section>
          <h3 className="flex items-center gap-2 text-lg uppercase text-neon"><ThumbsUp size={18} aria-hidden="true" /> Expected advantages</h3>
          <div className="mt-2 text-bone/90"><List items={choice.advantages} /></div>
        </section>
        <section>
          <h3 className="flex items-center gap-2 text-lg uppercase text-alert"><ShieldAlert size={18} aria-hidden="true" /> Trade-offs and risks</h3>
          <div className="mt-2 text-bone/90"><List items={choice.risks} /></div>
        </section>
        <section className="sm:col-span-2">
          <h3 className="flex items-center gap-2 text-lg uppercase text-bone"><FlaskConical size={18} aria-hidden="true" /> Evidence that would validate it</h3>
          <div className="mt-2 text-bone/90"><List items={choice.validation} /></div>
        </section>
      </div>
      <p className="mt-5 border-t border-bone/10 pt-4 text-mist"><strong className="font-semibold text-bone">Manager's note: </strong>{choice.feedback}</p>
    </div>
  )
}
