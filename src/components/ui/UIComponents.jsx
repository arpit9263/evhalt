import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export function PageHero({ label, title, titleHighlight, subtitle, cta, ctaSecondary, badge, children }) {
  return (
    <section className="relative pt-[110px] pb-20 lg:pb-28 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,255,0,0.06) 0%, transparent 60%), var(--bg-base)' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none"
        style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,255,0,0.07) 0%, transparent 70%)' }} />
      <div className="relative max-w-[1440px] mx-auto px-5 lg:px-10">
        {badge && (
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ev-lime/25 bg-ev-lime/[0.06] text-ev-lime text-[0.7rem] font-semibold tracking-wide mb-5">
            <span className="pulse-dot" style={{ width:6, height:6 }} />
            {badge}
          </motion.div>
        )}
        {label && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5 }}
            className="section-label mb-4">{label}</motion.div>
        )}
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.1 }}
          className="text-h1 text-ev-white mb-5 max-w-[680px] font-extrabold">
          {title}
          {titleHighlight && <span className="text-gradient block">{titleHighlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.2 }}
            className="text-[1rem] text-ev-muted leading-relaxed max-w-[500px] mb-8 font-light">
            {subtitle}
          </motion.p>
        )}
        {(cta || ctaSecondary) && (
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.3 }}
            className="flex flex-wrap gap-3">
            {cta && <Link to={cta.to} className="btn-primary">{cta.label}<ArrowRight size={15} /></Link>}
            {ctaSecondary && <Link to={ctaSecondary.to} className="btn-outline">{ctaSecondary.label}</Link>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}

export function Section({ children, className='', tight=false, dark=false, id }) {
  return (
    <section id={id} className={clsx(tight ? 'py-14 lg:py-20' : 'py-20 lg:py-28', dark ? 'bg-ev-card' : 'bg-ev-black', className)}>
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">{children}</div>
    </section>
  )
}

export function SectionHeader({ label, title, highlight, subtitle, center=false }) {
  return (
    <div className={clsx('mb-12 lg:mb-16', center && 'text-center')}>
      {label && (
        <div className={clsx('mb-4', center && 'flex justify-center')}>
          <span className="section-label">{label}</span>
        </div>
      )}
      <h2 className="text-h2 text-ev-white mb-4 font-bold">
        {title}{highlight && <span className="text-gradient"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className={clsx('text-[1rem] leading-relaxed max-w-[520px] font-light text-ev-muted', center && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function FeatureCard({ icon: Icon, title, body, tag, className='' }) {
  return (
    <div className={clsx('card-base p-7 group', className)}>
      {Icon && (
        <div className="w-11 h-11 rounded-xl bg-ev-lime/[0.08] border border-ev-lime/15 flex items-center justify-center mb-5 group-hover:bg-ev-lime/[0.15] group-hover:border-ev-lime/30 transition-all">
          <Icon size={20} className="text-ev-lime" />
        </div>
      )}
      {tag && (
        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-ev-lime/[0.07] text-ev-lime text-[0.62rem] uppercase tracking-[0.15em] mb-4 font-semibold border border-ev-lime/15">
          {tag}
        </div>
      )}
      <h3 className="text-[1.05rem] font-bold text-ev-white mb-3 leading-snug group-hover:text-ev-lime transition-colors">
        {title}
      </h3>
      <p className="text-[0.86rem] text-ev-muted leading-relaxed font-light">{body}</p>
    </div>
  )
}

export function TickerStrip({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="py-3.5 overflow-hidden bg-ev-card border-y border-ev-lime/[0.08]">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-7 text-[0.7rem] uppercase tracking-[0.18em] font-semibold whitespace-nowrap text-ev-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-ev-lime flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function LiveBadge({ label='Live Network' }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ev-lime/25 bg-ev-lime/[0.06]">
      <span className="pulse-dot" style={{ width:6, height:6 }} />
      <span className="text-ev-lime text-[0.63rem] uppercase tracking-[0.18em] font-semibold">{label}</span>
    </div>
  )
}

export function GradientDivider() {
  return <div className="gradient-divider" />
}

export function DataRow({ label, value, highlight=false }) {
  return (
    <div className="spec-row">
      <span className="spec-key">{label}</span>
      <span className={highlight ? 'spec-val' : 'text-[0.82rem] text-ev-white font-medium'}>{value}</span>
    </div>
  )
}

export function StatNumber({ value, label, suffix='' }) {
  return (
    <div className="counter-widget">
      <div className="stat-number">{value}<span className="text-ev-lime">{suffix}</span></div>
      <div className="text-[0.68rem] uppercase tracking-[0.18em] text-ev-muted mt-2">{label}</div>
    </div>
  )
}
