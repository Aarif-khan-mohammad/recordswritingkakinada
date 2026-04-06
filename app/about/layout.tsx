import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Records Writing Kakinada — our story, privacy policy, and commitment to quality academic services in Kakinada, Andhra Pradesh.',
  alternates: { canonical: 'https://recordswritingkakinada.vercel.app/about' },
  openGraph: {
    title: 'About Records Writing Kakinada',
    description: 'Trusted academic services in Kakinada. Privacy guaranteed, on-time delivery, quality assured.',
    url: 'https://recordswritingkakinada.vercel.app/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
