'use client'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { FileText, Monitor, BarChart2, ShieldCheck, Clock, Star, GraduationCap } from 'lucide-react'

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
  { icon: <Star size={22} />, label: 'Since 2021' },
]

const stats = [
  { value: 5, suffix: '+', label: 'Years of Service', sub: 'Since 2021' },
  { value: 579, suffix: '+', label: 'Records & Notes', sub: 'Delivered' },
  { value: 805, suffix: '+', label: 'Drawings', sub: 'Completed' },
  { value: 270, suffix: '+', label: 'Presentations', sub: 'Created' },
  { value: 20, suffix: '+', label: 'Websites', sub: 'Built' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 })
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, motionVal, value])

  useEffect(() => {
    return spring.on('change', v => {
      if (ref.current) ref.current.textContent = Math.floor(v) + suffix
    })
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-5 border-2 pointer-events-none"
          style={{ borderColor: 'var(--gold)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--gold)' }}>
          Trusted Academic Partner Since 2021
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
          Reliable, confidential, and high-quality academic and technical services —
          serving Kakinada, Hyderabad & Bangalore for records, and anywhere in the world for web & PPT.
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

      {/* Stats */}
      <section className="py-20 px-4" style={{ background: 'var(--navy-light)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
              Our Track Record
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Numbers That Speak</h2>
            <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Over 5 years of consistent, quality service to students across India.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} custom={i}
                className="rounded-2xl p-6 text-center border hover:-translate-y-1 transition-transform"
                style={{ background: 'var(--navy)', borderColor: 'rgba(201,168,76,0.2)' }}>
                <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: 'var(--gold)' }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold mb-0.5">{s.label}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
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

      {/* Student Loyalty Discount */}
      <section className="py-20 px-4" style={{ background: 'var(--navy-light)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <GraduationCap size={14} /> Student Exclusive
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Loyalty <span style={{ color: 'var(--gold)' }}>Discounts</span> for Students
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Create a free student account and save more with every order. Discounts apply automatically.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { order: '1st Order', pct: '20%', label: 'Welcome Discount', color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)' },
              { order: '2nd Order', pct: '10%', label: 'Returning Student', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)' },
              { order: '3rd Order', pct: '5%', label: 'Loyalty Reward', color: 'var(--gold)', bg: 'rgba(201,168,76,0.08)', border: 'rgba(201,168,76,0.25)' },
            ].map((d, i) => (
              <motion.div key={d.order} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} custom={i}
                className="rounded-2xl p-6 text-center border"
                style={{ background: d.bg, borderColor: d.border }}>
                <div className="text-4xl font-extrabold mb-1" style={{ color: d.color }}>{d.pct}</div>
                <div className="text-sm font-bold mb-1">{d.order}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{d.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-5 border flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: 'rgba(201,168,76,0.06)', borderColor: 'rgba(201,168,76,0.2)' }}>
            <div className="flex items-start gap-3">
              <GraduationCap size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Discounts apply to <strong style={{ color: '#fff' }}>student accounts only</strong>. Sign up as a student, place your order through the contact form, and the discount is applied automatically to your invoice.
              </p>
            </div>
            <Link href="/signup"
              className="shrink-0 px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 whitespace-nowrap"
              style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
              Create Student Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(90deg, var(--navy-light), var(--navy))' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join 1000+ students who trust us with their academic work.
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
