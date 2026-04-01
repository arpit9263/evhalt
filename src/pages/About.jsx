import { motion } from 'framer-motion'
import { STATS, COMPANY, IMAGES, CONTACT } from '@/data/constants'
import { Leaf, Zap, Shield, Users, Award, Globe } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { PageHero, Section, SectionHeader, FeatureCard, GradientDivider } from '@/components/ui/UIComponents'

function Timeline() {
  const events = [
    { year: '2020', title: 'Founded in Bangalore', desc: 'EV Halt started with 2 DC chargers at a Koramangala tech park. One vision: make EV charging as reliable as the vehicles themselves.' },
    { year: '2021', title: '100 Stations Across South India', desc: 'Expanded to 100 stations across Bengaluru, Chennai, and Hyderabad within 18 months. First malls and office parks onboarded.' },
    { year: '2022', title: 'Solar Canopy Launch', desc: 'India\'s first solar-integrated EV canopy stations. Renewable energy became our standard, not an upgrade.' },
    { year: '2023', title: 'National Highway Network', desc: '12 NH corridors activated. First driver completed Delhi–Kanyakumari entirely on EV Halt infrastructure.' },
    { year: '2024', title: '350+ Stations · 28 Cities', desc: '150kW ultra-rapid chargers deployed nationally. OCPP 2.0 cloud platform managing every station in real-time.' },
    { year: '2025', title: 'V2G & Smart Grid', desc: 'Vehicle-to-Grid trials launched in Bengaluru. AI-powered smart load balancing deployed across the full network.' },
  ]

  return (
    <Section dark>
      <SectionHeader label="Our Journey" title="Four years." highlight="One vision." />
      <div className="relative">
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ev-lime/30 via-ev-lime/10 to-transparent" />
        <div className="space-y-12">
          {events.map((e, i) => (
            <motion.div
              key={e.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`relative flex gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start`}
            >
              {/* Year bubble */}
              <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-ev-lime flex items-center justify-center flex-shrink-0 z-10 mt-1"
                style={{ boxShadow: '0 0 20px rgba(200,255,0,0.3)' }}
              >
                <Zap size={14} className="text-ev-black fill-ev-black" strokeWidth={2.5} />
              </div>
              {/* Content */}
              <div className={`lg:w-[46%] ml-12 lg:ml-0 ${i % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'} bg-ev-card2 rounded-2xl p-6 border border-ev-lime/[0.08]`}>
                <div className="text-ev-lime text-[0.72rem] uppercase tracking-[0.2em] mb-2 font-500" style={{ fontWeight: 500 }}>{e.year}</div>
                <div className="font-display font-700 text-[1.1rem] text-ev-white mb-2" style={{ fontWeight: 700 }}>{e.title}</div>
                <p className="text-[0.85rem] text-ev-muted leading-relaxed font-300">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Values() {
  const values = [
    { icon: Zap,    title: 'Speed First',       body: 'Every decision starts with one question: how do we make this faster? Charging time, response time, growth time.',         tag: 'Core' },
    { icon: Leaf,   title: 'Planet Positive',   body: '100% renewable energy across our network. Carbon offset programs for every kWh dispensed through EV Halt.',              tag: 'Sustainability' },
    { icon: Shield, title: 'Always Available',  body: '24/7 monitoring, predictive maintenance, and rapid field teams. 99.7% uptime is not an aspiration — it\'s a contractual commitment.', tag: 'Reliability' },
    { icon: Users,  title: 'Driver-Centred',    body: 'From app UX to station lighting to parking markings — every touchpoint is designed around the driver, not the operator.', tag: 'Experience' },
  ]
  return (
    <Section dark={false}>
      <SectionHeader center label="Our Values" title="Four principles." highlight="Every decision." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {values.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}>
            <FeatureCard {...v} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Stats() {
  return (
    <Section dark>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
        {[
          { n: '350+', l: 'Charging Stations', icon: Zap },
          { n: '28',   l: 'Cities Covered',    icon: Globe },
          { n: '12',   l: 'Highway Corridors', icon: Shield },
          { n: '5+',   l: 'Years Experience',  icon: Award },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-ev-card2 p-8 border border-ev-lime/[0.08] text-center hover:bg-ev-card3 transition-colors"
          >
            <s.icon size={20} className="text-ev-lime mx-auto mb-4" />
            <div className="font-display font-800 text-[2.8rem] text-ev-white leading-none mb-2" style={{ fontWeight: 800 }}>{s.n}</div>
            <div className="text-[0.72rem] uppercase tracking-[0.15em] text-ev-muted">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Team() {
  const team = [
    { name: 'Arjun Mehta',   role: 'CEO & Co-Founder',   init: 'AM' },
    { name: 'Priya Nair',    role: 'Chief Technology Officer', init: 'PN' },
    { name: 'Rahul Sharma',  role: 'Head of Network',    init: 'RS' },
    { name: 'Kavya Reddy',   role: 'Chief Sustainability Officer', init: 'KR' },
    { name: 'Vikram Singh',  role: 'Head of Fleet & B2B', init: 'VS' },
    { name: 'Sneha Patel',   role: 'Head of Product',    init: 'SP' },
  ]
  return (
    <Section dark={false} id="careers">
      <SectionHeader center label="Leadership" title="The team behind" highlight="the charge" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-ev-card3 rounded-2xl p-5 border border-ev-lime/[0.08] text-center hover:border-ev-lime/20 transition-colors group"
          >
            <div className="w-14 h-14 rounded-full bg-ev-card2 border-2 border-ev-lime/[0.12] group-hover:border-ev-lime/30 flex items-center justify-center mx-auto mb-4 transition-colors">
              <span className="font-display font-700 text-ev-lime text-sm" style={{ fontWeight: 700 }}>{m.init}</span>
            </div>
            <div className="font-600 text-[0.88rem] text-ev-white mb-1" style={{ fontWeight: 600 }}>{m.name}</div>
            <div className="text-[0.72rem] text-ev-muted leading-snug">{m.role}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-dashed border-ev-lime/20 bg-ev-lime/[0.02] p-10 text-center" id="news">
        <div className="section-label-lime mb-3">We're Hiring</div>
        <h3 className="font-display font-700 text-[1.5rem] text-ev-white mb-3" style={{ fontWeight: 700 }}>Join the EV revolution</h3>
        <p className="text-ev-muted text-[0.9rem] mb-6 max-w-[400px] mx-auto font-300">We're looking for passionate people across engineering, operations, design, and sustainability.</p>
        <a href="/contact" className="btn-primary inline-flex">View Open Roles</a>
      </div>
    </Section>
  )
}

export default function About() {
  useReveal()
  return (
    <>
      <PageHero
        badge="Est. 2020 · Bangalore, India"
        label="About EV Halt"
        title="Charging India,"
        titleHighlight="one station at a time."
        subtitle="Founded with a singular obsession: make EV charging as reliable, fast, and effortless as the vehicles themselves. From 2 chargers to 350+ stations."
        cta={{ label: 'Our Technology', to: '/technology' }}
        ctaSecondary={{ label: 'Partner With Us', to: '/contact' }}
      />
      <Stats />
      <Timeline />
      <Values />
      <Team />
      <GradientDivider />
    </>
  )
}
