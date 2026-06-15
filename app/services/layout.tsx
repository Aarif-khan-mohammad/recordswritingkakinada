import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Lab Records, Drawings, PPT & Web Development Kakinada',
  description: 'Professional lab records writing, engineering drawings, PPT presentations & web development in Kakinada, Hyderabad & Bangalore. B.Tech, Degree, M.Tech, Medical students. Affordable prices, on-time delivery.',
  keywords: [
    // Lab records
    'lab records writing service kakinada',
    'btech lab records kakinada',
    'degree lab records kakinada',
    'mtech lab records kakinada',
    'medical lab records kakinada',
    'inter lab records kakinada',
    'handwritten lab records kakinada',
    'observation book writing kakinada',
    'project report writing kakinada',
    // Drawings
    'engineering drawings kakinada',
    'technical drawings kakinada',
    'btech engineering drawings kakinada',
    'circuit diagrams kakinada',
    'biology diagrams kakinada',
    'flowchart drawings kakinada',
    // PPT
    'ppt presentation service kakinada',
    'seminar ppt kakinada',
    'powerpoint presentation kakinada',
    // Web dev
    'web development kakinada',
    'student web projects kakinada',
    'mini project web development kakinada',
    // Other cities
    'lab records hyderabad delivery',
    'lab records bangalore delivery',
    'assignment writing hyderabad',
    'assignment writing bangalore',
  ],
  alternates: { canonical: 'https://recordswritingkakinada.vercel.app/services' },
  openGraph: {
    title: 'Services | Lab Records, Drawings, PPT & Web Dev — Records Writing Kakinada',
    description: 'Lab records, assignments, engineering drawings, PPT & web development. Serving Kakinada, Hyderabad & Bangalore. Affordable, confidential, on-time.',
    url: 'https://recordswritingkakinada.vercel.app/services',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Services — Records Writing Kakinada' }],
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
