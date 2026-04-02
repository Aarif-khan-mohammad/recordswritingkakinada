'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { FileText, Monitor, BarChart2, ShieldCheck, Clock, Star } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const } }),
}

const steps = [
  { icon: <FileText size={28} />, title: 'Choose a Service', desc: 'Select from Records, Web Dev, or PPT & Drawings.' },
  { icon: <Monitor size={28} />, title: 'Submit Your Request', desc: 'Fill out our smart contact form with your requirements.' },
  { icon: <BarChart2 size={28} />, title: 'We Deliver', desc: 'Receive professional, timely, and confidential output.' },
]

const highlights = [
  { icon: <ShieldCheck size={22} />, label: 'Privacy Guaranteed' },
  { icon: <Clock size={22} />, label: 'On-Time Delivery' },
  { icon: <Star size={22} />, label: 'Quality Assured' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        {/* Decorative ring */}
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-5 border-2"
          style={{ borderColor: 'var(--gold)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--gold)' }}>
          Kakinada's Trusted Academic Partner
        </motion.p>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl"
          style={{ color: 'var(--white)' }}>
          Professional Services for{' '}
          <span style={{ color: 'var(--gold)' }}>Records, Web & Presentations</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-6 text-lg max-w-xl"
          style={{ color: 'rgba(255,255,255,0.65)' }}>
          Reliable, confidential, and high-quality academic and technical services delivered on time.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="mt-10 flex gap-4 flex-wrap justify-center">
          <Link href="/contact"
            className="px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 hover:brightness-110"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
            Get Started
          </Link>
          <Link href="/services"
            className="px-8 py-3 rounded-lg font-semibold text-sm border transition-all hover:scale-105"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
            View Services
          </Link>
        </motion.div>

        {/* Highlights bar */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="mt-16 flex gap-8 flex-wrap justify-center">
          {highlights.map(h => (
            <div key={h.label} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ color: 'var(--gold)' }}>{h.icon}</span>
              {h.label}
            </div>
          ))}
        </motion.div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4" style={{ background: 'var(--navy)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Process</p>
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} custom={i}
                className="rounded-2xl p-8 text-center border transition-all hover:-translate-y-1 hover:border-yellow-400"
                style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)' }}>
                  {s.icon}
                </div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--gold)' }}>
                  STEP {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(90deg, var(--navy-light), var(--navy))' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Submit your request today and experience professional service.
          </p>
          <Link href="/contact"
            className="px-10 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
            Contact Us Now
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
