import { useMemo, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Undo2 } from 'lucide-react'
import { projectById } from '../data/projects'
import { scenarios } from '../data/scenarios'
import type { DecisionNode, Scenario } from '../types'
import ScenarioFeedback from './ScenarioFeedback'

/** Longest path of decisions before a debrief, used for the progress indicator. */
function maxDecisions(s: Scenario, nodeId = s.startNodeId, seen = new Set<string>()): number {
  const node = s.nodes[nodeId]
  if (!node || node.kind === 'debrief' || seen.has(nodeId)) return 0
  const next = new Set(seen).add(nodeId)
  return 1 + Math.max(...node.choices.map((c) => maxDecisions(s, c.next, next)))
}

interface Step { nodeId: string; choiceId: string }

function ScenarioRunner({ scenario, onComplete, onReplay, onExit, hasOthers }: {
  scenario: Scenario
  onComplete: (id: string) => void
  onReplay: () => void
  onExit: () => void
  hasOthers: boolean
}) {
  const [nodeId, setNodeId] = useState(scenario.startNodeId)
  const [history, setHistory] = useState<Step[]>([])
  const [choiceId, setChoiceId] = useState<string | null>(null)
  const total = useMemo(() => maxDecisions(scenario), [scenario])
  const node = scenario.nodes[nodeId]

  if (!node) {
    return <p role="alert" className="border border-alert p-4 text-alert">This scenario step could not be found. Please restart the scenario.</p>
  }

  if (node.kind === 'debrief') {
    return (
      <div className="grid gap-5">
        <div className="surface cut-corner p-6">
          <p className="eyebrow">Scenario complete</p>
          <h2 className="mt-1 text-4xl font-bold uppercase">{node.title}</h2>
          <p className="mt-3 text-lg">{node.summary}</p>
          <h3 className="mt-5 text-xl uppercase text-neon">Takeaways</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-bone/90">{node.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <section className="surface p-5" aria-labelledby="path-h">
          <h3 id="path-h" className="text-xl uppercase text-neon">Your path</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            {history.map((h) => {
              const dn = scenario.nodes[h.nodeId] as DecisionNode
              const ch = dn.choices.find((c) => c.id === h.choiceId)
              return <li key={h.nodeId}><span className="text-mist">{dn.title}: </span>{ch?.label}</li>
            })}
          </ol>
          <p className="mt-3 text-sm text-mist">There is no single correct path. Replay to compare how different choices trade off.</p>
        </section>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onReplay} className="btn btn-primary"><RotateCcw size={16} aria-hidden="true" /> Replay scenario</button>
          {hasOthers && <button type="button" onClick={onExit} className="btn">Try another scenario</button>}
        </div>
      </div>
    )
  }

  const choice = node.choices.find((c) => c.id === choiceId) ?? null

  const commit = () => {
    if (!choice) return
    setHistory((h) => [...h, { nodeId, choiceId: choice.id }])
    setNodeId(choice.next)
    setChoiceId(null)
    if (scenario.nodes[choice.next]?.kind === 'debrief') onComplete(scenario.id)
  }
  const back = () => {
    const last = history[history.length - 1]
    if (!last) return
    setHistory((h) => h.slice(0, -1))
    setNodeId(last.nodeId)
    setChoiceId(last.choiceId)
  }

  return (
    <div className="grid gap-5">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Decision {history.length + 1} of {total}</p>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => <span key={i} className={`h-1.5 w-8 ${i <= history.length ? 'bg-neon' : 'bg-bone/15'}`} />)}
        </div>
      </div>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-1 font-display text-3xl font-bold uppercase">{node.title}</legend>
        <p className="mb-4 text-mist">{node.prompt}</p>
        <div className="grid gap-3">
          {node.choices.map((c) => (
            <label key={c.id} className="relative block">
              <input type="radio" name={`choice-${node.id}`} checked={choiceId === c.id} onChange={() => setChoiceId(c.id)} className="peer visually-hidden" />
              <span className="block cursor-pointer border border-bone/20 p-4 transition-colors hover:border-bone/60 peer-checked:border-neon peer-checked:bg-neon/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-neon">
                <span className="flex items-start gap-3 text-lg font-medium">
                  <span aria-hidden="true" className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${choiceId === c.id ? 'border-neon bg-neon text-pitch-950' : 'border-bone/40'}`}>
                    {choiceId === c.id && <Check size={13} />}
                  </span>
                  {c.label}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {choice ? (
        <>
          <ScenarioFeedback choice={choice} />
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={commit} className="btn btn-primary">
              Commit this decision <ArrowRight size={16} aria-hidden="true" />
            </button>
            {history.length > 0 && <button type="button" onClick={back} className="btn"><Undo2 size={16} aria-hidden="true" /> Previous decision</button>}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-mist">Select an option to compare its trade-offs, then commit.</p>
          {history.length > 0 && <button type="button" onClick={back} className="btn"><Undo2 size={16} aria-hidden="true" /> Previous decision</button>}
        </div>
      )}
    </div>
  )
}

interface Props {
  completedIds: string[]
  onComplete: (scenarioId: string) => void
}

export default function DecisionSimulator({ completedIds, onComplete }: Props) {
  const [scenarioId, setScenarioId] = useState<string | null>(null)
  const [run, setRun] = useState(0)
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? null

  return (
    <div className={!scenario ? 'mx-auto max-w-5xl' : ''}>
      <p className="eyebrow">Manager's decisions</p>
      <h1 className="mt-1 text-4xl font-bold uppercase sm:text-5xl">Engineering scenarios</h1>
      <p className="mt-3 max-w-2xl text-mist">
        Tactical calls under uncertainty. There is no single right answer. Every option carries trade-offs, and nothing here claims a measured improvement.
      </p>

      {!scenario ? (
        <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-6">
          {scenarios.map((s) => {
            const done = completedIds.includes(s.id)
            const p = projectById(s.projectId)
            const endings = Object.values(s.nodes).filter((n) => n.kind === 'debrief').length
            const stats = [
              ['DEC', maxDecisions(s)],
              ['END', endings],
            ] as const
            return (
              <li key={s.id}>
                <button type="button" onClick={() => { setScenarioId(s.id); setRun((r) => r + 1) }} className="fut-card flex h-full w-full flex-col p-4">
                  <span className="flex items-center gap-3 border-b border-[#e8c36a]/60 pb-2">
                    <span className="flex shrink-0 flex-col items-center leading-none">
                      <span className="font-display text-4xl font-bold text-[#efe0a8]">{p?.kitNumber ?? '–'}</span>
                      <span className="mt-1 font-display text-xs font-bold tracking-[0.1em] text-[#efe0a8]">{p?.naturalPosition ?? ''}</span>
                    </span>
                    <span className="block font-display text-xl font-bold uppercase leading-tight">{s.title}</span>
                    {done && <span className="chip ml-auto shrink-0 !border-[#e8c36a] !bg-black/30 !text-[#efe0a8]"><Check size={12} className="mr-1" aria-hidden="true" /> Completed</span>}
                  </span>
                  <span className="mb-3 mt-3 line-clamp-3 text-sm text-white/85">{s.context}</span>
                  <span className="mt-auto flex justify-center gap-6 border-y border-[#e8c36a]/40 py-1.5 text-center">
                    {stats.map(([k, v]) => (
                      <span key={k} className="flex items-baseline gap-1.5">
                        <span className="font-display text-xl font-bold leading-none text-[#efe0a8]">{v}</span>
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/70">{k === 'DEC' ? 'Decisions' : 'Endings'}</span>
                      </span>
                    ))}
                  </span>
                  <span className="mt-3 inline-flex items-center justify-center gap-2 bg-[#efe0a8] px-4 py-2 font-display text-base font-bold uppercase tracking-[0.04em] text-[#0a2f1b]">
                    {done ? 'Play again' : 'Start scenario'} <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <aside className="surface cut-corner self-start p-6 lg:sticky lg:top-24">
            <p className="eyebrow">Situation</p>
            <h2 className="mt-1 text-3xl font-bold uppercase">{scenario.title}</h2>
            <p className="mt-3 text-bone/90">{scenario.context}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={() => setRun((r) => r + 1)} className="btn !min-h-11 !text-sm"><RotateCcw size={14} aria-hidden="true" /> Restart</button>
              <button type="button" onClick={() => setScenarioId(null)} className="btn !min-h-11 !text-sm">All scenarios</button>
            </div>
          </aside>
          <ScenarioRunner
            key={`${scenario.id}-${run}`}
            scenario={scenario}
            onComplete={onComplete}
            onReplay={() => setRun((r) => r + 1)}
            onExit={() => setScenarioId(null)}
            hasOthers={scenarios.length > 1}
          />
        </div>
      )}
    </div>
  )
}
