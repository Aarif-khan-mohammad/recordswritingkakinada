'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const } }),
}

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'When you sign up, we collect your full name, email address, phone number, and academic details (college, year, study, stream) or professional details (organization name).',
      'When you submit a service request, we collect your name, email, phone number, selected service, and any additional details you provide.',
      'We automatically collect anonymous visitor data including IP address, browser type, device type, and pages visited for analytics purposes.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To process and fulfill your service requests (records writing, web development, PPT & drawings).',
      'To contact you regarding your order status, updates, or follow-ups.',
      'To improve our services and understand how visitors use our website.',
      'We do not use your information for any marketing or promotional purposes without your consent.',
    ],
  },
  {
    title: '3. Privacy & Secrecy Policy',
    content: [
      'We treat every submission with strict confidentiality. Your academic records, project details, and personal information are never shared with third parties.',
      'Your work is prepared exclusively for you. We do not reuse, resell, or redistribute any content created for your order.',
      'All service requests are handled privately. No client information is disclosed to other clients or external parties under any circumstances.',
    ],
  },
  {
    title: '4. Data Storage & Security',
    content: [
      'Your data is securely stored using Supabase, a trusted cloud database provider with industry-standard encryption.',
      'We implement appropriate technical measures to protect your personal information against unauthorized access, alteration, or disclosure.',
      'Passwords are encrypted and never stored in plain text.',
    ],
  },
  {
    title: '5. Cookies & Tracking',
    content: [
      'We use minimal, anonymous tracking to understand website traffic and improve user experience.',
      'We do not use advertising cookies or share tracking data with third-party advertisers.',
      'Visitor analytics (IP, device, browser, page) are collected solely for internal analytics visible only to our admin.',
    ],
  },
  {
    title: '6. Your Rights',
    content: [
      'You have the right to request access to the personal data we hold about you.',
      'You may request deletion of your account and associated data at any time by contacting us.',
      'You may update your profile information at any time after logging in.',
    ],
  },
  {
    title: '7. Contact Us',
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at recordswritingkakinada@gmail.com.',
      'We are based in Kakinada, Andhra Pradesh, India and are committed to protecting your privacy.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
          Legal
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-4xl md:text-5xl font-extrabold">
          Privacy <span style={{ color: 'var(--gold)' }}>Policy</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-4 text-sm max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Last updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
        </motion.p>
      </section>

      {/* Intro */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-2xl p-8 border"
          style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            At <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Records Writing Kakinada</span>, we are
            committed to protecting your privacy and maintaining the confidentiality of your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
            By using our website or services, you agree to the terms outlined in this policy.
          </p>
        </motion.div>
      </section>

      {/* Sections */}
      <section className="pb-20 px-4 max-w-3xl mx-auto flex flex-col gap-5">
        {sections.map((s, i) => (
          <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true }} custom={i}
            className="rounded-2xl p-7 border"
            style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.15)' }}>
            <h2 className="font-bold text-base mb-4" style={{ color: 'var(--gold)' }}>{s.title}</h2>
            <ul className="flex flex-col gap-3">
              {s.content.map((c, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <span className="mt-1 shrink-0" style={{ color: 'var(--gold)' }}>•</span>
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      {/* Back link */}
      <div className="pb-16 text-center">
        <Link href="/" className="text-sm hover:underline" style={{ color: 'var(--gold)' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
