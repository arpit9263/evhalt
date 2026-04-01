// ─────────────────────────────────────────────────────────────────
//  EV HALT — CENTRAL CONSTANTS FILE
//  Change details here once → updates everywhere automatically
// ─────────────────────────────────────────────────────────────────

export const COMPANY = {
  name:       'EV Halt',
  tagline:    'Charge Fast, Go Far',
  slogan:     'Your Journey Has Just Begun.',
  founded:    '2026',
  city:       'Gwaliar, India',
  website:    'www.evhalt.com',
}

// ── CONTACT DETAILS ──────────────────────────────────────────────
export const CONTACT = {
  phone:        '+91 8545098444',          // ← Change this
  phoneDisplay: '+91 85450 98444, +91 7000635972', // ← Formatted for display
  whatsapp:     '8545098444',             // ← WhatsApp number (no + or spaces)
  email:        'enquiry@evhalt.com',          // ← Change this
  emailPartner: 'enquiry@evhalt.com',
  emailSupport: 'support@evhalt.com',
    address:      '06, Vardan Apartment University Road, Gwaliar Madhya Pradesh 474011, India',
  addressShort: '06, Vardan Apartment, University Road, Gwaliar',
  hours:        'Mon – Sat, 9 AM – 7 PM IST',
  support:      '24/7 Network Operations',
}

// ── SOCIAL MEDIA ─────────────────────────────────────────────────
export const SOCIAL = {
  instagram: 'https://www.instagram.com/ev.halt?igsh=dzdyamg4ajg0bTJi&utm_source=ig_contact_invite',    // ← Change this
  twitter:   'https://twitter.com/evhalt',
  linkedin:  'https://linkedin.com/company/evhalt',
  youtube:   'https://youtube.com/@evhalt',
  facebook:  'https://facebook.com/evhalt',
}

// ── NETWORK STATS ─────────────────────────────────────────────────
export const STATS = {
  stations:  '350+',
  cities:    '28',
  highways:  '12',
  uptime:    '99.7%',
  maxPower:  '150 kW',
  countries: '1',
  drivers:   '50,000+',
}

// ── APP STORE LINKS ───────────────────────────────────────────────
export const APP = {
  ios:     'https://apps.apple.com/in/app/evhalt',     // ← Change
  android: 'https://play.google.com/store/apps/evhalt', // ← Change
  rating:  '4.8',
  reviews: '50,000+',
}

// ── BRAND COLORS (matches CSS variables) ─────────────────────────
export const COLORS = {
  lime:      '#C8FF00',
  limeYellow:'#A8D400',
  yellow:    '#F0FF00',
  black:     '#0A0B0A',
  darkCard:  '#111412',
  dark2:     '#161A14',
  dark3:     '#1C211A',
  border:    'rgba(200,255,0,0.12)',
  white:     '#F2F5EE',
  muted:     '#7A8A72',
}

// ── BRAND IMAGES ─────────────────────────────────────────────────
export const IMAGES = {
  logo:      '/images/logo.png',
  station:   '/images/station.jpeg',
  brand:     '/images/brand.jpeg',
  // Gallery images — add more paths here
  gallery: [
    { src: '/images/station.jpeg', label: 'EV Halt Station — Night View',   tag: 'Infrastructure' },
    { src: '/images/brand.jpeg',   label: 'EV Halt — Your Journey Begins',  tag: 'Branding' },
    { src: '/images/logo.png',    label: 'EV Halt Brand Identity',         tag: 'Brand' },
    { src: '/images/station.jpeg', label: 'AC & DC Fast Chargers',          tag: 'Technology' },
    { src: '/images/brand.jpeg',   label: 'Charge Fast, Go Far',            tag: 'Vision' },
    { src: '/images/station.jpeg', label: 'Solar Canopy Station',           tag: 'Sustainability' },
  ],
}

// ── NAVIGATION ────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Services',   to: '/services' },
  { label: 'Network',    to: '/network' },
  { label: 'Technology', to: '/technology' },
  { label: 'Gallery',    to: '/gallery' },
  { label: 'Contact',    to: '/contact' },
]

// ── WHATSAPP HELPER ───────────────────────────────────────────────
// Builds a WhatsApp URL with pre-filled message from form data
export const buildWhatsAppURL = (formData) => {
  const { name, email, phone, type, message } = formData
  const text = [
    `🔋 *New EV Halt Enquiry*`,
    ``,
    `*Name:* ${name || 'N/A'}`,
    `*Email:* ${email || 'N/A'}`,
    `*Phone:* ${phone || 'N/A'}`,
    `*Enquiry Type:* ${type || 'General'}`,
    `*Message:*`,
    message || 'No message provided',
    ``,
    `_Sent from evhalt.in contact form_`,
  ].join('\n')

  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
}

// ── FOOTER LINKS ──────────────────────────────────────────────────
export const FOOTER_LINKS = {
  Locations:  [
    { label: 'Our Network',    to: '/network' },
    { label: 'Route Planner',  to: '/network#planner' },
    { label: 'Partner With Us',to: '/contact' },
  ],
  Charging:   [
    { label: 'EV Halt App',    to: '/services#app' },
    { label: 'Subscriptions',  to: '/services#subscriptions' },
    { label: 'Fleet Solutions',to: '/services#fleet' },
    { label: 'AC Charging',    to: '/services' },
    { label: 'DC Fast Charge', to: '/services' },
  ],
  Company:    [
    { label: 'About Us',       to: '/about' },
    { label: 'Technology',     to: '/technology' },
    { label: 'Gallery',        to: '/gallery' },
    { label: 'Careers',        to: '/about#careers' },
    { label: 'Newsroom',       to: '/about#news' },
  ],
  Support:    [
    { label: 'Help Centre',    to: '/contact' },
    { label: 'Contact Us',     to: '/contact' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service',to: '#' },
  ],
}
