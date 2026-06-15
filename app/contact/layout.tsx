import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Order Lab Records & Academic Services in Kakinada',
  description: 'Order lab records, assignments, engineering drawings, PPT or web development from Records Writing Kakinada. Fast response, confidential, affordable. Serving Kakinada, Hyderabad & Bangalore.',
  keywords: [
    'order lab records kakinada',
    'contact records writing kakinada',
    'book lab records kakinada',
    'lab records order kakinada',
    'request academic services kakinada',
    'lab records writing near me',
    'academic help kakinada contact',
  ],
  alternates: { canonical: 'https://recordswritingkakinada.vercel.app/contact' },
  openGraph: {
    title: 'Order Lab Records & Academic Services | Records Writing Kakinada',
    description: 'Place your order for lab records, assignments, drawings, PPT or web development. Fast response. Serving Kakinada, Hyderabad & Bangalore.',
    url: 'https://recordswritingkakinada.vercel.app/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Records Writing Kakinada' }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
