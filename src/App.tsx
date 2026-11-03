import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import ClubDashboard from './components/ClubDashboard'
import ClubNavigation, { sections } from './components/ClubNavigation'
import IntroExperience from './components/IntroExperience'
import KickOff from './components/KickOff'
import { photos } from './data/club'
import { DEFAULT_FORMATION_ID, formations } from './data/formations'
import { usePersistentState } from './hooks/usePersistentState'
import { isPreferences } from './lib/storage'
import type { Preferences, SectionId } from './types'

const ClubProfile = lazy(() => import('./components/ClubProfile'))
const CareerTimeline = lazy(() => import('./components/CareerTimeline'))
const DecisionSimulator = lazy(() => import('./components/DecisionSimulator'))
const SquadView = lazy(() => import('./components/SquadView'))

const defaultPrefs: Preferences = { formationId: DEFAULT_FORMATION_ID, reduceMotion: false }

const readHash = (): SectionId => {
  const raw = window.location.hash.replace(/^#\/?/, '')
  return sections.some((s) => s.id === raw) ? (raw as SectionId) : 'hq'
}

export default function App() {
  const [prefs, setPrefs] = usePersistentState<Preferences>('kabirfc:prefs', defaultPrefs, isPreferences)
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([])
  const [entered, setEntered] = useState(false)
  const [kickoff, setKickoff] = useState(false)
  const [section, setSection] = useState<SectionId>('hq')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  const osReduce = useReducedMotion()
  const reduceMotion = prefs.reduceMotion || Boolean(osReduce)
  const showIntro = !entered

  // Reflect the in-app reduced-motion preference on <html> so CSS can honour it too.
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion)
  }, [reduceMotion])

  useEffect(() => {
    document.documentElement.classList.toggle('home-theme', section === 'hq')
  }, [section])

  // System status: the tab title says where you are.
  useEffect(() => {
    const label = sections.find((x) => x.id === section)?.label
    document.title = showIntro || !label ? 'KABIR FC — The Career Mode' : `${label} · KABIR FC`
  }, [section, showIntro])

  // Validate a stored formation id against the registry.
  const formationId = formations.some((f) => f.id === prefs.formationId) ? prefs.formationId : DEFAULT_FORMATION_ID

  // Decode the home-screen photos while the splash is up, so the swap under the kick-off is cheap.
  useEffect(() => {
    for (const p of [photos.portrait, photos.trophies, photos.night]) {
      const img = new Image()
      img.src = p.src
      void img.decode?.().catch(() => {})
    }
  }, [])

  // Every load starts at the splash screen: drop any section hash left over from before the refresh.
  useEffect(() => {
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname)
  }, [])

  useEffect(() => {
    const onHash = () => setSection(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Move focus to the main region after navigating, so keyboard/screen-reader users land on the new content.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!showIntro) {
      window.scrollTo({ top: 0 })
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [section, showIntro])

  const navigate = useCallback((id: SectionId) => {
    setSection(id)
    if (window.location.hash !== `#${id}`) window.location.hash = id
  }, [])

  // Number keys 1-5 jump between sections (ignored while typing or with modifiers).
  useEffect(() => {
    if (showIntro) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (e.metaKey || e.ctrlKey || e.altKey || t?.closest('input, textarea, select, [contenteditable]')) return
      const target = sections[Number(e.key) - 1]
      if (target) navigate(target.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showIntro, navigate])

  const enterClub = useCallback(() => {
    setSection('hq')
    setEntered(true)
  }, [])

  const startKickoff = useCallback(() => {
    if (reduceMotion) enterClub()
    else setKickoff(true)
  }, [reduceMotion, enterClub])
  const endKickoff = useCallback(() => setKickoff(false), [])

  const selectProject = setSelectedProject

  const openProject = useCallback(
    (id: string) => {
      setSelectedProject(id)
      navigate('squad')
    },
    [navigate],
  )

  const completeScenario = useCallback((id: string) => setCompletedScenarios((p) => (p.includes(id) ? p : [...p, id])), [])

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>
      {showIntro ? (
        <IntroExperience reduceMotion={reduceMotion} onEnter={enterClub} onKickOff={startKickoff} />
      ) : (
        <>
      <a href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus() }} className="visually-hidden focus:!visible focus:!fixed focus:left-3 focus:top-3 focus:z-50 focus:!h-auto focus:!w-auto focus:bg-neon focus:px-4 focus:py-2 focus:text-pitch-950 focus:![clip:auto]">
        Skip to content
      </a>
      <ClubNavigation
        active={section}
        reduceMotion={reduceMotion}
        onNavigate={navigate}
        onToggleMotion={() => setPrefs((p) => ({ ...p, reduceMotion: !reduceMotion }))}
      />
      <main id="main" ref={mainRef} tabIndex={-1} className="mx-auto max-w-7xl px-4 pb-28 pt-8 outline-none sm:px-6 md:pb-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={section}
            className={section === 'hq' ? '' : 'page-panel'}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.1 } }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <Suspense fallback={null}>
            {section === 'hq' && (
              <ClubDashboard
                onNavigate={navigate}
              />
            )}
            {section === 'squad' && (
              <SquadView
                formationId={formationId}
                selectedId={selectedProject}
                reduceMotion={reduceMotion}
                onFormationChange={(id) => setPrefs((p) => ({ ...p, formationId: id }))}
                onSelect={selectProject}
              />
            )}
            {section === 'career' && (
              <CareerTimeline />
            )}
            {section === 'decisions' && <DecisionSimulator completedIds={completedScenarios} onComplete={completeScenario} />}
            {section === 'profile' && <ClubProfile onOpenProject={openProject} />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
        </>
      )}
      {kickoff && <KickOff onSwap={enterClub} onDone={endKickoff} />}
    </MotionConfig>
  )
}
