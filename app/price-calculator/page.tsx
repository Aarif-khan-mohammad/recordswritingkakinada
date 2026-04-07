'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight } from 'lucide-react'

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

// Per-page base rates
const BASE_RATES: Record<string, number> = {
  'Theory / Assignments': 10,
  'Lab Records': 15,
  'Project Report': 25,
  'Observation Book': 12,
}

// Stream multipliers
const STREAM_MULTIPLIERS: Record<string, number> = {
  'Inter': 1.0,
  'Degree': 1.2,
  'B.Tech': 1.5,
  'Medical': 1.8,
  'Others': 1.1,
}

// Year multipliers
const YEAR_MULTIPLIERS: Record<string, number> = {
  '1st Year': 1.0,
  '2nd Year': 1.1,
  '3rd Year': 1.2,
  '4th Year': 1.3,
}

export default function PriceCalculatorPage() {
  const [stream, setStream] = useState('')
  const [year, setYear] = useState('')
  const [subjectType, setSubjectType] = useState('')
  const [pages, setPages] = useState('')
  const [urgent, setUrgent] = useState(false)

  const calculate = () => {
    if (!stream || !year || !subjectType || !pages) return null
    const base = BASE_RATES[subjectType] || 10
    const streamMul = STREAM_MULTIPLIERS[stream] || 1
    const yearMul = YEAR_MULTIPLIERS[year] || 1
    const pageCount = parseInt(pages)
    if (isNaN(pageCount) || pageCount <= 0) return null
    let total = base * streamMul * yearMul * pageCount
    if (urgent) total *= 1.2
    return {
      perPage: Math.round(base * streamMul * yearMul),
      total: Math.round(total),
      urgencyFee: urgent ? Math.round(total - total / 1.2) : 0,
    }
  }

  const result = calculate()

  const queryParams = new URLSearchParams({
    service: 'Records & Assignments',
    ...(pages ? { pages } : {}),
  }).toString()

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
          Get an instant estimate for your records writing order.
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
              <h2 className="font-bold text-lg">Records Writing Estimator</h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Stream */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Stream / Course *</label>
                <select style={{ ...iStyle, cursor: 'pointer' }} value={stream} onChange={e => setStream(e.target.value)}>
                  <option value="" style={{ background: '#112240' }}>Select stream...</option>
                  {Object.keys(STREAM_MULTIPLIERS).map(s => (
                    <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Year of Study *</label>
                <select style={{ ...iStyle, cursor: 'pointer' }} value={year} onChange={e => setYear(e.target.value)}>
                  <option value="" style={{ background: '#112240' }}>Select year...</option>
                  {Object.keys(YEAR_MULTIPLIERS).map(y => (
                    <option key={y} value={y} style={{ background: '#112240' }}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Subject Type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Subject / Record Type *</label>
                <select style={{ ...iStyle, cursor: 'pointer' }} value={subjectType} onChange={e => setSubjectType(e.target.value)}>
                  <option value="" style={{ background: '#112240' }}>Select type...</option>
                  {Object.entries(BASE_RATES).map(([k, v]) => (
                    <option key={k} value={k} style={{ background: '#112240' }}>{k} (₹{v}/page base)</option>
                  ))}
                </select>
              </div>

              {/* Pages */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Number of Pages *</label>
                <input style={iStyle} type="number" min="1" value={pages}
                  onChange={e => setPages(e.target.value)} placeholder="e.g. 50" />
              </div>

              {/* Urgent */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={urgent} onChange={e => setUrgent(e.target.checked)} />
                  <div className="w-10 h-5 rounded-full transition-colors"
                    style={{ background: urgent ? 'var(--gold)' : 'rgba(255,255,255,0.1)' }}>
                    <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform"
                      style={{ transform: urgent ? 'translateX(22px)' : 'translateX(2px)' }} />
                  </div>
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Urgent delivery <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>(+20% fee)</span>
                </span>
              </label>
            </div>

            {/* Result */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl p-5 border"
                style={{ background: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.3)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Estimated Price</span>
                  <span className="text-3xl font-extrabold" style={{ color: 'var(--gold)' }}>₹{result.total}</span>
                </div>
                <div className="flex flex-col gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <div className="flex justify-between">
                    <span>Rate per page</span><span style={{ color: 'var(--gold)' }}>₹{result.perPage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pages</span><span style={{ color: 'var(--gold)' }}>{pages}</span>
                  </div>
                  {urgent && (
                    <div className="flex justify-between">
                      <span>Urgency fee</span><span style={{ color: '#f87171' }}>+₹{result.urgencyFee}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  * Final price may vary slightly based on subject complexity. This is an estimate.
                </p>
              </motion.div>
            )}

            {result && (
              <Link href={`/contact?service=Records+%26+Assignments&pages=${pages}`}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                Request This Service <ArrowRight size={16} />
              </Link>
            )}
          </motion.div>

          {/* Pricing Table */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 border"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <h3 className="font-bold mb-5" style={{ color: 'var(--gold)' }}>Pricing Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                    {['Type', 'Inter', 'Degree', 'B.Tech', 'Medical'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-semibold"
                        style={{ color: 'var(--gold)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(BASE_RATES).map(([type, base], i) => (
                    <tr key={type} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                      <td className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{type}</td>
                      {['Inter', 'Degree', 'B.Tech', 'Medical'].map(s => (
                        <td key={s} className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          ₹{Math.round(base * STREAM_MULTIPLIERS[s])}/pg
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Year multiplier: 1st(1×) · 2nd(1.1×) · 3rd(1.2×) · 4th(1.3×) · Urgent +20%
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
