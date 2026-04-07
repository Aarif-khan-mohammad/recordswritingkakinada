// ── Shared pricing constants used by both /price-calculator and /contact ──

export const RECORD_BASE: Record<string, number> = {
  'Theory / Assignments': 10,
  'Lab Records': 15,
  'Project Report': 25,
  'Observation Book': 12,
}

export const STREAM_MUL: Record<string, number> = {
  'Inter': 1.0,
  'Degree': 1.2,
  'B.Tech': 1.5,
  'Medical': 1.8,
  'Others': 1.1,
}

export const YEAR_MUL: Record<string, number> = {
  '1st Year': 1.0,
  '2nd Year': 1.1,
  '3rd Year': 1.2,
  '4th Year': 1.3,
}

// Price per drawing, keyed by drawing type → stream
export const DRAWING_TYPES: Record<string, Record<string, number>> = {
  'Engineering Drawing': { 'Inter': 35, 'Degree': 45, 'B.Tech': 60, 'Medical': 50, 'Others': 40 },
  'Medical Diagram': { 'Inter': 40, 'Degree': 50, 'B.Tech': 55, 'Medical': 70, 'Others': 45 },
  'Context-Free / General Sketch': { 'Inter': 25, 'Degree': 30, 'B.Tech': 35, 'Medical': 35, 'Others': 25 },
  'Circuit / Network Diagram': { 'Inter': 30, 'Degree': 40, 'B.Tech': 50, 'Medical': 40, 'Others': 35 },
  'Biology / Anatomy Drawing': { 'Inter': 35, 'Degree': 45, 'B.Tech': 45, 'Medical': 65, 'Others': 35 },
  'Flowchart / Block Diagram': { 'Inter': 25, 'Degree': 35, 'B.Tech': 40, 'Medical': 35, 'Others': 30 },
}

// PPT: price per slide
export const PPT_RATES: Record<string, number> = {
  'Inter': 30,
  'Degree': 40,
  'B.Tech': 50,
  'Medical': 55,
  'Others': 35,
}

// Web Development: fixed price ranges per scope
export const WEB_PRICES: Record<string, { min: number; max: number }> = {
  'Landing Page': { min: 1500, max: 3000 },
  'Portfolio Website': { min: 2500, max: 5000 },
  'Academic Mini Project': { min: 3000, max: 6000 },
  'Full-Stack Project': { min: 8000, max: 20000 },
  'E-commerce Site': { min: 10000, max: 25000 },
  'Other (specify below)': { min: 2000, max: 15000 },
}

export const WEB_SCOPES = Object.keys(WEB_PRICES)

// Urgency surcharge: 0% for 10+ days, up to 40% for 1 day
export function getUrgencyPercent(days: number): number {
  if (days <= 0 || days >= 10) return 0
  return Math.round(((10 - days) / 9) * 40)
}

// ── Calculators ──

export function calcRecordPrice(pages: string, stream: string, subjectType: string, year: string) {
  const p = parseInt(pages)
  if (!p || p <= 0 || !stream || !subjectType) return null
  const base = RECORD_BASE[subjectType] || 10
  const perPage = Math.round(base * (STREAM_MUL[stream] || 1) * (YEAR_MUL[year] || 1))
  return { perPage, baseTotal: perPage * p }
}

export function calcDrawingPrice(count: string, stream: string, drawType: string) {
  const n = parseInt(count)
  if (!n || n <= 0 || !stream || !drawType) return null
  const rate = DRAWING_TYPES[drawType]?.[stream]
  if (!rate) return null
  return { perDrawing: rate, baseTotal: rate * n }
}

export function calcPPTPrice(slides: string, stream: string) {
  const n = parseInt(slides)
  if (!n || n <= 0 || !stream) return null
  const rate = PPT_RATES[stream] || 35
  return { perSlide: rate, baseTotal: rate * n }
}

export function withUrgency(baseTotal: number, days: string) {
  const d = parseInt(days) || 0
  const pct = getUrgencyPercent(d)
  const urgencyFee = Math.round(baseTotal * pct / 100)
  return { urgencyFee, urgencyPct: pct, total: baseTotal + urgencyFee }
}
