import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun, HomeIcon, Search, Heart, MessageSquare, User } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import Calculators from './pages/Calculators'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold text-2xl"
            >
              <span className="text-accent">Dwell</span>Point
            </motion.div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">Home</a>
            <a href="#buy" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">Buy</a>
            <a href="#rent" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">Rent</a>
            <a href="#sell" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">Sell</a>
            <a href="/calculators" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">Calculators</a>
            <a href="#agents" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">Agents</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-soft"
            >
              <User size={18} />
              <span>Sign In</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-surface-800 dark:text-white">DwellPoint</h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Find your perfect home with our comprehensive property listings and expert real estate services.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-surface-800 dark:text-white">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Buy Properties</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Rent Properties</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Sell Properties</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Find Agents</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-surface-800 dark:text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">About Us</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Contact</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Careers</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-surface-800 dark:text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 text-center text-sm text-surface-500 dark:text-surface-400">
            © {new Date().getFullYear()} DwellPoint. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-2 px-6 z-50 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <a href="/" className="flex flex-col items-center text-primary">
            <HomeIcon size={20} />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#search" className="flex flex-col items-center text-surface-600 dark:text-surface-400">
            <Search size={20} />
            <span className="text-xs mt-1">Search</span>
          </a>
          <a href="#saved" className="flex flex-col items-center text-surface-600 dark:text-surface-400">
            <Heart size={20} />
            <span className="text-xs mt-1">Saved</span>
          </a>
          <a href="#messages" className="flex flex-col items-center text-surface-600 dark:text-surface-400">
            <MessageSquare size={20} />
            <span className="text-xs mt-1">Messages</span>
          </a>
          <a href="#profile" className="flex flex-col items-center text-surface-600 dark:text-surface-400">
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App