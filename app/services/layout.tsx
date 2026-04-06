import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — Records, Web Development & PPT',
  description: 'Lab records, assignments, PPT & drawings delivered to Kakinada, Hyderabad & Bangalore. Web development available pan India & worldwide. Professional, confidential & on-time.',
  alternates: { canonical: 'https://recordswritingkakinada.vercel.app/services' },
  keywords: [
    'lab records writing kakinada',
    'assignment writing kakinada',
    'lab records writing hyderabad',
    'lab records writing bangalore',
    'web development student projects india',
    'ppt presentation writing kakinada',
    'engineering drawings kakinada',
    'btech lab records andhra pradesh',
    'academic records delivery hyderabad',
    'academic records delivery bangalore',
  ],
  openGraph: {
    title: 'Services | Records Writing Kakinada',
    description: 'Physical delivery to Kakinada, Hyderabad & Bangalore. Web development anywhere in India & worldwide.',
    url: 'https://recordswritingkakinada.vercel.app/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
