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
  description: 'Professional academic & technical services — lab records writing, assignments, PPT presentations, web development, website designing & logo designing. Trusted by 1000+ students since 2021. Based in Kakinada, India. Web, PPT & design services available worldwide — USA, UK, Australia, Canada & beyond.'},
  keywords: [
    // Core brand
    'records writing kakinada',
    'records writing kakinada services',
    'recordswritingkakinada',
    // Lab records — India
    'lab records kakinada',
    'lab records writing kakinada',
    'handwritten lab records kakinada',
    'lab records hyderabad',
    'lab records bangalore',
    'assignment writing kakinada',
    'observation book writing kakinada',
    'project report writing kakinada',
    'btech lab records kakinada',
    'engineering lab records kakinada',
    'medical lab records kakinada',
    // Drawings — India
    'engineering drawings kakinada',
    'circuit diagrams kakinada',
    'biology diagrams kakinada',
    // PPT — India
    'ppt presentation kakinada',
    'powerpoint presentation kakinada',
    'seminar ppt kakinada',
    // Web dev & design — India
    'web development kakinada',
    'website development kakinada',
    'website designing kakinada',
    'web designing kakinada',
    'web development andhra pradesh',
    // Logo designing — India
    'logo designing kakinada',
    'logo design kakinada',
    'professional logo design kakinada',
    'brand logo design kakinada',
    'logo designing andhra pradesh',
    // General academic — India
    'academic writing services kakinada',
    'andhra pradesh lab records',
    'best lab records writing service kakinada',
    'affordable lab records kakinada',
    // ── Global: Web Development ──
    'web development services online',
    'affordable web development worldwide',
    'freelance web developer india',
    'hire web developer india',
    'web development services usa',
    'web development services uk',
    'web development services australia',
    'web development services canada',
    'web development services uae',
    'cheap web development services',
    'professional web development online',
    'next.js developer for hire',
    'react developer for hire',
    'full stack developer india',
    'student project web development',
    'academic project website development',
    // ── Global: Website Designing ──
    'website designing services online',
    'affordable website design worldwide',
    'website design services usa',
    'website design services uk',
    'website design services australia',
    'website design services canada',
    'freelance website designer india',
    'hire website designer online',
    'professional website designing',
    'cheap website design online',
    'landing page design service',
    'business website design online',
    'portfolio website design service',
    // ── Global: Logo Designing ──
    'logo design services online',
    'affordable logo design worldwide',
    'logo design services usa',
    'logo design services uk',
    'logo design services australia',
    'logo design services canada',
    'freelance logo designer india',
    'hire logo designer online',
    'professional logo design online',
    'cheap logo design service',
    'brand identity design online',
    'startup logo design service',
    'business logo design online',
    // ── Global: PPT ──
    'ppt presentation service online',
    'powerpoint presentation design online',
    'professional ppt design worldwide',
    'presentation design service usa',
    'presentation design service uk',
    'affordable ppt design online',
    'academic presentation design service',
    'seminar presentation design online',
    // ── Global: Academic Writing ──
    'academic writing services online',
    'assignment writing service online',
    'project report writing online',
    'affordable academic writing worldwide',
  ],
  authors: [{ name: 'Records Writing Kakinada', url: BASE_URL }],
  creator: 'Records Writing Kakinada',
  publisher: 'Records Writing Kakinada',
  category: 'Education',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_AU', 'en_CA', 'en_IN'],
    url: BASE_URL,
    siteName: 'Records Writing Kakinada',
    title: 'Records Writing Kakinada | Lab Records, Web Development, Logo & PPT Services Worldwide',
    description: 'Professional academic & technical services — lab records, assignments, PPT, web development, website designing & logo designing. Based in India. Web, PPT & design services available worldwide — USA, UK, Australia, Canada & beyond.',
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
    title: 'Records Writing Kakinada | Web Dev, Logo Design, PPT & Academic Services Worldwide',
    description: 'Lab records, assignments, PPT, web development, website designing & logo designing. Based in India — serving clients worldwide. 1000+ students served since 2021.',
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
    languages: {
      'en-US': BASE_URL,
      'en-GB': BASE_URL,
      'en-AU': BASE_URL,
      'en-CA': BASE_URL,
      'en-IN': BASE_URL,
      'x-default': BASE_URL,
    },
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
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://recordswritingkakinada.vercel.app/#business',
      name: 'Records Writing Kakinada',
      alternateName: ['Records Writing Kakinada Services', 'RWK Kakinada', 'RWK'],
      description: 'Professional academic and technical services — lab records writing, assignments, PPT presentations, web development, website designing and logo designing. Based in Kakinada, India. Web, PPT and design services available worldwide including USA, UK, Australia, Canada and UAE. Serving since 2021.',
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
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Singapore' },
        { '@type': 'Country', name: 'New Zealand' },
        { '@type': 'AdministrativeArea', name: 'Worldwide' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Academic & Technical Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lab Records Writing', description: 'Handwritten lab records for B.Tech, Degree, Inter, Medical and M.Tech students in Kakinada, Hyderabad and Bangalore.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assignment Writing', description: 'Professional assignment and observation book writing for college students.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engineering Drawings', description: 'Technical and engineering drawings for B.Tech, M.Tech and Degree students.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PPT Presentations', description: 'Professional PowerPoint presentation design for seminars and projects.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', description: 'Custom website and web application development for students and professionals worldwide. Available in USA, UK, Australia, Canada and globally.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Designing', description: 'Professional website designing services worldwide. 62+ websites delivered. Visit https://lowkeywebdev.vercel.app/ for portfolio.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logo Designing', description: 'Professional logo design and brand identity for businesses, startups and individuals worldwide — USA, UK, Australia, Canada and beyond.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PPT Presentations', description: 'Professional PowerPoint presentation design for seminars, projects and business decks. Available worldwide.' } },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '200',
        bestRating: '5',
      },
      priceRange: '₹-$',
      currenciesAccepted: 'INR, USD, GBP, AUD, CAD, AED',
      paymentAccepted: 'Cash, UPI, Bank Transfer, PayPal',
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
          name: 'Do you provide web development and logo design services worldwide?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our web development, website designing, logo designing and PPT presentation services are available worldwide — including USA, UK, Australia, Canada, UAE, Singapore and beyond. We deliver all digital services online.' },
        },
        {
          '@type': 'Question',
          name: 'Where do you provide lab records writing service?',
          acceptedAnswer: { '@type': 'Answer', text: 'We provide lab records writing service in Kakinada, Hyderabad and Bangalore. PPT, web development, website designing and logo designing are available pan India and worldwide.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'We have been providing professional academic and technical services since 2021 — over 5 years. We have served 1000+ students across Kakinada, Hyderabad and Bangalore, and clients worldwide for web development, website designing and logo designing.' },
        },
        {
          '@type': 'Question',
          name: 'How do I hire you for web development or logo design from outside India?',
          acceptedAnswer: { '@type': 'Answer', text: 'Simply fill out our contact form at recordswritingkakinada.vercel.app/contact with your requirements. We work with clients in USA, UK, Australia, Canada, UAE and worldwide. All communication and delivery is done online.' },
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
