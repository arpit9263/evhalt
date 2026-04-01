import { motion } from 'framer-motion'
import { STATS, COMPANY, IMAGES, CONTACT } from '@/data/constants'
import { Zap, Home, Building2, Truck, Route, Sun, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReveal } from '@/hooks/useReveal'
import { PageHero, Section, SectionHeader, GradientDivider, DataRow } from '@/components/ui/UIComponents'

const SERVICES = [
  {
    icon: Home,
    title: 'Residential & Home',
    kw: '7.4 – 22 kW',
    tag: 'Homeowners',
    desc: 'Smart wallbox installation with solar sync, off-peak scheduling, and full app integration. Wake up to a full charge every day.',
    features: ['App-controlled scheduling', 'Solar PV integration', 'Energy usage reports', 'OTA firmware updates', 'RFID & app access'],
  },
  {
    icon: Building2,
    title: 'Commercial & Workplace',
    kw: '22 – 60 kW',
    tag: 'Offices & Malls',
    desc: 'Managed multi-point charging for offices, malls, hotels, and hospitality. RFID, app access, and white-label billing options.',
    features: ['Multi-point management', 'RFID & QR access', 'Billing & invoicing', 'White-label option', 'OCPP 2.0 platform'],
  },
  {
    icon: Truck,
    title: 'Fleet & Depot',
    kw: '60 – 150 kW',
    tag: 'Fleet Operators',
    desc: 'Custom high-density depot design for logistics, taxi, and rental fleets. Optimised for maximum vehicle throughput.',
    features: ['Depot design & build', 'Smart load balancing', 'Fleet billing API', 'Driver management', 'SLA-backed uptime'],
  },
  {
    icon: Route,
    title: 'Highway Ultra-Rapid',
    kw: 'Up to 150 kW',
    tag: 'Highway Corridors',
    desc: '150 kW DC fast chargers at strategic NH locations with rest facilities and real-time slot booking. 100 km range in 15 minutes.',
    features: ['CCS2 & CHAdeMO', 'Real-time availability', 'Slot pre-booking', 'Rest area amenities', '24/7 staffed support'],
  },
  {
    icon: Sun,
    title: 'Solar Canopy Stations',
    kw: 'Solar Hybrid',
    tag: 'Sustainability',
    desc: 'Our signature solar-integrated canopy stations. On-site generation feeds directly into our DC bus with battery buffer backup.',
    features: ['On-site PV generation', 'Battery buffer storage', 'Grid fallback', 'Carbon reporting', 'Net-zero certified'],
  },
  {
    icon: BarChart3,
    title: 'Energy Management SaaS',
    kw: 'Enterprise',
    tag: 'Operators',
    desc: 'Cloud dashboard for operators — live monitoring, predictive alerts, billing automation, and carbon reporting in one platform.',
    features: ['Live station dashboard', 'Predictive maintenance', 'Automated billing', 'Carbon certificates', 'REST API access'],
  },
]

function ServicesGrid() {
  return (
    <Section dark>
      <SectionHeader
        label="All Services"
        title="Every charging context,"
        highlight="covered."
        subtitle="From residential wallboxes to highway ultra-rapid hubs — the same exacting engineering standard throughout."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              className="group bg-ev-card2 rounded-2xl border border-ev-lime/[0.1] hover:border-ev-lime/25 transition-all duration-400 overflow-hidden hover:-translate-y-1"
            >
              {/* Header */}
              <div className="p-6 border-b border-ev-lime/[0.08]">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-ev-lime/[0.08] border border-ev-lime/20 flex items-center justify-center group-hover:bg-ev-lime/[0.15] transition-colors">
                    <Icon size={20} className="text-ev-lime" />
                  </div>
                  <span className="text-[0.62rem] uppercase tracking-[0.15em] text-ev-lime border border-ev-lime/25 px-2.5 py-1 rounded-full font-500" style={{ fontWeight: 500 }}>
                    {s.kw}
                  </span>
                </div>
                <div className="text-[0.6rem] uppercase tracking-[0.18em] text-ev-muted mb-2">{s.tag}</div>
                <h3 className="font-display font-700 text-[1.1rem] text-ev-white mb-3 leading-snug group-hover:text-ev-lime transition-colors" style={{ fontWeight: 700 }}>
                  {s.title}
                </h3>
                <p className="text-[0.84rem] text-ev-muted leading-relaxed font-300">{s.desc}</p>
              </div>
              {/* Features */}
              <div className="p-6">
                <ul className="space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[0.82rem] text-ev-muted">
                      <CheckCircle2 size={13} className="text-ev-lime flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t border-white/[0.05]">
                  <Link to="/contact" className="btn-ghost text-ev-lime hover:text-ev-white text-[0.82rem]">
                    Enquire now <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: 'Pay Per Use',
      price: '₹12',
      unit: 'per kWh',
      desc: 'No commitment. Charge when you need to.',
      features: ['No subscription needed', 'App, RFID & QR access', 'All charger types', 'Real-time billing receipt', 'Email support'],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Monthly Pass',
      price: '₹999',
      unit: 'per month',
      desc: 'Best value for regular EV drivers.',
      features: ['Unlimited AC sessions', '10% discount on all DC', 'Priority slot booking', 'Monthly invoice', 'Priority support'],
      cta: 'Subscribe Now',
      featured: true,
      badge: 'Most Popular',
    },
    {
      name: 'Annual Plus',
      price: '₹9,499',
      unit: 'per year',
      desc: 'Lock in our lowest per-kWh rates for 12 months.',
      features: ['Unlimited AC sessions', '15% discount on all DC', 'Priority everywhere', 'Annual invoice', 'Dedicated support'],
      cta: 'Go Annual',
      featured: false,
    },
    {
      name: 'Fleet Enterprise',
      price: 'Custom',
      unit: 'tailored pricing',
      desc: 'For fleets of 5+ vehicles or property operators.',
      features: ['Dedicated depot access', 'Volume-based rates', 'Billing API integration', 'Driver management portal', 'Account manager'],
      cta: 'Contact Sales',
      featured: false,
    },
  ]

  return (
    <Section dark={false} id="subscriptions">
      <SectionHeader
        center
        label="Pricing"
        title="Simple, transparent"
        highlight="pricing."
        subtitle="No hidden fees. No peak surcharges. Just fair rates for fast, reliable charging."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className={`relative rounded-2xl p-7 border flex flex-col ${
              plan.featured
                ? 'bg-ev-lime border-ev-lime'
                : 'bg-ev-card3 border-ev-lime/[0.1] hover:border-white/20 transition-colors'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ev-black text-ev-lime text-[0.6rem] uppercase tracking-[0.18em] px-3 py-1 rounded-full border border-ev-lime whitespace-nowrap font-600" style={{ fontWeight: 600 }}>
                {plan.badge}
              </div>
            )}
            <div className={`text-[0.62rem] uppercase tracking-[0.2em] mb-4 font-500 ${plan.featured ? 'text-ev-black/60' : 'text-ev-muted'}`} style={{ fontWeight: 500 }}>
              {plan.name}
            </div>
            <div className={`font-display font-800 text-[2.6rem] leading-none tracking-tight mb-1 ${plan.featured ? 'text-ev-black' : 'text-ev-white'}`} style={{ fontWeight: 800 }}>
              {plan.price}
            </div>
            <div className={`text-[0.75rem] mb-2 font-300 ${plan.featured ? 'text-ev-black/60' : 'text-ev-muted'}`}>{plan.unit}</div>
            <p className={`text-[0.78rem] mb-5 leading-snug font-300 ${plan.featured ? 'text-ev-black/70' : 'text-ev-muted'}`}>{plan.desc}</p>
            <div className={`h-px mb-5 ${plan.featured ? 'bg-ev-black/15' : 'bg-white/[0.06]'}`} />
            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[0.81rem]">
                  <CheckCircle2 size={13} className={plan.featured ? 'text-ev-black' : 'text-ev-lime'} />
                  <span className={plan.featured ? 'text-ev-black/80' : 'text-ev-muted'}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`w-full text-center py-3.5 rounded-full text-[0.82rem] font-600 block transition-all ${
                plan.featured
                  ? 'bg-ev-black text-ev-lime hover:bg-ev-card'
                  : 'border border-white/15 text-ev-white hover:border-ev-lime hover:text-ev-lime'
              }`}
              style={{ fontWeight: 600 }}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function PaymentMethods() {
  const methods = [
    { label: 'EV Halt App', desc: 'Scan QR or tap NFC to start session instantly' },
    { label: 'RFID Card', desc: 'Pre-registered card for tap-and-charge access' },
    { label: 'UPI & Cards', desc: 'Pay with any UPI, credit or debit card' },
    { label: 'Plug & Charge', desc: 'ISO 15118 auto-auth — just plug in, billing is automatic' },
  ]
  return (
    <Section dark id="payment">
      <SectionHeader label="Access & Payment" title="Multiple ways" highlight="to start charging" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {methods.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-ev-card2 rounded-2xl p-6 border border-ev-lime/[0.1] hover:border-ev-lime/20 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-ev-lime/[0.08] border border-ev-lime/20 flex items-center justify-center mb-4 group-hover:bg-ev-lime/15 transition-colors">
              <Zap size={18} className="text-ev-lime" />
            </div>
            <div className="font-display font-700 text-[1rem] text-ev-white mb-2" style={{ fontWeight: 700 }}>{m.label}</div>
            <p className="text-[0.82rem] text-ev-muted leading-relaxed font-300">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function FleetSection() {
  return (
    <Section dark={false} id="fleet">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="section-label-lime mb-4 reveal">Fleet Solutions</div>
          <h2 className="font-display text-h2 text-ev-white mb-5 reveal reveal-delay-1" style={{ fontWeight: 700 }}>
            Built for operators who<br />
            <span className="text-gradient-lime">can't afford downtime.</span>
          </h2>
          <p className="text-ev-muted leading-relaxed mb-8 font-300 reveal reveal-delay-2">
            Custom-engineered depot solutions for logistics, taxi, and rental fleets. Designed around your vehicles, your hours, and your SLA requirements — not a generic product.
          </p>
          <div className="space-y-0 border border-ev-lime/[0.1] rounded-2xl overflow-hidden reveal reveal-delay-3">
            {[
              ['Depot design & engineering', 'Included'],
              ['Smart load balancing AI', 'Included'],
              ['Fleet billing portal', 'Included'],
              ['Driver ID management', 'Included'],
              ['Uptime SLA', '99.5%+'],
              ['Support response time', '< 4 hours'],
            ].map(([k, v]) => (
              <DataRow key={k} label={k} value={v} highlight={v.includes('%') || v.includes('hour')} />
            ))}
          </div>
        </div>
        <div className="reveal reveal-delay-2">
          <div className="bg-ev-card3 rounded-2xl border border-ev-lime/[0.1] p-8">
            <div className="text-ev-lime text-[0.68rem] uppercase tracking-[0.2em] mb-6 font-500" style={{ fontWeight: 500 }}>Fleet Enquiry</div>
            <div className="space-y-4">
              {['Company Name', 'Number of Vehicles', 'Location / City', 'Contact Email'].map((field) => (
                <div key={field}>
                  <label className="text-[0.68rem] uppercase tracking-[0.15em] text-ev-muted block mb-2 font-400">{field}</label>
                  <input
                    type="text"
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full bg-ev-card2 border border-ev-lime/[0.12] rounded-xl px-4 py-3 text-[0.88rem] text-ev-white placeholder:text-ev-muted focus:outline-none focus:border-ev-lime/40 transition-colors"
                  />
                </div>
              ))}
              <Link to="/contact" className="btn-primary w-full justify-center mt-2 block text-center">
                Request Fleet Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default function Services() {
  useReveal()
  return (
    <>
      <PageHero
        badge="6 Service Categories"
        label="Services"
        title="Every charger."
        titleHighlight="Every context."
        subtitle="From home wallboxes to highway ultra-rapid hubs — EV charging infrastructure engineered for every scale and purpose."
        cta={{ label: 'View All Pricing', to: '/services#subscriptions' }}
        ctaSecondary={{ label: 'Fleet Solutions', to: '/services#fleet' }}
      />
      <ServicesGrid />
      <PricingSection />
      <PaymentMethods />
      <FleetSection />
      <GradientDivider />
    </>
  )
}
