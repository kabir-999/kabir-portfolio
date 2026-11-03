import { render, screen, waitFor, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { careerMilestones } from '../data/club'

function setDesktop(desktop: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('min-width') ? desktop : false,
    media: query, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

async function enterClub() {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /skip intro/i }))
  return user
}
const nav = () => within(screen.getByRole('navigation', { name: /club sections/i }))

beforeEach(() => { setDesktop(true); window.location.hash = '' })
afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('intro', () => {
  it('shows the title, subtitle, tagline and skip action, then enters the club', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/kabir\s*fc/i)
    expect(screen.getByText(/the career mode/i)).toBeInTheDocument()
    expect(screen.getByText(/every project a player/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /skip intro/i }))
    expect(screen.getByRole('heading', { level: 1, name: /kabir mathur/i })).toBeInTheDocument()
  })

  it('Enter club plays the kick-off, lands on the home screen, and every reload starts at the splash', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(await screen.findByRole('button', { name: /enter club/i }, { timeout: 3000 }))
    expect(await screen.findByRole('heading', { level: 1, name: /kabir mathur/i }, { timeout: 4000 })).toBeInTheDocument()
    cleanup()
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/kabir\s*fc/i)
  })

  it('Escape skips the intro', async () => {
    render(<App />)
    await userEvent.keyboard('{Escape}')
    expect(screen.getByRole('heading', { level: 1, name: /kabir mathur/i })).toBeInTheDocument()
  })

  it('shows Enter club immediately when reduced motion is preferred', async () => {
    localStorage.setItem('kabirfc:prefs', JSON.stringify({ formationId: '4-3-3', reduceMotion: true }))
    render(<App />)
    expect(screen.getByRole('button', { name: /enter club/i })).toBeInTheDocument()
  })
})

describe('headquarters and navigation', () => {
  it('shows verified manager info and real links only', async () => {
    await enterClub()
    expect(screen.getAllByText(/project trainee, ai\/ml/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/larsen & toubro/i).length).toBeGreaterThan(0)
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument()
  })

  it.each([
    ['Squad', /the squad/i],
    ['Career', /career timeline/i],
    ['Decisions', /engineering scenarios/i],
    ['Club Profile', /club analytics/i],
    ['Headquarters', /kabir mathur/i],
  ])('navigates to %s', async (label, heading) => {
    const user = await enterClub()
    await user.click(nav().getByRole('button', { name: label }))
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
    expect(nav().getByRole('button', { name: label })).toHaveAttribute('aria-current', 'page')
  })

  it('shows a matchday ticker built from the career data', async () => {
    await enterClub()
    const ticker = screen.getByRole('region', { name: /matchday news/i })
    expect(within(ticker).getAllByText(/new signing/i).length).toBeGreaterThan(0)
    expect(within(ticker).getAllByText(/larsen & toubro/i).length).toBeGreaterThan(0)
  })

  it('has the resume download and skills on Club Profile, not on Home', async () => {
    const user = await enterClub()
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument()
    await user.click(nav().getByRole('button', { name: 'Club Profile' }))
    expect(await screen.findByRole('link', { name: /^resume/i })).toHaveAttribute('href', '/Kabir_Mathur_Resume.pdf')
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
  })

  it('"Enter squad management" opens the squad', async () => {
    const user = await enterClub()
    await user.click(screen.getByRole('button', { name: /enter squad management/i }))
    expect(await screen.findByRole('heading', { name: /the squad/i })).toBeInTheDocument()
  })
})

describe('squad, formations and profiles', () => {
  const goSquad = async () => {
    const user = await enterClub()
    await user.click(nav().getByRole('button', { name: 'Squad' }))
    await screen.findByRole('heading', { name: /the squad/i })
    return user
  }
  const pitch = () => screen.getByRole('group', { name: /tactical pitch/i })
  const marker = (name: RegExp) => within(pitch()).getByRole('button', { name })

  it('renders 11 selectable markers and a five-player bench in the default 4-3-3', async () => {
    await goSquad()
    expect(screen.getByRole('group', { name: /4-3-3/ })).toBeInTheDocument()
    expect(within(pitch()).getAllByRole('button')).toHaveLength(11)
    expect(within(pitch()).queryAllByRole('img', { name: /open .* slot/i })).toHaveLength(0)
    expect(within(screen.getByRole('region', { name: /substitutes bench/i })).getAllByRole('button')).toHaveLength(4)
    expect(marker(/twinformer/i)).toHaveAccessibleName(/playing RW/i)
  })

  it.each(['4-2-3-1', '3-5-2', '4-3-3'])('switching to %s changes the formation and positions', async (id) => {
    const user = await goSquad()
    const before = marker(/drone/i).style.top + marker(/drone/i).style.left
    await user.click(screen.getByRole('radio', { name: id }))
    expect(screen.getByRole('group', { name: new RegExp(id) })).toBeInTheDocument()
    expect(within(pitch()).getAllByRole('button')).toHaveLength(11)
    if (id === '3-5-2') {
      expect(marker(/crop disease/i)).toHaveAccessibleName(/playing LWB/i)
      await waitFor(() => expect(marker(/drone/i).style.top + marker(/drone/i).style.left).not.toBe(before))
    }
    if (id === '4-2-3-1') expect(marker(/nocode/i)).toHaveAccessibleName(/playing CAM/i)
  })

  it('opens a project profile with all required sections and closes it (desktop panel)', async () => {
    const user = await goSquad()
    expect(screen.getByText(/select a player/i)).toBeInTheDocument()
    await user.click(marker(/perry/i))
    const panel = screen.getByRole('complementary', { name: /selected player/i })
    expect(within(panel).getByRole('heading', { level: 2, name: /perry/i })).toBeInTheDocument()
    for (const h of [/problem it solves/i, /overview/i, /architecture/i, /skills used/i, /^results$/i])
      expect(within(panel).getByRole('heading', { level: 3, name: h })).toBeInTheDocument()
    expect(within(panel).getByRole('link', { name: /live demo/i })).toHaveAttribute('target', '_blank')
    expect(within(panel).getByRole('link', { name: /live demo/i })).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(within(panel).queryByText(/not yet documented/i)).not.toBeInTheDocument()
    await user.click(within(panel).getByRole('button', { name: /close perry profile/i }))
    expect(screen.getByText(/select a player/i)).toBeInTheDocument()
  })

  it('marks the selected player with aria-pressed and is keyboard operable', async () => {
    const user = await goSquad()
    marker(/chainpay/i).focus()
    await user.keyboard('{Enter}')
    expect(marker(/chainpay/i)).toHaveAttribute('aria-pressed', 'true')
    marker(/safeguard/i).focus()
    await user.keyboard(' ')
    expect(marker(/safeguard/i)).toHaveAttribute('aria-pressed', 'true')
    expect(marker(/chainpay/i)).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows the drone metrics on the profile', async () => {
    const user = await goSquad()
    await user.click(marker(/drone/i))
    const panel = screen.getByRole('complementary', { name: /selected player/i })
    for (const v of ['95.3%', '92.3%', '86.2%', '98.5%']) expect(within(panel).getAllByText(v).length).toBeGreaterThan(0)
  })

  it('scout filter dims players outside the chosen category', async () => {
    const user = await goSquad()
    await user.click(screen.getByRole('button', { name: 'Backend Systems' }))
    expect(screen.getByRole('button', { name: 'Backend Systems' })).toHaveAttribute('aria-pressed', 'true')
    expect(marker(/perry/i).className).not.toMatch(/opacity-25/)
    expect(marker(/artifact/i).className).toMatch(/opacity-25/)
  })

  it('next and previous player step through the squad by kit number', async () => {
    const user = await goSquad()
    await user.click(marker(/perry/i))
    const panel = screen.getByRole('complementary', { name: /selected player/i })
    await user.click(within(panel).getByRole('button', { name: /next player/i }))
    expect(within(screen.getByRole('complementary', { name: /selected player/i })).getByRole('heading', { level: 2 })).toHaveTextContent(/crop disease/i)
    await user.click(within(screen.getByRole('complementary', { name: /selected player/i })).getByRole('button', { name: /previous player/i }))
    expect(within(screen.getByRole('complementary', { name: /selected player/i })).getByRole('heading', { level: 2 })).toHaveTextContent(/perry/i)
  })

  it('arrow keys browse players, Esc closes, and number keys switch sections', async () => {
    const user = await goSquad()
    await user.keyboard('{ArrowRight}')
    const panel = () => screen.getByRole('complementary', { name: /selected player/i })
    expect(within(panel()).getByRole('heading', { level: 2 })).toHaveTextContent(/perry/i)
    await user.keyboard('{ArrowRight}')
    expect(within(panel()).getByRole('heading', { level: 2 })).toHaveTextContent(/crop/i)
    await user.keyboard('{Escape}')
    expect(screen.getByText(/select a player/i)).toBeInTheDocument()
    await user.keyboard('3')
    expect(await screen.findByRole('heading', { level: 1, name: /career timeline/i })).toBeInTheDocument()
    expect(document.title).toMatch(/career/i)
  })

  it('on narrow screens the profile opens in a modal dialog and can be closed', async () => {
    setDesktop(false)
    const user = await goSquad()
    expect(screen.queryByRole('complementary', { name: /selected player/i })).not.toBeInTheDocument()
    await user.click(marker(/anti-spoof/i))
    const dialog = await screen.findByRole('dialog', { name: /anti-spoofing profile/i })
    expect(dialog).toHaveAttribute('open')
    await user.click(within(dialog).getByRole('button', { name: /close anti-spoof profile/i }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})

describe('career mode', () => {
  it('every milestone is reachable through the filters', async () => {
    const user = await enterClub()
    await user.click(nav().getByRole('button', { name: 'Career' }))
    await screen.findByRole('heading', { name: /career timeline/i })
    expect(screen.queryByRole('button', { name: /^all$/i })).not.toBeInTheDocument()
    let total = 0
    for (const f of ['Clubs', 'Transfers', 'Armbands', 'Finals', 'Certs']) {
      await user.click(screen.getByRole('button', { name: f }))
      total += within(screen.getByRole('list', { name: /career milestones/i })).getAllByRole('listitem').length
    }
    expect(total).toBe(careerMilestones.length)
    await user.click(screen.getByRole('button', { name: 'Transfers' }))
    expect(within(screen.getByRole('list', { name: /career milestones/i })).getByText(/larsen & toubro/i)).toBeInTheDocument()
  })

  it('filters the timeline by category', async () => {
    const user = await enterClub()
    await user.click(nav().getByRole('button', { name: 'Career' }))
    await screen.findByRole('heading', { name: /career timeline/i })
    await user.click(screen.getByRole('button', { name: 'Transfers' }))
    expect(within(screen.getByRole('list', { name: /career milestones/i })).getAllByRole('listitem')).toHaveLength(3)
  })

  it('shows the department trophies and the certificates filter', async () => {
    const user = await enterClub()
    await user.click(nav().getByRole('button', { name: 'Career' }))
    await screen.findByRole('heading', { name: /career timeline/i })
    expect(within(screen.getByRole('region', { name: /department trophies/i })).getByText('Best Sports Department')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Certs' }))
    expect(within(screen.getByRole('list', { name: /career milestones/i })).getByText(/aws machine learning/i)).toBeInTheDocument()
  })
})

describe('decision simulator', () => {
  const goDecisions = async () => {
    const user = await enterClub()
    await user.click(nav().getByRole('button', { name: 'Decisions' }))
    await screen.findByRole('heading', { name: /engineering scenarios/i })
    return user
  }

  it('offers both scenarios', async () => {
    await goDecisions()
    expect(screen.getByText(/drone detection in noisy environments/i)).toBeInTheDocument()
    expect(screen.getByText(/face anti-spoofing under unseen attacks/i)).toBeInTheDocument()
  })

  it.each([
    ['Drone detection', 0],
    ['Face anti-spoofing', 1],
  ])('%s: select → feedback → branch → debrief → replay', async (_n, idx) => {
    const user = await goDecisions()
    await user.click(screen.getAllByRole('button', { name: /start scenario/i })[idx])
    expect(screen.getByText(/decision 1 of 2/i)).toBeInTheDocument()
    expect(screen.getByText(/select an option to compare/i)).toBeInTheDocument()

    const radios1 = screen.getAllByRole('radio')
    expect(radios1).toHaveLength(3)
    await user.click(radios1[0])
    expect(screen.getByText(/why choose it/i)).toBeInTheDocument()
    expect(screen.getByText(/evidence that would validate it/i)).toBeInTheDocument()
    await user.click(radios1[1])
    expect(screen.getByText(/trade-offs and risks/i)).toBeInTheDocument()
    await user.click(radios1[0])
    await user.click(screen.getByRole('button', { name: /commit this decision/i }))

    expect(screen.getByText(/decision 2 of 2/i)).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(2)
    await user.click(screen.getAllByRole('radio')[1])
    await user.click(screen.getByRole('button', { name: /commit this decision/i }))

    expect(await screen.findByText(/scenario complete/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /your path/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /replay scenario/i }))
    expect(screen.getByText(/decision 1 of 2/i)).toBeInTheDocument()
  })

  it('different first choices lead to different branches', async () => {
    const user = await goDecisions()
    await user.click(screen.getAllByRole('button', { name: /start scenario/i })[0])
    await user.click(screen.getAllByRole('radio')[0]); await user.click(screen.getByRole('button', { name: /commit this decision/i }))
    const a = screen.getByRole('group').textContent
    await user.click(screen.getByRole('button', { name: /restart/i }))
    await user.click(screen.getAllByRole('radio')[1]); await user.click(screen.getByRole('button', { name: /commit this decision/i }))
    expect(screen.getByRole('group').textContent).not.toBe(a)
  })

  it('previous-decision goes back, and completion is marked', async () => {
    const user = await goDecisions()
    await user.click(screen.getAllByRole('button', { name: /start scenario/i })[0])
    await user.click(screen.getAllByRole('radio')[2]); await user.click(screen.getByRole('button', { name: /commit this decision/i }))
    await user.click(screen.getByRole('button', { name: /previous decision/i }))
    expect(screen.getByText(/decision 1 of 2/i)).toBeInTheDocument()
    expect(screen.getAllByRole('radio')[2]).toBeChecked()
    await user.click(screen.getByRole('button', { name: /commit this decision/i }))
    await user.click(screen.getAllByRole('radio')[0]); await user.click(screen.getByRole('button', { name: /commit this decision/i }))
    await user.click(screen.getByRole('button', { name: /try another scenario/i }))
    expect(screen.getAllByText(/completed/i).length).toBeGreaterThan(0)
  })
})

describe('club profile', () => {
  it('shows only supplied metrics, the drone explanation, and verified contact links', async () => {
    const user = await enterClub()
    await user.click(nav().getByRole('button', { name: 'Club Profile' }))
    await screen.findByRole('heading', { name: /club analytics/i })
    expect(screen.queryByText('0.724')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /mathurkabir336@gmail\.com/i })).toHaveAttribute('href', 'mailto:mathurkabir336@gmail.com')
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://linkedin.com/in/kabir-2005-Mathur')
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.queryByText(/original crest and kits/i)).not.toBeInTheDocument()
    const ballon = within(screen.getByRole('region', { name: /ballon d.or/i }))
    expect(ballon.getAllByRole('listitem')).toHaveLength(6)
    expect(ballon.getAllByRole('listitem')[0]).toHaveTextContent(/spectrasense/i)
    await user.click(ballon.getByRole('button', { name: /open spectrasense in the squad/i }))
    expect(await screen.findByRole('heading', { name: /the squad/i })).toBeInTheDocument()
    expect(within(screen.getByRole('complementary', { name: /selected player/i })).getByRole('heading', { level: 2 })).toHaveTextContent(/spectrasense/i)
  })
})

describe('storage resilience', () => {
  it('ignores malformed stored data', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    localStorage.setItem('kabirfc:prefs', '{not json')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/kabir\s*fc/i)
    expect(warn).toHaveBeenCalled()
  })

  it('works when storage is unavailable', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('denied') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('denied') })
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /skip intro/i }))
    await user.click(nav().getByRole('button', { name: 'Squad' }))
    await user.click(await screen.findByRole('radio', { name: '3-5-2' }))
    expect(screen.getByRole('group', { name: /3-5-2/ })).toBeInTheDocument()
  })

  it('reduced-motion toggle updates the document', async () => {
    const user = await enterClub()
    await user.click(screen.getByRole('button', { name: /reduced motion is off/i }))
    expect(document.documentElement).toHaveClass('reduce-motion')
    await user.click(screen.getByRole('button', { name: /reduced motion is on/i }))
    expect(document.documentElement).not.toHaveClass('reduce-motion')
  })
})
