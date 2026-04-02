'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, RefreshCw } from 'lucide-react'

type Request = {
  id: number
  created_at: string
  name: string
  email: string
  phone: string
  service: string
  num_pages: string | null
  project_scope: string | null
  message: string
}

export default function AdminPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.replace('/login'); return }
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', data.session.user.id)
        .single()
      if (roleData?.role !== 'admin') { router.replace('/'); return }
      setAuthed(true)
      fetchRequests()
    })
  }, [router])

  async function fetchRequests() {
    setLoading(true)
    const { data } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setRequests(data || [])
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (!authed) return null

  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">
      {/* Header */}
      <div className="sticky top-16 z-40 px-4 py-4 flex items-center justify-between border-b"
        style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--gold)' }}>Admin Dashboard</h1>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Service Requests</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchRequests}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:scale-105"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
            style={{ background: 'rgba(255,80,80,0.15)', color: '#ff6b6b' }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {loading ? (
          <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.4)' }}>No requests yet.</div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="overflow-x-auto rounded-2xl border"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--navy-light)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                  {['#', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Details', 'Message'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold whitespace-nowrap"
                      style={{ color: 'var(--gold)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.map((r, i) => (
                  <tr key={r.id}
                    style={{
                      background: i % 2 === 0 ? 'rgba(17,34,64,0.6)' : 'rgba(10,22,40,0.6)',
                      borderBottom: '1px solid rgba(201,168,76,0.08)',
                    }}>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{r.id}</td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {new Date(r.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{r.name}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{r.email}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{r.phone || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                        {r.service}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {r.num_pages ? `${r.num_pages} pages` : r.project_scope || '—'}
                    </td>
                    <td className="px-4 py-3 text-xs max-w-xs truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {r.message || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        <p className="mt-4 text-xs text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {requests.length} total request{requests.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
