import type { ReactNode } from 'react'
import type { SectionId } from '../types'
import { careerMilestones, manager, photos } from '../data/club'
import { projects } from '../data/projects'
import ManagerCard from './ManagerCard'
import MatchdayTicker from './MatchdayTicker'

interface Props {
  onNavigate: (id: SectionId) => void
}

interface TileProps {
  title: string
  sub?: string
  art?: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

/** One tile of the menu mosaic. */
function Tile({ title, sub, art, className = '', onClick, href }: TileProps) {
  const inner = (
    <>
      {art}
      <span className="relative z-10 block max-w-[40%]">
        <span className="tile-title block">{title}</span>
        {sub && <span className="mt-2 block text-sm text-mist">{sub}</span>}
      </span>
    </>
  )
  return href ? (
    <a href={href} className={`tile ${className}`}>{inner}</a>
  ) : (
    <button type="button" onClick={onClick} className={`tile ${className}`}>{inner}</button>
  )
}

const art = (p: { src: string; width: number; height: number }, position: string) => (
  <img src={p.src} alt="" width={p.width} height={p.height} loading="lazy" className="tile-art" style={{ objectPosition: position }} />
)

function PitchArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="tile-art" focusable="false">
      <rect width="200" height="140" fill="#1f6b3a" />
      <g fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6">
        <rect x="10" y="8" width="180" height="124" />
        <line x1="100" y1="8" x2="100" y2="132" />
        <circle cx="100" cy="70" r="20" />
        <rect x="10" y="40" width="30" height="60" />
        <rect x="160" y="40" width="30" height="60" />
      </g>
    </svg>
  )
}

function BranchArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="tile-art" focusable="false">
      <rect width="200" height="140" fill="#1b2d3d" />
      <g fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" strokeLinecap="round">
        <path d="M30 70h50M80 70l40-30h50M80 70l40 30h50" />
      </g>
      <g fill="#3ddc84"><circle cx="30" cy="70" r="7" /><circle cx="170" cy="40" r="7" /><circle cx="170" cy="100" r="7" /></g>
    </svg>
  )
}

export default function ClubDashboard({ onNavigate }: Props) {
  return (
    <div className="rise-in grid gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
      <MatchdayTicker />
      <section aria-labelledby="mgr-h" className="surface p-6 sm:col-span-2 sm:p-9 lg:col-span-4">
        <div className="grid gap-8 md:grid-cols-[1fr_17rem] md:items-center">
          <div>
            <p className="eyebrow">Manager</p>
            <h1 id="mgr-h" className="mt-2 text-[clamp(2.6rem,8vw,5rem)] font-bold uppercase">{manager.name}</h1>
            <p className="mt-2 font-display text-lg font-semibold uppercase text-neon sm:text-xl">{manager.headline}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone/90">{manager.bio}</p>
            <p className="mt-5 border-l-2 border-neon pl-4">
              <span className="eyebrow block">Current role</span>
              {manager.currentRole.title}, AI/ML @ {manager.currentRole.org}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => onNavigate('squad')} className="btn btn-primary !min-h-12">Enter squad management</button>
              <button type="button" onClick={() => onNavigate('career')} className="btn">View career timeline</button>
            </div>
          </div>
          <ManagerCard />
        </div>
      </section>

      <Tile title="Squad" sub={`${projects.length} players · starting XI and bench`} art={<PitchArt />} className="lg:col-span-2" onClick={() => onNavigate('squad')} />
      <Tile title="Career" sub={`Season history · ${careerMilestones.length} milestones and trophies`} art={art(photos.trophies, '50% 6%')} className="lg:col-span-2" onClick={() => onNavigate('career')} />
      <Tile title="Decisions" sub="Tactics board" art={<BranchArt />} className="lg:col-span-2" onClick={() => onNavigate('decisions')} />
      <Tile title="Club Profile" sub="Press office · contact" art={art(photos.night, '50% 30%')} className="lg:col-span-2" onClick={() => onNavigate('profile')} />

    </div>
  )
}
