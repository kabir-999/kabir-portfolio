import { useId } from 'react'

/** Original KABIR FC shield crest. Pure SVG; no external assets. */
export function Crest({ size = 64, title = 'KABIR FC crest' }: { size?: number; title?: string }) {
  const id = useId()
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 100 112" role="img" aria-label={title} className="shrink-0">
      <defs>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14482c" />
          <stop offset="1" stopColor="#06170e" />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <path d="M50 4 92 18v36c0 26-17 42-42 54C25 96 8 80 8 54V18z" />
        </clipPath>
      </defs>
      <path d="M50 2 95 17v38c0 28-18 45-45 57C23 100 5 83 5 55V17z" fill="#7cff5b" />
      <path d="M50 6 91 19v35c0 25-16 40-41 52C25 94 9 79 9 54V19z" fill={`url(#${id}-f)`} />
      <g clipPath={`url(#${id}-c)`}>
        <path d="M50 4v110" stroke="#0b2517" strokeWidth="14" opacity="0.55" />
        <path d="M8 74 50 52l42 22v10L50 62 8 84z" fill="#7cff5b" opacity="0.9" />
        <path d="M8 88 50 66l42 22v6L50 72 8 94z" fill="#eef3e6" opacity="0.85" />
      </g>
      <path d="M37 24v32M37 40l20-16M37 40l20 16" stroke="#eef3e6" strokeWidth="8" fill="none" strokeLinecap="square" />
      <g fill="#7cff5b">
        <circle cx="30" cy="14" r="2.2" />
        <circle cx="50" cy="11" r="2.2" />
        <circle cx="70" cy="14" r="2.2" />
      </g>
    </svg>
  )
}

/** Original fictional kit designs (home / away). */
export function Kit({ variant, label }: { variant: 'home' | 'away'; label?: string }) {
  const home = variant === 'home'
  const body = home ? '#0f3a23' : '#eef3e6'
  const trim = home ? '#7cff5b' : '#0f3a23'
  const accent = home ? '#06170e' : '#7cff5b'
  const ink = home ? '#eef3e6' : '#06170e'
  return (
    <svg viewBox="0 0 160 150" role="img" aria-label={label ?? `${variant} kit`} className="w-full h-auto">
      <path d="M52 8 30 18 6 52l24 14 14-14v88h72V52l14 14 24-14-24-34-22-10c-4 14-16 22-28 22S56 22 52 8z" fill={body} stroke={trim} strokeWidth="2" strokeLinejoin="round" />
      <path d="M52 8c4 14 16 22 28 22s24-8 28-22" fill="none" stroke={trim} strokeWidth="5" />
      <path d="M6 52l24 14 14-14" fill="none" stroke={trim} strokeWidth="6" strokeLinejoin="round" />
      <path d="M154 52l-24 14-14-14" fill="none" stroke={trim} strokeWidth="6" strokeLinejoin="round" />
      <path d="M44 96 116 76v14L44 110z" fill={accent} opacity="0.95" />
      <path d="M44 112 116 92v6L44 118z" fill={trim} />
      <text x="80" y="64" textAnchor="middle" fontFamily="'Barlow Condensed', Impact, sans-serif" fontWeight="700" fontSize="34" fill={ink}>K</text>
    </svg>
  )
}
