'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { FileText, Monitor, BarChart2, PenTool, MapPin, Globe } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.55, ease: 'easeOut' as const } }),
}

const services = [
  {
    icon: <FileText size={36} />,
    title: 'Records & Assignments',
    tag: 'Academic',
    desc: 'Professionally handwritten or typed lab records, assignments, observation books, and project reports — tailored to your university syllabus and standards.',
    features: [
      'Lab Records (All Subjects)',
      'Assignments & Observation Books',
      'Project Reports',
      'Seminar & Mini Project Records',
    ],
    availability: 'physical',
    availabilityLabel: 'Kakinada · Hyderabad · Bangalore',
    availabilityIcon: <MapPin size={12} />,
    service: 'Records & Assignments',
  },
  {
    icon: <PenTool size={36} />,
    title: 'Drawings',
    tag: 'Technical Drawing',
    desc: 'Precise hand-drawn and technical drawings for engineering, medical, biology, circuits and more — priced per drawing based on your stream and complexity.',
    features: [
      'Engineering Drawings (B.Tech)',
      'Medical & Biology Diagrams',
      'Circuit & Network Diagrams',
      'Flowcharts & Block Diagrams',
    ],
    availability: 'physical',
    availabilityLabel: 'Kakinada · Hyderabad · Bangalore',
    availabilityIcon: <MapPin size={12} />,
    service: 'PPT & Drawings',
  },
  {
    icon: <BarChart2 size={36} />,
    title: 'PPT Presentations',
    tag: 'Design',
    desc: 'Visually compelling PowerPoint presentations crafted to impress evaluators and communicate your ideas clearly — available anywhere in the world.',
    features: [
      'Seminar & Project PPTs',
      'Diagrams, Charts & Flowcharts',
      'Professional Slide Design',
      'Academic & Business Decks',
    ],
    availability: 'online',
    availabilityLabel: 'Pan India & Worldwide',
    availabilityIcon: <Globe size={12} />,
    service: 'PPT & Drawings',
  },
  {
    icon: <Monitor size={36} />,
    title: 'Web Development',
    tag: 'Technical',
    desc: 'Custom websites and web applications built with modern technologies — available to students and professionals anywhere in India and worldwide.',
    features: [
      'Portfolio & Personal Sites',
      'Academic Mini & Major Projects',
      'React / Next.js / Full-Stack',
      'E-commerce & Business Sites',
    ],
    availability: 'online',
    availabilityLabel: 'Pan India & Worldwide',
    availabilityIcon: <Globe size={12} />,
    service: 'Web Development',
  },
]

const coverageCities = [
  {
    flag: '🏙️',
    city: 'Kakinada',
    state: 'Andhra Pradesh',
    desc: 'Our home base. All services available here.',
    services: ['Records & Assignments', 'Drawings', 'PPT Presentations', 'Web Development'],
  },
  {
    flag: '🌆',
    city: 'Hyderabad',
    state: 'Telangana',
    desc: 'Serving students across Hyderabad.',
    services: ['Records & Assignments', 'Drawings', 'PPT Presentations', 'Web Development'],
  },
  {
    flag: '🏢',
    city: 'Bangalore',
    state: 'Karnataka',
    desc: 'Serving students across Bangalore.',
    services: ['Records & Assignments', 'Drawings', 'PPT Presentations', 'Web Development'],
  },
  {
    flag: '🌐',
    city: 'Pan India & Worldwide',
    state: 'Online',
    desc: 'PPT and web development services available everywhere.',
    services: ['PPT Presentations', 'Web Development'],
  },
]

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--navy)' }} className="min-h-screen">

      {/* Hero */}
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
          className="mt-5 text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Records, Assignments & Drawings available in <span style={{ color: 'var(--gold)' }}>Kakinada, Hyderabad & Bangalore</span>.
          PPT & Web Development available <span style={{ color: 'var(--gold)' }}>anywhere in the world</span>.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="mt-8 flex flex-wrap gap-3 justify-center">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold)' }}>
            <MapPin size={12} /> Records & Drawings: Kakinada · Hyderabad · Bangalore
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold)' }}>
            <Globe size={12} /> PPT & Web Dev: Pan India & Worldwide
          </span>
        </motion.div>
      </section>

      {/* Service Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} custom={i}
              className="rounded-2xl p-8 border flex flex-col hover:-translate-y-2 transition-transform"
              style={{ background: 'var(--navy-light)', borderColor: 'rgba(201,168,76,0.2)' }}>

              <div className="flex items-start justify-between mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                  {s.icon}
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: s.availability === 'online' ? 'rgba(34,197,94,0.1)' : 'rgba(96,165,250,0.1)',
                    color: s.availability === 'online' ? '#4ade80' : '#60a5fa',
                    border: `1px solid ${s.availability === 'online' ? 'rgba(34,197,94,0.2)' : 'rgba(96,165,250,0.2)'}`,
                  }}>
                  {s.availabilityIcon} {s.availability === 'online' ? 'Worldwide' : 'In-Person'}
                </span>
              </div>

              <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                {s.tag}
              </span>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.desc}</p>

              <ul className="mb-5 flex flex-col gap-1.5">
                {s.features.map(f => (
                  <li key={f} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-1.5 mb-6 text-xs"
                style={{ color: 'rgba(201,168,76,0.7)' }}>
                {s.availabilityIcon}
                <span>{s.availabilityLabel}</span>
              </div>

              <Link href={`/contact?service=${encodeURIComponent(s.service)}`}
                className="w-full text-center py-3 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                Request This Service
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 px-4" style={{ background: 'var(--navy-light)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
              Where We Serve
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Service Coverage</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageCities.map((c, i) => (
              <motion.div key={c.city} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} custom={i}
                className="rounded-2xl p-6 border hover:-translate-y-1 transition-transform"
                style={{ background: 'var(--navy)', borderColor: 'rgba(201,168,76,0.2)' }}>
                <div className="text-3xl mb-3">{c.flag}</div>
                <h3 className="font-bold text-base mb-0.5">{c.city}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--gold)' }}>{c.state}</p>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.desc}</p>
                <div className="flex flex-col gap-1.5">
                  {c.services.map(sv => (
                    <span key={sv} className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span> {sv}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ background: 'var(--navy)' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-3">Not sure which service you need?</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Contact us and we&apos;ll guide you to the right solution.
          </p>
          <Link href="/contact"
            className="px-10 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 inline-block"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
