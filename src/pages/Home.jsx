import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, MapPin, Shield, Leaf, Clock, ChevronRight, Play, Star } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { Section, SectionHeader, StatCard, FeatureCard, TickerStrip, LiveBadge, GradientDivider } from '@/components/ui/UIComponents'

/* ── HERO VIDEO SECTION ── */
function Hero() {
  const [count, setCount]   = useState({ stations: 0, cities: 0, uptime: 0 })
  const heroRef             = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity             = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Animate counters on mount
  useEffect(() => {
    const targets = { stations: 350, cities: 28, uptime: 99 }
    const duration = 2000
    const start = Date.now()
    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount({
        stations: Math.round(targets.stations * eased),
        cities:   Math.round(targets.cities   * eased),
        uptime:   Math.round(targets.uptime   * eased),
      })
      if (progress < 1) requestAnimationFrame(animate)
    }
    const t = setTimeout(() => requestAnimationFrame(animate), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen min-h-[680px] max-h-[960px] overflow-hidden hero-gradient">
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-40"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {/* Fallback gradient when no image */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(200,255,0,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 60%, rgba(0,255,135,0.04) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,255,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,0.025) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative h-full flex flex-col justify-center pt-[70px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <LiveBadge label="India's #1 EV Charging Network" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-hero text-ev-white mb-5 max-w-[760px] leading-[0.95]"
            style={{ fontWeight: 900, letterSpacing: '-0.03em' }}
          >
            Charge faster,
            <span className="block text-gradient-lime">enjoy more.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[1.05rem] text-ev-muted leading-relaxed max-w-[460px] mb-10 font-300"
          >
            Ultra-fast, solar-powered EV charging across India. Built for drivers who demand more from every stop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            <Link to="/network" className="btn-primary text-[0.88rem]">
              <MapPin size={15} />
              Find Nearest Station
            </Link>
            <Link to="/services" className="btn-outline text-[0.88rem]">
              View Charging Plans
            </Link>
          </motion.div>

          {/* Live stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-10 flex-wrap"
          >
            {[
              { num: count.stations, suffix: '+', label: 'Charging Stations' },
              { num: count.cities,   suffix: '',  label: 'Cities Covered' },
              { num: count.uptime,   suffix: '%', label: 'Network Uptime' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display font-800 text-[2.8rem] text-ev-white leading-none tracking-tight" style={{ fontWeight: 800 }}>
                  {stat.num}<span className="text-ev-lime">{stat.suffix}</span>
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.2em] text-ev-muted mt-1">{stat.label}</span>
              </div>
            ))}

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-white/10 mx-4" />

            {/* Live charge indicator */}
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-ev-lime animate-pulse-slow" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-ev-lime opacity-30 animate-ping" />
              </div>
              <div>
                <div className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted">Live Output</div>
                <div className="font-display font-700 text-ev-lime text-[1.1rem] leading-tight" style={{ fontWeight: 700 }}>
                  142 kW
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-ev-mid">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-ev-mid to-transparent" />
      </motion.div>
    </section>
  )
}

/* ── NETWORK PREVIEW ── */
function NetworkPreview() {
  return (
    <Section dark id="network-preview">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Map */}
        <div className="reveal order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-ev-dark2 aspect-[4/3]">
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(200,255,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,0.04) 1px,transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* SVG Map */}
            <svg viewBox="0 0 400 380" className="w-full h-full" style={{ padding: '20px' }}>
              {/* India outline - simplified */}
              <path d="M155,30 L220,28 L265,60 L285,100 L290,145 L272,190 L285,240 L265,288 L235,330 L210,358 L192,358 L172,330 L142,288 L112,240 L88,188 L98,150 L82,118 L102,80 L128,52 Z"
                fill="none" stroke="rgba(200,255,0,0.1)" strokeWidth="1.5" />

              {/* Connection lines */}
              {[
                [196,295, 145,210], [145,210, 132,232], [132,232, 142,178],
                [145,210, 203,95],  [203,95,  145,210], [265,185, 145,210],
              ].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,255,0,0.08)" strokeWidth="1" />
              ))}

              {/* City nodes */}
              {[
                { x: 196, y: 295, city: 'Bengaluru', major: true,  delay: '0s' },
                { x: 145, y: 210, city: 'Mumbai',    major: true,  delay: '0.5s' },
                { x: 203, y:  95, city: 'Delhi NCR', major: true,  delay: '1s' },
                { x: 202, y: 262, city: 'Hyderabad', major: false, delay: '0.3s' },
                { x: 210, y: 330, city: 'Chennai',   major: false, delay: '0.7s' },
                { x: 132, y: 232, city: 'Pune',      major: false, delay: '0.9s' },
                { x: 142, y: 155, city: 'Ahmedabad', major: false, delay: '0.4s' },
                { x: 272, y: 178, city: 'Kolkata',   major: false, delay: '0.6s' },
                { x: 160, y: 118, city: 'Jaipur',    major: false, delay: '0.8s' },
                { x: 238, y: 130, city: 'Lucknow',   major: false, delay: '1.1s' },
              ].map((n) => (
                <g key={n.city}>
                  <circle cx={n.x} cy={n.y} r={n.major ? 6 : 3.5}
                    fill={n.major ? '#c8ff00' : 'rgba(200,255,0,0.5)'}
                    style={{ filter: n.major ? 'drop-shadow(0 0 6px #c8ff00)' : 'none' }}
                  />
                  {n.major && (
                    <>
                      <circle cx={n.x} cy={n.y} r="14" fill="none" stroke="#c8ff00"
                        strokeWidth="1" opacity="0.3"
                        style={{ animation: `mapPulse 2.5s ease-out ${n.delay} infinite` }}
                      />
                      <text x={n.x + 10} y={n.y + 4}
                        fill="rgba(240,239,237,0.5)" fontSize="8" fontFamily="DM Sans">
                        {n.city}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>

            {/* Status overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ev-lime animate-pulse-slow" />
                <span className="text-[0.68rem] uppercase tracking-[0.15em] text-ev-lime font-500" style={{ fontWeight: 500 }}>
                  Network Live
                </span>
              </div>
              <span className="text-[0.75rem] text-ev-muted">28 cities · 350+ stations</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <div className="section-label-lime mb-4 reveal">Our Network</div>
          <h2 className="font-display text-h2 text-ev-white mb-5 reveal reveal-delay-1" style={{ fontWeight: 700 }}>
            Everywhere you drive,<br />
            <span className="text-gradient-lime">we're already there.</span>
          </h2>
          <p className="text-[1rem] text-ev-muted leading-relaxed mb-8 font-300 reveal reveal-delay-2">
            350+ charging stations across 28 cities and 12 national highway corridors. Methodically placed to cover every major route across India.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 reveal reveal-delay-3">
            {[
              { n: '350+', l: 'Total Stations' },
              { n: '150kW', l: 'Peak Power' },
              { n: '12', l: 'Highway Corridors' },
              { n: '99.7%', l: 'Uptime SLA' },
            ].map((s) => (
              <div key={s.l} className="bg-ev-dark2 rounded-xl p-4 border border-white/[0.06]">
                <div className="font-display font-700 text-[1.6rem] text-ev-lime leading-tight mb-1" style={{ fontWeight: 700 }}>{s.n}</div>
                <div className="text-[0.72rem] uppercase tracking-[0.12em] text-ev-muted">{s.l}</div>
              </div>
            ))}
          </div>

          <Link to="/network" className="btn-primary reveal reveal-delay-4">
            Explore Network Map <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Section>
  )
}

/* ── SERVICES STRIP ── */
function ServicesStrip() {
  const services = [
    { icon: Zap,    title: 'AC Smart Charging',   kw: 'Up to 22 kW',  desc: 'Overnight and destination charging for homes, offices, and malls.' },
    { icon: Zap,    title: 'DC Fast Charging',     kw: 'Up to 60 kW',  desc: 'Rapid top-up at retail locations and transit hubs.' },
    { icon: Zap,    title: 'Ultra-Fast DC',         kw: 'Up to 150 kW', desc: '100km of range in under 15 minutes. Our fastest stations.' },
    { icon: Leaf,   title: 'Solar Canopy',          kw: 'Solar Hybrid', desc: 'On-site solar generation with battery buffer storage.' },
    { icon: Shield, title: 'Fleet Depot',           kw: 'Custom',       desc: 'High-density managed charging for commercial fleets.' },
  ]

  return (
    <Section dark={false}>
      <SectionHeader
        label="Charging Solutions"
        title="Power for every"
        highlight="journey & purpose"
        subtitle="From home wallboxes to highway ultra-rapid hubs — every solution built to the same exacting standard."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="group gradient-border bg-ev-dark3 rounded-2xl p-6 border border-white/[0.06] hover:border-ev-lime/20 transition-all duration-400 hover:-translate-y-1"
          >
            <div className="inline-flex px-2.5 py-1 rounded-md bg-ev-lime/[0.08] text-ev-lime text-[0.62rem] uppercase tracking-[0.12em] mb-5 font-500" style={{ fontWeight: 500 }}>
              {s.kw}
            </div>
            <h3 className="font-display font-600 text-[1rem] text-ev-white mb-2 leading-snug group-hover:text-ev-lime transition-colors" style={{ fontWeight: 600 }}>
              {s.title}
            </h3>
            <p className="text-[0.82rem] text-ev-muted leading-relaxed font-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/services" className="btn-ghost text-ev-lime hover:text-white">
          View all charging solutions <ArrowRight size={15} />
        </Link>
      </div>
    </Section>
  )
}

/* ── WHY EV HALT ── */
function WhyEvHalt() {
  const features = [
    { icon: Zap,    title: 'Ultra-Fast Charging',    body: 'Up to 150kW DC fast charging. Add 100km of range in under 15 minutes at our flagship stations.', tag: '150 kW' },
    { icon: Leaf,   title: '100% Renewable Energy',  body: 'Every EV Halt station is powered by solar and wind energy. Zero carbon, every charge.', tag: 'Solar Powered' },
    { icon: Shield, title: 'Plug & Charge Ready',    body: 'ISO 15118 Plug & Charge authentication. Just plug in — billing happens automatically.', tag: 'ISO 15118' },
    { icon: Clock,  title: '24/7 Network Uptime',    body: 'Real-time monitoring, predictive maintenance, and rapid response teams. 99.7% SLA guaranteed.', tag: '99.7% Uptime' },
  ]

  return (
    <Section dark id="why">
      <SectionHeader
        label="Why EV Halt"
        title="The standard for"
        highlight="EV charging in India"
        subtitle="We don't just install chargers. We build infrastructure that drivers trust, operators depend on, and cities are proud of."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <FeatureCard {...f} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ── SUBSCRIPTION CTA ── */
function SubscriptionCTA() {
  const plans = [
    {
      name: 'Pay Per Use',
      price: '₹12',
      unit: 'per kWh',
      features: ['No subscription', 'App & RFID access', 'Real-time billing', 'All charger types'],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Monthly Pass',
      price: '₹999',
      unit: 'per month',
      features: ['Unlimited AC sessions', '10% DC discount', 'Priority booking', 'Monthly invoice'],
      cta: 'Subscribe Now',
      featured: true,
    },
    {
      name: 'Fleet Enterprise',
      price: 'Custom',
      unit: 'tailored pricing',
      features: ['Dedicated depots', 'Volume pricing', 'Billing API', 'Dedicated support'],
      cta: 'Contact Us',
      featured: false,
    },
  ]

  return (
    <Section dark={false} id="subscriptions">
      <SectionHeader
        center
        label="Subscriptions"
        title="Fast charging at"
        highlight="fair rates"
        subtitle="Simple, transparent pricing. No hidden fees, no peak surcharges."
      />

      <div className="grid md:grid-cols-3 gap-5 max-w-[960px] mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className={`relative rounded-2xl p-7 border transition-all ${
              plan.featured
                ? 'bg-ev-lime border-ev-lime text-ev-black'
                : 'bg-ev-dark2 border-white/[0.08] text-ev-white hover:border-white/20'
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ev-black text-ev-lime text-[0.62rem] uppercase tracking-[0.18em] px-3 py-1 rounded-full border border-ev-lime font-500" style={{ fontWeight: 500 }}>
                Most Popular
              </div>
            )}
            <div className={`text-[0.65rem] uppercase tracking-[0.2em] mb-5 font-500 ${plan.featured ? 'text-ev-black/60' : 'text-ev-muted'}`} style={{ fontWeight: 500 }}>
              {plan.name}
            </div>
            <div className={`font-display font-800 text-[3rem] leading-none tracking-tight mb-1 ${plan.featured ? 'text-ev-black' : 'text-ev-white'}`} style={{ fontWeight: 800 }}>
              {plan.price}
            </div>
            <div className={`text-[0.78rem] mb-7 font-300 ${plan.featured ? 'text-ev-black/60' : 'text-ev-muted'}`}>{plan.unit}</div>
            <div className={`h-px mb-6 ${plan.featured ? 'bg-ev-black/15' : 'bg-white/[0.06]'}`} />
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[0.84rem]">
                  <span className={`text-[0.7rem] font-700 ${plan.featured ? 'text-ev-black' : 'text-ev-lime'}`}>✓</span>
                  <span className={plan.featured ? 'text-ev-black/80' : 'text-ev-muted'}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className={`w-full text-center py-3.5 rounded-full text-[0.82rem] font-600 block transition-all ${
                plan.featured
                  ? 'bg-ev-black text-ev-lime hover:bg-ev-dark'
                  : 'border border-white/20 text-ev-white hover:border-ev-lime hover:text-ev-lime'
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

/* ── APP PROMOTION ── */
function AppPromo() {
  return (
    <Section dark id="app">
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.06]"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #141a0a 50%, #0f0f0f 100%)' }}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(200,255,0,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative px-8 py-14 lg:px-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label-lime mb-4 reveal">EV Halt App</div>
            <h2 className="font-display text-h2 text-ev-white mb-5 reveal reveal-delay-1" style={{ fontWeight: 700 }}>
              Your charging journey<br />
              <span className="text-gradient-lime">in your pocket.</span>
            </h2>
            <p className="text-[1rem] text-ev-muted leading-relaxed mb-8 font-300 reveal reveal-delay-2">
              Find stations, book slots, monitor your charge in real-time, manage subscriptions, and track your carbon savings — all in the EV Halt app.
            </p>
            <div className="flex flex-wrap gap-3 reveal reveal-delay-3">
              {['iOS App Store', 'Google Play'].map((store) => (
                <button key={store} className="flex items-center gap-2.5 bg-ev-dark2 border border-white/10 rounded-xl px-5 py-3 hover:border-ev-lime/30 transition-colors">
                  <span className="text-ev-lime text-lg">{store.includes('iOS') ? '' : '▶'}</span>
                  <div className="text-left">
                    <div className="text-[0.58rem] text-ev-muted uppercase tracking-[0.1em]">Download on</div>
                    <div className="text-[0.85rem] font-600 text-ev-white" style={{ fontWeight: 600 }}>{store}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-6 reveal reveal-delay-4">
              <div className="flex">
                {[0,1,2,3,4].map(i => <Star key={i} size={14} className="text-ev-lime fill-ev-lime" />)}
              </div>
              <span className="text-[0.82rem] text-ev-muted">4.8 rating · 50,000+ downloads</span>
            </div>
          </div>

          {/* App mockup */}
          <div className="flex justify-center lg:justify-end reveal reveal-delay-1">
            <div className="relative w-[280px]">
              {/* Phone frame */}
              <div className="relative bg-ev-dark3 rounded-[40px] border border-white/10 p-2 shadow-2xl" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}>
                <div className="bg-ev-black rounded-[32px] overflow-hidden" style={{ aspectRatio: '9/19' }}>
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-24 h-1.5 bg-ev-dark3 rounded-full" />
                  </div>
                  {/* App UI mockup */}
                  <div className="px-4 pb-4 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-[0.55rem] text-ev-muted">Good evening,</div>
                        <div className="text-[0.78rem] font-600 text-ev-white" style={{ fontWeight: 600 }}>Arjun ⚡</div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-ev-lime flex items-center justify-center">
                        <Zap size={12} className="text-ev-black fill-ev-black" />
                      </div>
                    </div>
                    {/* Charge card */}
                    <div className="bg-ev-dark2 rounded-2xl p-3 border border-white/[0.06]">
                      <div className="text-[0.55rem] text-ev-muted mb-2">Active Session — Koramangala</div>
                      <div className="font-display font-700 text-ev-lime text-[1.4rem] leading-none mb-1" style={{ fontWeight: 700 }}>
                        87 kW
                      </div>
                      <div className="text-[0.58rem] text-ev-muted mb-2">Charging speed</div>
                      {/* Progress bar */}
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full bg-ev-lime rounded-full charge-animate" style={{ width: '65%' }} />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-[0.55rem] text-ev-muted">65%</span>
                        <span className="text-[0.55rem] text-ev-lime">~18 min</span>
                      </div>
                    </div>
                    {/* Map placeholder */}
                    <div className="bg-ev-dark3 rounded-xl h-[90px] border border-white/[0.04] flex items-center justify-center">
                      <div className="text-center">
                        <MapPin size={16} className="text-ev-lime mx-auto mb-1" />
                        <div className="text-[0.55rem] text-ev-muted">3 stations nearby</div>
                      </div>
                    </div>
                    {/* Stations list */}
                    {['Koramangala · 0.2 km', 'Indiranagar · 1.4 km'].map((s) => (
                      <div key={s} className="flex items-center justify-between bg-ev-dark3 rounded-xl px-3 py-2.5 border border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-ev-lime" />
                          <span className="text-[0.65rem] text-ev-light">{s}</span>
                        </div>
                        <ChevronRight size={12} className="text-ev-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Glow under phone */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(200,255,0,0.2), transparent)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const reviews = [
    { name: 'Riya Sharma', city: 'Bangalore', stars: 5, text: 'EV Halt transformed my driving experience. I never worry about range anymore — stations are always where I need them.' },
    { name: 'Kiran Mehta', city: 'Mumbai', stars: 5, text: 'The app is brilliant. Real-time availability, instant booking, and the charging speed is incredible. Best EV infrastructure in India.' },
    { name: 'Priya Nair', city: 'Hyderabad', stars: 5, text: 'Used EV Halt from Hyderabad to Bangalore via NH-44 — stations every 100km, all fast, all working. Impressive reliability.' },
  ]

  return (
    <Section dark={false}>
      <SectionHeader
        center
        label="Driver Reviews"
        title="Trusted by"
        highlight="50,000+ EV drivers"
      />
      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="bg-ev-dark3 rounded-2xl p-7 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
          >
            <div className="flex mb-4">
              {Array.from({ length: r.stars }).map((_, j) => (
                <Star key={j} size={14} className="text-ev-lime fill-ev-lime mr-0.5" />
              ))}
            </div>
            <p className="text-[0.9rem] text-ev-light leading-relaxed mb-6 font-300 italic">"{r.text}"</p>
            <div>
              <div className="text-[0.88rem] font-600 text-ev-white" style={{ fontWeight: 600 }}>{r.name}</div>
              <div className="text-[0.75rem] text-ev-muted">{r.city}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ── CTA BAND ── */
function CTABand() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: 'linear-gradient(135deg, #c8ff00 0%, #a3ff00 50%, #00ff87 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.05) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="text-ev-black/50 text-[0.68rem] uppercase tracking-[0.22em] mb-2 font-500" style={{ fontWeight: 500 }}>
            India's #1 EV Network
          </div>
          <h2 className="font-display font-800 text-[clamp(2rem,4vw,3.2rem)] text-ev-black leading-tight tracking-tight" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Your next charge<br />is closer than you think.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <Link to="/network"
            className="inline-flex items-center gap-2 bg-ev-black text-ev-lime font-600 text-[0.88rem] px-8 py-4 rounded-full hover:bg-ev-dark transition-all hover:-translate-y-0.5"
            style={{ fontWeight: 600 }}
          >
            <MapPin size={15} />
            Find Nearest Station
          </Link>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-ev-black/30 text-ev-black font-500 text-[0.88rem] px-7 py-4 rounded-full hover:border-ev-black transition-all"
            style={{ fontWeight: 500 }}
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── MAIN EXPORT ── */
export default function Home() {
  useReveal()
  return (
    <>
      <Hero />
      <TickerStrip items={['AC Charging · 22kW', 'DC Fast Charge · 60kW', 'Ultra-Rapid · 150kW', 'Solar Powered', '99.7% Uptime', 'OCPP 2.0', 'ISO 15118', 'Plug & Charge', 'Fleet Solutions', 'App Control']} />
      <NetworkPreview />
      <ServicesStrip />
      <WhyEvHalt />
      <SubscriptionCTA />
      <AppPromo />
      <Testimonials />
      <GradientDivider />
      <CTABand />
    </>
  )
}
