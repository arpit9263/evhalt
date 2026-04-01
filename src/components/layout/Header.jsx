import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Zap, MapPin, Route, Handshake, Smartphone, CreditCard, Truck, Network, Info, Users, Newspaper, X, Menu, ArrowRight, Image } from 'lucide-react'
import clsx from 'clsx'
import { COMPANY, IMAGES, CONTACT } from '@/data/constants'

const NAV_ITEMS = [
  {
    label: 'Locations',
    children: [
      { links: [
        { icon: Network,   label: 'Our Network',      sub: 'Explore all charging stations', to: '/network' },
        { icon: Route,     label: 'Route Planner',    sub: 'Plan your EV journey',          to: '/network#planner' },
        { icon: Handshake, label: 'Partner With Us',  sub: 'Install EV Halt at your site',  to: '/contact' },
      ]},
      { image: true, headline: 'Drive anywhere.', sub: "India's fastest-growing highway charging corridor.", cta: { label: 'Explore Network', to: '/network' } },
    ],
  },
  {
    label: 'Charging',
    children: [
      { links: [
        { icon: Smartphone, label: 'EV Halt App',      sub: 'Find, book and manage charging', to: '/services#app' },
        { icon: Zap,        label: 'Subscriptions',    sub: 'Unlimited charging plans',       to: '/services#subscriptions' },
        { icon: Truck,      label: 'Fleet Solutions',  sub: 'High-density depot charging',    to: '/services#fleet' },
        { icon: CreditCard, label: 'Access & Payment', sub: 'RFID, QR, app and roaming',      to: '/services#payment' },
      ]},
      { image: true, headline: 'Charge more. Pay less.', sub: 'Plans from ₹999/month.', cta: { label: 'View Plans', to: '/services' } },
    ],
  },
  {
    label: 'About',
    children: [
      { links: [
        { icon: Info,      label: 'About EV Halt', sub: 'Our story and mission',   to: '/about' },
        { icon: Users,     label: 'Careers',       sub: 'Join our growing team',   to: '/about#careers' },
        { icon: Newspaper, label: 'Newsroom',      sub: 'Latest news and press',   to: '/about#news' },
        { icon: Image,     label: 'Gallery',       sub: 'Brand & station images',  to: '/gallery' },
      ]},
      { image: true, headline: 'Join our team.', sub: 'Building the future of electric mobility.', cta: { label: 'Open Roles', to: '/about#careers' } },
    ],
  },
]

const SIMPLE = [
  { label: 'Technology', to: '/technology' },
  { label: 'Gallery',    to: '/gallery' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExp, setMobileExp] = useState(null)
  const headerRef = useRef(null)
  const loc = useLocation()

  useEffect(() => { setOpenMenu(null); setMobileOpen(false) }, [loc.pathname])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    const fn = (e) => { if (headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <>
      <header ref={headerRef} className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-ev-black/96 backdrop-blur-xl border-b border-ev-lime/[0.08]' : 'bg-transparent'
      )}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">

            {/* LOGO — uses brand image */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <img src={IMAGES.logo} alt="EV Halt Logo"
                className="h-12 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(200,255,0,0.3))' }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback logo */}
              <div className="hidden items-center gap-2">
                <div className="bolt-icon w-7 h-8" />
                <span className="font-display font-extrabold text-xl text-ev-white tracking-tight">
                  EV<span className="text-ev-lime">HALT</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={clsx(
                      'flex items-center gap-1.5 px-4 py-2 text-[0.82rem] font-medium rounded-lg transition-all duration-200',
                      openMenu === item.label ? 'text-ev-lime bg-ev-lime/[0.08]' : 'text-ev-muted hover:text-ev-white hover:bg-white/[0.04]'
                    )}
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    {item.label}
                    <ChevronDown size={13} className={clsx('transition-transform duration-200', openMenu === item.label ? 'rotate-180 text-ev-lime' : '')} />
                  </button>

                  <AnimatePresence>
                    {openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] rounded-2xl overflow-hidden shadow-card"
                        style={{ background: 'rgba(17,20,18,0.98)', border: '1px solid rgba(200,255,0,0.12)', borderTop: '2px solid #C8FF00', backdropFilter: 'blur(24px)' }}
                        onMouseEnter={() => setOpenMenu(item.label)}
                        onMouseLeave={() => setOpenMenu(null)}
                      >
                        <div className="p-5 grid grid-cols-[1fr_180px] gap-4">
                          <div className="space-y-0.5">
                            {item.children[0].links.map((link) => {
                              const Icon = link.icon
                              return (
                                <Link key={link.label} to={link.to}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-ev-lime/[0.06] transition-colors group/l"
                                  onClick={() => setOpenMenu(null)}>
                                  <div className="w-8 h-8 rounded-lg bg-ev-card2 border border-ev-lime/[0.1] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/l:border-ev-lime/30 group-hover/l:bg-ev-lime/[0.08] transition-all">
                                    <Icon size={14} className="text-ev-muted group-hover/l:text-ev-lime transition-colors" />
                                  </div>
                                  <div>
                                    <div className="text-[0.86rem] font-semibold text-ev-white group-hover/l:text-ev-lime transition-colors leading-tight mb-0.5">{link.label}</div>
                                    <div className="text-[0.73rem] text-ev-muted leading-snug">{link.sub}</div>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                          {item.children[1]?.image && (
                            <div className="relative rounded-xl bg-ev-card3 border border-ev-lime/[0.08] p-4 flex flex-col justify-end overflow-hidden grid-bg-sm">
                              <div className="absolute top-3 right-3 w-8 h-8 bg-ev-lime/10 rounded-full flex items-center justify-center">
                                <Zap size={14} className="text-ev-lime" />
                              </div>
                              <div className="relative">
                                <div className="text-[0.85rem] font-bold text-ev-white leading-snug mb-1.5">{item.children[1].headline}</div>
                                <div className="text-[0.7rem] text-ev-muted leading-snug mb-3">{item.children[1].sub}</div>
                                <Link to={item.children[1].cta.to}
                                  className="inline-flex items-center gap-1 text-ev-lime text-[0.72rem] font-semibold hover:gap-2 transition-all"
                                  onClick={() => setOpenMenu(null)}>
                                  {item.children[1].cta.label} <ArrowRight size={11} />
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
              {SIMPLE.map((link) => (
                <Link key={link.label} to={link.to}
                  className={clsx('px-4 py-2 text-[0.82rem] font-medium rounded-lg transition-all duration-200',
                    loc.pathname === link.to ? 'text-ev-lime' : 'text-ev-muted hover:text-ev-white hover:bg-white/[0.04]')}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${CONTACT.phone}`} className="text-[0.76rem] text-ev-muted hover:text-ev-lime transition-colors font-medium px-2">
                {CONTACT.phoneDisplay}
              </a>
              <Link to="/network" className="btn-primary text-[0.78rem] py-2.5 px-5">
                <Zap size={13} className="fill-ev-black" strokeWidth={2} />
                Find Station
              </Link>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 text-ev-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{ background: 'rgba(10,11,10,0.99)', backdropFilter: 'blur(20px)' }}
          >
            <div className="pt-[84px] pb-12 px-5">
              {/* Mobile logo */}
              <div className="flex items-center gap-2 mb-8 pb-6 border-b border-ev-lime/[0.1]">
                <img src={IMAGES.logo} alt="EV Halt" className="h-8 w-auto object-contain" onError={(e)=>{e.target.style.display='none'}} />
              </div>

              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-ev-lime/[0.07]">
                  <button
                    className="flex items-center justify-between w-full py-4 text-ev-white text-[1rem] font-bold"
                    onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={17} className={clsx('transition-transform text-ev-muted', mobileExp === item.label ? 'rotate-180 text-ev-lime' : '')} />
                  </button>
                  <AnimatePresence>
                    {mobileExp === item.label && (
                      <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.3 }} className="overflow-hidden">
                        <div className="pb-4 space-y-1 pl-2">
                          {item.children[0].links.map((link) => {
                            const Icon = link.icon
                            return (
                              <Link key={link.label} to={link.to}
                                className="flex items-center gap-3 py-2.5 px-2 text-ev-muted hover:text-ev-white transition-colors rounded-lg hover:bg-ev-card2"
                                onClick={() => setMobileOpen(false)}>
                                <Icon size={15} className="text-ev-lime" />
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

              {SIMPLE.map((link) => (
                <div key={link.label} className="border-b border-ev-lime/[0.07]">
                  <Link to={link.to} className="flex py-4 text-ev-white text-[1rem] font-bold" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </div>
              ))}

              <div className="mt-8 space-y-3">
                <Link to="/network" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                  <Zap size={15} className="fill-ev-black" strokeWidth={2.5} />
                  Find a Station
                </Link>
                <Link to="/contact" className="btn-outline w-full justify-center" onClick={() => setMobileOpen(false)}>
                  Contact Us
                </Link>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center justify-center gap-2 text-ev-muted text-sm py-2">
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
