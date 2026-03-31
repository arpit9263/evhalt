import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Zap, MapPin, Route, Handshake, Smartphone, CreditCard, Truck, Network, Info, Users, Newspaper, X, Menu, ArrowRight } from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  {
    label: 'Locations',
    children: [
      {
        links: [
          { icon: Network,   label: 'Our Network',      sub: 'Explore all charging stations',         to: '/network' },
          { icon: Route,     label: 'Route Planner',    sub: 'Plan your EV journey',                  to: '/network#planner' },
          { icon: Handshake, label: 'Partner With Us',  sub: 'Install EV Halt at your property',      to: '/contact' },
        ],
      },
      {
        image: true,
        headline: 'Drive anywhere.',
        sub: "India's fastest-growing highway charging corridor.",
        cta: { label: 'Explore Network', to: '/network' },
      },
    ],
  },
  {
    label: 'Charging',
    children: [
      {
        links: [
          { icon: Smartphone,   label: 'EV Halt App',      sub: 'Find, book and manage charging',     to: '/services#app' },
          { icon: Zap,          label: 'Subscriptions',    sub: 'Unlimited charging plans',           to: '/services#subscriptions' },
          { icon: Truck,        label: 'Fleet Solutions',  sub: 'High-density depot charging',        to: '/services#fleet' },
          { icon: CreditCard,   label: 'Access & Payment', sub: 'RFID, QR, app and roaming',          to: '/services#payment' },
        ],
      },
      {
        image: true,
        headline: 'Charge more. Pay less.',
        sub: 'Plans from ₹999/month. Unlimited AC sessions included.',
        cta: { label: 'View Plans', to: '/services' },
      },
    ],
  },
  {
    label: 'About',
    children: [
      {
        links: [
          { icon: Info,      label: 'About EV Halt', sub: 'Our story and mission',         to: '/about' },
          { icon: Users,     label: 'Careers',       sub: 'Join our growing team',         to: '/about#careers' },
          { icon: Newspaper, label: 'Newsroom',      sub: 'Latest news and press',         to: '/about#news' },
        ],
      },
      {
        image: true,
        headline: 'Join our team today.',
        sub: 'Building the future of electric mobility across India.',
        cta: { label: 'Open Roles', to: '/about#careers' },
      },
    ],
  },
]

const SIMPLE_LINKS = [
  { label: 'Technology', to: '/technology' },
]

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false)
  const [openMenu,     setOpenMenu]     = useState(null) // nav item label
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [mobileExpand, setMobileExpand] = useState(null)
  const headerRef = useRef(null)
  const location  = useLocation()

  // close on route change
  useEffect(() => { setOpenMenu(null); setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // close mega when clicking outside
  useEffect(() => {
    const fn = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const isActive = (to) => location.pathname === to

  return (
    <>
      {/* ── HEADER ── */}
      <header
        ref={headerRef}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-ev-black/95 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[70px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 bg-ev-lime rounded-sm flex items-center justify-center">
                <Zap size={18} className="text-ev-black fill-ev-black" strokeWidth={2.5} />
              </div>
              <span className="font-display font-800 text-xl text-ev-white tracking-tight leading-none" style={{ fontWeight: 800 }}>
                EV<span className="text-ev-lime">HALT</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={clsx(
                      'flex items-center gap-1.5 px-4 py-2 text-[0.82rem] font-body font-400 tracking-wide rounded-md transition-all duration-200',
                      openMenu === item.label
                        ? 'text-ev-white bg-white/[0.06]'
                        : 'text-ev-muted hover:text-ev-white hover:bg-white/[0.04]'
                    )}
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={clsx('transition-transform duration-200', openMenu === item.label ? 'rotate-180' : '')}
                    />
                  </button>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-ev-dark2/98 backdrop-blur-2xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl"
                        style={{ borderTop: '2px solid #c8ff00' }}
                        onMouseEnter={() => setOpenMenu(item.label)}
                        onMouseLeave={() => setOpenMenu(null)}
                      >
                        <div className="p-6 grid grid-cols-[1fr_220px] gap-6">
                          {/* Links col */}
                          <div className="space-y-1">
                            {item.children[0].links.map((link) => {
                              const Icon = link.icon
                              return (
                                <Link
                                  key={link.label}
                                  to={link.to}
                                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.05] transition-colors group/link"
                                  onClick={() => setOpenMenu(null)}
                                >
                                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/link:border-ev-lime/30 group-hover/link:bg-ev-lime/[0.06] transition-all">
                                    <Icon size={16} className="text-ev-muted group-hover/link:text-ev-lime transition-colors" />
                                  </div>
                                  <div>
                                    <div className="text-[0.88rem] font-body font-500 text-ev-white group-hover/link:text-ev-lime transition-colors leading-tight mb-0.5" style={{ fontWeight: 500 }}>
                                      {link.label}
                                    </div>
                                    <div className="text-[0.75rem] text-ev-muted leading-snug">{link.sub}</div>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>

                          {/* Image / promo col */}
                          {item.children[1]?.image && (
                            <div className="relative rounded-xl bg-ev-dark3 border border-white/[0.06] p-5 flex flex-col justify-end overflow-hidden">
                              {/* decorative grid */}
                              <div className="absolute inset-0 opacity-30"
                                style={{
                                  backgroundImage: 'linear-gradient(rgba(200,255,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.05) 1px, transparent 1px)',
                                  backgroundSize: '20px 20px'
                                }}
                              />
                              <div className="absolute top-4 right-4 w-10 h-10 bg-ev-lime/10 rounded-full flex items-center justify-center">
                                <Zap size={18} className="text-ev-lime" />
                              </div>
                              <div className="relative">
                                <div className="text-[0.88rem] font-display font-700 text-ev-white leading-snug mb-1.5" style={{ fontWeight: 700 }}>
                                  {item.children[1].headline}
                                </div>
                                <div className="text-[0.72rem] text-ev-muted leading-snug mb-4">
                                  {item.children[1].sub}
                                </div>
                                <Link
                                  to={item.children[1].cta.to}
                                  className="inline-flex items-center gap-1.5 text-ev-lime text-[0.75rem] font-500 hover:gap-2.5 transition-all"
                                  style={{ fontWeight: 500 }}
                                  onClick={() => setOpenMenu(null)}
                                >
                                  {item.children[1].cta.label}
                                  <ArrowRight size={13} />
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Simple links */}
              {SIMPLE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={clsx(
                    'px-4 py-2 text-[0.82rem] font-body font-400 tracking-wide rounded-md transition-all duration-200',
                    isActive(link.to) ? 'text-ev-white' : 'text-ev-muted hover:text-ev-white hover:bg-white/[0.04]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className="text-[0.78rem] font-body text-ev-muted hover:text-ev-white transition-colors px-3 py-2"
              >
                Support
              </Link>
              <Link
                to="/network"
                className="btn-primary text-[0.8rem] py-2.5 px-6"
              >
                <Zap size={14} className="fill-ev-black" strokeWidth={2} />
                Find Station
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-ev-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE NAV ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ev-black overflow-y-auto"
          >
            <div className="pt-[86px] pb-12 px-6">
              {/* Mobile nav items */}
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-white/[0.06]">
                  <button
                    className="flex items-center justify-between w-full py-4 text-ev-white text-[1rem] font-display font-600"
                    style={{ fontWeight: 600 }}
                    onClick={() => setMobileExpand(mobileExpand === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={18} className={clsx('transition-transform', mobileExpand === item.label ? 'rotate-180' : '')} />
                  </button>
                  <AnimatePresence>
                    {mobileExpand === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 space-y-1">
                          {item.children[0].links.map((link) => {
                            const Icon = link.icon
                            return (
                              <Link
                                key={link.label}
                                to={link.to}
                                className="flex items-center gap-3 py-3 px-2 text-ev-muted hover:text-ev-white transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                <Icon size={16} className="text-ev-lime" />
                                <span className="text-[0.9rem]">{link.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {SIMPLE_LINKS.map((link) => (
                <div key={link.label} className="border-b border-white/[0.06]">
                  <Link
                    to={link.to}
                    className="flex py-4 text-ev-white text-[1rem] font-display font-600"
                    style={{ fontWeight: 600 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}

              <div className="mt-8 space-y-3">
                <Link to="/network" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                  <Zap size={16} className="fill-ev-black" strokeWidth={2} />
                  Find a Station
                </Link>
                <Link to="/contact" className="btn-outline w-full justify-center" onClick={() => setMobileOpen(false)}>
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
