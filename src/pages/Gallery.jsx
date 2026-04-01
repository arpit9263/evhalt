import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Tag } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { PageHero, Section, GradientDivider } from '@/components/ui/UIComponents'
import { IMAGES, COMPANY } from '@/data/constants'

// All gallery items — pulled from constants
const ALL_ITEMS = IMAGES.gallery

const TAGS = ['All', ...Array.from(new Set(ALL_ITEMS.map(i => i.tag)))]

export default function Gallery() {
  useReveal()
  const [activeTag, setActiveTag]   = useState('All')
  const [lightbox,  setLightbox]    = useState(null) // index
  const filtered = activeTag === 'All' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.tag === activeTag)

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox(i => (i + 1) % filtered.length)

  return (
    <>
      <PageHero
        badge="Brand & Station Imagery"
        label="Gallery"
        title={`${COMPANY.name} in`}
        titleHighlight="the real world."
        subtitle="A visual showcase of our charging infrastructure, brand identity, and the journey we're building across India."
      />

      <Section dark>
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 reveal">
          {TAGS.map((tag) => (
            <button key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-[0.75rem] uppercase tracking-[0.12em] font-semibold transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-ev-lime text-ev-black shadow-lime'
                  : 'bg-ev-card2 border border-ev-lime/[0.1] text-ev-muted hover:border-ev-lime/30 hover:text-ev-lime'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.label + i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`gallery-item ${i % 5 === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}
                onClick={() => setLightbox(i)}
              >
                <img src={item.src} alt={item.label}
                  onError={(e) => { e.target.src = '/images/station.jpeg' }}
                />
                <div className="gallery-overlay" />
                {/* Hover info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform opacity-0 hover:opacity-100"
                  style={{ background: 'linear-gradient(to top, rgba(10,11,10,0.9), transparent)' }}>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-ev-lime/10 border border-ev-lime/20 text-ev-lime text-[0.6rem] uppercase tracking-[0.15em] mb-2 font-semibold">
                    <Tag size={10} />
                    {item.tag}
                  </div>
                  <div className="text-ev-white text-[0.88rem] font-semibold leading-tight">{item.label}</div>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ev-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-ev-lime/20">
                  <ZoomIn size={14} className="text-ev-lime" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-ev-muted">No images in this category.</div>
        )}
      </Section>

      {/* Brand Story Section */}
      <Section dark={false}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-4 reveal">Our Visual Identity</div>
            <h2 className="text-h2 text-ev-white mb-5 font-bold reveal reveal-delay-1">
              A brand built on<br />
              <span className="text-gradient">speed and sustainability.</span>
            </h2>
            <p className="text-ev-muted leading-relaxed mb-6 font-light reveal reveal-delay-2">
              The EV Halt identity is rooted in the energy of motion — bold lime-yellow bolt, deep black infrastructure, and neon-lit stations that signal reliability at night. Every visual element communicates our core promise: Charge Fast, Go Far.
            </p>
            <div className="grid grid-cols-2 gap-4 reveal reveal-delay-3">
              {[
                { label: 'Brand Color', value: '#C8FF00 — Neon Lime', swatch: true },
                { label: 'Secondary',   value: '#F0FF00 — Bolt Yellow', swatch: true },
                { label: 'Background',  value: '#0A0B0A — Deep Black', swatch: true },
                { label: 'Typeface',    value: 'DM Sans — Bold' },
              ].map((b) => (
                <div key={b.label} className="bg-ev-card rounded-xl p-4 border border-ev-lime/[0.08]">
                  <div className="text-[0.6rem] uppercase tracking-[0.18em] text-ev-muted mb-1">{b.label}</div>
                  <div className="text-[0.82rem] text-ev-white font-medium leading-tight">{b.value}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Featured image */}
          <div className="reveal reveal-delay-1">
            <div className="gallery-item aspect-square group">
              <img src={IMAGES.brand} alt="EV Halt Brand" onError={(e) => { e.target.src = IMAGES.station }} />
              <div className="gallery-overlay" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-ev-lime text-[0.62rem] uppercase tracking-[0.18em] mb-1 font-semibold">Brand Identity</div>
                <div className="text-ev-white font-bold text-lg">{COMPANY.slogan}</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop"
            onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null) }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
              className="relative w-full max-w-4xl"
            >
              {/* Close */}
              <button onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-ev-card border border-ev-lime/20 flex items-center justify-center text-ev-muted hover:text-ev-lime hover:border-ev-lime transition-all z-10">
                <X size={18} />
              </button>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden border border-ev-lime/20 relative">
                <img
                  src={filtered[lightbox]?.src}
                  alt={filtered[lightbox]?.label}
                  className="w-full max-h-[75vh] object-contain bg-ev-card"
                  onError={(e) => { e.target.src = IMAGES.station }}
                />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: 'linear-gradient(to top, rgba(10,11,10,0.95), transparent)' }}>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-ev-lime/10 border border-ev-lime/20 text-ev-lime text-[0.6rem] uppercase tracking-[0.15em] mb-2 font-semibold">
                    <Tag size={10} />
                    {filtered[lightbox]?.tag}
                  </div>
                  <div className="text-ev-white font-bold text-lg">{filtered[lightbox]?.label}</div>
                  <div className="text-ev-muted text-sm mt-1">{lightbox + 1} / {filtered.length}</div>
                </div>
              </div>

              {/* Nav arrows */}
              {filtered.length > 1 && (
                <>
                  <button onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ev-black/80 border border-ev-lime/20 flex items-center justify-center text-ev-white hover:border-ev-lime hover:text-ev-lime transition-all backdrop-blur-sm">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ev-black/80 border border-ev-lime/20 flex items-center justify-center text-ev-white hover:border-ev-lime hover:text-ev-lime transition-all backdrop-blur-sm">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-1">
                {filtered.map((item, i) => (
                  <button key={i} onClick={() => setLightbox(i)}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${lightbox === i ? 'border-ev-lime shadow-lime' : 'border-ev-lime/10 opacity-50 hover:opacity-80'}`}>
                    <img src={item.src} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = IMAGES.station }} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GradientDivider />
    </>
  )
}
