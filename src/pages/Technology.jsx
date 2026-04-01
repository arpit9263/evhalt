import { motion } from 'framer-motion'
import { STATS, COMPANY, IMAGES, CONTACT } from '@/data/constants'
import { Zap, Cpu, Cloud, Lock, Sun, Wifi, BarChart3, RefreshCw, CheckCircle2 } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { PageHero, Section, SectionHeader, FeatureCard, GradientDivider, DataRow } from '@/components/ui/UIComponents'

function ChargingSpecs() {
  const standards = [
    { std: 'CCS2 DC',   kw: '150 kW', color: '#c8ff00',            desc: 'Combined Charging System — our primary ultra-rapid standard' },
    { std: 'CHAdeMO',   kw:  '50 kW', color: 'rgba(200,255,0,0.6)', desc: 'Japanese standard supported at all DC stations' },
    { std: 'Type-2 AC', kw:  '22 kW', color: 'rgba(200,255,0,0.4)', desc: 'Universal AC charging across home and commercial' },
    { std: 'Type-1 AC', kw:   '7.4 kW', color: 'rgba(200,255,0,0.25)', desc: 'Legacy single-phase AC support at residential installations' },
  ]

  return (
    <Section dark>
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="section-label-lime mb-4 reveal">Charging Hardware</div>
          <h2 className="font-display text-h2 text-ev-white mb-5 reveal reveal-delay-1 font-700" style={{ fontWeight: 700 }}>
            Multi-standard.<br />
            <span className="text-gradient-lime">One platform.</span>
          </h2>
          <p className="text-ev-muted leading-relaxed mb-8 font-300 reveal reveal-delay-2">
            Every EV Halt station supports CCS2, CHAdeMO, and Type-2 AC simultaneously. Our proprietary smart power management algorithm distributes peak power across all connected vehicles — no degradation, no waiting.
          </p>
          <div className="space-y-0 border border-ev-lime/[0.1] rounded-2xl overflow-hidden reveal reveal-delay-3">
            {[
              ['Peak Output',         '150 kW per port'],
              ['Simultaneous ports',  'Up to 4 per station'],
              ['Load balancing',      'AI-managed dynamic'],
              ['Efficiency',          '96.5% AC-to-DC'],
              ['Operating temp',      '-20°C to +55°C'],
              ['IP Rating',           'IP55 weatherproof'],
              ['Certifications',      'BIS · IEC 62196 · CE'],
            ].map(([k, v]) => <DataRow key={k} label={k} value={v} highlight={v.includes('kW') || v.includes('96')} />)}
          </div>
        </div>

        {/* Visual */}
        <div className="reveal reveal-delay-1">
          <div className="bg-ev-card2 rounded-2xl border border-ev-lime/[0.1] p-8">
            <div className="text-[0.65rem] uppercase tracking-[0.2em] text-ev-muted mb-6">Output by Connector Standard</div>
            <div className="space-y-5">
              {standards.map((s) => (
                <div key={s.std}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[0.85rem] font-600 text-ev-white" style={{ fontWeight: 600 }}>{s.std}</span>
                    <span className="font-display font-700 text-ev-lime text-[1rem]" style={{ fontWeight: 700, color: s.color }}>{s.kw}</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(parseInt(s.kw) / 150) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }}
                    />
                  </div>
                  <p className="text-[0.72rem] text-ev-muted mt-1.5 font-300">{s.desc}</p>
                </div>
              ))}
            </div>
            {/* Max power callout */}
            <div className="mt-8 pt-6 border-t border-ev-lime/[0.08] flex items-center justify-between">
              <div>
                <div className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted">Peak Power Output</div>
                <div className="font-display font-800 text-ev-lime text-[2.6rem] leading-none mt-1" style={{ fontWeight: 800 }}>
                  150<span className="text-[1rem] text-ev-muted font-300 ml-1">kW</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-ev-lime/30 flex items-center justify-center"
                style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.08), transparent)' }}>
                <Zap size={24} className="text-ev-lime fill-ev-lime" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function CloudPlatform() {
  const features = [
    { icon: Cloud,    title: 'OCPP 2.0 Connectivity',    body: 'Full OCPP 2.0 protocol implementation. Remote diagnostics, configuration, and zero-downtime OTA firmware updates across all stations.', tag: 'OCPP 2.0' },
    { icon: Cpu,      title: 'AI Load Balancing',         body: 'Proprietary algorithm distributes available power across connected vehicles dynamically. Up to 40% more efficient than static systems.', tag: 'AI-Powered' },
    { icon: Lock,     title: 'ISO 15118 Plug & Charge',   body: 'PKI-certificate based Plug & Charge. Just connect — the vehicle and network authenticate automatically. No app, no card needed.', tag: 'ISO 15118' },
    { icon: BarChart3,'title': 'Real-Time Analytics',     body: 'Live dashboard for operators covering energy throughput, session data, predictive maintenance alerts, and carbon reporting.',  tag: 'Analytics' },
    { icon: Sun,      title: 'Solar & V2G Integration',   body: 'On-site solar feeds directly into our DC bus. V2G hardware installed at all new stations, ready for regulatory activation.', tag: 'V2G Ready' },
    { icon: RefreshCw,title: 'Smart Grid Management',     body: 'Time-of-use tariff optimisation, demand response participation, and dynamic power import based on grid load signals.', tag: 'Smart Grid' },
  ]

  return (
    <Section dark={false}>
      <SectionHeader
        label="Software Platform"
        title="Intelligence at every"
        highlight="layer of the stack."
        subtitle="Our cloud-native OCPP platform manages every station in real time — from firmware to billing to carbon reporting."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
          >
            <FeatureCard {...f} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function SecuritySection() {
  return (
    <Section dark>
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div className="reveal">
          <div className="section-label-lime mb-4">Security & Authentication</div>
          <h2 className="font-display text-h2 text-ev-white mb-5 font-700" style={{ fontWeight: 700 }}>
            Bank-level security.<br />
            <span className="text-gradient-lime">Every session.</span>
          </h2>
          <p className="text-ev-muted leading-relaxed mb-8 font-300">
            End-to-end encryption for all payment and session data. PKI-based certificate management for ISO 15118 Plug & Charge. PCI-DSS compliant payment processing.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Lock, label: '256-bit TLS', sub: 'All communications' },
              { icon: Wifi, label: 'PCI-DSS', sub: 'Payment compliance' },
              { icon: Lock, label: 'ISO 15118', sub: 'PKI authentication' },
              { icon: Wifi, label: 'GDPR Ready', sub: 'Data privacy' },
            ].map((item) => (
              <div key={item.label} className="bg-ev-card2 rounded-xl p-4 border border-ev-lime/[0.08] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-ev-lime/[0.08] flex items-center justify-center flex-shrink-0">
                  <item.icon size={15} className="text-ev-lime" />
                </div>
                <div>
                  <div className="text-[0.85rem] font-600 text-ev-white" style={{ fontWeight: 600 }}>{item.label}</div>
                  <div className="text-[0.7rem] text-ev-muted">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal reveal-delay-1">
          <div className="bg-ev-card2 rounded-2xl border border-ev-lime/[0.1] overflow-hidden">
            <div className="px-6 py-4 border-b border-ev-lime/[0.08] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-ev-lime animate-pulse-slow" />
              <span className="text-[0.72rem] uppercase tracking-[0.15em] text-ev-lime font-500" style={{ fontWeight: 500 }}>Security Stack</span>
            </div>
            <div className="p-6">
              {[
                { layer: 'Application Layer',  tech: 'OAuth 2.0 + JWT tokens',       status: 'Active' },
                { layer: 'Transport Layer',    tech: 'TLS 1.3 end-to-end',           status: 'Active' },
                { layer: 'Charging Auth',      tech: 'ISO 15118 PKI certificates',   status: 'Active' },
                { layer: 'Payment Processing', tech: 'PCI-DSS Level 1 tokenisation', status: 'Active' },
                { layer: 'Data Storage',       tech: 'AES-256 at-rest encryption',   status: 'Active' },
                { layer: 'Network Security',   tech: 'VPN tunnels + firewall rules',  status: 'Active' },
                { layer: 'Intrusion Detection','tech': 'AI-powered anomaly detection', status: 'Active' },
              ].map((row) => (
                <div key={row.layer} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                  <div>
                    <div className="text-[0.82rem] font-500 text-ev-white" style={{ fontWeight: 500 }}>{row.layer}</div>
                    <div className="text-[0.72rem] text-ev-muted font-mono">{row.tech}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ev-lime" />
                    <span className="text-[0.65rem] text-ev-lime uppercase tracking-[0.1em]">{row.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Certifications() {
  const certs = [
    'BIS Certified', 'IEC 62196', 'OCPP 2.0', 'ISO 15118', 'CE Marked',
    'IP55 Rating', 'TÜV Rheinland', 'IS 17017', 'ISO 9001', 'UL Listed',
    'NABL Tested', 'MeitY Approved', 'PCI-DSS', 'ISO 27001', 'GDPR Ready', 'BEE Rated',
  ]

  return (
    <Section dark={false}>
      <SectionHeader
        center
        label="Certifications & Standards"
        title="Built to"
        highlight="global standards."
        subtitle="Every hardware unit, every software component, and every process is certified to the highest international and Indian standards."
      />
      <div className="flex flex-wrap justify-center gap-2">
        {certs.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="px-5 py-2.5 rounded-full border border-ev-lime/[0.1] bg-ev-card3 text-[0.78rem] text-ev-muted hover:border-ev-lime/30 hover:text-ev-lime hover:bg-ev-lime/[0.04] transition-all cursor-default font-400"
          >
            {c}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function RoadmapSection() {
  const items = [
    { q: 'Q1 2025', title: 'V2G Pilot Launch',       desc: 'Vehicle-to-Grid pilot in Bengaluru with 20 stations and Tata Nexon EV fleet.', done: true },
    { q: 'Q2 2025', title: '500 Stations Milestone',  desc: 'Expanding to 500 total charging points across 35 cities.', done: false },
    { q: 'Q3 2025', title: 'AI Route Optimisation',   desc: 'Predictive charging stop recommendations integrated into the EV Halt app.', done: false },
    { q: 'Q4 2025', title: 'Smart Grid Participation', desc: 'Demand response and grid balancing participation across all DC stations.', done: false },
  ]

  return (
    <Section dark>
      <SectionHeader label="Technology Roadmap" title="What's" highlight="coming next." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 border ${item.done ? 'border-ev-lime/25 bg-ev-lime/[0.04]' : 'border-ev-lime/[0.1] bg-ev-card2'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[0.65rem] uppercase tracking-[0.15em] font-500 ${item.done ? 'text-ev-lime' : 'text-ev-muted'}`} style={{ fontWeight: 500 }}>
                {item.q}
              </span>
              {item.done && <CheckCircle2 size={16} className="text-ev-lime" />}
            </div>
            <h3 className="font-display font-700 text-[1rem] text-ev-white mb-2" style={{ fontWeight: 700 }}>{item.title}</h3>
            <p className="text-[0.82rem] text-ev-muted leading-relaxed font-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default function Technology() {
  useReveal()
  return (
    <>
      <PageHero
        badge="OCPP 2.0 · ISO 15118 · V2G Ready"
        label="Technology"
        title="Built on world-class"
        titleHighlight="infrastructure."
        subtitle="From hardware to cloud, every layer of EV Halt is engineered for speed, reliability, and intelligence. Here's how it works."
        cta={{ label: 'View Certifications', to: '/technology#certs' }}
        ctaSecondary={{ label: 'Our Network', to: '/network' }}
      />
      <ChargingSpecs />
      <CloudPlatform />
      <SecuritySection />
      <Certifications />
      <RoadmapSection />
      <GradientDivider />
    </>
  )
}
