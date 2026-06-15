import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Price Calculator | Lab Records & Drawings Cost in Kakinada',
  description: 'Calculate the exact price for lab records writing and engineering drawings in Kakinada. Transparent pricing by stream, year & urgency. B.Tech, Degree, M.Tech, Medical & Inter students.',
  keywords: [
    'lab records price kakinada',
    'lab records cost kakinada',
    'lab records writing charges kakinada',
    'how much lab records cost kakinada',
    'lab records price per page kakinada',
    'engineering drawings price kakinada',
    'assignment writing price kakinada',
    'academic services price kakinada',
    'btech lab records price',
    'degree lab records price',
    'affordable lab records kakinada',
    'cheap lab records writing kakinada',
  ],
  alternates: { canonical: 'https://recordswritingkakinada.vercel.app/price-calculator' },
  openGraph: {
    title: 'Price Calculator | Lab Records & Drawings Cost — Records Writing Kakinada',
    description: 'Instantly calculate lab records and drawing prices. Transparent pricing by stream, year & urgency. Kakinada, Hyderabad & Bangalore.',
    url: 'https://recordswritingkakinada.vercel.app/price-calculator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Price Calculator — Records Writing Kakinada' }],
  },
}

export default function PriceCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
