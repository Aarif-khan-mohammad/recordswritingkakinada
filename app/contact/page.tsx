'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CheckCircle, AlertTriangle, Calculator } from 'lucide-react'
import Link from 'next/link'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
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

const WEB_SCOPES = ['Landing Page', 'Portfolio Website', 'Full-Stack Project', 'Academic Mini Project', 'E-commerce Site', 'Other (specify below)']

// Price calc
const BASE_RATES: Record<string, number> = { 'Theory / Assignments': 10, 'Lab Records': 15, 'Project Report': 25, 'Observation Book': 12 }
const STREAM_MUL: Record<string, number> = { 'Inter': 1.0, 'Degree': 1.2, 'B.Tech': 1.5, 'Medical': 1.8, 'Others': 1.1 }

function estimatePrice(pages: string, stream: string, subjectType: string) {
  const p = parseInt(pages)
  if (!p || !stream || !subjectType) return null
  const base = BASE_RATES[subjectType] || 10
  const mul = STREAM_MUL[stream] || 1
  return Math.round(base * mul * p)
}

function ContactForm() {
  const params = useSearchParams()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
    num_pages: '', project_scope: '', custom_scope: '',
    stream: '', subject_type: '', website_ref: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const s = params.get('service')
    const pages = params.get('pages')
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        const { data: ud } = await supabase
          .from('users').select('full_name, email, phone, study').eq('id', data.session.user.id).single()
        setLoggedIn(true)
        setForm(f => ({
          ...f,
          name: ud?.full_name || '',
          email: ud?.email || data.session!.user.email || '',
          phone: ud?.phone || '',
          stream: ud?.study || '',
          service: s || '',
          num_pages: pages || '',
        }))
      } else {
        setForm(f => ({ ...f, service: s || '', num_pages: pages || '' }))
      }
    })
  }, [params])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const priceEstimate = form.service === 'Records & Assignments'
    ? estimatePrice(form.num_pages, form.stream, form.subject_type)
    : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const scope = form.project_scope === 'Other (specify below)' ? form.custom_scope : form.project_scope
    const payload: Record<string, string> = {
      name: form.name, email: form.email, phone: form.phone,
      service: form.service, message: form.message,
    }
    if (form.service === 'Records & Assignments') {
      payload.num_pages = form.num_pages
      if (form.stream) payload.stream = form.stream
      if (form.subject_type) payload.subject_type = form.subject_type
    }
    if (form.service === 'Web Development') {
      payload.project_scope = scope
      if (form.website_ref) payload.website_ref = form.website_ref
    }
    const { error: err } = await supabase.from('contact_requests').insert([payload])
    setLoading(false)
    if (err) { setError(err.message); return }
    setSuccess(true)
  }

  if (success) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 flex flex-col items-center gap-4">
      <CheckCircle size={56} style={{ color: 'var(--gold)' }} />
      <h3 className="text-2xl font-bold">Request Submitted!</h3>
      <p style={{ color: 'rgba(255,255,255,0.6)' }}>We&apos;ll get back to you shortly.</p>
      <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', service: '', message: '', num_pages: '', project_scope: '', custom_scope: '', stream: '', subject_type: '', website_ref: '' }) }}
        className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold"
        style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
        Submit Another
      </button>
    </motion.div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {loggedIn && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)' }}>
          ✓ Logged in — your details have been auto-filled
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Full Name *</label>
          <input style={{ ...iStyle, opacity: loggedIn ? 0.7 : 1 }} required value={form.name}
            onChange={e => set('name', e.target.value)} placeholder="Your name" readOnly={loggedIn} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Email *</label>
          <input style={{ ...iStyle, opacity: loggedIn ? 0.7 : 1 }} required type="email" value={form.email}
            onChange={e => set('email', e.target.value)} placeholder="you@email.com" readOnly={loggedIn} />
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Phone</label>
        <input style={{ ...iStyle, opacity: loggedIn ? 0.7 : 1 }} value={form.phone}
          onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" readOnly={loggedIn} />
      </div>

      {/* Service */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Service *</label>
        <select style={{ ...iStyle, cursor: 'pointer' }} required value={form.service}
          onChange={e => set('service', e.target.value)}>
          <option value="" style={{ background: '#112240' }}>Select a service...</option>
          <option value="Records & Assignments" style={{ background: '#112240' }}>📝 Records & Assignments</option>
          <option value="Web Development" style={{ background: '#112240' }}>💻 Web Development</option>
          <option value="PPT & Drawings" style={{ background: '#112240' }}>📊 PPT & Drawings</option>
        </select>
      </div>

      {/* ── Records & Assignments ── */}
      <AnimatePresence>
        {form.service === 'Records & Assignments' && (
          <motion.div key="records" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-4 overflow-hidden">

            {/* Equipment Note */}
            <div className="flex gap-3 px-4 py-3 rounded-xl border"
              style={{ background: 'rgba(251,191,36,0.06)', borderColor: 'rgba(251,191,36,0.25)' }}>
              <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: '#fbbf24' }}>📦 Equipment Required</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Please provide all necessary writing materials — <strong style={{ color: 'rgba(255,255,255,0.85)' }}>books, pens, pencils, scales, erasers, sharpeners</strong> and any subject-specific materials. We do not supply stationery.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stream */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Stream</label>
                <select style={{ ...iStyle, cursor: 'pointer' }} value={form.stream} onChange={e => set('stream', e.target.value)}>
                  <option value="" style={{ background: '#112240' }}>Select stream...</option>
                  {['Inter', 'Degree', 'B.Tech', 'Medical', 'Others'].map(s => (
                    <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Subject Type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Record Type</label>
                <select style={{ ...iStyle, cursor: 'pointer' }} value={form.subject_type} onChange={e => set('subject_type', e.target.value)}>
                  <option value="" style={{ background: '#112240' }}>Select type...</option>
                  {Object.keys(BASE_RATES).map(t => (
                    <option key={t} value={t} style={{ background: '#112240' }}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pages */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Number of Pages *</label>
              <input style={iStyle} required type="number" min="1" value={form.num_pages}
                onChange={e => set('num_pages', e.target.value)} placeholder="e.g. 50" />
            </div>

            {/* Price Estimate */}
            {priceEstimate && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center justify-between px-4 py-3 rounded-xl border"
                style={{ background: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.3)' }}>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <Calculator size={16} style={{ color: 'var(--gold)' }} />
                  Estimated Price
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-extrabold" style={{ color: 'var(--gold)' }}>₹{priceEstimate}</span>
                  <Link href="/price-calculator" className="text-xs hover:underline" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Full calculator →
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Web Development ── */}
      <AnimatePresence>
        {form.service === 'Web Development' && (
          <motion.div key="webdev" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-4 overflow-hidden">

            {/* Project Scope */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Project Scope *</label>
              <select style={{ ...iStyle, cursor: 'pointer' }} required value={form.project_scope}
                onChange={e => set('project_scope', e.target.value)}>
                <option value="" style={{ background: '#112240' }}>Select scope...</option>
                {WEB_SCOPES.map(s => (
                  <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>
                ))}
              </select>
            </div>

            {/* Custom scope input */}
            {form.project_scope === 'Other (specify below)' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Describe Your Project *</label>
                <input style={iStyle} required value={form.custom_scope}
                  onChange={e => set('custom_scope', e.target.value)}
                  placeholder="e.g. Hospital management system, Blog platform..." />
              </motion.div>
            )}

            {/* Website Reference */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>
                Reference Website <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>(optional)</span>
              </label>
              <input style={iStyle} type="url" value={form.website_ref}
                onChange={e => set('website_ref', e.target.value)}
                placeholder="https://example.com — site you like or want similar to" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Message</label>
        <textarea style={{ ...iStyle, resize: 'vertical', minHeight: '90px' }}
          value={form.message} onChange={e => set('message', e.target.value)}
          placeholder="Any additional details, subject names, deadline, etc." />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button type="submit" disabled={loading}
        className="py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 disabled:opacity-60"
        style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  )
}

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">
      <section className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
          Get In Touch
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-4xl md:text-5xl font-extrabold">
          Request a <span style={{ color: 'var(--gold)' }}>Service</span>
        </motion.h1>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-4">
          <Link href="/price-calculator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
            <Calculator size={13} /> Estimate your price first
          </Link>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="max-w-xl mx-auto rounded-2xl p-8 border"
          style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
          <Suspense fallback={<div className="text-center py-8" style={{ color: 'rgba(255,255,255,0.5)' }}>Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </motion.div>
      </section>
    </div>
  )
}
