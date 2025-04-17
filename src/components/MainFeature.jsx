import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, DollarSign, Home, Calendar, Percent, HelpCircle, X, ArrowRight } from 'lucide-react'

function MainFeature() {
  const [loanAmount, setLoanAmount] = useState(300000)
  const [interestRate, setInterestRate] = useState(4.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [downPayment, setDownPayment] = useState(60000)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [activeTab, setActiveTab] = useState('mortgage')

  // Calculate monthly payment whenever inputs change
  useEffect(() => {
    const principal = loanAmount - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    
    // Mortgage calculation formula
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments)
    } else {
      const payment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      setMonthlyPayment(payment)
    }
  }, [loanAmount, interestRate, loanTerm, downPayment])

  const handleCalculate = (e) => {
    e.preventDefault()
    setShowResults(true)
  }

  const resetCalculator = () => {
    setLoanAmount(300000)
    setInterestRate(4.5)
    setLoanTerm(30)
    setDownPayment(60000)
    setShowResults(false)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-surface-800 dark:text-white">
              Plan Your Home Investment
            </h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Use our interactive tools to help you make informed decisions about your property investment.
            </p>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-surface-200 dark:border-surface-700">
              <button 
                onClick={() => setActiveTab('mortgage')}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                  activeTab === 'mortgage' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Calculator size={18} />
                  <span>Mortgage Calculator</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('affordability')}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                  activeTab === 'affordability' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <DollarSign size={18} />
                  <span>Affordability Calculator</span>
                </div>
              </button>
            </div>
            
            {/* Mortgage Calculator Content */}
            {activeTab === 'mortgage' && (
              <div className="p-6">
                <form onSubmit={handleCalculate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Property Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="input-field pl-10"
                          min="10000"
                          step="1000"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="50000"
                          max="2000000"
                          step="10000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400 mt-1">
                          <span>$50k</span>
                          <span>$2M</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Down Payment
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0"
                          max={loanAmount}
                          step="1000"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="0"
                          max={loanAmount * 0.5}
                          step="5000"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400 mt-1">
                          <span>$0</span>
                          <span>{formatCurrency(loanAmount * 0.5)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        {((downPayment / loanAmount) * 100).toFixed(1)}% of property price
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Interest Rate (%)
                        </label>
                        <div className="relative">
                          <HelpCircle 
                            size={16} 
                            className="text-surface-400 cursor-pointer"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          />
                          <AnimatePresence>
                            {showTooltip && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-surface-800 text-white text-xs rounded shadow-lg z-10"
                              >
                                The annual interest rate for your mortgage loan.
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0.1"
                          max="20"
                          step="0.1"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="0.1"
                          max="10"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400 mt-1">
                          <span>0.1%</span>
                          <span>10%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Loan Term (Years)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-surface-400" />
                        </div>
                        <select
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="input-field pl-10"
                          required
                        >
                          <option value="10">10 years</option>
                          <option value="15">15 years</option>
                          <option value="20">20 years</option>
                          <option value="25">25 years</option>
                          <option value="30">30 years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <Calculator size={18} />
                      <span>Calculate</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetCalculator}
                      className="btn btn-outline flex-1 flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      <span>Reset</span>
                    </motion.button>
                  </div>
                </form>
                
                <AnimatePresence>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 overflow-hidden"
                    >
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                          Mortgage Payment Summary
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Monthly Payment
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {formatCurrency(monthlyPayment)}
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Total Loan Amount
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {formatCurrency(loanAmount - downPayment)}
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Total Interest Paid
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {formatCurrency((monthlyPayment * loanTerm * 12) - (loanAmount - downPayment))}
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Total Cost
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {formatCurrency(monthlyPayment * loanTerm * 12)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-600 text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-500"
                          >
                            <span>Get Pre-Approved</span>
                            <ArrowRight size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Affordability Calculator Content */}
            {activeTab === 'affordability' && (
              <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="mb-4">
                    <Home size={48} className="mx-auto text-surface-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-white">
                    Affordability Calculator
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">
                    Coming soon! Find out how much house you can afford based on your income and expenses.
                  </p>
                  <button 
                    onClick={() => setActiveTab('mortgage')}
                    className="btn btn-primary"
                  >
                    Try Mortgage Calculator
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeature