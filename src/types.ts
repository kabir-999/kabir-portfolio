export type SectionId = 'hq' | 'squad' | 'career' | 'decisions' | 'profile'

/** Where a fact came from. Nothing is rendered as verified without a source. */
export type Provenance = 'github-profile' | 'portfolio' | 'brief'

export type ProjectStatus = 'live' | 'source' | 'documented'
export type ProjectCategory = 'Computer Vision' | 'Backend Systems' | 'Data Pipelines' | 'Applied ML & NLP'

export type Position =
  | 'GK' | 'CB' | 'LB' | 'RB' | 'LWB' | 'RWB'
  | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'LW' | 'RW' | 'ST'

export interface ProjectLink {
  label: string
  href: string
  kind: 'live' | 'source'
}

export interface ProjectResult {
  label: string
  value: string
  note?: string
}

/**
 * A project is a "player". Any field typed `string | null` is a placeholder
 * until the owner supplies verified detail; the UI renders those explicitly.
 */
export interface Project {
  id: string
  name: string
  shortName: string
  kitNumber: number
  naturalPosition: Position
  squadRole: string
  status: ProjectStatus
  provenance: Provenance
  categories: ProjectCategory[]
  overview: string
  problem: string
  approach: string[]
  tech: string[]
  results: ProjectResult[]
  links: ProjectLink[]
}

export interface FormationSlot {
  id: string
  code: Position
  /** Pitch percentage, x: 0 left → 100 right, y: 0 attacking end → 100 own goal. */
  x: number
  y: number
  /** Project occupying the slot. null = vacant slot (no project yet). */
  projectId: string | null
}

export interface Formation {
  id: string
  name: string
  description: string
  slots: FormationSlot[]
}

export type MilestoneKind = 'education' | 'experience' | 'competition' | 'certification' | 'project' | 'leadership'

export interface Photo {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface CareerMilestone {
  id: string
  period: string
  title: string
  kind: MilestoneKind
  summary: string
  details: string[]
  current?: boolean
}

/* ---------- Decision simulator ---------- */

export interface ScenarioChoice {
  id: string
  label: string
  /** Why someone might choose this. */
  why: string
  advantages: string[]
  risks: string[]
  /** What evidence would validate the choice. */
  validation: string[]
  /** How the developer's documented work relates; null when nothing is documented. */
  documented: string | null
  feedback: string
  /** Id of the next node. */
  next: string
}

export interface DecisionNode {
  kind: 'decision'
  id: string
  title: string
  prompt: string
  choices: ScenarioChoice[]
}

export interface DebriefNode {
  kind: 'debrief'
  id: string
  title: string
  summary: string
  takeaways: string[]
  /** Honest limit of what this simulation can claim. */
  caution: string
}

export type ScenarioNode = DecisionNode | DebriefNode

export interface Scenario {
  id: string
  title: string
  projectId: string
  context: string
  startNodeId: string
  nodes: Record<string, ScenarioNode>
}

export interface Preferences {
  formationId: string
  reduceMotion: boolean
}
