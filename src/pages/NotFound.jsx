import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ev-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-[480px]"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-ev-lime/[0.08] border border-ev-lime/20 flex items-center justify-center mx-auto mb-8">
          <Zap size={36} className="text-ev-lime" />
        </div>

        {/* 404 */}
        <div className="font-display font-900 text-[7rem] leading-none text-ev-dark3 mb-4 select-none"
          style={{ fontWeight: 900, letterSpacing: '-0.05em' }}>
          404
        </div>

        <h1 className="font-display font-700 text-[1.8rem] text-ev-white mb-4" style={{ fontWeight: 700 }}>
          Station not found
        </h1>
        <p className="text-ev-muted leading-relaxed mb-10 font-300">
          The page you're looking for doesn't exist or has been moved. Let's get you back on the road.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <ArrowLeft size={15} />
            Back to Home
          </Link>
          <Link to="/network" className="btn-outline">
            Find a Station
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
