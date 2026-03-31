import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import ScrollToTop from '@/components/ui/ScrollToTop'

import Home        from '@/pages/Home'
import About       from '@/pages/About'
import Services    from '@/pages/Services'
import Network     from '@/pages/Network'
import Technology  from '@/pages/Technology'
import Contact     from '@/pages/Contact'
import NotFound    from '@/pages/NotFound'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/about"      element={<AnimatedPage><About /></AnimatedPage>} />
            <Route path="/services"   element={<AnimatedPage><Services /></AnimatedPage>} />
            <Route path="/network"    element={<AnimatedPage><Network /></AnimatedPage>} />
            <Route path="/technology" element={<AnimatedPage><Technology /></AnimatedPage>} />
            <Route path="/contact"    element={<AnimatedPage><Contact /></AnimatedPage>} />
            <Route path="*"           element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
