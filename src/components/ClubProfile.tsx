import { useState } from 'react'
import { Check, Copy, Download, ExternalLink, Mail } from 'lucide-react'
import { contact, techStack } from '../data/club'
import BallonDor from './BallonDor'
import TotyCard from './TotyCard'

export default function ClubProfile({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="grid gap-5">
      <header>
        <p className="eyebrow">Club profile</p>
        <h1 className="mt-1 text-3xl font-bold uppercase sm:text-4xl">Club analytics</h1>
      </header>

      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <section aria-labelledby="skills-h">
            <h2 id="skills-h" className="eyebrow">Skills</h2>
            <dl className="m-0 mt-2 grid gap-1.5">
              {techStack.map((g) => (
                <div key={g.group} className="grid gap-1 sm:grid-cols-[7.5rem_1fr]">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-mist sm:pt-1">{g.group}</dt>
                  <dd className="m-0 flex flex-wrap gap-1">{g.items.map((i) => <span key={i} className="chip !py-0 !text-xs">{i}</span>)}</dd>
                </div>
              ))}
            </dl>
          </section>
          <BallonDor onOpenProject={onOpenProject} />
        </div>

        <div id="contact" className="flex flex-col gap-4">
          <TotyCard />
          <ul className="m-0 grid list-none gap-2 p-0">
            <li className="flex">
              <a href={`mailto:${contact.email}`} className="btn btn-primary min-w-0 flex-1 !justify-start !px-4 !text-sm !tracking-normal">
                <Mail size={16} aria-hidden="true" className="shrink-0" /> <span className="truncate">{contact.email}</span>
              </a>
              <button type="button" onClick={copyEmail} className="btn -ml-px shrink-0 !px-4 !text-sm" aria-label="Copy email address">
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </li>
            <li className="grid grid-cols-3 gap-2">
              <a href="/Kabir_Mathur_Resume.pdf" download className="ts-none btn !justify-between !border-[#e8c36a] !bg-[#e8c36a] !px-3 !text-sm !text-[#1a1305] hover:!bg-[#f3e2a0]">
                Resume <Download size={14} aria-hidden="true" />
              </a>
              {contact.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ts-none btn !justify-between !border-[#e8c36a] !bg-[#e8c36a] !px-3 !text-sm !text-[#1a1305] hover:!bg-[#f3e2a0]">
                  {l.label} <ExternalLink size={14} aria-hidden="true" /><span className="visually-hidden">(opens in a new tab)</span>
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
