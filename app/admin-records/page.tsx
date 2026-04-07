'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, RefreshCw, BarChart2, Inbox, Monitor, Smartphone, Tablet, Globe, MapPin, Users, FileText } from 'lucide-react'
import InvoiceModal, { type InvoiceRequest } from '@/components/InvoiceModal'

export const dynamic = 'force-dynamic'

type Request = InvoiceRequest

type VisitorLog = {
  id: number; created_at: string; ip: string; device: string
  browser: string; country: string; city: string; page: string
}

type AppUser = {
  id: string; created_at: string; full_name: string; email: string
  phone: string; role: string; user_type: string; organization: string
  college: string; year: string; study: string; stream: string
}

type StatCard = { label: string; value: string | number; icon: React.ReactNode }

function count<T>(arr: T[], key: keyof T) {
  return arr.reduce((acc, item) => {
    const k = String(item[key] || 'Unknown')
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

function TopList({ title, data }: { title: string; data: Record<string, number> }) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const max = sorted[0]?.[1] || 1
  return (
    <div className="rounded-2xl p-6 border" style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--gold)' }}>{title}</h3>
      <div className="flex flex-col gap-3">
        {sorted.map(([label, val]) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</span>
              <span style={{ color: 'var(--gold)' }}>{val}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div className="h-1.5 rounded-full" style={{ width: `${(val / max) * 100}%`, background: 'var(--gold)' }} />
            </div>
          </div>
        ))}
        {sorted.length === 0 && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>No data yet.</p>}
      </div>
    </div>
  )
}

const TH = ({ children }: { children: string }) => (
  <th className="text-left px-4 py-3 text-xs font-semibold whitespace-nowrap" style={{ color: 'var(--gold)' }}>{children}</th>
)

const rowStyle = (i: number) => ({
  background: i % 2 === 0 ? 'rgba(17,34,64,0.6)' : 'rgba(10,22,40,0.6)',
  borderBottom: '1px solid rgba(201,168,76,0.08)',
})

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'requests' | 'analytics' | 'users'>('requests')
  const [requests, setRequests] = useState<Request[]>([])
  const [visitors, setVisitors] = useState<VisitorLog[]>([])
  const [users, setUsers] = useState<AppUser[]>([])
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [invoiceReq, setInvoiceReq] = useState<Request | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.replace('/login'); return }
      const { data: userData } = await supabase
        .from('users').select('role').eq('id', data.session.user.id).single()
      if (userData?.role !== 'admin') { router.replace('/'); return }
      setAuthed(true)
      fetchAll()
    })
  }, [router])

  async function fetchAll() {
    setLoading(true)
    const [{ data: reqs }, { data: vis }, { data: usr }] = await Promise.all([
      supabase.from('contact_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('visitor_logs').select('*').order('created_at', { ascending: false }),
      supabase.from('users').select('*').order('created_at', { ascending: false }),
    ])
    setRequests(reqs || [])
    setVisitors(vis || [])
    setUsers(usr || [])
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (!authed) return null

  const uniqueIPs = new Set(visitors.map(v => v.ip)).size
  const deviceCounts = count(visitors, 'device')
  const statCards: StatCard[] = [
    { label: 'Total Visits', value: visitors.length, icon: <Globe size={20} /> },
    { label: 'Unique Visitors', value: uniqueIPs, icon: <MapPin size={20} /> },
    { label: 'Desktop', value: deviceCounts['Desktop'] || 0, icon: <Monitor size={20} /> },
    { label: 'Mobile', value: deviceCounts['Mobile'] || 0, icon: <Smartphone size={20} /> },
    { label: 'Tablet', value: deviceCounts['Tablet'] || 0, icon: <Tablet size={20} /> },
    { label: 'Registered Users', value: users.length, icon: <Users size={20} /> },
  ]

  const tabs = [
    { key: 'requests', label: 'Service Requests', icon: <Inbox size={15} /> },
    { key: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} /> },
    { key: 'users', label: `Users (${users.length})`, icon: <Users size={15} /> },
  ]

  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">
      {/* Header */}
      <div className="sticky top-16 z-40 px-4 py-4 flex items-center justify-between border-b"
        style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--gold)' }}>Admin Dashboard</h1>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Records Writing Kakinada</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchAll}
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

      {/* Tabs */}
      <div className="px-4 md:px-8 pt-6 flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={tab === t.key
              ? { background: 'var(--gold)', color: 'var(--navy)' }
              : { background: 'rgba(201,168,76,0.1)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(201,168,76,0.2)' }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-8">
        {loading ? (
          <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</div>

        ) : tab === 'requests' ? (
          /* ── Requests Tab ── */
          requests.length === 0
            ? <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.4)' }}>No requests yet.</div>
            : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy-light)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                      {['#', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Details', 'Message', 'Invoice'].map(h => <TH key={h}>{h}</TH>)}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r, i) => (
                      <tr key={r.id} style={rowStyle(i)}>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{r.id}</td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {new Date(r.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap">{r.name}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{r.email}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{r.phone || '—'}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold"
                            style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>{r.service}</span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          {r.num_pages ? `${r.num_pages} pages` : r.project_scope || '—'}
                        </td>
                        <td className="px-4 py-3 text-xs max-w-xs truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {r.message || '—'}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => setInvoiceReq(r)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                            style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
                            <FileText size={12} /> Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )

        ) : tab === 'analytics' ? (
          /* ── Analytics Tab ── */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {statCards.map(s => (
                <div key={s.label} className="rounded-2xl p-5 border flex flex-col gap-2"
                  style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  <div style={{ color: 'var(--gold)' }}>{s.icon}</div>
                  <div className="text-2xl font-extrabold">{s.value}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TopList title="Top Countries" data={count(visitors, 'country')} />
              <TopList title="Top Cities" data={count(visitors, 'city')} />
              <TopList title="Pages Visited" data={count(visitors, 'page')} />
              <TopList title="Browsers" data={count(visitors, 'browser')} />
              <TopList title="Devices" data={deviceCounts} />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--gold)' }}>Recent Visitors</h3>
              <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy-light)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                      {['Time', 'IP', 'Country', 'City', 'Device', 'Browser', 'Page'].map(h => <TH key={h}>{h}</TH>)}
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.slice(0, 50).map((v, i) => (
                      <tr key={v.id} style={rowStyle(i)}>
                        <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {new Date(v.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.55)' }}>{v.ip}</td>
                        <td className="px-4 py-3 text-xs">{v.country}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{v.city}</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-0.5 rounded-full text-xs"
                            style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>{v.device}</span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{v.browser}</td>
                        <td className="px-4 py-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>{v.page}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Showing latest 50 of {visitors.length} visits
              </p>
            </div>
          </motion.div>

        ) : (
          /* ── Users Tab ── */
          users.length === 0
            ? <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.4)' }}>No users yet.</div>
            : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy-light)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                      {['Joined', 'Name', 'Email', 'Phone', 'Role', 'Type', 'College / Org', 'Year', 'Study', 'Stream'].map(h => <TH key={h}>{h}</TH>)}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u.id} style={rowStyle(i)}>
                        <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {new Date(u.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap">{u.full_name || '—'}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{u.email || '—'}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{u.phone || '—'}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: u.role === 'admin' ? 'rgba(255,80,80,0.15)' : 'rgba(201,168,76,0.15)',
                              color: u.role === 'admin' ? '#ff6b6b' : 'var(--gold)',
                            }}>{u.role}</span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{u.user_type || '—'}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {u.college || u.organization || '—'}
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{u.year || '—'}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{u.study || '—'}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{u.stream || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="px-4 py-3 text-xs text-right" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {users.length} registered user{users.length !== 1 ? 's' : ''}
                </p>
              </motion.div>
            )
        )}
      </div>

      {invoiceReq && <InvoiceModal req={invoiceReq} onClose={() => setInvoiceReq(null)} />}
    </div>
  )
}
