import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Home as HomeIcon, Building2, Warehouse, Filter, X, ChevronDown, ChevronUp } from 'lucide-react'

// Sample property data
const PROPERTY_DATA = [
  {
    id: 1,
    title: "Modern Lakefront Villa",
    address: "123 Lakeview Dr, Seattle, WA",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: "House",
    listingType: "Sale",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Downtown Luxury Apartment",
    address: "456 Central Ave, Portland, OR",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    listingType: "Rent",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Suburban Family Home",
    address: "789 Oak St, Bellevue, WA",
    price: 850000,
    bedrooms: 5,
    bathrooms: 3.5,
    area: 3200,
    type: "House",
    listingType: "Sale",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: 4,
    title: "Cozy Studio in Arts District",
    address: "101 Gallery Row, San Francisco, CA",
    price: 1800,
    bedrooms: 0,
    bathrooms: 1,
    area: 550,
    type: "Studio",
    listingType: "Rent",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Waterfront Penthouse",
    address: "222 Harbor View, San Diego, CA",
    price: 3200000,
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2400,
    type: "Condo",
    listingType: "Sale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 6,
    title: "Historic Brownstone",
    address: "333 Heritage Lane, Boston, MA",
    price: 1750000,
    bedrooms: 4,
    bathrooms: 2.5,
    area: 3000,
    type: "House",
    listingType: "Sale",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

function Home() {
  const [activeTab, setActiveTab] = useState('buy')
  const [properties, setProperties] = useState(PROPERTY_DATA)
  const [filteredProperties, setFilteredProperties] = useState(PROPERTY_DATA)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  })
  const [searchQuery, setSearchQuery] = useState('')

  // Filter properties based on active tab and search/filters
  useEffect(() => {
    let results = properties.filter(property => {
      // Filter by tab (buy/rent)
      const listingTypeMatch = 
        (activeTab === 'buy' && property.listingType === 'Sale') ||
        (activeTab === 'rent' && property.listingType === 'Rent') ||
        activeTab === 'all';
      
      // Filter by search query
      const searchMatch = !searchQuery || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by property type
      const typeMatch = !filters.type || property.type === filters.type;
      
      // Filter by price range
      const minPriceMatch = !filters.minPrice || property.price >= Number(filters.minPrice);
      const maxPriceMatch = !filters.maxPrice || property.price <= Number(filters.maxPrice);
      
      // Filter by bedrooms
      const bedroomsMatch = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms);
      
      // Filter by bathrooms
      const bathroomsMatch = !filters.bathrooms || property.bathrooms >= Number(filters.bathrooms);
      
      return listingTypeMatch && searchMatch && typeMatch && minPriceMatch && 
             maxPriceMatch && bedroomsMatch && bathroomsMatch;
    });
    
    setFilteredProperties(results);
  }, [activeTab, properties, searchQuery, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
    setSearchQuery('');
  };

  const formatPrice = (price, listingType) => {
    return listingType === 'Rent' 
      ? `$${price.toLocaleString()}/mo`
      : `$${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-primary/90 to-secondary/90 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Modern homes" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow-lg">
              Find Your Perfect Place to Call Home
            </h1>
            <p className="text-xl text-white/90 mb-8 text-shadow">
              Discover thousands of properties for sale and rent across the country
            </p>
            
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg p-1 mb-6">
              <div className="flex border-b border-surface-200 dark:border-surface-700">
                <button 
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 py-3 text-center font-medium rounded-t-lg transition-colors ${
                    activeTab === 'buy' 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setActiveTab('rent')}
                  className={`flex-1 py-3 text-center font-medium rounded-t-lg transition-colors ${
                    activeTab === 'rent' 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  Rent
                </button>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-3 text-center font-medium rounded-t-lg transition-colors ${
                    activeTab === 'all' 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  All Properties
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-surface-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by location, property name, or address..."
                      className="input-field pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600"
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                    {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  <button className="btn btn-primary">
                    Search
                  </button>
                </div>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Property Type
                          </label>
                          <select 
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="input-field"
                          >
                            <option value="">Any Type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Condo">Condo</option>
                            <option value="Studio">Studio</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Min Price
                          </label>
                          <input
                            type="number"
                            name="minPrice"
                            placeholder={activeTab === 'rent' ? "Min Rent" : "Min Price"}
                            className="input-field"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Max Price
                          </label>
                          <input
                            type="number"
                            name="maxPrice"
                            placeholder={activeTab === 'rent' ? "Max Rent" : "Max Price"}
                            className="input-field"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Bedrooms
                          </label>
                          <select 
                            name="bedrooms"
                            value={filters.bedrooms}
                            onChange={handleFilterChange}
                            className="input-field"
                          >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Bathrooms
                          </label>
                          <select 
                            name="bathrooms"
                            value={filters.bathrooms}
                            onChange={handleFilterChange}
                            className="input-field"
                          >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <button 
                          onClick={resetFilters}
                          className="btn flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-white"
                        >
                          <X size={16} />
                          <span>Reset Filters</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-white">
              {activeTab === 'buy' ? 'Properties for Sale' : 
               activeTab === 'rent' ? 'Properties for Rent' : 'All Properties'}
            </h2>
            
            <div className="flex items-center gap-2">
              <span className="text-surface-600 dark:text-surface-400">
                {filteredProperties.length} properties found
              </span>
            </div>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="card card-hover overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.listingType === 'Sale' 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary text-white'
                      }`}>
                        For {property.listingType}
                      </span>
                    </div>
                    {property.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-white">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{formatPrice(property.price, property.listingType)}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-surface-800 dark:text-white">{property.title}</h3>
                    
                    <div className="flex items-center gap-1 text-surface-500 dark:text-surface-400 mb-3">
                      <MapPin size={16} />
                      <span className="text-sm">{property.address}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-surface-200 dark:border-surface-700">
                      <div className="flex flex-col items-center">
                        <span className="text-surface-600 dark:text-surface-300 font-medium">{property.bedrooms}</span>
                        <span className="text-xs text-surface-500 dark:text-surface-400">Beds</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <span className="text-surface-600 dark:text-surface-300 font-medium">{property.bathrooms}</span>
                        <span className="text-xs text-surface-500 dark:text-surface-400">Baths</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <span className="text-surface-600 dark:text-surface-300 font-medium">{property.area}</span>
                        <span className="text-xs text-surface-500 dark:text-surface-400">Sq Ft</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <button className="w-full btn btn-outline text-primary dark:text-primary-light border-primary/30 dark:border-primary-light/30 hover:bg-primary/5 dark:hover:bg-primary-light/10">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-surface-800 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Search size={48} className="text-surface-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-white">No properties found</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Try adjusting your search criteria or filters to find more properties.
              </p>
              <button 
                onClick={resetFilters}
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-16 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-surface-800 dark:text-white">
            Browse by Property Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 text-center shadow-soft"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                <HomeIcon size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-surface-800 dark:text-white">Houses</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Find your perfect family home with yard and privacy
              </p>
              <button className="btn btn-outline w-full">
                Browse Houses
              </button>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 text-center shadow-soft"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary">
                <Building2 size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-surface-800 dark:text-white">Apartments</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Modern urban living with amenities and convenience
              </p>
              <button className="btn btn-outline w-full">
                Browse Apartments
              </button>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 text-center shadow-soft"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent">
                <Building2 size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-surface-800 dark:text-white">Condos</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Ownership with luxury amenities and less maintenance
              </p>
              <button className="btn btn-outline w-full">
                Browse Condos
              </button>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6 text-center shadow-soft"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                <Warehouse size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-surface-800 dark:text-white">Commercial</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Office spaces, retail, and other business properties
              </p>
              <button className="btn btn-outline w-full">
                Browse Commercial
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home