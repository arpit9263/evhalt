import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Clock, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { PageHero, Section, SectionHeader, GradientDivider } from '@/components/ui/UIComponents'

const FAQS = [
  { q: 'How do I find my nearest EV Halt station?', a: 'Download the EV Halt app (iOS or Android) and use the map tab to find real-time station availability near you. You can also visit our Network page to see all cities and highway corridors.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI (PhonePe, Google Pay, Paytm), all major credit/debit cards, EV Halt wallet, and RFID pre-paid tags. Subscribers can charge directly through the app. ISO 15118 Plug & Charge is also supported on compatible vehicles.' },
  { q: 'How long does a typical charge take?', a: 'With our 150 kW DC Ultra-Rapid chargers, most vehicles reach 80% in 20–30 minutes. DC Fast Charge (60 kW) takes approximately 45–60 minutes. AC charging at 22 kW depends on the vehicle\'s onboard charger speed (typically 1–4 hours).' },
  { q: 'Can I install an EV Halt charger at my property?', a: 'Yes! We work with property owners, malls, offices, and hospitality businesses. Fill out the form on this page or email partnerships@evhalt.in and our commercial team will get back to you within 24 hours.' },
  { q: 'How do I report a faulty charger?', a: 'Use the "Report Issue" button on any station page in the EV Halt app, or contact our 24/7 support at support@evhalt.in. Our field teams target a 4-hour response time for all faults.' },
  { q: 'What is Plug & Charge and which vehicles support it?', a: 'Plug & Charge (ISO 15118) allows your EV to authenticate and begin billing automatically when you plug in — no app or card needed. It\'s supported on Tata Nexon EV Max, MG ZS EV, Hyundai Ioniq 5, and more compatible vehicles.' },
  { q: 'Do you offer roaming with other EV networks?', a: 'Yes. EV Halt supports OCPI-based roaming. Drivers using Ather, TATA Power EZ Charge, or other compatible networks can access EV Halt stations through their native apps.' },
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1800)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-ev-lime flex items-center justify-center mb-6"
          style={{ boxShadow: '0 0 30px rgba(200,255,0,0.3)' }}>
          <CheckCircle2 size={28} className="text-ev-black" />
        </div>
        <h3 className="font-display font-700 text-[1.5rem] text-ev-white mb-3" style={{ fontWeight: 700 }}>Message Received</h3>
        <p className="text-ev-muted text-[0.9rem] max-w-[300px] leading-relaxed font-300">
          Our team will respond within one business day. We look forward to connecting with you.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { label: 'Full Name',     name: 'name',  type: 'text',  placeholder: 'Arjun Sharma' },
          { label: 'Email Address', name: 'email', type: 'email', placeholder: 'arjun@company.com' },
        ].map((f) => (
          <div key={f.name}>
            <label className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted block mb-2">{f.label}</label>
            <input
              type={f.type} name={f.name} value={form[f.name]} onChange={handle}
              placeholder={f.placeholder} required
              className="w-full bg-ev-dark3 border border-white/[0.08] rounded-xl px-4 py-3 text-[0.9rem] text-ev-white placeholder:text-ev-mid focus:outline-none focus:border-ev-lime/40 transition-colors"
            />
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted block mb-2">Phone Number</label>
          <input
            type="tel" name="phone" value={form.phone} onChange={handle}
            placeholder="+91 98765 43210"
            className="w-full bg-ev-dark3 border border-white/[0.08] rounded-xl px-4 py-3 text-[0.9rem] text-ev-white placeholder:text-ev-mid focus:outline-none focus:border-ev-lime/40 transition-colors"
          />
        </div>
        <div>
          <label className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted block mb-2">Enquiry Type</label>
          <select
            name="type" value={form.type} onChange={handle}
            className="w-full bg-ev-dark3 border border-white/[0.08] rounded-xl px-4 py-3 text-[0.9rem] text-ev-white focus:outline-none focus:border-ev-lime/40 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>Select type...</option>
            <option>Partnership / Franchise</option>
            <option>Install Charger at Property</option>
            <option>Fleet Charging Solution</option>
            <option>Technical Support</option>
            <option>Media / Press</option>
            <option>Investor Relations</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted block mb-2">Message</label>
        <textarea
          name="message" value={form.message} onChange={handle}
          placeholder="Tell us about your project or enquiry..."
          rows={5}
          className="w-full bg-ev-dark3 border border-white/[0.08] rounded-xl px-4 py-3 text-[0.9rem] text-ev-white placeholder:text-ev-mid focus:outline-none focus:border-ev-lime/40 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-[0.88rem] disabled:opacity-70"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-ev-black border-t-transparent animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={15} />
            Send Message
          </span>
        )}
      </button>
    </form>
  )
}

function ContactSection() {
  return (
    <Section dark>
      <div className="grid lg:grid-cols-[380px_1fr] gap-12">
        {/* Info sidebar */}
        <div className="reveal">
          <div className="section-label-lime mb-4">Get In Touch</div>
          <h2 className="font-display text-h2 text-ev-white mb-4 font-700" style={{ fontWeight: 700 }}>
            Let's build the<br />
            <span className="text-gradient-lime">EV future together.</span>
          </h2>
          <p className="text-ev-muted leading-relaxed mb-8 font-300">
            Partnership enquiries, franchise opportunities, fleet solutions, or just want to learn more — our team is ready to help.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: MapPin,
                label: 'Headquarters',
                value: 'EV Halt Technologies Pvt. Ltd.\n14th Floor, Prestige Tech Park\nBangalore – 560103, Karnataka',
              },
              { icon: Mail,  label: 'General Enquiries',  value: 'hello@evhalt.in' },
              { icon: Mail,  label: 'Partnerships',        value: 'partners@evhalt.in' },
              { icon: Phone, label: 'Sales & Commercial',  value: '+91 80 4567 8900' },
              { icon: Clock, label: 'Business Hours',      value: 'Mon – Sat, 9AM – 7PM IST\n24/7 Network Operations' },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-ev-lime/[0.08] border border-ev-lime/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={17} className="text-ev-lime" />
                </div>
                <div>
                  <div className="text-[0.62rem] uppercase tracking-[0.15em] text-ev-muted mb-1">{item.label}</div>
                  <div className="text-[0.88rem] text-ev-light leading-relaxed font-300 whitespace-pre-line">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <div className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted mb-3">Follow Us</div>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((s) => (
                <button key={s} className="px-3.5 py-2 rounded-xl border border-white/10 text-ev-muted text-[0.72rem] hover:border-ev-lime/30 hover:text-ev-lime transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-ev-dark2 rounded-2xl border border-white/[0.07] p-8 reveal reveal-delay-1">
          <h3 className="font-display font-700 text-[1.2rem] text-ev-white mb-6" style={{ fontWeight: 700 }}>Send us a message</h3>
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <Section dark={false}>
      <SectionHeader
        center
        label="FAQ"
        title="Common"
        highlight="questions."
        subtitle="Can't find what you're looking for? Email us at hello@evhalt.in"
      />
      <div className="max-w-[760px] mx-auto space-y-2">
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-ev-dark3 rounded-2xl border border-white/[0.07] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-[0.92rem] font-600 text-ev-white pr-4" style={{ fontWeight: 600 }}>
                {faq.q}
              </span>
              <span className="flex-shrink-0">
                {open === i
                  ? <ChevronUp size={18} className="text-ev-lime" />
                  : <ChevronDown size={18} className="text-ev-muted" />
                }
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5">
                <div className="h-px bg-white/[0.05] mb-4" />
                <p className="text-[0.88rem] text-ev-muted leading-relaxed font-300">{faq.a}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function OfficeMap() {
  return (
    <Section dark>
      <div className="rounded-2xl border border-white/[0.07] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #101608 100%)' }}
      >
        <div className="grid lg:grid-cols-2">
          {/* Map placeholder */}
          <div className="relative bg-ev-dark3 min-h-[320px] flex items-center justify-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(200,255,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,0.03) 1px,transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          >
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-ev-lime flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: '0 0 30px rgba(200,255,0,0.4)' }}>
                <MapPin size={24} className="text-ev-black" />
              </div>
              <div className="font-display font-700 text-ev-white text-[1rem] mb-1" style={{ fontWeight: 700 }}>Bangalore HQ</div>
              <div className="text-ev-muted text-[0.8rem]">Prestige Tech Park</div>
            </div>
            {/* Decorative nodes */}
            {[[20,30],[80,20],[10,70],[75,65],[45,85]].map(([l,t], i) => (
              <div key={i}
                className="absolute w-2 h-2 rounded-full bg-ev-lime/30 animate-pulse-slow"
                style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
          {/* Info */}
          <div className="p-10 lg:p-14">
            <div className="section-label-lime mb-4">Our Office</div>
            <h3 className="font-display font-700 text-[1.6rem] text-ev-white mb-4" style={{ fontWeight: 700 }}>
              Visit us in Bangalore
            </h3>
            <div className="space-y-4 mb-8">
              {[
                [MapPin, '14th Floor, Prestige Tech Park\nKadubeesanahalli, Marathahalli\nBangalore – 560103'],
                [Phone, '+91 80 4567 8900'],
                [Mail, 'hello@evhalt.in'],
                [Clock, 'Mon – Sat: 9 AM – 7 PM IST'],
              ].map(([Icon, text], i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Icon size={16} className="text-ev-lime mt-0.5 flex-shrink-0" />
                  <span className="text-[0.88rem] text-ev-muted font-300 whitespace-pre-line">{text}</span>
                </div>
              ))}
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              <MapPin size={15} />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default function Contact() {
  useReveal()
  return (
    <>
      <PageHero
        label="Contact Us"
        title="Let's start a"
        titleHighlight="conversation."
        subtitle="Partnership enquiries, franchise opportunities, fleet solutions, press, or just want to learn more about EV Halt — we'd love to hear from you."
      />
      <ContactSection />
      <FAQSection />
      <OfficeMap />
      <GradientDivider />
    </>
  )
}
