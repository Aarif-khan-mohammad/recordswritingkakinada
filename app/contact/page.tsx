'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CheckCircle } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const } }),
}

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(201,168,76,0.25)',
  color: '#fff',
  borderRadius: '0.5rem',
  padding: '0.65rem 1rem',
  width: '100%',
  fontSize: '0.875rem',
  outline: 'none',
}

function ContactForm() {
  const params = useSearchParams()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
    num_pages: '', project_scope: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const s = params.get('service')
    // Auto-fill from logged in user
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        const { data: userData } = await supabase
          .from('users').select('full_name, email, phone').eq('id', data.session.user.id).single()
        setLoggedIn(true)
        setForm(f => ({
          ...f,
          name: userData?.full_name || '',
          email: userData?.email || data.session!.user.email || '',
          phone: userData?.phone || '',
          service: s || '',
        }))
      } else {
        if (s) setForm(f => ({ ...f, service: s }))
      }
    })
  }, [params])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const payload: Record<string, string> = {
      name: form.name, email: form.email, phone: form.phone,
      service: form.service, message: form.message,
    }
    if (form.service === 'Records & Assignments') payload.num_pages = form.num_pages
    if (form.service === 'Web Development') payload.project_scope = form.project_scope

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
      <p style={{ color: 'rgba(255,255,255,0.6)' }}>We'll get back to you shortly.</p>
      <button onClick={() => { setSuccess(false); setForm({ name:'',email:'',phone:'',service:'',message:'',num_pages:'',project_scope:'' }) }}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Full Name *</label>
          <input style={{ ...inputStyle, opacity: loggedIn ? 0.7 : 1 }} required value={form.name}
            onChange={e => set('name', e.target.value)} placeholder="Your name"
            readOnly={loggedIn} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Email *</label>
          <input style={{ ...inputStyle, opacity: loggedIn ? 0.7 : 1 }} required type="email" value={form.email}
            onChange={e => set('email', e.target.value)} placeholder="you@email.com"
            readOnly={loggedIn} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Phone</label>
        <input style={{ ...inputStyle, opacity: loggedIn ? 0.7 : 1 }} value={form.phone}
          onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX"
          readOnly={loggedIn} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Service *</label>
        <select style={{ ...inputStyle, cursor: 'pointer' }} required value={form.service}
          onChange={e => set('service', e.target.value)}>
          <option value="" style={{ background: '#112240' }}>Select a service...</option>
          <option value="Records & Assignments" style={{ background: '#112240' }}>📝 Records & Assignments</option>
          <option value="Web Development" style={{ background: '#112240' }}>💻 Web Development</option>
          <option value="PPT & Drawings" style={{ background: '#112240' }}>📊 PPT & Drawings</option>
        </select>
      </div>

      {/* Conditional: Records */}
      {form.service === 'Records & Assignments' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-col gap-1">
          <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Number of Pages *</label>
          <input style={inputStyle} required type="number" min="1" value={form.num_pages}
            onChange={e => set('num_pages', e.target.value)} placeholder="e.g. 50" />
        </motion.div>
      )}

      {/* Conditional: Web Dev */}
      {form.service === 'Web Development' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-col gap-1">
          <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Project Scope *</label>
          <select style={{ ...inputStyle, cursor: 'pointer' }} required value={form.project_scope}
            onChange={e => set('project_scope', e.target.value)}>
            <option value="" style={{ background: '#112240' }}>Select scope...</option>
            <option value="Landing Page" style={{ background: '#112240' }}>Landing Page</option>
            <option value="Portfolio Website" style={{ background: '#112240' }}>Portfolio Website</option>
            <option value="Full-Stack Project" style={{ background: '#112240' }}>Full-Stack Project</option>
            <option value="Academic Mini Project" style={{ background: '#112240' }}>Academic Mini Project</option>
          </select>
        </motion.div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Message</label>
        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          value={form.message} onChange={e => set('message', e.target.value)}
          placeholder="Any additional details..." />
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
