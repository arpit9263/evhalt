import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

/* ── PAGE HERO ── */
export function PageHero({ label, title, titleHighlight, subtitle, cta, ctaSecondary, badge, dark = true, children }) {
  return (
    <section className={clsx('relative pt-[110px] pb-20 lg:pb-28 overflow-hidden', dark ? 'bg-ev-black' : 'bg-ev-dark2')}>
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,255,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,0.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent)',
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,255,0,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ev-lime/30 bg-ev-lime/[0.06] text-ev-lime text-[0.72rem] font-500 tracking-wide mb-5"
            style={{ fontWeight: 500 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ev-lime animate-pulse-slow" />
            {badge}
          </motion.div>
        )}
        {label && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="section-label-lime mb-4"
          >
            {label}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-h1 text-ev-white mb-5 max-w-[680px]"
          style={{ fontWeight: 800 }}
        >
          {title}
          {titleHighlight && <span className="text-gradient-lime block">{titleHighlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[1rem] text-ev-muted leading-relaxed max-w-[520px] mb-8 font-300"
          >
            {subtitle}
          </motion.p>
        )}
        {(cta || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {cta && <Link to={cta.to} className="btn-primary">{cta.label}<ArrowRight size={15} /></Link>}
            {ctaSecondary && <Link to={ctaSecondary.to} className="btn-outline">{ctaSecondary.label}</Link>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}

/* ── SECTION WRAPPER ── */
export function Section({ children, className = '', tight = false, dark = false, id }) {
  return (
    <section id={id} className={clsx(
      tight ? 'py-14 lg:py-20' : 'py-20 lg:py-28',
      dark ? 'bg-ev-dark2' : 'bg-ev-black',
      className
    )}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {children}
      </div>
    </section>
  )
}

/* ── SECTION HEADER ── */
export function SectionHeader({ label, title, highlight, subtitle, center = false, light = false }) {
  return (
    <div className={clsx('mb-14 lg:mb-16', center && 'text-center')}>
      {label && (
        <div className={clsx('mb-3', center && 'flex justify-center')}>
          <span className="section-label-lime">{label}</span>
        </div>
      )}
      <h2 className={clsx('font-display text-h2 mb-4', light ? 'text-ev-black' : 'text-ev-white')} style={{ fontWeight: 700 }}>
        {title}
        {highlight && <span className="text-gradient-lime"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className={clsx('text-[1rem] leading-relaxed max-w-[540px] font-300', light ? 'text-ev-mid' : 'text-ev-muted', center && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ── STAT CARD ── */
export function StatCard({ number, suffix = '', label, className = '' }) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="stat-number">
        {number}<span className="text-ev-lime">{suffix}</span>
      </div>
      <div className="text-[0.75rem] uppercase tracking-[0.18em] text-ev-muted mt-2 font-400">
        {label}
      </div>
    </div>
  )
}

/* ── FEATURE CARD ── */
export function FeatureCard({ icon: Icon, title, body, tag, className = '' }) {
  return (
    <div className={clsx(
      'gradient-border bg-ev-dark2 rounded-2xl p-7 card-hover border border-white/[0.06]',
      className
    )}>
      {Icon && (
        <div className="w-11 h-11 rounded-xl bg-ev-lime/[0.08] border border-ev-lime/20 flex items-center justify-center mb-5">
          <Icon size={20} className="text-ev-lime" />
        </div>
      )}
      {tag && (
        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-ev-lime/[0.08] text-ev-lime text-[0.65rem] uppercase tracking-[0.15em] mb-4 font-500" style={{ fontWeight: 500 }}>
          {tag}
        </div>
      )}
      <h3 className="font-display text-[1.1rem] font-600 text-ev-white mb-3 leading-snug" style={{ fontWeight: 600 }}>
        {title}
      </h3>
      <p className="text-[0.87rem] text-ev-muted leading-relaxed font-300">
        {body}
      </p>
    </div>
  )
}

/* ── TICKER STRIP ── */
export function TickerStrip({ items, dark = true }) {
  const doubled = [...items, ...items]
  return (
    <div className={clsx('py-4 overflow-hidden border-y', dark ? 'bg-ev-dark2 border-white/[0.06]' : 'bg-ev-lime border-transparent')}>
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className={clsx(
            'inline-flex items-center gap-3 px-8 text-[0.72rem] uppercase tracking-[0.18em] font-500 whitespace-nowrap',
            dark ? 'text-ev-muted' : 'text-ev-black'
          )} style={{ fontWeight: 500 }}>
            <span className={clsx('w-1 h-1 rounded-full', dark ? 'bg-ev-lime' : 'bg-ev-black/40')} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── LIVE BADGE ── */
export function LiveBadge({ label = 'Live Network' }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ev-lime/30 bg-ev-lime/[0.06]">
      <span className="w-1.5 h-1.5 rounded-full bg-ev-lime animate-pulse-slow" />
      <span className="text-ev-lime text-[0.65rem] uppercase tracking-[0.18em] font-500" style={{ fontWeight: 500 }}>
        {label}
      </span>
    </div>
  )
}

/* ── GRADIENT DIVIDER ── */
export function GradientDivider() {
  return (
    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,255,0,0.3), transparent)' }} />
  )
}

/* ── DATA ROW ── */
export function DataRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-0">
      <span className="text-[0.83rem] text-ev-muted font-300">{label}</span>
      <span className={clsx('text-[0.83rem] font-500 font-mono', highlight ? 'text-ev-lime' : 'text-ev-white')} style={{ fontWeight: 500 }}>
        {value}
      </span>
    </div>
  )
}
