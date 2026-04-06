import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Request a Service',
  description: 'Request academic records writing, web development, or PPT services from Records Writing Kakinada. Fast response, confidential handling.',
  alternates: { canonical: 'https://recordswritingkakinada.vercel.app/contact' },
  openGraph: {
    title: 'Contact | Records Writing Kakinada',
    description: 'Submit your service request — records, web development, or PPT. We respond fast.',
    url: 'https://recordswritingkakinada.vercel.app/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
