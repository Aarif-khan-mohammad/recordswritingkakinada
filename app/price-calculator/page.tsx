'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight, AlertTriangle, PenTool, BookOpen } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const } }),
}

const iStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(201,168,76,0.25)',
  color: '#fff',
  borderRadius: '0.5rem',
  padding: '0.65rem 1rem',
  width: '100%',
  fontSize: '0.875rem',
  outline: 'none',
}

// ── Records ──────────────────────────────────────────────
const RECORD_BASE: Record<string, number> = {
  'Theory / Assignments': 10,
  'Lab Records': 15,
  'Project Report': 25,
  'Observation Book': 12,
}

const STREAM_MUL: Record<string, number> = {
  'Inter': 1.0,
  'Degree': 1.2,
  'B.Tech': 1.5,
  'Medical': 1.8,
  'Others': 1.1,
}

const YEAR_MUL: Record<string, number> = {
  '1st Year': 1.0,
  '2nd Year': 1.1,
  '3rd Year': 1.2,
  '4th Year': 1.3,
}

// ── Drawings ─────────────────────────────────────────────
// Price per drawing (not per page)
const DRAWING_TYPES: Record<string, { label: string; streams: Record<string, number> }> = {
  'Engineering Drawing (B.Tech)': {
    label: 'Engineering Drawing',
    streams: { 'B.Tech': 60, 'Degree': 45, 'Inter': 35, 'Medical': 50, 'Others': 40 },
  },
  'Medical Diagram': {
    label: 'Medical Diagram',
    streams: { 'Medical': 70, 'B.Tech': 55, 'Degree': 50, 'Inter': 40, 'Others': 45 },
  },
  'Context-Free / General Sketch': {
    label: 'Context-Free / General Sketch',
    streams: { 'Inter': 25, 'Degree': 30, 'B.Tech': 35, 'Medical': 35, 'Others': 25 },
  },
  'Circuit / Network Diagram': {
    label: 'Circuit / Network Diagram',
    streams: { 'B.Tech': 50, 'Degree': 40, 'Inter': 30, 'Medical': 40, 'Others': 35 },
  },
  'Biology / Anatomy Drawing': {
    label: 'Biology / Anatomy Drawing',
    streams: { 'Medical': 65, 'Inter': 35, 'Degree': 45, 'B.Tech': 45, 'Others': 35 },
  },
  'Flowchart / Block Diagram': {
    label: 'Flowchart / Block Diagram',
    streams: { 'B.Tech': 40, 'Degree': 35, 'Inter': 25, 'Medical': 35, 'Others': 30 },
  },
}

export function getUrgencyPercent(days: number): number {
  if (days <= 0 || days >= 10) return 0
  return Math.round(((10 - days) / 9) * 40)
}

export default function PriceCalculatorPage() {
  const [serviceTab, setServiceTab] = useState<'records' | 'drawings'>('records')

  // Records state
  const [stream, setStream] = useState('')
  const [year, setYear] = useState('')
  const [subjectType, setSubjectType] = useState('')
  const [pages, setPages] = useState('')

  // Drawings state
  const [drawStream, setDrawStream] = useState('')
  const [drawType, setDrawType] = useState('')
  const [drawCount, setDrawCount] = useState('')

  // Shared
  const [deliveryDays, setDeliveryDays] = useState('')

  const days = parseInt(deliveryDays) || 0
  const urgencyPct = getUrgencyPercent(days)
  const barColor = urgencyPct >= 30 ? '#f87171' : urgencyPct >= 15 ? '#fbbf24' : '#4ade80'

  // ── Records calc ──
  const recordResult = (() => {
    if (serviceTab !== 'records') return null
    if (!stream || !year || !subjectType || !pages) return null
    const base = RECORD_BASE[subjectType] || 10
    const pageCount = parseInt(pages)
    if (isNaN(pageCount) || pageCount <= 0) return null
    const perPage = Math.round(base * (STREAM_MUL[stream] || 1) * (YEAR_MUL[year] || 1))
    const baseTotal = perPage * pageCount
    const urgencyFee = Math.round(baseTotal * urgencyPct / 100)
    return { perPage, baseTotal, urgencyFee, urgencyPct, total: baseTotal + urgencyFee }
  })()

  // ── Drawings calc ──
  const drawResult = (() => {
    if (serviceTab !== 'drawings') return null
    if (!drawStream || !drawType || !drawCount) return null
    const count = parseInt(drawCount)
    if (isNaN(count) || count <= 0) return null
    const perDrawing = DRAWING_TYPES[drawType]?.streams[drawStream] || 0
    const baseTotal = perDrawing * count
    const urgencyFee = Math.round(baseTotal * urgencyPct / 100)
    return { perDrawing, baseTotal, urgencyFee, urgencyPct, total: baseTotal + urgencyFee }
  })()

  const result = serviceTab === 'records' ? recordResult : drawResult

  const contactHref = serviceTab === 'records'
    ? `/contact?service=Records+%26+Assignments&pages=${pages}${deliveryDays ? `&days=${deliveryDays}` : ''}`
    : `/contact?service=PPT+%26+Drawings`

  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">
      <section className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
          Transparent Pricing
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-4xl md:text-5xl font-extrabold">
          Price <span style={{ color: 'var(--gold)' }}>Calculator</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-4 text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Instant estimates for Records & Drawings. Standard delivery 10+ days. Urgent orders carry a surcharge.
        </motion.p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* Calculator Card */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 border"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)' }}>
                <Calculator size={20} />
              </div>
              <h2 className="font-bold text-lg">Estimator</h2>
            </div>

            {/* Service Tab Toggle */}
            <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
              {([
                { key: 'records', label: 'Records & Assignments', icon: <BookOpen size={14} /> },
                { key: 'drawings', label: 'Drawings', icon: <PenTool size={14} /> },
              ] as const).map(t => (
                <button key={t.key} onClick={() => setServiceTab(t.key)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={serviceTab === t.key
                    ? { background: 'var(--gold)', color: 'var(--navy)' }
                    : { color: 'rgba(255,255,255,0.5)' }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {/* ── Records Fields ── */}
              {serviceTab === 'records' && (<>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Stream / Course *</label>
                  <select style={{ ...iStyle, cursor: 'pointer' }} value={stream} onChange={e => setStream(e.target.value)}>
                    <option value="" style={{ background: '#112240' }}>Select stream...</option>
                    {Object.keys(STREAM_MUL).map(s => <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Year of Study *</label>
                  <select style={{ ...iStyle, cursor: 'pointer' }} value={year} onChange={e => setYear(e.target.value)}>
                    <option value="" style={{ background: '#112240' }}>Select year...</option>
                    {Object.keys(YEAR_MUL).map(y => <option key={y} value={y} style={{ background: '#112240' }}>{y}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Record Type *</label>
                  <select style={{ ...iStyle, cursor: 'pointer' }} value={subjectType} onChange={e => setSubjectType(e.target.value)}>
                    <option value="" style={{ background: '#112240' }}>Select type...</option>
                    {Object.entries(RECORD_BASE).map(([k, v]) => (
                      <option key={k} value={k} style={{ background: '#112240' }}>{k} (₹{v}/page base)</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Number of Pages *</label>
                  <input style={iStyle} type="number" min="1" value={pages}
                    onChange={e => setPages(e.target.value)} placeholder="e.g. 50" />
                </div>
              </>)}

              {/* ── Drawings Fields ── */}
              {serviceTab === 'drawings' && (<>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Stream / Course *</label>
                  <select style={{ ...iStyle, cursor: 'pointer' }} value={drawStream} onChange={e => setDrawStream(e.target.value)}>
                    <option value="" style={{ background: '#112240' }}>Select stream...</option>
                    {Object.keys(STREAM_MUL).map(s => <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Drawing Type *</label>
                  <select style={{ ...iStyle, cursor: 'pointer' }} value={drawType} onChange={e => setDrawType(e.target.value)}>
                    <option value="" style={{ background: '#112240' }}>Select drawing type...</option>
                    {Object.entries(DRAWING_TYPES).map(([k, v]) => {
                      const price = drawStream ? v.streams[drawStream] : null
                      return (
                        <option key={k} value={k} style={{ background: '#112240' }}>
                          {v.label}{price ? ` (₹${price}/drawing)` : ''}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Number of Drawings *</label>
                  <input style={iStyle} type="number" min="1" value={drawCount}
                    onChange={e => setDrawCount(e.target.value)} placeholder="e.g. 10" />
                </div>

                {/* Per-drawing rate hint */}
                {drawStream && drawType && DRAWING_TYPES[drawType] && (
                  <div className="flex items-center justify-between px-4 py-2 rounded-lg text-xs"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Rate per drawing</span>
                    <span className="font-bold" style={{ color: 'var(--gold)' }}>
                      ₹{DRAWING_TYPES[drawType].streams[drawStream] || '—'}
                    </span>
                  </div>
                )}
              </>)}

              {/* ── Delivery Days (shared) ── */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>
                  Delivery Required In (days) *
                  <span className="ml-2 font-normal" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    — 10+ days = standard, 1–9 days = urgent surcharge
                  </span>
                </label>
                <input style={iStyle} type="number" min="1" max="365" value={deliveryDays}
                  onChange={e => setDeliveryDays(e.target.value)} placeholder="e.g. 10" />

                {days > 0 && days < 10 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>Urgency surcharge</span>
                      <span className="font-bold" style={{ color: barColor }}>+{urgencyPct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <motion.div className="h-2 rounded-full" initial={{ width: 0 }}
                        animate={{ width: `${urgencyPct}%` }} transition={{ duration: 0.4 }}
                        style={{ background: barColor }} />
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      <span>9 days (~4%)</span><span>1 day (40%)</span>
                    </div>
                  </motion.div>
                )}
                {days > 0 && days < 10 && (
                  <div className="flex gap-2 px-3 py-2 rounded-lg border text-xs"
                    style={{ background: 'rgba(248,113,113,0.07)', borderColor: 'rgba(248,113,113,0.25)', color: '#fca5a5' }}>
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    Urgent order — {urgencyPct}% surcharge applies.
                  </div>
                )}
                {days >= 10 && (
                  <div className="flex gap-2 px-3 py-2 rounded-lg border text-xs"
                    style={{ background: 'rgba(74,222,128,0.07)', borderColor: 'rgba(74,222,128,0.2)', color: '#86efac' }}>
                    ✓ Standard delivery — no urgency surcharge.
                  </div>
                )}
              </div>
            </div>

            {/* Result */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl p-5 border"
                style={{ background: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Estimated Total</span>
                  <span className="text-3xl font-extrabold" style={{ color: 'var(--gold)' }}>₹{result.total}</span>
                </div>
                <div className="flex flex-col gap-2 text-xs border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}>
                  {'perPage' in result && (
                    <>
                      <div className="flex justify-between"><span>Rate per page</span><span style={{ color: 'var(--gold)' }}>₹{result.perPage}</span></div>
                      <div className="flex justify-between"><span>Pages × rate</span><span style={{ color: 'var(--gold)' }}>₹{result.baseTotal}</span></div>
                    </>
                  )}
                  {'perDrawing' in result && (
                    <>
                      <div className="flex justify-between"><span>Rate per drawing</span><span style={{ color: 'var(--gold)' }}>₹{result.perDrawing}</span></div>
                      <div className="flex justify-between"><span>Drawings × rate</span><span style={{ color: 'var(--gold)' }}>₹{result.baseTotal}</span></div>
                    </>
                  )}
                  {result.urgencyFee > 0 && (
                    <div className="flex justify-between">
                      <span>Urgency surcharge ({result.urgencyPct}%)</span>
                      <span style={{ color: '#f87171' }}>+₹{result.urgencyFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold border-t pt-2" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>
                    <span>Total</span><span style={{ color: 'var(--gold)' }}>₹{result.total}</span>
                  </div>
                </div>
                <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  * Final price may vary slightly based on complexity. This is an estimate.
                </p>
              </motion.div>
            )}

            {result && (
              <Link href={contactHref}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                Request This Service <ArrowRight size={16} />
              </Link>
            )}
          </motion.div>

          {/* Student Loyalty Discount Card */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 border"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(74,222,128,0.25)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'rgba(74,222,128,0.1)' }}>🎓</div>
              <div>
                <h3 className="font-bold" style={{ color: '#4ade80' }}>Student Loyalty Discounts</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Auto-applied when you order via your student account</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { order: '1st Order', pct: '20% off', color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' },
                { order: '2nd Order', pct: '10% off', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
                { order: '3rd Order', pct: '5% off', color: 'var(--gold)', bg: 'rgba(201,168,76,0.08)', border: 'rgba(201,168,76,0.2)' },
              ].map(d => (
                <div key={d.order} className="rounded-xl p-3 text-center border"
                  style={{ background: d.bg, borderColor: d.border }}>
                  <div className="text-lg font-extrabold" style={{ color: d.color }}>{d.pct}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{d.order}</div>
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Create a free student account → place your order → discount is applied automatically to your invoice.
            </p>
          </motion.div>

          {/* Urgency Surcharge Table */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 border"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <h3 className="font-bold mb-5" style={{ color: 'var(--gold)' }}>Urgency Surcharge Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                    {['Delivery Days', 'Surcharge %', 'Level'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--gold)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d, i) => {
                    const pct = getUrgencyPercent(d)
                    const color = pct >= 30 ? '#f87171' : pct >= 15 ? '#fbbf24' : '#4ade80'
                    const label = pct >= 30 ? 'Very High' : pct >= 20 ? 'High' : pct >= 10 ? 'Medium' : 'Low'
                    return (
                      <tr key={d} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                        <td className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{d} day{d > 1 ? 's' : ''}</td>
                        <td className="py-2 px-3 text-xs font-bold" style={{ color }}>{pct}%</td>
                        <td className="py-2 px-3 text-xs" style={{ color }}>{label}</td>
                      </tr>
                    )
                  })}
                  <tr style={{ background: 'rgba(74,222,128,0.05)' }}>
                    <td className="py-2 px-3 text-xs" style={{ color: '#86efac' }}>10+ days</td>
                    <td className="py-2 px-3 text-xs font-bold" style={{ color: '#86efac' }}>0%</td>
                    <td className="py-2 px-3 text-xs" style={{ color: '#86efac' }}>Standard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Records Base Pricing Table */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 border"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <h3 className="font-bold mb-1" style={{ color: 'var(--gold)' }}>Records — Base Pricing (₹/page)</h3>
            <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Year multiplier: 1st(1×) · 2nd(1.1×) · 3rd(1.2×) · 4th(1.3×)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                    {['Type', 'Inter', 'Degree', 'B.Tech', 'Medical'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--gold)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(RECORD_BASE).map(([type, base], i) => (
                    <tr key={type} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                      <td className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{type}</td>
                      {['Inter', 'Degree', 'B.Tech', 'Medical'].map(s => (
                        <td key={s} className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          ₹{Math.round(base * STREAM_MUL[s])}/pg
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Drawings Pricing Table */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 border"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <h3 className="font-bold mb-1" style={{ color: 'var(--gold)' }}>Drawings — Pricing (₹/drawing)</h3>
            <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Priced per drawing. Urgency surcharge applies on top.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                    {['Drawing Type', 'Inter', 'Degree', 'B.Tech', 'Medical'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--gold)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(DRAWING_TYPES).map(([, v], i) => (
                    <tr key={v.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                      <td className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{v.label}</td>
                      {['Inter', 'Degree', 'B.Tech', 'Medical'].map(s => (
                        <td key={s} className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>₹{v.streams[s]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  )
}
