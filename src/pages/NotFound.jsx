import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="w-24 h-24 mx-auto bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center"
          >
            <span className="text-5xl font-bold text-primary">404</span>
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-surface-800 dark:text-white">Page Not Found</h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full btn btn-primary flex items-center justify-center gap-2"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="w-full btn btn-outline flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound