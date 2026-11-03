import type { Formation } from '../types'

interface Props {
  formations: Formation[]
  value: string
  onChange: (id: string) => void
}

export default function FormationSelector({ formations, value, onChange }: Props) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="visually-hidden">Formation</legend>
      <div className="flex flex-wrap gap-2">
        {formations.map((f) => (
          <label key={f.id} className="relative">
            <input
              type="radio"
              name="formation"
              value={f.id}
              checked={f.id === value}
              onChange={() => onChange(f.id)}
              className="peer visually-hidden"
            />
            <span className="flex min-h-11 min-w-[4.5rem] cursor-pointer items-center justify-center border border-bone/25 px-3 font-display text-base font-bold tracking-[0.04em] text-bone transition-colors hover:border-bone peer-checked:border-neon peer-checked:bg-neon peer-checked:text-[#04120a] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-neon">
              {f.name}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
