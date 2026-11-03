import type { CareerMilestone, Photo } from '../types'

/**
 * Verified from the GitHub profile README (github.com/kabir-999/kabir-999) and
 * the portfolio site's profile data (kabir-portfolio-management.vercel.app).
 */
export const manager = {
  name: 'Kabir Mathur',
  headline: 'AI/ML Engineer · Full-Stack Systems · Applied Computer Vision',
  location: 'Mumbai, India',
  bio: "I'm a data science student and AI/ML developer from Mumbai. I've built smart glasses for the visually impaired, a no-code app generator and a real-time PPE detection system, and I lead my department's tech teams.",
  education: {
    degree: 'B.Tech, Computer Science & Engineering (Data Science)',
    institution: "SVKM's D.J. Sanghvi College of Engineering, Mumbai",
    cgpa: '8.648/10',
    honours: 'Honours in Financial Computing',
    period: '2023–2027',
  },
  schooling: { institution: 'Poddar Brio International, Badlapur', result: 'Class XII: 76%' },
  currentRole: {
    title: 'Project Trainee',
    org: 'Larsen & Toubro Precision Engineering and Systems',
  },
  focusAreas: ['Computer Vision', 'Backend Development', 'Software Development', 'Data Pipelines', 'Applied GenAI', 'Agentic AI'],
} as const

export const contact = {
  email: 'mathurkabir336@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/kabir-2005-Mathur' },
    { label: 'GitHub', href: 'https://github.com/kabir-999' },
  ],
} as const

/** Skills, grouped as on the resume. */
export const techStack: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'Java', 'SQL'] },
  { group: 'AI / ML', items: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'RAG', 'AI Agents', 'Agentic AI'] },
  { group: 'Data Engineering', items: ['Apache Airflow', 'Apache Kafka', 'PySpark', 'PostgreSQL'] },
  { group: 'Frameworks', items: ['TensorFlow', 'PyTorch', 'LangChain', 'LangGraph', 'n8n', 'Hugging Face', 'OpenCV', 'FAISS'] },
  { group: 'Development & Cloud', items: ['Flask', 'FastAPI', 'Spring Boot', 'React', 'Firebase', 'MongoDB', 'Docker', 'AWS'] },
]

/** Real photos, from the portfolio site's assets. Captions only describe what is visible. */
export const photos: Record<'portrait' | 'trophies' | 'tunnel' | 'night', Photo> = {
  portrait: { src: '/photos/portrait.webp', alt: 'Kabir Mathur in a pink shirt, smiling slightly outside a building', caption: 'Matchday portrait', width: 800, height: 800 },
  trophies: {
    src: '/photos/trophies.webp',
    alt: 'Kabir Mathur with three trophies: Best Cultural Department, IDPT Cup Winner, and Best Sports Department',
    caption: 'Department trophies',
    width: 900,
    height: 1135,
  },
  tunnel: { src: '/photos/tunnel.webp', alt: 'Kabir Mathur leaning against a patterned pillar in a white shirt and beige trousers', caption: 'Walking out of the tunnel', width: 900, height: 1200 },
  night: { src: '/photos/night.webp', alt: 'Kabir Mathur at night, looking to the side', caption: 'Floodlights off — night session', width: 900, height: 675 },
}


/**
 * The career timeline is the single home for dated events. Certificates and
 * team trophies live in the trophy cabinet, and project detail lives in the Squad.
 */
export const careerMilestones: CareerMilestone[] = [
  {
    id: 'poddar',
    period: 'Class XII',
    title: 'Poddar Brio International, Badlapur',
    kind: 'education',
    summary: 'Higher secondary education, Class XII.',
    details: ['Class XII: 76%.'],
  },
  {
    id: 'btech',
    period: '2023–2027',
    title: 'B.Tech, Computer Science & Engineering (Data Science)',
    kind: 'education',
    summary: "SVKM's D.J. Sanghvi College of Engineering, Mumbai · Honours in Financial Computing.",
    details: ['CGPA: 8.648/10.'],
  },
  {
    id: 's4ds',
    period: 'Aug 2024',
    title: 'Events Co-committee, Society 4 Data Science',
    kind: 'leadership',
    summary: 'Wrote and assessed original problem statements for two ML competitions.',
    details: ['One problem for the ML hackathon DataHack 3.0 and one for Xtract 3.0, for 100+ participants.'],
  },
  {
    id: 'aws-ml',
    period: 'Oct 2024',
    title: 'AWS Machine Learning — Certified',
    kind: 'certification',
    summary: 'Certified.',
    details: [],
  },
  {
    id: 'sih-2024',
    period: 'Dec 2024',
    title: 'Smart India Hackathon 2024 — Grand Finalist',
    kind: 'competition',
    summary: "Selected as a national finalist in India's premier hackathon.",
    details: [],
  },
  {
    id: 'co-captain',
    period: 'Feb 2025',
    title: 'Co-Captain, Data Science Department',
    kind: 'leadership',
    summary: 'Led 200+ students to 1st place in a 6-department interdepartmental tournament.',
    details: [],
  },
  {
    id: 'aws-academy',
    period: 'Mar 2025',
    title: 'AWS Academy: Cloud Foundations — Certified',
    kind: 'certification',
    summary: 'Certified.',
    details: [],
  },
  {
    id: 'coders-arena-2025',
    period: '1 Jul 2025',
    title: 'Coders Arena 2025 (The Battle of Algorithms) — Finalist',
    kind: 'competition',
    summary: 'Cracked 4 of 5 problems in the final showdown and made the ultimate round.',
    details: [],
  },
  {
    id: 'k2s2',
    period: 'Jun – Sep 2025',
    title: 'AI/ML Intern — K2S2 Digistrat Solutions',
    kind: 'experience',
    summary: 'Developed a real-time camera-based face recognition and anti-spoofing application for live authentication.',
    details: [],
  },
  {
    id: 'meera',
    period: 'Sep 2025 – Mar 2026',
    title: 'AI/ML Intern — Meera AI Tech',
    kind: 'experience',
    summary: 'Built AI smart glasses for visually impaired users and a no-code platform that generates mobile apps from prompts.',
    details: [],
  },
  {
    id: 'msft-genai',
    period: 'Coursera',
    title: 'Generative AI for Data Science — Microsoft',
    kind: 'certification',
    summary: 'Certificate.',
    details: [],
  },
  {
    id: 'amazon-ml',
    period: 'Jul 2026',
    title: 'Amazon ML Summer School — Selected',
    kind: 'certification',
    summary: 'Selected.',
    details: [],
  },
  {
    id: 'lt-trainee',
    period: 'Jul 2026 – Present',
    title: 'Project Trainee — Larsen & Toubro Precision Engineering and Systems',
    kind: 'experience',
    summary: 'Acoustic classification with CRNNs.',
    details: [
      'Designed a gain-invariant, multi-channel time-frequency front end for CRNN acoustic classification, making the model robust to recording gain and microphone variation.',
      'Built and cross-validated a CRNN with attention pooling, replacing handcrafted features with learned representations and adding a harmonic-comb channel to reduce frequent misclassifications.',
    ],
    current: true,
  },
]

/** Top six projects, in order of rank. Dates are the project dates from the resume and portfolio. */
export const ballonDor = [
  { projectId: 'spectrasense', award: "Ballon d'Or", date: 'Sep 2025 – Mar 2026' },
  { projectId: 'twinformer', award: 'Runner-up', date: 'Oct 2026' },
  { projectId: 'safeguard', award: 'Third place', date: 'Mar 2026' },
  { projectId: 'nocode', award: 'Shortlist', date: 'Sep 2025 – Mar 2026' },
  { projectId: 'faceas', award: 'Shortlist', date: 'Jun – Sep 2025' },
  { projectId: 'crop', award: 'Shortlist · SIH', date: 'Dec 2024' },
] as const

/** Department trophies, read from the engraved plates in the trophy photo. */
export const teamTrophies = [
  { id: 'cultural', title: 'Best Cultural Department' },
  { id: 'idpt', title: 'IDPT Cup', note: 'Winner' },
  { id: 'sports', title: 'Best Sports Department' },
] as const
