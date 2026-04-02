'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { FileText, Monitor, BarChart2 } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.55, ease: 'easeOut' as const } }),
}

const services = [
  {
    icon: <FileText size={36} />,
    title: 'Records & Assignments',
    tag: 'Academic',
    desc: 'Professionally handwritten or typed lab records, assignments, and project reports tailored to your syllabus and university standards.',
    features: ['Lab Records', 'Assignments', 'Project Reports', 'Observation Books'],
    service: 'Records & Assignments',
  },
  {
    icon: <Monitor size={36} />,
    title: 'Web Development',
    tag: 'Technical',
    desc: 'Custom websites and web applications built with modern technologies. From portfolios to full-stack projects for academic submissions.',
    features: ['Portfolio Sites', 'Academic Projects', 'React / Next.js', 'Full-Stack Apps'],
    service: 'Web Development',
  },
  {
    icon: <BarChart2 size={36} />,
    title: 'PPT & Drawings',
    tag: 'Design',
    desc: 'Visually compelling PowerPoint presentations and technical engineering drawings crafted to impress and communicate clearly.',
    features: ['Seminar PPTs', 'Project Presentations', 'Engineering Drawings', 'Diagrams & Charts'],
    service: 'PPT & Drawings',
  },
]

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">
      {/* Header */}
      <section className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
          What We Offer
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-4xl md:text-5xl font-extrabold">
          Our <span style={{ color: 'var(--gold)' }}>Services</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-5 text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Professional, confidential, and delivered on time — every time.
        </motion.p>
      </section>

      {/* Cards */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} custom={i}
              className="rounded-2xl p-8 border flex flex-col hover:-translate-y-2 transition-transform"
              style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                {s.icon}
              </div>
              <span className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: 'var(--gold)' }}>{s.tag}</span>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.desc}</p>
              <ul className="mb-6 flex flex-col gap-1">
                {s.features.map(f => (
                  <li key={f} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={`/contact?service=${encodeURIComponent(s.service)}`}
                className="w-full text-center py-3 rounded-lg text-sm font-semibold border transition-all hover:scale-105"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                Request This Service
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
