import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Records Writing Kakinada'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a1628 0%, #112240 100%)',
        fontFamily: 'sans-serif',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
          padding: '60px',
        }}>
          <div style={{
            fontSize: 56, fontWeight: 900, color: '#c9a84c', textAlign: 'center', lineHeight: 1.2,
          }}>
            Records Writing Kakinada
          </div>
          <div style={{
            fontSize: 26, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 800,
          }}>
            Professional Academic & Technical Services
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
            {['📝 Records & Assignments', '💻 Web Development', '📊 PPT & Drawings'].map(s => (
              <div key={s} style={{
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: 12, padding: '12px 24px', color: '#c9a84c', fontSize: 18,
              }}>{s}</div>
            ))}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, marginTop: 8 }}>
            Kakinada, Andhra Pradesh • Confidential • On-Time
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
