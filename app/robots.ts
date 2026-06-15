import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/services', '/contact', '/price-calculator', '/privacy'],
        disallow: ['/admin-records', '/api/', '/login', '/signup'],
      },
    ],
    sitemap: 'https://recordswritingkakinada.vercel.app/sitemap.xml',
  }
}
