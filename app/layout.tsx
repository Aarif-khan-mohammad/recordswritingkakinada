import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VisitorTracker from '@/components/VisitorTracker'

const BASE_URL = 'https://recordswritingkakinada.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Records Writing Kakinada | Academic & Technical Services',
    template: '%s | Records Writing Kakinada',
  },
  description: 'Professional academic records writing, lab records, assignments, web development, and PPT services. Physical delivery in Kakinada, Hyderabad & Bangalore. Web development available pan India & worldwide.',
  keywords: [
    'records writing kakinada',
    'lab records kakinada',
    'academic records kakinada',
    'assignments writing kakinada',
    'lab records hyderabad',
    'lab records bangalore',
    'web development kakinada',
    'web development india',
    'ppt presentation kakinada',
    'student services kakinada',
    'andhra pradesh academic services',
    'engineering records kakinada',
    'btech records kakinada',
    'degree records kakinada',
    'project reports kakinada',
    'academic records delivery hyderabad',
    'academic records delivery bangalore',
  ],
  authors: [{ name: 'Records Writing Kakinada', url: BASE_URL }],
  creator: 'Records Writing Kakinada',
  publisher: 'Records Writing Kakinada',
  category: 'Education',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Records Writing Kakinada',
    title: 'Records Writing Kakinada | Academic & Technical Services',
    description: 'Professional academic records, lab records, assignments, web development & PPT services in Kakinada. Confidential, reliable & on-time.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Records Writing Kakinada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Records Writing Kakinada | Academic & Technical Services',
    description: 'Professional academic records, lab records, assignments, web development & PPT services in Kakinada.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: 'add-your-google-search-console-verification-code-here',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Records Writing Kakinada',
    description: 'Professional academic records writing, lab records, assignments, web development and PPT services in Kakinada, Andhra Pradesh.',
    url: 'https://recordswritingkakinada.vercel.app',
    logo: 'https://recordswritingkakinada.vercel.app/logo.png',
    image: 'https://recordswritingkakinada.vercel.app/logo.png',
    telephone: '',
    email: 'recordswritingkakinada@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kakinada',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 16.9891,
      longitude: 82.2475,
    },
    areaServed: [
      { '@type': 'City', name: 'Kakinada' },
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'Country', name: 'India' },
    ],
    serviceType: ['Academic Records Writing', 'Lab Records', 'Assignments', 'Web Development', 'PPT Presentations', 'Engineering Drawings'],
    priceRange: '₹',
    sameAs: [
      'https://www.instagram.com/records_writing_kakinada',
    ],
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#0a1628" />
        <meta name="geo.region" content="IN-AP" />
        <meta name="geo.placename" content="Kakinada" />
        <meta name="geo.position" content="16.9891;82.2475" />
        <meta name="ICBM" content="16.9891, 82.2475" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <VisitorTracker />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
