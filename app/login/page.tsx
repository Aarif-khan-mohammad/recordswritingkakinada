'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [userName, setUserName] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false); return }
    const name = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User'
    const { data: userData } = await supabase
      .from('users').select('role, full_name').eq('id', data.user.id).single()
    setLoading(false)
    setUserName(userData?.full_name || name)
    setSuccess(true)
    setTimeout(() => router.push(userData?.role === 'admin' ? '/admin-records' : '/'), 2000)
  }

  const field = (
    icon: React.ReactNode, type: string, val: string,
    onChange: (v: string) => void, placeholder: string,
    extra?: React.ReactNode
  ) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(201,168,76,0.6)' }}>
        {icon}
      </span>
      <input
        type={type} required value={val} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm transition-all focus:outline-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
          color: '#fff',
        }}
        onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'}
        onBlur={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
      />
      {extra && (
        <button type="button" onClick={() => setShowPass(p => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: 'rgba(255,255,255,0.3)' }}>
          {extra}
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--navy)' }}>
      {/* Success overlay */}
      {success && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(10,22,40,0.92)' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="rounded-2xl p-10 border text-center flex flex-col items-center gap-4 max-w-sm w-full"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.3)' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <CheckCircle size={60} style={{ color: 'var(--gold)' }} />
            </motion.div>
            <h2 className="text-2xl font-extrabold">Welcome back!</h2>
            <p className="text-base font-semibold" style={{ color: 'var(--gold)' }}>{userName}</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Signed in successfully. Redirecting...</p>
            <div className="w-full h-1 rounded-full overflow-hidden mt-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div className="h-full rounded-full" style={{ background: 'var(--gold)' }}
                initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'linear' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--navy-light) 0%, #0d1f3c 100%)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--gold) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }} className="relative z-10 text-center px-12">
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-2xl mx-auto mb-6 shadow-2xl" />
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: 'var(--gold)' }}>
            Records Writing Kakinada
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Professional academic & technical services. Trusted by students across Kakinada.
          </p>
          <div className="mt-10 flex flex-col gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {['Privacy Guaranteed', 'On-Time Delivery', 'Quality Assured'].map(t => (
              <div key={t} className="flex items-center gap-2 justify-center">
                <span style={{ color: 'var(--gold)' }}>✓</span> {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="w-full max-w-sm">

          <div className="flex flex-col items-center mb-8 lg:hidden">
            <Image src="/logo.png" alt="Logo" width={52} height={52} className="rounded-xl mb-3" />
          </div>

          <h1 className="text-2xl font-extrabold mb-1">Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Sign in to your account
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {field(<Mail size={16} />, 'email', email, setEmail, 'Email address')}
            {field(
              <Lock size={16} />,
              showPass ? 'text' : 'password',
              password, setPassword, 'Password',
              showPass ? <EyeOff size={15} /> : <Eye size={15} />
            )}

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,80,80,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,80,80,0.2)' }}>
                {error}
              </motion.p>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm mt-1 transition-all hover:scale-[1.02] hover:brightness-110 disabled:opacity-50"
              style={{ background: 'linear-gradient(90deg, var(--gold), #e8c96d)', color: 'var(--navy)' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t flex flex-col gap-3 text-center"
            style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold hover:underline" style={{ color: 'var(--gold)' }}>
                Sign Up
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <a href="mailto:recordswritingkakinada@gmail.com" className="hover:text-yellow-400 transition-colors">
                recordswritingkakinada@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
