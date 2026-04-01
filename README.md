# EV Halt — Premium EV Charging Website

A production-ready, premium multipage React website for EV Halt — India's most advanced EV charging network. Inspired by IONITY.eu's design language and navigation pattern.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup & Run

```bash
# 1. Extract the ZIP and enter the project folder
cd evhalt

# 2. Install all dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview

# The /dist folder contains your deployable files
```

---

## 🌐 Deployment

The `/dist` folder after `npm run build` can be deployed to:

- **Vercel** — `vercel deploy` or drag-and-drop the `dist` folder
- **Netlify** — drag-and-drop `dist` folder or connect Git repo
- **AWS S3 + CloudFront** — upload `dist` contents to S3, enable static hosting
- **Nginx** — serve `dist` as static files

> ⚠️ For client-side routing (React Router), configure your host to redirect all routes to `index.html`

**Netlify** — add `public/_redirects`:
```
/*  /index.html  200
```

**Nginx** — add to your config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Vercel** — works automatically with zero config.

---

## 📁 Project Structure

```
evhalt/
├── public/
│   ├── favicon.svg
│   └── images/          ← Add hero-bg.jpg here (optional)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx     ← IONITY-style mega menu navigation
│   │   │   └── Footer.jsx
│   │   └── ui/
│   │       ├── Cursor.jsx     ← Custom animated cursor
│   │       ├── UIComponents.jsx ← PageHero, Section, FeatureCard, etc.
│   │       └── ScrollToTop.jsx
│   ├── hooks/
│   │   └── useReveal.js       ← Scroll reveal animations
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Network.jsx
│   │   ├── Technology.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx                ← React Router setup
│   ├── main.jsx
│   └── index.css              ← Tailwind + custom styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary accent | `#c8ff00` (EV Lime) |
| Background | `#080808` (EV Black) |
| Surface | `#0f0f0f`, `#161616` |
| Text primary | `#f0efed` |
| Text muted | `#8a8a8a` |
| Display font | Cabinet Grotesk |
| Body font | DM Sans |

---

## 📦 Key Libraries

| Library | Purpose |
|---------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Framer Motion | Page transitions & animations |
| Lucide React | Premium icon set |
| Tailwind CSS 3 | Utility-first CSS |
| clsx | Conditional classnames |

---

## 🖼️ Adding a Hero Background Image

For the best hero section, add a high-resolution EV charging station photo:

1. Save your image as `public/images/hero-bg.jpg`
2. The hero section will automatically use it with a dark overlay
3. Recommended: 1920×1080px or larger, dark/moody EV charging scene

---

## 📬 Making the Contact Form Live

The contact form currently simulates submission. To make it real:

1. Create a free account at [Formspree](https://formspree.io) or [EmailJS](https://emailjs.com)
2. In `src/pages/Contact.jsx`, find the `submit` function
3. Replace the `setTimeout` with your actual API call

```js
// Example with Formspree
const submit = async (e) => {
  e.preventDefault()
  setLoading(true)
  await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  setLoading(false)
  setSent(true)
}
```

---

Built with ❤️ for EV Halt Technologies Pvt. Ltd.
