import type { Formation } from '../types'

/**
 * Formation presets are data only. Player identity lives in projects.ts;
 * each slot just points at a project id. `null` means a vacant slot.
 * The 11 slotted projects are the starting XI; any project not in a formation
 * is on the bench (the roster has 16 projects).
 * Coordinates: x 0=left…100=right, y 0=attacking end…100=own goal line.
 */
export const formations: Formation[] = [
  {
    id: '4-3-3',
    name: '4-3-3',
    description: 'Wide attack with a single anchor in midfield.',
    slots: [
      { id: 'gk', code: 'GK', x: 50, y: 91, projectId: 'perry' },
      { id: 'lb', code: 'LB', x: 14, y: 72, projectId: 'crop' },
      { id: 'lcb', code: 'CB', x: 37, y: 77, projectId: 'chainpay' },
      { id: 'rcb', code: 'CB', x: 63, y: 77, projectId: 'faceas' },
      { id: 'rb', code: 'RB', x: 86, y: 72, projectId: 'spectrasense' },
      { id: 'lcm', code: 'CM', x: 27, y: 51, projectId: 'aqi' },
      { id: 'cdm', code: 'CDM', x: 50, y: 59, projectId: 'drone' },
      { id: 'rcm', code: 'CM', x: 73, y: 51, projectId: 'nocode' },
      { id: 'lw', code: 'LW', x: 16, y: 24, projectId: 'artifact' },
      { id: 'st', code: 'ST', x: 50, y: 15, projectId: 'safeguard' },
      { id: 'rw', code: 'RW', x: 84, y: 24, projectId: 'twinformer' },
    ],
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1',
    description: 'Double pivot behind a creative line of three.',
    slots: [
      { id: 'gk', code: 'GK', x: 50, y: 91, projectId: 'perry' },
      { id: 'lb', code: 'LB', x: 14, y: 72, projectId: 'crop' },
      { id: 'lcb', code: 'CB', x: 37, y: 77, projectId: 'chainpay' },
      { id: 'rcb', code: 'CB', x: 63, y: 77, projectId: 'faceas' },
      { id: 'rb', code: 'RB', x: 86, y: 72, projectId: 'spectrasense' },
      { id: 'ldm', code: 'CDM', x: 37, y: 58, projectId: 'drone' },
      { id: 'rdm', code: 'CDM', x: 63, y: 58, projectId: 'aqi' },
      { id: 'lm', code: 'LM', x: 17, y: 36, projectId: 'artifact' },
      { id: 'cam', code: 'CAM', x: 50, y: 37, projectId: 'nocode' },
      { id: 'rm', code: 'RM', x: 83, y: 36, projectId: 'twinformer' },
      { id: 'st', code: 'ST', x: 50, y: 14, projectId: 'safeguard' },
    ],
  },
  {
    id: '3-5-2',
    name: '3-5-2',
    description: 'Back three, wing-backs provide the width.',
    slots: [
      { id: 'gk', code: 'GK', x: 50, y: 91, projectId: 'perry' },
      { id: 'lcb', code: 'CB', x: 26, y: 76, projectId: 'faceas' },
      { id: 'cb', code: 'CB', x: 50, y: 79, projectId: 'chainpay' },
      { id: 'rcb', code: 'CB', x: 74, y: 76, projectId: 'nocode' },
      { id: 'lwb', code: 'LWB', x: 9, y: 50, projectId: 'crop' },
      { id: 'lcm', code: 'CM', x: 31, y: 52, projectId: 'aqi' },
      { id: 'cdm', code: 'CDM', x: 50, y: 61, projectId: 'drone' },
      { id: 'rcm', code: 'CM', x: 69, y: 52, projectId: 'twinformer' },
      { id: 'rwb', code: 'RWB', x: 91, y: 50, projectId: 'spectrasense' },
      { id: 'lst', code: 'ST', x: 36, y: 17, projectId: 'artifact' },
      { id: 'rst', code: 'ST', x: 64, y: 17, projectId: 'safeguard' },
    ],
  },
]

export const DEFAULT_FORMATION_ID = '4-3-3'
export const formationById = (id: string): Formation =>
  formations.find((f) => f.id === id) ?? formations[0]
