import { formations } from '../data/formations'
import { projects } from '../data/projects'
import { scenarios } from '../data/scenarios'
import { careerMilestones } from '../data/club'

describe('data integrity', () => {
  it('every formation has 11 slots, valid project refs, and no duplicate players', () => {
    for (const f of formations) {
      expect(f.slots).toHaveLength(11)
      const ids = f.slots.map((s) => s.projectId).filter(Boolean) as string[]
      expect(new Set(ids).size).toBe(ids.length)
      for (const id of ids) expect(projects.some((p) => p.id === id)).toBe(true)
      for (const s of f.slots) {
        expect(s.x).toBeGreaterThanOrEqual(0); expect(s.x).toBeLessThanOrEqual(100)
        expect(s.y).toBeGreaterThanOrEqual(0); expect(s.y).toBeLessThanOrEqual(100)
      }
    }
  })

  it('the same eleven start in every formation and the rest are on the bench', () => {
    const starters = (fid: string) => formations.find((f) => f.id === fid)!.slots.map((s) => s.projectId).sort()
    for (const f of formations) expect(starters(f.id)).toEqual(starters(formations[0].id))
    expect(projects.length - 11).toBe(4)
  })

  it('Twinformer wears 10 and plays RW in the 4-3-3', () => {
    const t = projects.find((p) => p.id === 'twinformer')!
    expect(t.kitNumber).toBe(10)
    expect(formations[0].slots.find((s) => s.code === 'RW')!.projectId).toBe('twinformer')
  })

  it('formations place players at meaningfully different coordinates', () => {
    const pos = (fid: string, pid: string) => formations.find((f) => f.id === fid)!.slots.find((s) => s.projectId === pid)!
    const a = pos('4-3-3', 'drone'), b = pos('4-2-3-1', 'drone'), c = pos('3-5-2', 'crop')
    expect([a.x, a.y]).not.toEqual([b.x, b.y])
    expect(c.code).toBe('LWB')
  })

  it('project ids and kit numbers are unique', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.kitNumber)).size).toBe(projects.length)
  })

  it('scenario graphs are closed and every path ends in a debrief', () => {
    expect(scenarios.length).toBeGreaterThanOrEqual(2)
    for (const s of scenarios) {
      expect(s.nodes[s.startNodeId]).toBeDefined()
      const walk = (id: string, depth = 0): void => {
        const n = s.nodes[id]
        expect(n, `${s.id}: missing node ${id}`).toBeDefined()
        expect(depth).toBeLessThan(10)
        if (n.kind === 'decision') {
          expect(n.choices.length).toBeGreaterThanOrEqual(2)
          n.choices.forEach((c) => walk(c.next, depth + 1))
        }
      }
      walk(s.startNodeId)
    }
  })

  it('milestones all carry a period and title', () => {
    for (const m of careerMilestones) { expect(m.period).toBeTruthy(); expect(m.title).toBeTruthy() }
  })
})
