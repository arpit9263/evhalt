import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Zap,
  MapPin,
  Shield,
  Leaf,
  Clock,
  ChevronRight,
  Star,
  Play,
  Image as ImageIcon,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import {
  Section,
  SectionHeader,
  FeatureCard,
  TickerStrip,
  LiveBadge,
  GradientDivider,
} from "@/components/ui/UIComponents";
import { COMPANY, CONTACT, STATS, IMAGES } from "@/data/constants";

/* ── HERO ── */
function Hero() {
  const [counts, setCounts] = useState({ s: 0, c: 0, u: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const targets = { s: 350, c: 28, u: 99 };
    const dur = 2000,
      start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts({
        s: Math.round(targets.s * e),
        c: Math.round(targets.c * e),
        u: Math.round(targets.u * e),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden hero-bg"
      style={{ minHeight: "100svh" }}
    >
      {/* BG image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src={IMAGES.station}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.35, filter: "saturate(0.7) brightness(0.7)" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Color overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 60% 40%, rgba(200,255,0,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(168,212,0,0.04) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* Grid */}
      <div
        className="absolute inset-0 grid-bg pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0B0A)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative flex flex-col justify-center min-h-screen pt-[80px] pb-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <LiveBadge label={`India's #1 EV Charging Network`} />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-hero text-ev-white mb-5"
                style={{ fontWeight: 900 }}
              >
                Charge fast,
                <br />
                <span className="text-gradient">Go Far.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[1.05rem] text-ev-muted leading-relaxed max-w-[440px] mb-8 font-light"
              >
                {COMPANY.slogan} Ultra-fast, solar-powered EV charging across
                India.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3 mb-12"
              >
                <Link to="/network" className="btn-primary">
                  <MapPin size={15} /> Find Nearest Station
                </Link>
                <Link to="/services" className="btn-outline">
                  View Charging Plans
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-center gap-8 flex-wrap"
              >
                {[
                  { n: counts.s, suf: "+", l: "Stations" },
                  { n: counts.c, suf: "", l: "Cities" },
                  { n: counts.u, suf: "%", l: "Uptime" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span
                      className="font-extrabold leading-none text-ev-white"
                      style={{
                        fontSize: "clamp(2rem,4vw,2.8rem)",
                        letterSpacing: "-.04em",
                      }}
                    >
                      {s.n}
                      <span className="text-ev-lime">{s.suf}</span>
                    </span>
                    <span className="text-[0.66rem] uppercase tracking-[0.2em] text-ev-muted mt-1">
                      {s.l}
                    </span>
                  </div>
                ))}
                <div className="w-px h-10 bg-ev-lime/20 hidden md:block" />
                {/* Live indicator */}
                <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-ev-lime/15">
                  <span className="pulse-dot" />
                  <div>
                    <div className="text-[0.58rem] uppercase tracking-[0.18em] text-ev-muted">
                      Live Output
                    </div>
                    <div className="font-bold text-ev-lime text-[1.1rem] leading-tight">
                      {STATS.maxPower}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — Floating data cards */}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[0.58rem] uppercase tracking-[0.25em] text-ev-muted">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-ev-muted to-transparent" />
      </div>
    </section>
  );
}

/* ── ANIMATED COUNTER BAND ── */
function StatsBand() {
  const stats = [
    { n: STATS.stations, suf: "", l: "Charging Stations" },
    { n: STATS.maxPower, suf: "", l: "Peak Power Output" },
    { n: STATS.uptime, suf: "", l: "Network Uptime" },
    { n: STATS.cities, suf: "", l: "Cities Covered" },
  ];
  return (
    <div className="bg-ev-card border-y border-ev-lime/[0.08]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`py-10 px-6 flex flex-col ${i < stats.length - 1 ? "border-r border-ev-lime/[0.07]" : ""} hover:bg-ev-card2 transition-colors group`}
            >
              <div
                className="font-extrabold leading-none mb-2 text-gradient"
                style={{
                  fontSize: "clamp(2.4rem,4vw,3.6rem)",
                  letterSpacing: "-.04em",
                }}
              >
                {s.n}
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.18em] text-ev-muted">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── NETWORK PREVIEW ── */
function NetworkPreview() {
  return (
    <Section dark id="network-preview">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="reveal order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden border border-ev-lime/[0.1] bg-ev-card2 aspect-[4/3]">
            <div className="absolute inset-0 grid-bg-sm pointer-events-none" />
            <svg viewBox="0 0 400 380" className="w-full h-full p-5">
              <path
                d="M155,30 L220,28 L265,60 L285,100 L290,145 L272,190 L285,240 L265,288 L235,330 L210,358 L192,358 L172,330 L142,288 L112,240 L88,188 L98,150 L82,118 L102,80 L128,52 Z"
                fill="none"
                stroke="rgba(200,255,0,0.08)"
                strokeWidth="1.5"
              />
              {[
                [196, 295, 145, 210],
                [145, 210, 200, 98],
                [200, 98, 270, 180],
                [196, 295, 200, 262],
                [143, 212, 132, 232],
                [200, 98, 155, 120],
                [196, 295, 209, 328],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(200,255,0,0.06)"
                  strokeWidth="1"
                  strokeDasharray="4,6"
                />
              ))}
              {[
                { x: 196, y: 295, city: "Orai", major: true, d: "0s" },
                { x: 145, y: 210, city: "Gwalior", major: true, d: "0.5s" },
                { x: 203, y: 95, city: "Jhansi", major: true, d: "1s" },
                { x: 202, y: 262, city: "Hyderabad", major: false, d: "0.3s" },
                { x: 210, y: 328, city: "Chennai", major: false, d: "0.7s" },
                { x: 132, y: 232, city: "Pune", major: false, d: "0.9s" },
                { x: 142, y: 155, city: "Ahmedabad", major: false, d: "0.4s" },
                { x: 272, y: 178, city: "Kolkata", major: false, d: "0.6s" },
                { x: 160, y: 118, city: "Jaipur", major: false, d: "0.8s" },
              ].map((n) => (
                <g key={n.city}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.major ? 6 : 3.5}
                    fill={n.major ? "#C8FF00" : "rgba(200,255,0,0.45)"}
                    style={{
                      filter: n.major ? "drop-shadow(0 0 6px #C8FF00)" : "none",
                    }}
                  />
                  {n.major && (
                    <>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r="16"
                        fill="none"
                        stroke="#C8FF00"
                        strokeWidth="1"
                        opacity=".25"
                        style={{
                          animation: `mapRing 2.5s ease-out ${n.d} infinite`,
                        }}
                      />
                      <text
                        x={n.x + 9}
                        y={n.y + 4}
                        fill="rgba(200,212,192,0.6)"
                        fontSize="8.5"
                        fontFamily="DM Sans"
                        fontWeight="500"
                      >
                        {n.city}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>
            <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                <span className="text-[0.66rem] uppercase tracking-[0.15em] text-ev-lime font-semibold">
                  Network Live
                </span>
              </div>
              <span className="text-[0.72rem] text-ev-muted">
                {STATS.cities} cities · {STATS.stations} stations
              </span>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="section-label mb-4 reveal">Our Network</div>
          <h2 className="text-h2 text-ev-white mb-5 font-bold reveal reveal-delay-1">
            Everywhere you drive,
            <br />
            <span className="text-gradient">we're there.</span>
          </h2>
          <p className="text-ev-muted leading-relaxed mb-8 font-light reveal reveal-delay-2">
            {STATS.stations} charging stations across {STATS.cities} cities and{" "}
            {STATS.highways} national highway corridors. Methodically placed to
            cover every major route across India.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8 reveal reveal-delay-3">
            {[
              ["350+", "Total Stations"],
              ["150kW", "Peak Power"],
              ["12", "Highways"],
              ["99.7%", "Uptime SLA"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="bg-ev-card rounded-xl p-4 border border-ev-lime/[0.08] hover:border-ev-lime/20 transition-colors group"
              >
                <div
                  className="font-bold text-[1.5rem] text-ev-lime leading-tight mb-1 group-hover:text-ev-yellow transition-colors"
                  style={{ letterSpacing: "-.02em" }}
                >
                  {n}
                </div>
                <div className="text-[0.68rem] uppercase tracking-[0.12em] text-ev-muted">
                  {l}
                </div>
              </div>
            ))}
          </div>
          <Link to="/network" className="btn-primary reveal reveal-delay-4">
            Explore Network Map <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ── IMAGE GALLERY PREVIEW (Home) ── */
function GalleryPreview() {
  return (
    <Section dark={false}>
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="section-label mb-3 reveal">Brand Gallery</div>
          <h2 className="text-h2 text-ev-white font-bold reveal reveal-delay-1">
            See <span className="text-gradient">EV Halt</span> in action.
          </h2>
        </div>
        <Link
          to="/gallery"
          className="btn-ghost text-ev-lime hidden sm:flex reveal reveal-delay-2"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            src: IMAGES.station,
            label: "EV Halt Station — Night View",
            tag: "Infrastructure",
            span: "lg:col-span-2",
          },
          {
            src: IMAGES.brand,
            label: "Your Journey Has Just Begun",
            tag: "Branding",
            span: "",
          },
          {
            src: IMAGES.logo,
            label: "EV Halt Brand Identity",
            tag: "Brand",
            span: "",
          },
          {
            src: IMAGES.station,
            label: "DC Fast Charger — Close Up",
            tag: "Technology",
            span: "",
          },
          {
            src: IMAGES.brand,
            label: "Charge Fast, Go Far",
            tag: "Vision",
            span: "",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className={`gallery-item ${item.span} ${i === 0 ? "aspect-video" : "aspect-square"} group`}
            onClick={() => (window.location.href = "/gallery")}
          >
            <img
              src={item.src}
              alt={item.label}
              onError={(e) => {
                e.target.src = IMAGES.station;
              }}
            />
            <div className="gallery-overlay" />
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-ev-lime/10 border border-ev-lime/20 text-ev-lime text-[0.58rem] uppercase tracking-[0.12em] mb-1.5 font-semibold">
                {item.tag}
              </div>
              <div className="text-ev-white text-sm font-semibold leading-tight">
                {item.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Link to="/gallery" className="btn-ghost text-ev-lime">
          View All Images <ArrowRight size={14} />
        </Link>
      </div>
    </Section>
  );
}

/* ── FEATURES ── */
function Features() {
  const list = [
    {
      icon: Zap,
      title: "Ultra-Fast Charging",
      body: `Up to ${STATS.maxPower} DC. Add 100 km range in under 15 minutes at our flagship stations.`,
      tag: STATS.maxPower,
    },
    {
      icon: Leaf,
      title: "100% Renewable Energy",
      body: "Every EV Halt station is powered by solar and wind energy. Zero carbon, every charge.",
      tag: "Solar Powered",
    },
    {
      icon: Shield,
      title: "Plug & Charge Ready",
      body: "ISO 15118 auto-authentication. Just plug in — billing happens automatically.",
      tag: "ISO 15118",
    },
    {
      icon: Clock,
      title: `${STATS.uptime} Uptime`,
      body: "Real-time monitoring, predictive maintenance, 24/7 response teams. SLA guaranteed.",
      tag: `${STATS.uptime} SLA`,
    },
  ];
  return (
    <Section dark>
      <SectionHeader
        label="Why EV Halt"
        title="The standard for"
        highlight="EV charging in India"
        subtitle="We don't just install chargers. We build infrastructure that drivers trust, operators depend on, and cities are proud of."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {list.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <FeatureCard {...f} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── SUBSCRIPTION ── */
function SubscriptionCTA() {
  const plans = [
    {
      name: "Pay Per Use",
      price: "₹12",
      unit: "per kWh",
      features: [
        "No subscription",
        "App & RFID access",
        "Real-time billing",
        "All charger types",
      ],
      cta: "Start Now",
      featured: false,
    },
    {
      name: "Monthly Pass",
      price: "₹999",
      unit: "per month",
      features: [
        "Unlimited AC sessions",
        "10% DC discount",
        "Priority booking",
        "Monthly invoice",
      ],
      cta: "Subscribe",
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Fleet Enterprise",
      price: "Custom",
      unit: "tailored",
      features: [
        "Dedicated depots",
        "Volume pricing",
        "Billing API",
        "Account manager",
      ],
      cta: "Contact Sales",
      featured: false,
    },
  ];
  return (
    <Section dark={false} id="subscriptions">
      <SectionHeader
        center
        label="Subscriptions"
        title="Fast charging at"
        highlight="fair rates."
        subtitle="Simple, transparent pricing. No hidden fees, no peak surcharges."
      />
      <div className="grid md:grid-cols-3 gap-4 max-w-[900px] mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className={`relative rounded-2xl p-7 border flex flex-col transition-all ${plan.featured ? "border-ev-lime bg-ev-lime" : "bg-ev-card border-ev-lime/[0.1] hover:border-ev-lime/25"}`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ev-black text-ev-lime text-[0.6rem] uppercase tracking-[0.18em] px-3 py-1 rounded-full border border-ev-lime font-bold whitespace-nowrap">
                {plan.badge}
              </div>
            )}
            <div
              className={`text-[0.62rem] uppercase tracking-[0.2em] mb-4 font-semibold ${plan.featured ? "text-ev-black/60" : "text-ev-muted"}`}
            >
              {plan.name}
            </div>
            <div
              className={`font-extrabold leading-none mb-1 ${plan.featured ? "text-ev-black" : "text-ev-white"}`}
              style={{
                fontSize: "clamp(2.2rem,4vw,2.8rem)",
                letterSpacing: "-.04em",
              }}
            >
              {plan.price}
            </div>
            <div
              className={`text-[0.75rem] mb-5 font-light ${plan.featured ? "text-ev-black/60" : "text-ev-muted"}`}
            >
              {plan.unit}
            </div>
            <div
              className={`h-px mb-5 ${plan.featured ? "bg-ev-black/15" : "bg-ev-lime/[0.08]"}`}
            />
            <ul className="space-y-2.5 mb-7 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[0.82rem]">
                  <CheckCircle2Icon plan={plan} />
                  <span
                    className={
                      plan.featured ? "text-ev-black/80" : "text-ev-muted"
                    }
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className={`w-full text-center py-3.5 rounded-full text-[0.82rem] font-bold block transition-all ${plan.featured ? "bg-ev-black text-ev-lime hover:bg-ev-card" : "border border-ev-lime/20 text-ev-white hover:border-ev-lime hover:text-ev-lime"}`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
const CheckCircle2Icon = ({ plan }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle
      cx="6.5"
      cy="6.5"
      r="6"
      stroke={plan.featured ? "#0A0B0A" : "#C8FF00"}
      strokeWidth="1.2"
    />
    <path
      d="M3.5 6.5L5.5 8.5L9.5 4.5"
      stroke={plan.featured ? "#0A0B0A" : "#C8FF00"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── APP PROMOTION ── */
function AppPromo() {
  return (
    <Section dark id="app">
      <div
        className="relative rounded-3xl overflow-hidden border border-white/[0.06]"
        style={{
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #141a0a 50%, #0f0f0f 100%)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(200,255,0,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative px-8 py-14 lg:px-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label-lime mb-4 reveal">EV Halt App</div>
            <h2
              className="font-display text-h2 text-ev-white mb-5 reveal reveal-delay-1"
              style={{ fontWeight: 700 }}
            >
              Your charging journey
              <br />
              <span className="text-gradient-lime">in your pocket.</span>
            </h2>
            <p className="text-[1rem] text-ev-muted leading-relaxed mb-8 font-300 reveal reveal-delay-2">
              Find stations, book slots, monitor your charge in real-time,
              manage subscriptions, and track your carbon savings — all in the
              EV Halt app.
            </p>
            <div className="flex flex-wrap gap-3 reveal reveal-delay-3">
              {["iOS App Store", "Google Play"].map((store) => (
                <button
                  key={store}
                  className="flex items-center gap-2.5 bg-ev-dark2 border border-white/10 rounded-xl px-5 py-3 hover:border-ev-lime/30 transition-colors"
                >
                  <span className="text-ev-lime text-lg">
                    {store.includes("iOS") ? "" : "▶"}
                  </span>
                  <div className="text-left">
                    <div className="text-[0.58rem] text-ev-muted uppercase tracking-[0.1em]">
                      Download on
                    </div>
                    <div
                      className="text-[0.85rem] font-600 text-ev-white"
                      style={{ fontWeight: 600 }}
                    >
                      {store}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-6 reveal reveal-delay-4">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-ev-lime fill-ev-lime"
                  />
                ))}
              </div>
              <span className="text-[0.82rem] text-ev-muted">
                4.8 rating · 50,000+ downloads
              </span>
            </div>
          </div>

          {/* App mockup */}
          <div className="flex justify-center lg:justify-end reveal reveal-delay-1">
            <div className="relative w-[280px]">
              {/* Phone frame */}
              <div
                className="relative bg-ev-dark3 rounded-[40px] border border-white/10 p-2 shadow-2xl"
                style={{
                  boxShadow:
                    "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="bg-ev-black rounded-[32px] overflow-hidden"
                  style={{ aspectRatio: "9/19" }}
                >
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-24 h-1.5 bg-ev-dark3 rounded-full" />
                  </div>
                  {/* App UI mockup */}
                  <div className="px-4 pb-4 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-[0.55rem] text-ev-muted">
                          Good evening,
                        </div>
                        <div
                          className="text-[0.78rem] font-600 text-ev-white"
                          style={{ fontWeight: 600 }}
                        >
                          Arjun ⚡
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-ev-lime flex items-center justify-center">
                        <Zap
                          size={12}
                          className="text-ev-black fill-ev-black"
                        />
                      </div>
                    </div>
                    {/* Charge card */}
                    <div className="bg-ev-dark2 rounded-2xl p-3 border border-white/[0.06]">
                      <div className="text-[0.55rem] text-ev-muted mb-2">
                        Active Session — Koramangala
                      </div>
                      <div
                        className="font-display font-700 text-ev-lime text-[1.4rem] leading-none mb-1"
                        style={{ fontWeight: 700 }}
                      >
                        87 kW
                      </div>
                      <div className="text-[0.58rem] text-ev-muted mb-2">
                        Charging speed
                      </div>
                      {/* Progress bar */}
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-ev-lime rounded-full charge-animate"
                          style={{ width: "65%" }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-[0.55rem] text-ev-muted">
                          65%
                        </span>
                        <span className="text-[0.55rem] text-ev-lime">
                          ~18 min
                        </span>
                      </div>
                    </div>
                    {/* Map placeholder */}
                    <div className="bg-ev-dark3 rounded-xl h-[90px] border border-white/[0.04] flex items-center justify-center">
                      <div className="text-center">
                        <MapPin
                          size={16}
                          className="text-ev-lime mx-auto mb-1"
                        />
                        <div className="text-[0.55rem] text-ev-muted">
                          3 stations nearby
                        </div>
                      </div>
                    </div>
                    {/* Stations list */}
                    {["Koramangala · 0.2 km", "Indiranagar · 1.4 km"].map(
                      (s) => (
                        <div
                          key={s}
                          className="flex items-center justify-between bg-ev-dark3 rounded-xl px-3 py-2.5 border border-white/[0.04]"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-ev-lime" />
                            <span className="text-[0.65rem] text-ev-light">
                              {s}
                            </span>
                          </div>
                          <ChevronRight size={12} className="text-ev-muted" />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
              {/* Glow under phone */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(200,255,0,0.2), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const reviews = [
    {
      name: "Riya Sharma",
      city: "Bangalore",
      stars: 5,
      text: `EV Halt transformed my driving experience. I never worry about range — stations are always where I need them. The ${STATS.maxPower} chargers are phenomenal.`,
    },
    {
      name: "Kiran Mehta",
      city: "Mumbai",
      stars: 5,
      text: "The app is brilliant. Real-time availability, instant booking, and the charging speed is incredible. Best EV infrastructure in India.",
    },
    {
      name: "Priya Nair",
      city: "Hyderabad",
      stars: 5,
      text: "Used EV Halt from Hyderabad to Bangalore on NH-44 — stations every 100 km, all fast, all working. Impressive.",
    },
  ];
  return (
    <Section dark>
      <SectionHeader
        center
        label="Driver Reviews"
        title="Trusted by"
        highlight={`${STATS.drivers} EV drivers`}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="bg-ev-card rounded-2xl p-7 border border-ev-lime/[0.08] hover:border-ev-lime/20 transition-colors group"
          >
            <div className="flex mb-4">
              {Array.from({ length: r.stars }).map((_, j) => (
                <Star
                  key={j}
                  size={13}
                  className="text-ev-lime fill-ev-lime mr-0.5"
                />
              ))}
            </div>
            <p className="text-[0.88rem] text-ev-light leading-relaxed mb-6 font-light italic group-hover:text-ev-white transition-colors">
              "{r.text}"
            </p>
            <div>
              <div className="text-[0.88rem] font-semibold text-ev-white">
                {r.name}
              </div>
              <div className="text-[0.73rem] text-ev-muted">{r.city}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── CTA BAND ── */
function CTABand() {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(135deg, #C8FF00 0%, #F0FF00 40%, #A8D400 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg-sm pointer-events-none opacity-20" />
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.15), transparent)",
        }}
      />
      <div className="relative max-w-[1440px] mx-auto px-5 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="text-ev-black/50 text-[2rem] uppercase tracking-[0.15em] mb-2 font-bold">
            {COMPANY.name}
          </div>
          <h2
            className="font-extrabold text-ev-black leading-tight"
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              letterSpacing: "-.025em",
            }}
          >
            Your next charge
            <br />
            is closer than you think.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <Link
            to="/network"
            className="inline-flex items-center gap-2 bg-ev-black text-ev-lime font-bold text-[0.88rem] px-8 py-4 rounded-full hover:bg-ev-card transition-all hover:-translate-y-0.5"
          >
            <MapPin size={15} /> Find Nearest Station
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-ev-black/30 text-ev-black font-semibold text-[0.88rem] px-7 py-4 rounded-full hover:border-ev-black transition-all"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <TickerStrip
        items={[
          "AC Charging · 22kW",
          "DC Fast Charge · 60kW",
          "Ultra-Rapid · 150kW",
          "Solar Powered",
          "99.7% Uptime",
          "OCPP 2.0",
          "ISO 15118",
          "Plug & Charge",
          "Fleet Solutions",
          "App Control",
          "28 Cities",
          "350+ Stations",
        ]}
      />
      <StatsBand />
      <NetworkPreview />
      {/* <GalleryPreview /> */}
      <Features />
      <SubscriptionCTA />
      <AppPromo />
      <Testimonials />
      <GradientDivider />
      <CTABand />
    </>
  );
}
