import { Link } from 'react-router-dom'
import { Zap, MapPin, Mail, Phone, Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react'
import { COMPANY, CONTACT, SOCIAL, IMAGES, FOOTER_LINKS } from '@/data/constants'

export default function Footer() {
  return (
    <footer className="bg-ev-card border-t border-ev-lime/[0.08]">
      {/* CTA Strip */}
      <div className="border-b border-ev-lime/[0.06]"
        style={{ background: 'linear-gradient(135deg, rgba(200,255,0,0.04) 0%, transparent 50%)' }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-ev-lime text-[0.62rem] uppercase tracking-[0.22em] mb-2 font-semibold">{COMPANY.tagline}</div>
            <div className="font-extrabold text-2xl text-ev-white">
              Ready to <span className="text-gradient">charge smarter?</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/network" className="btn-primary text-sm">
              <Zap size={14} className="fill-ev-black" strokeWidth={2} />
              Find Nearest Station
            </Link>
            <Link to="/services" className="btn-outline text-sm">View Charging Plans</Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img src={IMAGES.logo} alt={COMPANY.name} className="h-12 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(200,255,0,0.3))' }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="hidden items-center gap-2">
                <div className="bolt-icon w-6 h-7" />
                <span className="font-extrabold text-lg text-ev-white">EV<span className="text-ev-lime">HALT</span></span>
              </div>
            </Link>
            <p className="text-[0.83rem] text-ev-muted leading-relaxed mb-5 max-w-[220px]">
              {COMPANY.tagline}. India's most advanced EV charging infrastructure.
            </p>
            <div className="space-y-2.5">
              {[
                [MapPin, CONTACT.addressShort],
                [Mail,   CONTACT.email],
                [Phone,  CONTACT.phoneDisplay],
              ].map(([Icon, val], i) => (
                <div key={i} className="flex items-start gap-2 text-[0.78rem] text-ev-muted">
                  <Icon size={13} className="text-ev-lime flex-shrink-0 mt-0.5" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="text-ev-lime text-[0.6rem] uppercase tracking-[0.22em] mb-4 font-semibold">{title}</div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[0.82rem] text-ev-muted hover:text-ev-lime transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-ev-lime/[0.06]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[0.73rem] text-ev-mid">
            © 2025 {COMPANY.name} Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            {[
              [Instagram, SOCIAL.instagram],
              [Twitter,   SOCIAL.twitter],
              [Linkedin,  SOCIAL.linkedin],
              [Youtube,   SOCIAL.youtube],
              [Facebook,  SOCIAL.facebook],
            ].map(([Icon, href], i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-ev-lime/[0.12] flex items-center justify-center text-ev-muted hover:border-ev-lime hover:text-ev-lime transition-all duration-200">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
