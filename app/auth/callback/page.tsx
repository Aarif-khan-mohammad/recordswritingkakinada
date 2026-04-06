'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        const { data: userData } = await supabase
          .from('users').select('role').eq('id', data.session.user.id).single()
        router.replace(userData?.role === 'admin' ? '/admin-records' : '/')
      } else {
        router.replace('/login?error=link_expired')
      }
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--navy)' }}>
      <div className="text-center">
        <div className="w-10 h-10 border-2 rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Verifying your account...</p>
      </div>
    </div>
  )
}
