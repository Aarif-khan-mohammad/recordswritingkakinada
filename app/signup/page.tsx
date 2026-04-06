'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Eye, EyeOff } from 'lucide-react'

const iStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(201,168,76,0.2)',
  color: '#fff',
  borderRadius: '0.75rem',
  padding: '0.65rem 1rem',
  width: '100%',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const DEGREE_STREAMS = ['BSc', 'BCom', 'BA', 'BBA', 'BCA', 'Other']
const BTECH_STREAMS = ['CSE', 'ECE', 'Mechanical', 'Civil', 'EEE', 'IT', 'Chemical', 'Other']

const slide = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  show: { opacity: 1, height: 'auto', marginTop: 16 },
  exit: { opacity: 0, height: 0, marginTop: 0 },
}

type Form = {
  name: string; email: string; phone: string
  password: string; confirm: string
  userType: string
  organization: string
  college: string; year: string; study: string; stream: string
}

const init: Form = {
  name: '', email: '', phone: '', password: '', confirm: '',
  userType: '', organization: '', college: '', year: '', study: '', stream: '',
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--gold)' }}>{children}</label>
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <input {...props} style={iStyle}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')} />
    </div>
  )
}

function Select({ label, children, ...props }: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <select {...props} style={{ ...iStyle, cursor: 'pointer' }}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')}>
        {children}
      </select>
    </div>
  )
}

export default function SignupPage() {
  const [form, setForm] = useState<Form>(init)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const set = (k: keyof Form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const streamOptions = form.study === 'Degree' ? DEGREE_STREAMS
    : form.study === 'B.Tech' ? BTECH_STREAMS : []

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)

    // Check duplicate email
    const { data: existingEmail } = await supabase
      .from('users').select('id').eq('email', form.email).maybeSingle()
    if (existingEmail) { setError('An account with this email already exists.'); setLoading(false); return }

    // Check duplicate phone
    if (form.phone) {
      const { data: existingPhone } = await supabase
        .from('users').select('id').eq('phone', form.phone).maybeSingle()
      if (existingPhone) { setError('An account with this phone number already exists.'); setLoading(false); return }
    }

    const { data, error: signupErr } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.name } },
    })

    if (signupErr) { setError(signupErr.message); setLoading(false); return }

    if (data.user) {
      await supabase.from('users').insert([{
        id: data.user.id,
        full_name: form.name,
        email: form.email,
        phone: form.phone || null,
        role: 'user',
        user_type: form.userType,
        organization: form.userType === 'Professional' ? form.organization : null,
        college: form.userType === 'Student' ? form.college : null,
        year: form.userType === 'Student' ? form.year : null,
        study: form.userType === 'Student' ? form.study : null,
        stream: form.userType === 'Student' && streamOptions.length ? form.stream : null,
      }])
    }

    setLoading(false)
    setSuccess(true)
  }

  if (success) return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180 }}
        className="w-full max-w-sm rounded-2xl p-10 border text-center flex flex-col items-center gap-4"
        style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.3)' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
          <CheckCircle size={60} style={{ color: 'var(--gold)' }} />
        </motion.div>
        <h2 className="text-2xl font-extrabold">Account Created!</h2>
        <p className="text-base font-semibold" style={{ color: 'var(--gold)' }}>{form.name}</p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Check your email to confirm your account, then sign in.
        </p>
        <Link href="/login"
          className="mt-2 w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:scale-105"
          style={{ background: 'linear-gradient(90deg, var(--gold), #e8c96d)', color: 'var(--navy)' }}>
          Go to Login
        </Link>
      </motion.div>
    </div>
  )

  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-2xl p-8 border"
        style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>

        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Logo" width={52} height={52} className="rounded-xl mb-3" />
          <h1 className="text-2xl font-extrabold">Create Account</h1>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Records Writing Kakinada</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name *" required value={form.name}
              onChange={e => set('name', e.target.value)} placeholder="Your full name" />
            <Input label="Phone / WhatsApp" value={form.phone}
              onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
          </div>

          <Input label="Email *" type="email" required value={form.email}
            onChange={e => set('email', e.target.value)} placeholder="you@email.com" />

          {/* Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Password *</Label>
              <div className="relative">
                <input required type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => set('password', e.target.value)} placeholder="Min. 6 characters"
                  style={{ ...iStyle, paddingRight: '2.5rem' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')} />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <Input label="Confirm Password *" type="password" required value={form.confirm}
              onChange={e => set('confirm', e.target.value)} placeholder="Re-enter password" />
          </div>

          {/* User Type */}
          <div>
            <Label>I am a *</Label>
            <div className="grid grid-cols-2 gap-3">
              {['Student', 'Professional'].map(t => (
                <button key={t} type="button" onClick={() => set('userType', t)}
                  className="py-3 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.02]"
                  style={form.userType === t
                    ? { background: 'var(--gold)', color: 'var(--navy)', borderColor: 'var(--gold)' }
                    : { background: 'transparent', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  {t === 'Student' ? '🎓 Student' : '💼 Professional'}
                </button>
              ))}
            </div>
          </div>

          {/* Professional fields */}
          <AnimatePresence>
            {form.userType === 'Professional' && (
              <motion.div key="pro" variants={slide} initial="hidden" animate="show" exit="exit">
                <Input label="Organization Name *" required value={form.organization}
                  onChange={e => set('organization', e.target.value)} placeholder="Company / Organization" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Student fields */}
          <AnimatePresence>
            {form.userType === 'Student' && (
              <motion.div key="stu" variants={slide} initial="hidden" animate="show" exit="exit"
                className="flex flex-col gap-4">
                <Input label="College Name *" required value={form.college}
                  onChange={e => set('college', e.target.value)} placeholder="Your college name" />

                <div className="grid grid-cols-2 gap-4">
                  <Select label="Year *" required value={form.year}
                    onChange={e => set('year', e.target.value)}>
                    <option value="" style={{ background: '#112240' }}>Select year</option>
                    {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => (
                      <option key={y} value={y} style={{ background: '#112240' }}>{y}</option>
                    ))}
                  </Select>

                  <Select label="Study *" required value={form.study}
                    onChange={e => { set('study', e.target.value); set('stream', '') }}>
                    <option value="" style={{ background: '#112240' }}>Select study</option>
                    {['Inter', 'Degree', 'B.Tech', 'Medical', 'Others'].map(s => (
                      <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>
                    ))}
                  </Select>
                </div>

                {/* Stream — only for Degree / B.Tech */}
                <AnimatePresence>
                  {streamOptions.length > 0 && (
                    <motion.div key="stream" variants={slide} initial="hidden" animate="show" exit="exit">
                      <Select label={`Stream (${form.study}) *`} required value={form.stream}
                        onChange={e => set('stream', e.target.value)}>
                        <option value="" style={{ background: '#112240' }}>Select stream</option>
                        {streamOptions.map(s => (
                          <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>
                        ))}
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,80,80,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,80,80,0.2)' }}>
              {error}
            </motion.p>
          )}

          <button type="submit" disabled={loading || !form.userType}
            className="w-full py-3 rounded-xl font-bold text-sm mt-1 transition-all hover:scale-[1.02] hover:brightness-110 disabled:opacity-50"
            style={{ background: 'linear-gradient(90deg, var(--gold), #e8c96d)', color: 'var(--navy)' }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: 'var(--gold)' }}>
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
