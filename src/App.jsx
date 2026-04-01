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
import Gallery     from '@/pages/Gallery'
import Contact     from '@/pages/Contact'
import NotFound    from '@/pages/NotFound'

const pv = {
  initial: { opacity:0, y:14 },
  animate: { opacity:1, y:0, transition:{ duration:.5, ease:[.16,1,.3,1] } },
  exit:    { opacity:0, y:-8, transition:{ duration:.22, ease:'easeIn' } },
}

function AP({ children }) {
  return <motion.div variants={pv} initial="initial" animate="animate" exit="exit">{children}</motion.div>
}

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top:0, behavior:'instant' }) }, [location.pathname])
  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<AP><Home /></AP>} />
            <Route path="/about"      element={<AP><About /></AP>} />
            <Route path="/services"   element={<AP><Services /></AP>} />
            <Route path="/network"    element={<AP><Network /></AP>} />
            <Route path="/technology" element={<AP><Technology /></AP>} />
            <Route path="/gallery"    element={<AP><Gallery /></AP>} />
            <Route path="/contact"    element={<AP><Contact /></AP>} />
            <Route path="*"           element={<AP><NotFound /></AP>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
