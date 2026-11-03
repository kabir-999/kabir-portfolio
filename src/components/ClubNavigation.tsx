import { Landmark, Users, Route, Split, ChartColumn, Wind } from 'lucide-react'
import type { ComponentType } from 'react'
import type { SectionId } from '../types'
import { Crest } from './Brand'

export const sections: { id: SectionId; label: string; icon: ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' }> }[] = [
  { id: 'hq', label: 'Headquarters', icon: Landmark },
  { id: 'squad', label: 'Squad', icon: Users },
  { id: 'career', label: 'Career', icon: Route },
  { id: 'decisions', label: 'Decisions', icon: Split },
  { id: 'profile', label: 'Club Profile', icon: ChartColumn },
]

interface Props {
  active: SectionId
  reduceMotion: boolean
  onNavigate: (id: SectionId) => void
  onToggleMotion: () => void
}

export default function ClubNavigation({ active, reduceMotion, onNavigate, onToggleMotion }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-pitch-950/95 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 sm:px-6">
        <button type="button" onClick={() => onNavigate('hq')} className="flex items-center gap-3 text-left" aria-label="KABIR FC — go to Headquarters">
          <Crest size={34} title="" />
          <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.04em]">
            Kabir <span className="text-neon">FC</span>
            <span className="block text-[0.62rem] font-semibold tracking-[0.2em] text-mist">The Career Mode</span>
          </span>
        </button>

        <nav
          aria-label="Club sections"
          className="max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-40 max-md:border-t max-md:border-white/15 max-md:bg-pitch-950 max-md:pb-[env(safe-area-inset-bottom)] md:ml-auto"
        >
          <ul className="m-0 flex list-none p-0 max-md:justify-between md:gap-1">
            {sections.map(({ id, label, icon: Icon }) => {
              const isActive = id === active
              return (
                <li key={id} className="max-md:flex-1">
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex w-full min-h-14 flex-col items-center justify-center gap-1 px-1 font-display text-[0.72rem] font-semibold uppercase tracking-[0.04em] transition-colors md:min-h-11 md:flex-row md:gap-2 md:px-4 md:text-base ${
                      isActive ? 'font-bold text-white' : 'text-mist hover:text-white'
                    } md:border-b-2 ${isActive ? 'md:border-neon' : 'md:border-transparent'}`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span className="max-md:max-w-full max-md:truncate">{label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={onToggleMotion}
          aria-pressed={reduceMotion}
          aria-label={reduceMotion ? 'Reduced motion is on. Turn off.' : 'Reduced motion is off. Turn on.'}
          title="Reduce motion"
          className={`ml-auto flex h-11 w-11 shrink-0 items-center justify-center border md:ml-0 ${
            reduceMotion ? 'border-neon text-neon' : 'border-white/20 text-mist hover:text-white'
          }`}
        >
          <Wind size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
