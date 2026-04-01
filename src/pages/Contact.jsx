import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Clock, ChevronDown, ChevronUp, MessageCircle, CheckCircle2 } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { PageHero, Section, SectionHeader, GradientDivider } from '@/components/ui/UIComponents'
import { CONTACT, COMPANY, SOCIAL, buildWhatsAppURL } from '@/data/constants'

const FAQS = [
  { q: 'How do I find my nearest EV Halt station?', a: 'Download the EV Halt app (iOS or Android) and use the map tab. You can also visit our Network page to see all cities and highway corridors in real time.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI (PhonePe, Google Pay, Paytm), all major credit/debit cards, EV Halt wallet, and RFID pre-paid tags. ISO 15118 Plug & Charge is supported on compatible vehicles.' },
  { q: 'How long does a typical charge take?', a: 'With our 150 kW DC Ultra-Rapid chargers, most vehicles reach 80% in 20–30 minutes. DC Fast Charge (60 kW) takes ~45–60 minutes. AC at 22 kW depends on the vehicle onboard charger.' },
  { q: 'Can I install an EV Halt charger at my property?', a: 'Yes! We work with property owners, malls, offices, and hospitality businesses. Fill out the form or WhatsApp us and our commercial team will respond within 24 hours.' },
  { q: 'How do I report a faulty charger?', a: 'Use "Report Issue" in the EV Halt app, or contact our 24/7 support. Our field teams target a 4-hour response time for all faults.' },
  { q: 'What is Plug & Charge and which vehicles support it?', a: 'Plug & Charge (ISO 15118) auto-authenticates your EV when you plug in — no app or card needed. Supported on Tata Nexon EV Max, MG ZS EV, Hyundai Ioniq 5, and more.' },
]

function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', type:'', message:'' })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submitWhatsApp = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      alert('Please fill in your name and phone number.')
      return
    }
    const url = buildWhatsAppURL(form)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={submitWhatsApp} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="form-field-wrap">
          <label>Full Name *</label>
          <input type="text" name="name" value={form.name} onChange={handle} placeholder="Your full name" required className="form-input" />
        </div>
        <div className="form-field-wrap">
          <label>Phone Number *</label>
          <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" required className="form-input" />
        </div>
      </div>
      <div className="form-field-wrap">
        <label>Email Address</label>
        <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" className="form-input" />
      </div>
      <div className="form-field-wrap">
        <label>Enquiry Type</label>
        <div className="relative">
          <select name="type" value={form.type} onChange={handle} className="form-select form-input pr-10">
            <option value="" disabled>Select type...</option>
            <option>Partnership / Franchise</option>
            <option>Install Charger at Property</option>
            <option>Fleet Charging Solution</option>
            <option>Technical Support</option>
            <option>Media / Press</option>
            <option>Investor Relations</option>
            <option>Other</option>
          </select>
          <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-ev-muted pointer-events-none" />
        </div>
      </div>
      <div className="form-field-wrap">
        <label>Message</label>
        <textarea name="message" value={form.message} onChange={handle}
          placeholder="Tell us about your project or enquiry..." rows={4} className="form-textarea form-input" />
      </div>

      {/* WhatsApp submit */}
      <button type="submit"
        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-[0.9rem] transition-all duration-300"
        style={{ background: 'linear-gradient(135deg, #25D366, #1aad52)', color: '#fff' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.3)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
      >
        <MessageCircle size={18} fill="white" />
        Send via WhatsApp
      </button>

      <p className="text-center text-[0.72rem] text-ev-muted leading-relaxed">
        Tapping the button will open WhatsApp with your details pre-filled.<br />
        We respond within 24 hours.
      </p>
    </form>
  )
}

function ContactSection() {
  return (
    <Section dark>
      <div className="grid lg:grid-cols-[360px_1fr] gap-12">
        <div className="reveal">
          <div className="section-label mb-4">Get In Touch</div>
          <h2 className="text-h2 text-ev-white mb-4 font-bold">
            Let's build the<br />
            <span className="text-gradient">EV future together.</span>
          </h2>
          <p className="text-ev-muted leading-relaxed mb-8 font-light">
            Partnership enquiries, franchise opportunities, fleet solutions — our team responds within 24 hours.
          </p>
          <div className="space-y-5">
            {[
              { Icon: MapPin, label: 'Headquarters', value: CONTACT.address },
              { Icon: Phone,  label: 'Call Us',       value: CONTACT.phoneDisplay },
              { Icon: Mail,   label: 'Email',         value: CONTACT.email },
              { Icon: Clock,  label: 'Hours',         value: `${CONTACT.hours}\n${CONTACT.support}` },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-ev-lime/[0.08] border border-ev-lime/15 flex items-center justify-center flex-shrink-0">
                  <item.Icon size={17} className="text-ev-lime" />
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.15em] text-ev-muted mb-1 font-semibold">{item.label}</div>
                  <div className="text-[0.86rem] text-ev-light leading-relaxed font-light whitespace-pre-line">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-ev-lime/[0.08]">
            <div className="text-[0.6rem] uppercase tracking-[0.18em] text-ev-muted mb-3 font-semibold">WhatsApp Direct</div>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)' }}>
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-ev-card rounded-2xl border border-ev-lime/[0.1] p-7 reveal reveal-delay-1">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-ev-lime/[0.08]">
            <div className="w-2 h-2 rounded-full bg-ev-lime animate-pulse-slow" />
            <h3 className="font-bold text-[1.1rem] text-ev-white">Send us a message</h3>
            <span className="ml-auto text-[0.65rem] text-ev-muted uppercase tracking-[0.1em]">Opens in WhatsApp</span>
          </div>
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
      <SectionHeader center label="FAQ" title="Common" highlight="questions." subtitle={`Can't find what you're looking for? Email us at ${CONTACT.email}`} />
      <div className="max-w-[760px] mx-auto space-y-2">
        {FAQS.map((faq, i) => (
          <motion.div key={i} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}
            className="bg-ev-card rounded-2xl border border-ev-lime/[0.08] overflow-hidden">
            <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpen(open===i?null:i)}>
              <span className="text-[0.9rem] font-semibold text-ev-white pr-4">{faq.q}</span>
              {open === i ? <ChevronUp size={17} className="text-ev-lime flex-shrink-0" /> : <ChevronDown size={17} className="text-ev-muted flex-shrink-0" />}
            </button>
            <motion.div initial={false} animate={{ height: open===i ? 'auto' : 0, opacity: open===i ? 1 : 0 }} transition={{ duration:.3, ease:[.16,1,.3,1] }} className="overflow-hidden">
              <div className="px-6 pb-5">
                <div className="h-px bg-ev-lime/[0.07] mb-4" />
                <p className="text-[0.86rem] text-ev-muted leading-relaxed font-light">{faq.a}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
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
        subtitle="Partnership enquiries, franchise opportunities, fleet solutions, press — we'd love to hear from you. We respond via WhatsApp within 24 hours."
      />
      <ContactSection />
      <FAQSection />
      <GradientDivider />
    </>
  )
}
