import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/services', '/contact'],
        disallow: ['/admin-records', '/api/', '/login', '/signup'],
      },
    ],
    sitemap: 'https://recordswritingkakinada.vercel.app/sitemap.xml',
  }
}
