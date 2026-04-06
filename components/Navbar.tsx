'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

const igLink = 'https://www.instagram.com/records_writing_kakinada?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)
  const dropRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setUser(null); return }
      const { data: userData } = await supabase.from('users').select('full_name, role, email').eq('id', session.user.id).single()
      const name = userData?.full_name || session.user.user_metadata?.full_name || 'User'
      setUser({ name, email: userData?.email || session.user.email || '', role: userData?.role || 'user' })
    }
    loadUser()
    const { data: listener } = supabase.auth.onAuthStateChange(() => loadUser())
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setDropOpen(false)
    setOpen(false)
    router.push('/')
  }

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <nav style={{ background: 'var(--navy-light)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}
      className="sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Records Writing Kakinada" width={44} height={44} className="rounded-lg" />
          <span className="font-bold text-lg hidden sm:block" style={{ color: 'var(--gold)' }}>
            Records Writing Kakinada
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium transition-colors hover:text-yellow-400"
                style={{ color: 'rgba(255,255,255,0.8)' }}>
                {l.label}
              </Link>
            </li>
          ))}

          {/* Instagram */}
          <li>
            <a href={igLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:scale-110"
              style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          </li>

          {/* Auth */}
          {user ? (
            <li className="relative" ref={dropRef}>
              <button onClick={() => setDropOpen(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all hover:scale-105"
                style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                  {initials}
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate" style={{ color: 'var(--gold)' }}>
                  {user.name}
                </span>
                <ChevronDown size={14} style={{ color: 'var(--gold)' }} />
              </button>

              {dropOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border shadow-2xl overflow-hidden"
                  style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--gold)' }}>{user.name}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                      {user.role}
                    </span>
                  </div>
                  {user.role === 'admin' && (
                    <Link href="/admin-records" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                      style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <User size={14} /> Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                    style={{ color: '#ff6b6b' }}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link href="/login" className="text-sm font-medium transition-colors hover:text-yellow-400"
                  style={{ color: 'rgba(255,255,255,0.8)' }}>Login</Link>
              </li>
              <li>
                <Link href="/signup"
                  className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: 'var(--gold)' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1" style={{ background: 'var(--navy-light)' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm font-medium py-2.5 border-b"
              style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(201,168,76,0.1)' }}>
              {l.label}
            </Link>
          ))}
          <a href={igLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium py-2.5 border-b"
            style={{ color: 'var(--gold)', borderColor: 'rgba(201,168,76,0.1)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            Instagram
          </a>

          {user ? (
            <div className="pt-2 flex flex-col gap-1">
              <div className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}>{initials}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>{user.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{user.role}</p>
                </div>
              </div>
              {user.role === 'admin' && (
                <Link href="/admin-records" onClick={() => setOpen(false)}
                  className="text-sm py-2 flex items-center gap-2"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <User size={14} /> Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout}
                className="text-sm py-2 flex items-center gap-2 text-left"
                style={{ color: '#ff6b6b' }}>
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" onClick={() => setOpen(false)}
                className="text-sm font-medium py-2.5 text-center rounded-xl border"
                style={{ color: 'var(--gold)', borderColor: 'rgba(201,168,76,0.3)' }}>Login</Link>
              <Link href="/signup" onClick={() => setOpen(false)}
                className="text-sm font-bold py-2.5 text-center rounded-xl"
                style={{ background: 'var(--gold)', color: 'var(--navy)' }}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
