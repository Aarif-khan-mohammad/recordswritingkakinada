'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { FileText, BarChart2, PenTool, MapPin, Globe, Calculator, Palette, ExternalLink } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.55, ease: 'easeOut' as const } }),
}

const iStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(201,168,76,0.25)',
  color: '#fff',
  borderRadius: '0.5rem',
  padding: '0.55rem 0.75rem',
  width: '100%',
  fontSize: '0.8rem',
  outline: 'none',
}

const RECORD_BASE: Record<string, number> = {
  'Theory / Assignments': 10,
  'Lab Records': 15,
  'Project Report': 25,
  'Observation Book': 12,
}

const STREAM_MUL: Record<string, number> = {
  'Inter': 1.0, 'Degree': 1.2, 'B.Tech': 1.5,
  'M.Tech': 1.7, 'Masters': 1.6, 'Medical': 1.8, 'Others': 1.1,
}

const DRAWING_TYPES: Record<string, Record<string, number>> = {
  'Engineering Drawing':       { 'Inter': 35, 'Degree': 45, 'B.Tech': 60, 'M.Tech': 70, 'Masters': 65, 'Medical': 50, 'Others': 40 },
  'Medical Diagram':           { 'Inter': 40, 'Degree': 50, 'B.Tech': 55, 'M.Tech': 65, 'Masters': 60, 'Medical': 70, 'Others': 45 },
  'Context-Free / General Sketch': { 'Inter': 25, 'Degree': 30, 'B.Tech': 35, 'M.Tech': 40, 'Masters': 38, 'Medical': 35, 'Others': 25 },
  'Circuit / Network Diagram': { 'Inter': 30, 'Degree': 40, 'B.Tech': 50, 'M.Tech': 60, 'Masters': 55, 'Medical': 40, 'Others': 35 },
  'Biology / Anatomy Drawing': { 'Inter': 35, 'Degree': 45, 'B.Tech': 45, 'M.Tech': 55, 'Masters': 50, 'Medical': 65, 'Others': 35 },
  'Flowchart / Block Diagram': { 'Inter': 25, 'Degree': 35, 'B.Tech': 40, 'M.Tech': 50, 'Masters': 45, 'Medical': 35, 'Others': 30 },
}

const streams = Object.keys(STREAM_MUL)

function RecordsCalculator() {
  const [stream, setStream] = useState('')
  const [type, setType] = useState('')
  const [pages, setPages] = useState('')

  const price = (() => {
    const p = parseInt(pages)
    if (!p || !stream || !type) return null
    return Math.round((RECORD_BASE[type] || 10) * (STREAM_MUL[stream] || 1) * p)
  })()

  const contactHref = `/contact?service=${encodeURIComponent('Records & Assignments')}${pages ? `&pages=${pages}` : ''}`

  return (
    <div className="flex flex-col gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--gold)' }}>
        <Calculator size={13} /> Estimate Price
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select style={{ ...iStyle, cursor: 'pointer' }} value={stream} onChange={e => setStream(e.target.value)}>
          <option value="" style={{ background: '#112240' }}>Stream...</option>
          {streams.map(s => <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>)}
        </select>
        <select style={{ ...iStyle, cursor: 'pointer' }} value={type} onChange={e => setType(e.target.value)}>
          <option value="" style={{ background: '#112240' }}>Record type...</option>
          {Object.keys(RECORD_BASE).map(t => <option key={t} value={t} style={{ background: '#112240' }}>{t}</option>)}
        </select>
      </div>

      <input
        style={iStyle} type="number" min="1" value={pages}
        onChange={e => setPages(e.target.value)} placeholder="Number of pages (e.g. 50)"
      />

      <AnimatePresence>
        {price && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl border"
            style={{ background: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.3)' }}>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Estimated Total</span>
            <span className="text-lg font-extrabold" style={{ color: 'var(--gold)' }}>₹{price}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href={contactHref}
        className="w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
        style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
        Submit Request
      </Link>
    </div>
  )
}

function DrawingsCalculator() {
  const [stream, setStream] = useState('')
  const [drawType, setDrawType] = useState('')
  const [count, setCount] = useState('')

  const result = (() => {
    const n = parseInt(count)
    if (!n || !stream || !drawType) return null
    const rate = DRAWING_TYPES[drawType]?.[stream]
    if (!rate) return null
    return { rate, total: rate * n }
  })()

  return (
    <div className="flex flex-col gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--gold)' }}>
        <Calculator size={13} /> Estimate Price
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select style={{ ...iStyle, cursor: 'pointer' }} value={stream} onChange={e => { setStream(e.target.value); setDrawType('') }}>
          <option value="" style={{ background: '#112240' }}>Stream...</option>
          {streams.map(s => <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>)}
        </select>
        <select style={{ ...iStyle, cursor: 'pointer' }} value={drawType} onChange={e => setDrawType(e.target.value)}>
          <option value="" style={{ background: '#112240' }}>Drawing type...</option>
          {Object.entries(DRAWING_TYPES).map(([k, rates]) => {
            const rate = stream ? rates[stream] : null
            return (
              <option key={k} value={k} style={{ background: '#112240' }}>
                {k}{rate ? ` — ₹${rate}` : ''}
              </option>
            )
          })}
        </select>
      </div>

      <input
        style={iStyle} type="number" min="1" value={count}
        onChange={e => setCount(e.target.value)} placeholder="Number of drawings (e.g. 10)"
      />

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-1 px-3 py-2.5 rounded-xl border"
            style={{ background: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.3)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                ₹{result.rate}/drawing × {count}
              </span>
              <span className="text-lg font-extrabold" style={{ color: 'var(--gold)' }}>₹{result.total}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href={`/contact?service=${encodeURIComponent('PPT & Drawings')}`}
        className="w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
        style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
        Submit Request
      </Link>
    </div>
  )
}

const coverageCities = [
  {
    flag: '🏙️', city: 'Kakinada', state: 'Andhra Pradesh',
    desc: 'Our home base. All services available here.',
    services: ['Records & Assignments', 'Drawings', 'PPT Presentations', 'Website Designing'],
  },
  {
    flag: '🌆', city: 'Hyderabad', state: 'Telangana',
    desc: 'Serving students across Hyderabad.',
    services: ['Records & Assignments', 'Drawings', 'PPT Presentations', 'Website Designing'],
  },
  {
    flag: '🏢', city: 'Bangalore', state: 'Karnataka',
    desc: 'Serving students across Bangalore.',
    services: ['Records & Assignments', 'Drawings', 'PPT Presentations', 'Website Designing'],
  },
  {
    flag: '🌐', city: 'Pan India & Worldwide', state: 'Online',
    desc: 'PPT, website designing and logo designing available everywhere.',
    services: ['PPT Presentations', 'Website Designing', 'Logo Designing'],
  },
]

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">

      {/* Hero */}
      <section className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
          What We Offer
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-4xl md:text-5xl font-extrabold">
          Our <span style={{ color: 'var(--gold)' }}>Services</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-5 text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Records, Assignments & Drawings available in <span style={{ color: 'var(--gold)' }}>Kakinada, Hyderabad & Bangalore</span>.
          Website Designing, Logo Designing & PPT available{' '}
          <span style={{ color: 'var(--gold)' }}>worldwide — USA, UK, Australia, Canada & beyond</span>.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="mt-8 flex flex-wrap gap-3 justify-center">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold)' }}>
            <MapPin size={12} /> Records & Drawings: Kakinada · Hyderabad · Bangalore
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold)' }}>
            <Globe size={12} /> Web, Design & PPT: USA · UK · Australia · Canada · Worldwide
          </span>
        </motion.div>
      </section>

      {/* Service Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

          {/* ── Records & Assignments ── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="rounded-2xl p-6 border flex flex-col"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                <FileText size={36} />
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(96,165,250,0.1)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.2)' }}>
                <MapPin size={12} /> In-Person
              </span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Academic</span>
            <h3 className="text-xl font-bold mb-3">Records & Assignments</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Professionally handwritten or typed lab records, assignments, observation books, and project reports — tailored to your university syllabus.
            </p>
            <ul className="mb-2 flex flex-col gap-1.5">
              {['Lab Records (All Subjects)', 'Assignments & Observation Books', 'Project Reports', 'Seminar & Mini Project Records'].map(f => (
                <li key={f} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: 'rgba(201,168,76,0.7)' }}>
              <MapPin size={11} /><span>Kakinada · Hyderabad · Bangalore</span>
            </div>
            <RecordsCalculator />
          </motion.div>

          {/* ── Drawings ── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            className="rounded-2xl p-6 border flex flex-col"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                <PenTool size={36} />
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(96,165,250,0.1)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.2)' }}>
                <MapPin size={12} /> In-Person
              </span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Technical Drawing</span>
            <h3 className="text-xl font-bold mb-3">Drawings</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Precise hand-drawn and technical drawings for engineering, medical, biology, circuits and more — priced per drawing based on your stream.
            </p>
            <ul className="mb-2 flex flex-col gap-1.5">
              {['Engineering Drawings (B.Tech)', 'Medical & Biology Diagrams', 'Circuit & Network Diagrams', 'Flowcharts & Block Diagrams'].map(f => (
                <li key={f} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: 'rgba(201,168,76,0.7)' }}>
              <MapPin size={11} /><span>Kakinada · Hyderabad · Bangalore</span>
            </div>
            <DrawingsCalculator />
          </motion.div>

          {/* ── PPT Presentations ── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
            className="rounded-2xl p-8 border flex flex-col hover:-translate-y-2 transition-transform"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                <BarChart2 size={36} />
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                <Globe size={12} /> Worldwide
              </span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Design</span>
            <h3 className="text-xl font-bold mb-3">PPT Presentations</h3>
            <p className="text-sm mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Visually compelling PowerPoint presentations crafted to impress evaluators and communicate your ideas clearly — available anywhere in the world.
            </p>
            <ul className="mb-5 flex flex-col gap-1.5">
              {['Seminar & Project PPTs', 'Diagrams, Charts & Flowcharts', 'Professional Slide Design', 'Academic & Business Decks'].map(f => (
                <li key={f} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1.5 mb-6 text-xs" style={{ color: 'rgba(201,168,76,0.7)' }}>
              <Globe size={11} /><span>Pan India & Worldwide</span>
            </div>
            <Link href={`/contact?service=${encodeURIComponent('PPT & Drawings')}`}
              className="w-full text-center py-3 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              Request This Service
            </Link>
          </motion.div>

          {/* ── Website Designing ── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={3}
            className="rounded-2xl p-8 border flex flex-col hover:-translate-y-2 transition-transform"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                <ExternalLink size={36} />
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                <Globe size={12} /> Worldwide
              </span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Design</span>
            <h3 className="text-xl font-bold mb-1">Website Designing</h3>
            <p className="text-xs mb-3 font-semibold" style={{ color: 'var(--gold)' }}>62+ Websites & Web Apps Delivered</p>
            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
              {[
                { n: '22+', l: 'Static Websites' },
                { n: '18+', l: 'Dynamic Web Apps' },
                { n: '12+', l: 'Analytics Dashboards' },
                { n: '10+', l: 'Portfolio Sites' },
              ].map(s => (
                <div key={s.l} className="rounded-xl p-2.5 border text-center"
                  style={{ background: 'rgba(201,168,76,0.06)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  <div className="font-extrabold text-base" style={{ color: 'var(--gold)' }}>{s.n}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p className="text-sm mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Professional website designing — landing pages, brochure sites, CMS portals, admin dashboards and more. View our full portfolio.
            </p>
            <div className="flex items-center gap-1.5 mb-4 text-xs" style={{ color: 'rgba(201,168,76,0.7)' }}>
              <Globe size={11} /><span>Pan India & Worldwide</span>
            </div>
            <a href="https://lowkeywebdev.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
              View Portfolio <ExternalLink size={14} />
            </a>
          </motion.div>

          {/* ── Logo Designing ── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={4}
            className="rounded-2xl p-8 border flex flex-col hover:-translate-y-2 transition-transform"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                <Palette size={36} />
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                <Globe size={12} /> Worldwide
              </span>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Branding</span>
            <h3 className="text-xl font-bold mb-3">Logo Designing</h3>
            <p className="text-sm mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Professional logo design and brand identity for businesses, startups, and individuals — delivered digitally anywhere in India and worldwide.
            </p>
            <ul className="mb-5 flex flex-col gap-1.5">
              {['Business & Startup Logos', 'Personal Brand Identity', 'Social Media Branding Kit', 'Multiple Format Delivery (PNG, SVG, PDF)'].map(f => (
                <li key={f} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1.5 mb-6 text-xs" style={{ color: 'rgba(201,168,76,0.7)' }}>
              <Globe size={11} /><span>Pan India & Worldwide</span>
            </div>
            <Link href={`/contact?service=${encodeURIComponent('Logo Designing')}`}
              className="w-full text-center py-3 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              Request This Service
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 px-4" style={{ background: 'var(--navy-light)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
              Where We Serve
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Service Coverage</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageCities.map((c, i) => (
              <motion.div key={c.city} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} custom={i}
                className="rounded-2xl p-6 border hover:-translate-y-1 transition-transform"
                style={{ background: 'var(--navy)', borderColor: 'rgba(201,168,76,0.2)' }}>
                <div className="text-3xl mb-3">{c.flag}</div>
                <h3 className="font-bold text-base mb-0.5">{c.city}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--gold)' }}>{c.state}</p>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.desc}</p>
                <div className="flex flex-col gap-1.5">
                  {c.services.map(sv => (
                    <span key={sv} className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span> {sv}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ background: 'var(--navy)' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-3">Not sure which service you need?</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Contact us and we&apos;ll guide you to the right solution.
          </p>
          <Link href="/contact"
            className="px-10 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 inline-block"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
