import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, IndianRupee, Search } from 'lucide-react';
import MenuItem from '../components/MenuItem';
import { Restaurant, MenuItem as MenuItemType } from '../types';

// Mock data for demonstration
const mockRestaurant: Restaurant = {
  id: '1',
  name: 'The Burger Joint',
  rating: 4.5,
  deliveryTime: 30,
  cuisines: ['American', 'Burgers'],
  priceForTwo: 500,
  imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80',
  offers: ['50% off up to ₹100'],
};

const mockMenuItems: MenuItemType[] = [
  {
    id: '1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and our special sauce',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
    category: 'Burgers',
    isVeg: false,
  },
  {
    id: '2',
    name: 'Veggie Supreme Burger',
    description: 'Plant-based patty with fresh vegetables and vegan cheese',
    price: 179,
    imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80',
    category: 'Burgers',
    isVeg: true,
  },
  {
    id: '3',
    name: 'Crispy French Fries',
    description: 'Golden crispy fries seasoned with our special spice blend',
    price: 99,
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80',
    category: 'Sides',
    isVeg: true,
  },
];

const categories = ['Recommended', 'Burgers', 'Sides', 'Beverages', 'Desserts'];

export default function RestaurantDetails() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('Recommended');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = mockMenuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      {/* Restaurant Header */}
      <div className="bg-white dark:bg-dark-secondary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {mockRestaurant.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {mockRestaurant.cuisines.join(', ')}
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-orange-500 mr-1" />
                  <span className="font-medium">{mockRestaurant.rating}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-1" />
                  <span>{mockRestaurant.deliveryTime} mins</span>
                </div>
                <div className="flex items-center">
                  <IndianRupee className="h-5 w-5 text-gray-500 mr-1" />
                  <span>{mockRestaurant.priceForTwo} for two</span>
                </div>
              </div>
            </div>
            
            {mockRestaurant.offers && (
              <div className="mt-4 md:mt-0 md:ml-8">
                <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-dark-accent text-orange-600 rounded-lg">
                  {mockRestaurant.offers[0]}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 
                     rounded-lg bg-white dark:bg-dark-secondary text-gray-900 dark:text-white 
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 
                     focus:border-orange-500"
            placeholder="Search for dishes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
                       ${selectedCategory === category
                         ? 'bg-orange-500 text-white'
                         : 'bg-gray-200 dark:bg-dark-accent text-gray-700 dark:text-gray-200 hover:bg-gray-300'
                       }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MenuItem item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}