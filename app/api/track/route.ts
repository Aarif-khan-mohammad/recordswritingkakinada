import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function parseDevice(ua: string) {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet'
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'Mobile'
  return 'Desktop'
}

function parseBrowser(ua: string) {
  if (/edg/i.test(ua)) return 'Edge'
  if (/chrome/i.test(ua)) return 'Chrome'
  if (/firefox/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua)) return 'Safari'
  if (/opera|opr/i.test(ua)) return 'Opera'
  return 'Other'
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  )
  try {
    const { page } = await req.json()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'
    const ua = req.headers.get('user-agent') || ''

    let country = 'Unknown', city = 'Unknown'
    if (ip !== 'unknown' && ip !== '::1' && !ip.startsWith('127.')) {
      try {
        const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`, { cache: 'no-store' })
        if (geo.ok) {
          const d = await geo.json()
          country = d.country || 'Unknown'
          city = d.city || 'Unknown'
        }
      } catch { }
    }

    await supabase.from('visitor_logs').insert([{
      ip, device: parseDevice(ua), browser: parseBrowser(ua),
      country, city, page: page || '/', user_agent: ua.slice(0, 300),
    }])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
