import { Link } from 'react-router-dom'
import { Zap, MapPin, Mail, Phone, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'

const LINKS = {
  Locations:  [{ label: 'Our Network', to: '/network' }, { label: 'Route Planner', to: '/network#planner' }, { label: 'Partner With Us', to: '/contact' }],
  Charging:   [{ label: 'EV Halt App', to: '/services#app' }, { label: 'Subscriptions', to: '/services#subscriptions' }, { label: 'Fleet Solutions', to: '/services#fleet' }, { label: 'Access & Payment', to: '/services#payment' }],
  Company:    [{ label: 'About Us', to: '/about' }, { label: 'Technology', to: '/technology' }, { label: 'Careers', to: '/about#careers' }, { label: 'Newsroom', to: '/about#news' }],
  Support:    [{ label: 'Help Centre', to: '/contact' }, { label: 'Contact Us', to: '/contact' }, { label: 'Privacy Policy', to: '#' }, { label: 'Terms of Service', to: '#' }],
}

export default function Footer() {
  return (
    <footer className="bg-ev-dark border-t border-white/[0.06]">
      {/* Top CTA strip */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[0.68rem] uppercase tracking-[0.22em] text-ev-lime mb-2 font-500" style={{ fontWeight: 500 }}>India's Fastest EV Network</div>
            <div className="font-display font-700 text-2xl text-ev-white" style={{ fontWeight: 700 }}>
              Ready to <span className="text-gradient-lime">charge smarter?</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/network" className="btn-primary text-sm">
              <Zap size={14} className="fill-ev-black" strokeWidth={2} />
              Find Nearest Station
            </Link>
            <Link to="/services" className="btn-outline text-sm">
              View Charging Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-ev-lime rounded-sm flex items-center justify-center">
                <Zap size={18} className="text-ev-black fill-ev-black" strokeWidth={2.5} />
              </div>
              <span className="font-display font-800 text-xl text-ev-white" style={{ fontWeight: 800 }}>
                EV<span className="text-ev-lime">HALT</span>
              </span>
            </Link>
            <p className="text-[0.84rem] text-ev-muted leading-relaxed mb-6 max-w-[240px]">
              India's most advanced EV charging infrastructure. Charge Fast, Go Far.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[0.8rem] text-ev-muted">
                <MapPin size={14} className="text-ev-lime flex-shrink-0" />
                Prestige Tech Park, Bangalore – 560103
              </div>
              <div className="flex items-center gap-2.5 text-[0.8rem] text-ev-muted">
                <Mail size={14} className="text-ev-lime flex-shrink-0" />
                hello@evhalt.in
              </div>
              <div className="flex items-center gap-2.5 text-[0.8rem] text-ev-muted">
                <Phone size={14} className="text-ev-lime flex-shrink-0" />
                +91 80 4567 8900
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="text-[0.62rem] uppercase tracking-[0.22em] text-ev-lime mb-5 font-500" style={{ fontWeight: 500 }}>
                {title}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[0.84rem] text-ev-muted hover:text-ev-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[0.75rem] text-ev-mid">
            © 2025 EV Halt Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Twitter,   label: 'X / Twitter' },
              { Icon: Linkedin,  label: 'LinkedIn' },
              { Icon: Youtube,   label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-ev-mid hover:border-ev-lime hover:text-ev-lime transition-all duration-200"
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
