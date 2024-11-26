import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Utensils } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { Restaurant } from '../types';

// Mock data remains the same...
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Burger Joint',
    rating: 4.5,
    deliveryTime: 30,
    cuisines: ['American', 'Burgers'],
    priceForTwo: 500,
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80',
    offers: ['50% off up to ₹100'],
  },
  {
    id: '2',
    name: 'Pizza Paradise',
    rating: 4.3,
    deliveryTime: 35,
    cuisines: ['Italian', 'Pizza'],
    priceForTwo: 600,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80',
    offers: ['Free delivery'],
  },
  {
    id: '3',
    name: 'Sushi Express',
    rating: 4.7,
    deliveryTime: 40,
    cuisines: ['Japanese', 'Sushi'],
    priceForTwo: 800,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Spice Garden',
    rating: 4.4,
    deliveryTime: 25,
    cuisines: ['Indian', 'Curry'],
    priceForTwo: 400,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80',
    offers: ['20% off on all orders'],
  },
  {
    id: '5',
    name: 'Taco Fiesta',
    rating: 4.6,
    deliveryTime: 30,
    cuisines: ['Mexican', 'Tacos'],
    priceForTwo: 450,
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80',
    offers: ['Buy 2 Get 1 Free'],
  },
  {
    id: '6',
    name: 'Noodle House',
    rating: 4.2,
    deliveryTime: 35,
    cuisines: ['Chinese', 'Thai'],
    priceForTwo: 550,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80',
  },
];

const cuisineFilters = ['All', 'American', 'Italian', 'Japanese', 'Indian', 'Mexican', 'Chinese'];

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const searchFromParams = searchParams.get('search');
    if (searchFromParams) {
      setSearchQuery(searchFromParams);
    }
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setSearchParams(newQuery ? { search: newQuery } : {});
  };

  const filteredRestaurants = mockRestaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisines.some(cuisine => 
                            cuisine.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCuisine = selectedCuisine === 'All' || 
                            restaurant.cuisines.includes(selectedCuisine);
      const matchesPrice = priceRange === 'all' ||
                          (priceRange === 'low' && restaurant.priceForTwo <= 400) ||
                          (priceRange === 'medium' && restaurant.priceForTwo > 400 && restaurant.priceForTwo <= 700) ||
                          (priceRange === 'high' && restaurant.priceForTwo > 700);
      
      return matchesSearch && matchesCuisine && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return a.deliveryTime - b.deliveryTime;
        case 'priceForTwo':
          return a.priceForTwo - b.priceForTwo;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Restaurants near you
        </h1>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-700 dark:bg-dark-secondary dark:text-white
                       focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-dark-secondary text-gray-700 dark:text-gray-200
                     focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Prices</option>
            <option value="low">Under ₹400</option>
            <option value="medium">₹400 - ₹700</option>
            <option value="high">Above ₹700</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-dark-secondary text-gray-700 dark:text-gray-200
                     focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="rating">Rating</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="priceForTwo">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {cuisineFilters.map((cuisine) => (
          <motion.button
            key={cuisine}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCuisine(cuisine)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
                     ${selectedCuisine === cuisine
                       ? 'bg-orange-500 text-white'
                       : 'bg-gray-200 dark:bg-dark-accent text-gray-700 dark:text-gray-200'
                     }`}
          >
            {cuisine}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <RestaurantCard restaurant={restaurant} />
          </motion.div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Utensils className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
}