import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Zap, Route, ChevronRight, Search } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { PageHero, Section, SectionHeader, GradientDivider, LiveBadge } from '@/components/ui/UIComponents'

const CITIES = [
  { name: 'Bengaluru',  state: 'Karnataka',   stations: 48, fast: 22, status: 'live' },
  { name: 'Mumbai',     state: 'Maharashtra', stations: 42, fast: 18, status: 'live' },
  { name: 'Delhi NCR',  state: 'Delhi',        stations: 38, fast: 15, status: 'live' },
  { name: 'Hyderabad',  state: 'Telangana',    stations: 35, fast: 16, status: 'live' },
  { name: 'Chennai',    state: 'Tamil Nadu',   stations: 30, fast: 12, status: 'live' },
  { name: 'Pune',       state: 'Maharashtra', stations: 28, fast: 11, status: 'live' },
  { name: 'Ahmedabad',  state: 'Gujarat',      stations: 24, fast:  9, status: 'live' },
  { name: 'Kolkata',    state: 'West Bengal',  stations: 22, fast:  8, status: 'live' },
  { name: 'Jaipur',     state: 'Rajasthan',    stations: 18, fast:  7, status: 'live' },
  { name: 'Kochi',      state: 'Kerala',       stations: 16, fast:  6, status: 'live' },
  { name: 'Chandigarh', state: 'Punjab',       stations: 14, fast:  5, status: 'live' },
  { name: 'Lucknow',    state: 'Uttar Pradesh',stations: 12, fast:  4, status: 'live' },
  { name: 'Indore',     state: 'M.P.',         stations: 10, fast:  4, status: 'coming' },
  { name: 'Nagpur',     state: 'Maharashtra',  stations:  8, fast:  3, status: 'coming' },
]

const HIGHWAYS = [
  { code: 'NH-48', route: 'Delhi → Mumbai',         km: '1,380',  stations: 18, status: 'live' },
  { code: 'NH-44', route: 'Delhi → Chennai',         km: '2,369',  stations: 22, status: 'live' },
  { code: 'NH-27', route: 'Mumbai → Kolkata',        km: '1,941',  stations: 16, status: 'live' },
  { code: 'NH-66', route: 'Mumbai → Kanyakumari',    km: '1,622',  stations: 14, status: 'live' },
  { code: 'NH-58', route: 'Delhi → Rishikesh',       km: '280',    stations:  6, status: 'live' },
  { code: 'NH-8',  route: 'Mumbai → Pune',           km: '148',    stations:  5, status: 'live' },
  { code: 'NH-12', route: 'Jaipur → Bhopal',         km: '660',    stations:  8, status: 'live' },
  { code: 'NH-16', route: 'Visakhapatnam → Chennai', km: '700',    stations:  9, status: 'coming' },
  { code: 'NH-6',  route: 'Kolkata → Nagpur',        km: '1,050',  stations: 11, status: 'coming' },
  { code: 'NH-53', route: 'Nagpur → Jagdalpur',      km: '1,076',  stations:  8, status: 'coming' },
  { code: 'NH-30', route: 'Patna → Raipur',          km: '598',    stations:  6, status: 'planned' },
  { code: 'NH-19', route: 'Delhi → Howrah',          km: '1,435',  stations: 14, status: 'planned' },
]

const MAP_NODES = [
  { x: 196, y: 295, city: 'Bengaluru',  major: true,  stations: 48 },
  { x: 143, y: 212, city: 'Mumbai',     major: true,  stations: 42 },
  { x: 200, y:  98, city: 'Delhi',      major: true,  stations: 38 },
  { x: 200, y: 262, city: 'Hyderabad',  major: true,  stations: 35 },
  { x: 209, y: 328, city: 'Chennai',    major: false, stations: 30 },
  { x: 130, y: 228, city: 'Pune',       major: false, stations: 28 },
  { x: 133, y: 158, city: 'Ahmedabad',  major: false, stations: 24 },
  { x: 270, y: 180, city: 'Kolkata',    major: false, stations: 22 },
  { x: 155, y: 120, city: 'Jaipur',     major: false, stations: 18 },
  { x: 230, y: 145, city: 'Lucknow',    major: false, stations: 12 },
  { x: 162, y: 230, city: 'Nashik',     major: false, stations: 10 },
  { x: 175, y: 198, city: 'Nagpur',     major: false, stations:  8 },
  { x: 126, y: 198, city: 'Surat',      major: false, stations:  9 },
  { x: 185, y: 352, city: 'Madurai',    major: false, stations:  7 },
]

function NetworkMap({ selected, onSelect }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0a0a0a]" style={{ aspectRatio: '4/3' }}>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,255,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,0.025) 1px,transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <svg viewBox="0 0 360 380" className="w-full h-full" style={{ padding: '16px' }}>
        {/* India outline */}
        <path
          d="M152,28 L218,26 L262,58 L282,98 L288,142 L270,188 L282,238 L262,284 L232,326 L206,355 L190,355 L170,326 L138,284 L108,238 L86,186 L96,148 L80,116 L100,78 L126,50 Z"
          fill="none" stroke="rgba(200,255,0,0.08)" strokeWidth="1.5"
        />
        {/* Connection lines between major cities */}
        {[
          [196,295, 143,212], [143,212, 200,98], [200,98, 270,180],
          [196,295, 200,262], [200,262, 209,328], [143,212, 130,228],
          [200,98,  155,120], [200,98, 230,145],  [196,295, 209,328],
        ].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(200,255,0,0.06)" strokeWidth="1" strokeDasharray="4,6" />
        ))}
        {/* Nodes */}
        {MAP_NODES.map((n) => (
          <g key={n.city} className="cursor-pointer" onClick={() => onSelect(n.city)}>
            {n.major && (
              <circle cx={n.x} cy={n.y} r="18" fill="none"
                stroke={selected === n.city ? '#c8ff00' : 'rgba(200,255,0,0.12)'}
                strokeWidth="1"
                style={{ animation: `mapPulse 3s ease-out ${Math.random() * 1.5}s infinite` }}
              />
            )}
            <circle
              cx={n.x} cy={n.y}
              r={selected === n.city ? (n.major ? 8 : 5) : (n.major ? 6 : 3.5)}
              fill={selected === n.city ? '#c8ff00' : (n.major ? '#c8ff00' : 'rgba(200,255,0,0.45)')}
              style={{
                filter: n.major ? `drop-shadow(0 0 ${selected === n.city ? '10px' : '5px'} #c8ff00)` : 'none',
                transition: 'all 0.3s',
              }}
            />
            {(n.major || selected === n.city) && (
              <text x={n.x + 9} y={n.y + 4} fill={selected === n.city ? '#c8ff00' : 'rgba(240,239,237,0.45)'}
                fontSize="8" fontFamily="DM Sans" style={{ pointerEvents: 'none' }}>
                {n.city}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Live status */}
      <div className="absolute top-4 left-4">
        <LiveBadge label="Live Network · India" />
      </div>

      {/* Selected city tooltip */}
      {selected && (() => {
        const node = MAP_NODES.find(n => n.city === selected)
        const city = CITIES.find(c => c.name.includes(selected))
        return node && (
          <div className="absolute bottom-4 right-4 glass-dark rounded-xl px-4 py-3 min-w-[150px]">
            <div className="text-ev-lime text-[0.62rem] uppercase tracking-[0.15em] mb-1 font-500" style={{ fontWeight: 500 }}>{selected}</div>
            <div className="font-display font-700 text-ev-white text-[1.1rem] leading-none" style={{ fontWeight: 700 }}>
              {city?.stations || node.stations}
              <span className="text-[0.65rem] text-ev-muted font-300 ml-1">stations</span>
            </div>
            {city && <div className="text-[0.65rem] text-ev-muted mt-0.5">{city.fast} DC fast</div>}
          </div>
        )
      })()}
    </div>
  )
}

function CityDirectory() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const filtered = CITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Section dark>
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Map */}
        <div className="reveal">
          <NetworkMap selected={selected} onSelect={setSelected} />
        </div>

        {/* City list */}
        <div className="reveal reveal-delay-1">
          <SectionHeader label="City Network" title="Find stations" highlight="in your city" />
          {/* Search */}
          <div className="relative mb-4">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ev-muted" />
            <input
              type="text"
              placeholder="Search city or state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-ev-dark2 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[0.88rem] text-ev-white placeholder:text-ev-mid focus:outline-none focus:border-ev-lime/40 transition-colors"
            />
          </div>
          {/* List */}
          <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a2a #080808' }}>
            {filtered.map((city, i) => (
              <div
                key={city.name}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl border cursor-pointer transition-all ${
                  selected === city.name
                    ? 'bg-ev-lime/[0.08] border-ev-lime/30'
                    : 'border-transparent hover:bg-ev-dark2 hover:border-white/[0.06]'
                }`}
                onClick={() => setSelected(selected === city.name ? null : city.name)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[0.6rem] text-ev-mid font-mono w-5">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="text-[0.9rem] font-600 text-ev-white leading-tight" style={{ fontWeight: 600 }}>{city.name}</div>
                    <div className="text-[0.7rem] text-ev-muted">{city.state}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <div className="font-display font-700 text-ev-lime text-[1rem] leading-tight" style={{ fontWeight: 700 }}>{city.stations}</div>
                    <div className="text-[0.6rem] text-ev-muted uppercase tracking-[0.1em]">Stations</div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="font-display font-700 text-ev-white text-[1rem] leading-tight" style={{ fontWeight: 700 }}>{city.fast}</div>
                    <div className="text-[0.6rem] text-ev-muted uppercase tracking-[0.1em]">DC Fast</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${city.status === 'live' ? 'bg-ev-lime animate-pulse-slow' : 'bg-ev-muted'}`} />
                    <span className={`text-[0.6rem] uppercase tracking-[0.1em] ${city.status === 'live' ? 'text-ev-lime' : 'text-ev-muted'}`}>
                      {city.status}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-ev-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function HighwayCorridors() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? HIGHWAYS : HIGHWAYS.filter(h => h.status === filter)

  return (
    <Section dark={false}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <div className="section-label-lime mb-2">Highway Network</div>
          <h2 className="font-display text-h2 text-ev-white font-700" style={{ fontWeight: 700 }}>
            Drive the length of India.<br />
            <span className="text-gradient-lime">Charge the whole way.</span>
          </h2>
        </div>
        <div className="flex gap-1.5 p-1 bg-ev-dark3 rounded-xl border border-white/[0.06]">
          {['all', 'live', 'coming', 'planned'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-[0.72rem] uppercase tracking-[0.1em] font-500 transition-all ${
                filter === f ? 'bg-ev-lime text-ev-black' : 'text-ev-muted hover:text-ev-white'
              }`}
              style={{ fontWeight: 500 }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {filtered.map((h, i) => (
          <motion.div
            key={h.code}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group flex items-center justify-between px-5 py-4 rounded-xl border border-white/[0.05] bg-ev-dark3 hover:bg-ev-dark2 hover:border-white/[0.1] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <span className="font-display font-700 text-ev-lime text-[1.05rem] w-16 flex-shrink-0" style={{ fontWeight: 700 }}>{h.code}</span>
              <div>
                <div className="text-[0.92rem] font-600 text-ev-white" style={{ fontWeight: 600 }}>
                  <Route size={12} className="inline mr-1.5 text-ev-muted" />{h.route}
                </div>
                <div className="text-[0.72rem] text-ev-muted mt-0.5">{h.km} km route</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <div className="font-display font-700 text-ev-white text-[1.1rem]" style={{ fontWeight: 700 }}>{h.stations}</div>
                <div className="text-[0.6rem] text-ev-muted uppercase tracking-[0.1em]">Stations</div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  h.status === 'live' ? 'bg-ev-lime animate-pulse-slow' :
                  h.status === 'coming' ? 'bg-yellow-400' : 'bg-ev-mid'
                }`} />
                <span className={`text-[0.68rem] uppercase tracking-[0.1em] ${
                  h.status === 'live' ? 'text-ev-lime' :
                  h.status === 'coming' ? 'text-yellow-400' : 'text-ev-mid'
                }`}>{h.status}</span>
              </div>
              <ChevronRight size={15} className="text-ev-muted group-hover:text-ev-lime transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function RoutePlanner() {
  return (
    <Section dark id="planner">
      <div className="rounded-3xl border border-white/[0.07] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #101608 100%)' }}
      >
        <div className="p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label-lime mb-4">Route Planner</div>
            <h2 className="font-display text-h2 text-ev-white mb-4 font-700" style={{ fontWeight: 700 }}>
              Plan your<br /><span className="text-gradient-lime">zero-range-anxiety trip.</span>
            </h2>
            <p className="text-ev-muted leading-relaxed mb-8 font-300">
              Enter your origin and destination. Our route planner finds the optimal charging stops along your journey, factoring in your vehicle's range and real-time station availability.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ev-lime/20 bg-ev-lime/[0.04] text-ev-lime text-[0.7rem] uppercase tracking-[0.15em] font-500" style={{ fontWeight: 500 }}>
              <Zap size={11} />
              Coming Soon in the EV Halt App
            </div>
          </div>
          <div className="bg-ev-dark3 rounded-2xl border border-white/[0.07] p-7">
            <div className="space-y-4">
              {[
                { label: 'From', placeholder: 'Starting city or location', icon: MapPin },
                { label: 'To',   placeholder: 'Destination city or location', icon: MapPin },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted block mb-2">{f.label}</label>
                  <div className="relative">
                    <f.icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ev-muted" />
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      className="w-full bg-ev-dark2 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[0.88rem] text-ev-white placeholder:text-ev-mid focus:outline-none focus:border-ev-lime/40 transition-colors"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="text-[0.62rem] uppercase tracking-[0.18em] text-ev-muted block mb-2">Vehicle Range (km)</label>
                <select className="w-full bg-ev-dark2 border border-white/10 rounded-xl px-4 py-3 text-[0.88rem] text-ev-white focus:outline-none focus:border-ev-lime/40 transition-colors appearance-none cursor-pointer">
                  <option value="300">Up to 300 km</option>
                  <option value="400">Up to 400 km</option>
                  <option value="500">Up to 500 km</option>
                  <option value="600">500+ km</option>
                </select>
              </div>
              <button className="btn-primary w-full justify-center">
                <Route size={15} />
                Plan My Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default function Network() {
  useReveal()
  return (
    <>
      <PageHero
        badge="350+ Stations Live"
        label="Our Network"
        title="Everywhere you drive,"
        titleHighlight="we're already there."
        subtitle="350+ charging points across 28 cities and 12 national highway corridors. India's most reliable EV charging network, growing every quarter."
        cta={{ label: 'Find a Station', to: '/network#directory' }}
        ctaSecondary={{ label: 'Plan a Route', to: '/network#planner' }}
      >
        {/* Network stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-[680px]"
        >
          {[['350+','Charging Points'],['28','Cities'],['12','NH Corridors'],['99.7%','Network Uptime']].map(([n,l]) => (
            <div key={l} className="bg-white/[0.04] rounded-xl px-4 py-4 border border-white/[0.06]">
              <div className="font-display font-800 text-ev-lime text-[1.6rem] leading-none mb-1" style={{ fontWeight: 800 }}>{n}</div>
              <div className="text-[0.65rem] uppercase tracking-[0.12em] text-ev-muted">{l}</div>
            </div>
          ))}
        </motion.div>
      </PageHero>
      <CityDirectory />
      <HighwayCorridors />
      <RoutePlanner />
      <GradientDivider />
    </>
  )
}
