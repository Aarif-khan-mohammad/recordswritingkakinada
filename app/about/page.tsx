'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, MapPin, Award, Users } from 'lucide-react'

import type { Variants } from 'framer-motion'
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' as const } }),
}

const values = [
  { icon: <ShieldCheck size={26} />, title: 'Privacy & Secrecy', desc: 'Every submission is handled with strict confidentiality. Your data and documents are never shared with third parties.' },
  { icon: <Award size={26} />, title: 'Quality First', desc: 'We maintain high standards across all services — from handwritten records to full-stack web projects.' },
  { icon: <Users size={26} />, title: 'Student-Centric', desc: 'Built for students and professionals who need reliable, affordable, and timely academic support.' },
  { icon: <MapPin size={26} />, title: 'Rooted in Kakinada', desc: 'Proudly serving the Kakinada community and beyond, with deep understanding of local academic requirements.' },
]

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
          Who We Are
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">
          About <span style={{ color: 'var(--gold)' }}>Records Writing Kakinada</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-6 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
          A trusted name in academic and technical services, operating from the heart of Kakinada, Andhra Pradesh.
        </motion.p>
      </section>

      {/* Story */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-2xl p-10 border"
          style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gold)' }}>Our Story</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Records Writing Kakinada was founded with a single mission: to provide students and professionals
            with reliable, high-quality academic support services. We understand the pressure of deadlines,
            the importance of presentation, and the need for absolute confidentiality.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            From meticulously written lab records and assignments to professional web development and
            PowerPoint presentations, we cover the full spectrum of academic and technical needs.
            Every project is treated with the same level of care and professionalism.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} custom={i}
                className="rounded-2xl p-7 border flex gap-5 hover:-translate-y-1 transition-transform"
                style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)' }}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{v.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
