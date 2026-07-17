import type { MetadataRoute } from 'next'

const BASE = 'https://recordswritingkakinada.vercel.app'
const now = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/price-calculator`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contact`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`,             lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/privacy`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
