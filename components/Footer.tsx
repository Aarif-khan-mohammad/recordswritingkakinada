import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy-light)', borderTop: '1px solid rgba(201,168,76,0.2)' }}
      className="mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
            <span className="font-bold" style={{ color: 'var(--gold)' }}>Records Writing Kakinada</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Professional academic & technical services based in Kakinada, Andhra Pradesh.
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Est. 2021 · Kakinada, AP, India
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3" style={{ color: 'var(--gold)' }}>Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/services', label: 'Services' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy', label: 'Privacy Policy' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-yellow-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3" style={{ color: 'var(--gold)' }}>Contact</h4>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Kakinada, Andhra Pradesh, India</p>
          <a href="mailto:recordswritingkakinada@gmail.com"
            className="text-sm mt-1 block hover:text-yellow-400 transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)' }}>
            recordswritingkakinada@gmail.com
          </a>
          <a href="https://www.instagram.com/records_writing_kakinada?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} Records Writing Kakinada. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
          <span>·</span>
          <span>Made with ♥ in Kakinada</span>
        </div>
      </div>
    </footer>
  )
}
