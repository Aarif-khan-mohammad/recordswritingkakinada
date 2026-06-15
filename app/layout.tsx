import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VisitorTracker from '@/components/VisitorTracker'

const BASE_URL = 'https://recordswritingkakinada.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Records Writing Kakinada | #1 Lab Records, Assignments & Academic Services',
    template: '%s | Records Writing Kakinada',
  },
  description: 'Best lab records writing service in Kakinada. Professional handwritten lab records, assignments, observation books, project reports, engineering drawings, PPT presentations & web development. Trusted by 1000+ students since 2021. Delivery in Kakinada, Hyderabad & Bangalore.',
  keywords: [
    // Core brand
    'records writing kakinada',
    'records writing kakinada services',
    'recordswritingkakinada',
    // Lab records — primary
    'lab records kakinada',
    'lab records writing kakinada',
    'lab record writing service kakinada',
    'handwritten lab records kakinada',
    'lab records near me kakinada',
    // Assignments
    'assignment writing kakinada',
    'assignments writing service kakinada',
    'observation book writing kakinada',
    'project report writing kakinada',
    // Academic stream specific
    'btech lab records kakinada',
    'b.tech lab records kakinada',
    'engineering lab records kakinada',
    'degree lab records kakinada',
    'inter lab records kakinada',
    'medical lab records kakinada',
    'mtech records kakinada',
    'masters records kakinada',
    // Drawings
    'engineering drawings kakinada',
    'technical drawings kakinada',
    'engineering drawing service kakinada',
    'circuit diagrams kakinada',
    'biology diagrams kakinada',
    // PPT
    'ppt presentation kakinada',
    'ppt writing service kakinada',
    'powerpoint presentation kakinada',
    'seminar ppt kakinada',
    // Web dev
    'web development kakinada',
    'website development kakinada',
    'student web projects kakinada',
    'web development andhra pradesh',
    // City expansions
    'lab records hyderabad',
    'lab records writing hyderabad',
    'assignment writing hyderabad',
    'lab records bangalore',
    'lab records writing bangalore',
    'assignment writing bangalore',
    // General academic
    'academic records kakinada',
    'academic writing services kakinada',
    'student services kakinada',
    'academic help kakinada',
    'college records writing kakinada',
    'university records kakinada',
    'andhra pradesh lab records',
    'andhra pradesh academic services',
    // Long-tail
    'best lab records writing service kakinada',
    'cheap lab records kakinada',
    'affordable lab records kakinada',
    'trusted lab records service kakinada',
    'professional records writing kakinada',
    'on time lab records kakinada',
    'confidential lab records kakinada',
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
    title: 'Records Writing Kakinada | #1 Lab Records & Academic Services Since 2021',
    description: 'Best lab records writing service in Kakinada. Handwritten lab records, assignments, drawings, PPT & web development. 1000+ students served. Delivery in Kakinada, Hyderabad & Bangalore.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Records Writing Kakinada — Best Lab Records & Academic Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Records Writing Kakinada | #1 Lab Records & Academic Services',
    description: 'Best lab records writing in Kakinada. Assignments, drawings, PPT & web development. 1000+ students served since 2021.',
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
    google: 'vhCHWlC9fI4jIyNWlv3_r8dBuB8mUZ8zfDQhi4_NLaU',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://recordswritingkakinada.vercel.app/#business',
      name: 'Records Writing Kakinada',
      alternateName: ['Records Writing Kakinada Services', 'RWK Kakinada'],
      description: 'Best lab records writing service in Kakinada. Professional handwritten lab records, assignments, observation books, project reports, engineering drawings, PPT presentations and web development for students. Serving since 2021.',
      url: 'https://recordswritingkakinada.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://recordswritingkakinada.vercel.app/logo.png',
        width: 200,
        height: 200,
      },
      image: 'https://recordswritingkakinada.vercel.app/logo.png',
      email: 'recordswritingkakinada@gmail.com',
      foundingDate: '2021',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kakinada',
        addressRegion: 'Andhra Pradesh',
        postalCode: '533001',
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Academic & Technical Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lab Records Writing', description: 'Handwritten lab records for B.Tech, Degree, Inter, Medical and M.Tech students in Kakinada, Hyderabad and Bangalore.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assignment Writing', description: 'Professional assignment and observation book writing for college students.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engineering Drawings', description: 'Technical and engineering drawings for B.Tech, M.Tech and Degree students.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PPT Presentations', description: 'Professional PowerPoint presentation design for seminars and projects.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', description: 'Custom website and web application development for students and professionals.' } },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
        bestRating: '5',
      },
      priceRange: '₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI',
      openingHours: 'Mo-Su 09:00-21:00',
      sameAs: [
        'https://www.instagram.com/records_writing_kakinada',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://recordswritingkakinada.vercel.app/#website',
      url: 'https://recordswritingkakinada.vercel.app',
      name: 'Records Writing Kakinada',
      description: 'Best lab records writing service in Kakinada since 2021',
      publisher: { '@id': 'https://recordswritingkakinada.vercel.app/#business' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://recordswritingkakinada.vercel.app/services',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where do you provide lab records writing service?',
          acceptedAnswer: { '@type': 'Answer', text: 'We provide lab records writing service in Kakinada, Hyderabad and Bangalore. PPT and web development are available pan India and worldwide.' },
        },
        {
          '@type': 'Question',
          name: 'How much does lab records writing cost in Kakinada?',
          acceptedAnswer: { '@type': 'Answer', text: 'Lab records writing starts from ₹15/page for standard delivery (10+ days). Price varies by stream — Inter, Degree, B.Tech, M.Tech, Masters and Medical. Urgent orders carry a surcharge. Use our price calculator for an exact estimate.' },
        },
        {
          '@type': 'Question',
          name: 'Is your lab records writing service confidential?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. All orders are handled with strict confidentiality. Your documents and personal details are never shared with third parties.' },
        },
        {
          '@type': 'Question',
          name: 'Do you provide engineering drawings service in Kakinada?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. We provide engineering drawings, circuit diagrams, biology diagrams, flowcharts and all types of technical drawings for B.Tech, M.Tech, Degree and Medical students.' },
        },
        {
          '@type': 'Question',
          name: 'How long have you been providing academic services in Kakinada?',
          acceptedAnswer: { '@type': 'Answer', text: 'We have been providing professional academic services since 2021 — over 5 years. We have served 1000+ students across Kakinada, Hyderabad and Bangalore.' },
        },
      ],
    },
  ]

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="vhCHWlC9fI4jIyNWlv3_r8dBuB8mUZ8zfDQhi4_NLaU" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
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
