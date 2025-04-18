import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  DollarSign, 
  Home, 
  Calendar, 
  Percent, 
  HelpCircle, 
  X, 
  ArrowRight, 
  BarChart4, 
  Building, 
  TrendingUp 
} from 'lucide-react'

function Calculators() {
  const [activeTab, setActiveTab] = useState('mortgage')
  
  // Mortgage calculator state
  const [loanAmount, setLoanAmount] = useState(300000)
  const [interestRate, setInterestRate] = useState(4.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [downPayment, setDownPayment] = useState(60000)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  
  // Affordability calculator state
  const [annualIncome, setAnnualIncome] = useState(100000)
  const [monthlyDebts, setMonthlyDebts] = useState(500)
  const [interestRateAfford, setInterestRateAfford] = useState(4.5)
  const [loanTermAfford, setLoanTermAfford] = useState(30)
  const [downPaymentAfford, setDownPaymentAfford] = useState(50000)
  const [maxAffordability, setMaxAffordability] = useState(0)
  const [showAffordResults, setShowAffordResults] = useState(false)
  
  // Refinance calculator state
  const [currentLoanBalance, setCurrentLoanBalance] = useState(250000)
  const [currentInterestRate, setCurrentInterestRate] = useState(5.5)
  const [newInterestRate, setNewInterestRate] = useState(4.0)
  const [remainingYears, setRemainingYears] = useState(25)
  const [refinanceYears, setRefinanceYears] = useState(30)
  const [closingCosts, setClosingCosts] = useState(5000)
  const [showRefinanceResults, setShowRefinanceResults] = useState(false)
  const [monthlySavings, setMonthlySavings] = useState(0)
  const [breakEvenTime, setBreakEvenTime] = useState(0)
  
  // Investment calculator state
  const [propertyPrice, setPropertyPrice] = useState(350000)
  const [rentalIncome, setRentalIncome] = useState(2200)
  const [expenseRate, setExpenseRate] = useState(35)
  const [appreciationRate, setAppreciationRate] = useState(3)
  const [holdingPeriod, setHoldingPeriod] = useState(10)
  const [showInvestmentResults, setShowInvestmentResults] = useState(false)
  const [roi, setRoi] = useState(0)
  const [cashFlow, setCashFlow] = useState(0)

  // Calculate mortgage payment whenever inputs change
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
  
  // Calculate affordability
  useEffect(() => {
    // Debt-to-income ratio standard is typically 36%
    const maxDebtPayment = (annualIncome / 12) * 0.36 - monthlyDebts
    const monthlyRate = interestRateAfford / 100 / 12
    const numberOfPayments = loanTermAfford * 12
    
    // Maximum loan amount formula (reversed from the mortgage formula)
    let maxLoan = 0
    if (monthlyRate === 0) {
      maxLoan = maxDebtPayment * numberOfPayments
    } else {
      maxLoan = maxDebtPayment * 
        ((Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)))
    }
    
    // Add down payment to get total affordability
    setMaxAffordability(maxLoan + downPaymentAfford)
  }, [annualIncome, monthlyDebts, interestRateAfford, loanTermAfford, downPaymentAfford])
  
  // Calculate refinance benefits
  useEffect(() => {
    // Calculate current monthly payment
    const currentMonthlyRate = currentInterestRate / 100 / 12
    const currentNumberOfPayments = remainingYears * 12
    let currentPayment = 0
    
    if (currentMonthlyRate === 0) {
      currentPayment = currentLoanBalance / currentNumberOfPayments
    } else {
      currentPayment = currentLoanBalance * 
        (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentNumberOfPayments)) / 
        (Math.pow(1 + currentMonthlyRate, currentNumberOfPayments) - 1)
    }
    
    // Calculate new monthly payment
    const newMonthlyRate = newInterestRate / 100 / 12
    const newNumberOfPayments = refinanceYears * 12
    let newPayment = 0
    
    if (newMonthlyRate === 0) {
      newPayment = currentLoanBalance / newNumberOfPayments
    } else {
      newPayment = currentLoanBalance * 
        (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumberOfPayments)) / 
        (Math.pow(1 + newMonthlyRate, newNumberOfPayments) - 1)
    }
    
    // Calculate monthly savings
    const savings = currentPayment - newPayment
    setMonthlySavings(savings)
    
    // Calculate break-even point (in months)
    if (savings > 0) {
      setBreakEvenTime(closingCosts / savings)
    } else {
      setBreakEvenTime(0)
    }
  }, [currentLoanBalance, currentInterestRate, newInterestRate, remainingYears, refinanceYears, closingCosts])
  
  // Calculate investment metrics
  useEffect(() => {
    // Calculate monthly cash flow
    const monthlyExpenses = (rentalIncome * expenseRate) / 100
    const monthlyCashFlow = rentalIncome - monthlyExpenses
    setCashFlow(monthlyCashFlow)
    
    // Calculate future value with appreciation
    const futureValue = propertyPrice * Math.pow(1 + (appreciationRate / 100), holdingPeriod)
    
    // Calculate annual cash flow
    const annualCashFlow = monthlyCashFlow * 12
    
    // Calculate total return over holding period
    const totalAppreciation = futureValue - propertyPrice
    const totalCashFlow = annualCashFlow * holdingPeriod
    const totalReturn = totalAppreciation + totalCashFlow
    
    // Calculate ROI
    const calculatedRoi = (totalReturn / propertyPrice) * 100
    setRoi(calculatedRoi)
  }, [propertyPrice, rentalIncome, expenseRate, appreciationRate, holdingPeriod])

  const handleCalculate = (e) => {
    e.preventDefault()
    setShowResults(true)
  }
  
  const handleAffordabilityCalculate = (e) => {
    e.preventDefault()
    setShowAffordResults(true)
  }
  
  const handleRefinanceCalculate = (e) => {
    e.preventDefault()
    setShowRefinanceResults(true)
  }
  
  const handleInvestmentCalculate = (e) => {
    e.preventDefault()
    setShowInvestmentResults(true)
  }

  const resetCalculator = () => {
    setLoanAmount(300000)
    setInterestRate(4.5)
    setLoanTerm(30)
    setDownPayment(60000)
    setShowResults(false)
  }
  
  const resetAffordabilityCalculator = () => {
    setAnnualIncome(100000)
    setMonthlyDebts(500)
    setInterestRateAfford(4.5)
    setLoanTermAfford(30)
    setDownPaymentAfford(50000)
    setShowAffordResults(false)
  }
  
  const resetRefinanceCalculator = () => {
    setCurrentLoanBalance(250000)
    setCurrentInterestRate(5.5)
    setNewInterestRate(4.0)
    setRemainingYears(25)
    setRefinanceYears(30)
    setClosingCosts(5000)
    setShowRefinanceResults(false)
  }
  
  const resetInvestmentCalculator = () => {
    setPropertyPrice(350000)
    setRentalIncome(2200)
    setExpenseRate(35)
    setAppreciationRate(3)
    setHoldingPeriod(10)
    setShowInvestmentResults(false)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  const formatCurrencyDecimal = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-surface-800 dark:text-white">
              Home Financial Calculators
            </h1>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Use our interactive calculators to make informed decisions about your property investments, mortgage options, and financial planning.
            </p>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-surface-200 dark:border-surface-700">
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
                  <span>Affordability</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('refinance')}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                  activeTab === 'refinance' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <BarChart4 size={18} />
                  <span>Refinance</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('investment')}
                className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                  activeTab === 'investment' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp size={18} />
                  <span>Investment</span>
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
              <div className="p-6">
                <form onSubmit={handleAffordabilityCalculate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Annual Household Income
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={annualIncome}
                          onChange={(e) => setAnnualIncome(Number(e.target.value))}
                          className="input-field pl-10"
                          min="20000"
                          step="1000"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="20000"
                          max="500000"
                          step="5000"
                          value={annualIncome}
                          onChange={(e) => setAnnualIncome(Number(e.target.value))}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400 mt-1">
                          <span>$20k</span>
                          <span>$500k</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Monthly Debt Payments
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={monthlyDebts}
                          onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0"
                          step="100"
                          required
                        />
                      </div>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Include car loans, student loans, credit cards, etc.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Down Payment Available
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={downPaymentAfford}
                          onChange={(e) => setDownPaymentAfford(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0"
                          step="1000"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Interest Rate (%)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={interestRateAfford}
                          onChange={(e) => setInterestRateAfford(Number(e.target.value))}
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
                          value={interestRateAfford}
                          onChange={(e) => setInterestRateAfford(Number(e.target.value))}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
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
                          value={loanTermAfford}
                          onChange={(e) => setLoanTermAfford(Number(e.target.value))}
                          className="input-field pl-10"
                          required
                        >
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
                      <span>Calculate Affordability</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetAffordabilityCalculator}
                      className="btn btn-outline flex-1 flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      <span>Reset</span>
                    </motion.button>
                  </div>
                </form>
                
                <AnimatePresence>
                  {showAffordResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 overflow-hidden"
                    >
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                          Home Affordability Results
                        </h3>
                        
                        <div className="mb-6">
                          <div className="text-center p-6 bg-white dark:bg-surface-800 rounded-lg shadow-card mb-4">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Maximum Home Price You Can Afford
                            </div>
                            <div className="text-3xl font-bold text-primary">
                              {formatCurrency(maxAffordability)}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                              <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                                Loan Amount
                              </div>
                              <div className="text-lg font-bold text-surface-800 dark:text-white">
                                {formatCurrency(maxAffordability - downPaymentAfford)}
                              </div>
                            </div>
                            
                            <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                              <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                                Monthly Income
                              </div>
                              <div className="text-lg font-bold text-surface-800 dark:text-white">
                                {formatCurrency(annualIncome / 12)}
                              </div>
                            </div>
                            
                            <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                              <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                                Estimated Monthly Payment
                              </div>
                              <div className="text-lg font-bold text-surface-800 dark:text-white">
                                {formatCurrency(((annualIncome / 12) * 0.36) - monthlyDebts)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-surface-600 dark:text-surface-400 mb-4">
                            Based on a 36% debt-to-income ratio and your current financial situation.
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-600 text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-500"
                          >
                            <span>Find Homes in Your Budget</span>
                            <ArrowRight size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Refinance Calculator Content */}
            {activeTab === 'refinance' && (
              <div className="p-6">
                <form onSubmit={handleRefinanceCalculate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Current Loan Balance
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={currentLoanBalance}
                          onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                          className="input-field pl-10"
                          min="10000"
                          step="1000"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Current Interest Rate (%)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={currentInterestRate}
                          onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0.1"
                          max="20"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        New Interest Rate (%)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={newInterestRate}
                          onChange={(e) => setNewInterestRate(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0.1"
                          max="20"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Years Remaining on Current Loan
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-surface-400" />
                        </div>
                        <select
                          value={remainingYears}
                          onChange={(e) => setRemainingYears(Number(e.target.value))}
                          className="input-field pl-10"
                          required
                        >
                          <option value="5">5 years</option>
                          <option value="10">10 years</option>
                          <option value="15">15 years</option>
                          <option value="20">20 years</option>
                          <option value="25">25 years</option>
                          <option value="30">30 years</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        New Loan Term (Years)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-surface-400" />
                        </div>
                        <select
                          value={refinanceYears}
                          onChange={(e) => setRefinanceYears(Number(e.target.value))}
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
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Refinance Closing Costs
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={closingCosts}
                          onChange={(e) => setClosingCosts(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0"
                          step="100"
                          required
                        />
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
                      <span>Calculate Savings</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetRefinanceCalculator}
                      className="btn btn-outline flex-1 flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      <span>Reset</span>
                    </motion.button>
                  </div>
                </form>
                
                <AnimatePresence>
                  {showRefinanceResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 overflow-hidden"
                    >
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                          Refinance Analysis
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Monthly Savings
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {formatCurrencyDecimal(monthlySavings)}
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Break-Even Point
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {breakEvenTime.toFixed(1)} months ({(breakEvenTime / 12).toFixed(1)} years)
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Total Savings Over New Loan Term
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {formatCurrency(monthlySavings * refinanceYears * 12 - closingCosts)}
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Interest Rate Reduction
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {(currentInterestRate - newInterestRate).toFixed(2)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 mb-6">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 text-primary">
                              <HelpCircle size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-surface-800 dark:text-white mb-1">Refinance Recommendation</h4>
                              <p className="text-surface-600 dark:text-surface-400 text-sm">
                                {breakEvenTime <= 24 
                                  ? `Refinancing is recommended. You'll break even in ${breakEvenTime.toFixed(1)} months and save ${formatCurrency(monthlySavings * refinanceYears * 12 - closingCosts)} over the life of your new loan.`
                                  : `Consider carefully. It will take ${breakEvenTime.toFixed(1)} months to recoup your closing costs of ${formatCurrency(closingCosts)}.`
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-600 text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-500"
                          >
                            <span>Speak to a Refinance Specialist</span>
                            <ArrowRight size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Investment Calculator Content */}
            {activeTab === 'investment' && (
              <div className="p-6">
                <form onSubmit={handleInvestmentCalculate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Property Purchase Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={propertyPrice}
                          onChange={(e) => setPropertyPrice(Number(e.target.value))}
                          className="input-field pl-10"
                          min="50000"
                          step="5000"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Monthly Rental Income
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={rentalIncome}
                          onChange={(e) => setRentalIncome(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0"
                          step="100"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Monthly Expenses (% of Rental Income)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={expenseRate}
                          onChange={(e) => setExpenseRate(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0"
                          max="100"
                          step="1"
                          required
                        />
                      </div>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Include property management, taxes, insurance, maintenance, etc.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Annual Appreciation Rate (%)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent size={18} className="text-surface-400" />
                        </div>
                        <input
                          type="number"
                          value={appreciationRate}
                          onChange={(e) => setAppreciationRate(Number(e.target.value))}
                          className="input-field pl-10"
                          min="0"
                          max="20"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Years Planning to Hold Property
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-surface-400" />
                        </div>
                        <select
                          value={holdingPeriod}
                          onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                          className="input-field pl-10"
                          required
                        >
                          <option value="1">1 year</option>
                          <option value="3">3 years</option>
                          <option value="5">5 years</option>
                          <option value="10">10 years</option>
                          <option value="15">15 years</option>
                          <option value="20">20 years</option>
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
                      <span>Calculate ROI</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetInvestmentCalculator}
                      className="btn btn-outline flex-1 flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      <span>Reset</span>
                    </motion.button>
                  </div>
                </form>
                
                <AnimatePresence>
                  {showInvestmentResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 overflow-hidden"
                    >
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">
                          Investment Analysis
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Estimated Total ROI
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {roi.toFixed(2)}%
                            </div>
                            <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                              Over {holdingPeriod} years ({(roi / holdingPeriod).toFixed(2)}% annualized)
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Monthly Cash Flow
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {formatCurrencyDecimal(cashFlow)}
                            </div>
                            <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                              After expenses (annual: {formatCurrency(cashFlow * 12)})
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Estimated Future Property Value
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {formatCurrency(propertyPrice * Math.pow(1 + (appreciationRate / 100), holdingPeriod))}
                            </div>
                            <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                              Based on {appreciationRate}% annual appreciation
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card">
                            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                              Cap Rate
                            </div>
                            <div className="text-2xl font-bold text-surface-800 dark:text-white">
                              {((cashFlow * 12) / propertyPrice * 100).toFixed(2)}%
                            </div>
                            <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                              Annual net income / property value
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 mb-6">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 text-primary">
                              <HelpCircle size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-surface-800 dark:text-white mb-1">Investment Analysis</h4>
                              <p className="text-surface-600 dark:text-surface-400 text-sm">
                                {cashFlow > 0 && roi > 50
                                  ? "This property shows excellent investment potential with strong cash flow and appreciation prospects."
                                  : cashFlow > 0 
                                    ? "This property shows positive cash flow, making it a potentially solid investment." 
                                    : "This property has negative cash flow. Consider negotiating a lower purchase price or higher rent."
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-600 text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-500"
                          >
                            <span>Find Investment Properties</span>
                            <ArrowRight size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculators