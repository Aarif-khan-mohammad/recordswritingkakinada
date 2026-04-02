'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError(err.message); return }
    router.push('/admin-records')
  }

  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-2xl p-8 border"
        style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.25)' }}>
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Logo" width={56} height={56} className="rounded-xl mb-3" />
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Records Writing Kakinada</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Email</label>
            <input style={inputStyle} type="email" required value={email}
              onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Password</label>
            <input style={inputStyle} type="password" required value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="py-3 rounded-lg font-semibold text-sm mt-2 transition-all hover:scale-105 disabled:opacity-60"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
