import type { MetadataRoute } from 'next'

const BASE = 'https://recordswritingkakinada.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                       lastModified: new Date('2025-01-01'), changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${BASE}/services`,         lastModified: new Date('2025-01-01'), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/price-calculator`, lastModified: new Date('2025-01-01'), changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${BASE}/contact`,          lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/about`,            lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/privacy`,          lastModified: new Date('2025-01-01'), changeFrequency: 'yearly',  priority: 0.3  },
  ]
}
