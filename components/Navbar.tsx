'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Login' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ background: 'var(--navy-light)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}
      className="sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Records Writing Kakinada" width={44} height={44} className="rounded-lg" />
          <span className="font-bold text-lg hidden sm:block" style={{ color: 'var(--gold)' }}>
            Records Writing Kakinada
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-6 items-center">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href}
                className="text-sm font-medium transition-colors hover:text-yellow-400"
                style={{ color: 'rgba(255,255,255,0.8)' }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: 'var(--gold)' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ background: 'var(--navy-light)' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm font-medium py-2 border-b"
              style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(201,168,76,0.15)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
