import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Best Lab Records Service in Kakinada Since 2021',
  description: 'Records Writing Kakinada — trusted academic services since 2021. 1000+ students served across Kakinada, Hyderabad & Bangalore. Confidential, on-time lab records, assignments, drawings, PPT & web development.',
  keywords: [
    'about records writing kakinada',
    'best lab records service kakinada',
    'academic services kakinada since 2021',
    'trusted lab records kakinada',
    'records writing kakinada review',
    'lab records service kakinada reviews',
    'reliable academic services kakinada',
  ],
  alternates: { canonical: 'https://recordswritingkakinada.vercel.app/about' },
  openGraph: {
    title: 'About Records Writing Kakinada | Trusted Since 2021',
    description: '1000+ students served across Kakinada, Hyderabad & Bangalore. Professional lab records, assignments, drawings, PPT & web development since 2021.',
    url: 'https://recordswritingkakinada.vercel.app/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Records Writing Kakinada' }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
