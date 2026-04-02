import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy-light)', borderTop: '1px solid rgba(201,168,76,0.2)' }}
      className="mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
            <span className="font-bold" style={{ color: 'var(--gold)' }}>Records Writing Kakinada</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Professional academic & technical services based in Kakinada, Andhra Pradesh.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3" style={{ color: 'var(--gold)' }}>Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {['/', '/about', '/services', '/contact'].map((href, i) => (
              <li key={href}>
                <Link href={href} className="hover:text-yellow-400 transition-colors">
                  {['Home', 'About', 'Services', 'Contact'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3" style={{ color: 'var(--gold)' }}>Contact</h4>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Kakinada, Andhra Pradesh, India</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>recordswritingkakinada@gmail.com</p>
        </div>
      </div>
      <div className="text-center py-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        © {new Date().getFullYear()} Records Writing Kakinada. All rights reserved.
      </div>
    </footer>
  )
}
