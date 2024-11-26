import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Restaurant } from '../types';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden 
                    transform hover:scale-[1.02] transition-transform duration-200">
        <div className="relative h-48">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm">
              {restaurant.offers[0]}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {restaurant.name}
          </h3>
          
          <div className="flex items-center space-x-4 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-orange-500 mr-1" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {restaurant.rating}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {restaurant.deliveryTime} mins
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {restaurant.cuisines.join(', ')}
          </p>
          
          <p className="text-sm text-gray-700 dark:text-gray-300">
            ₹{restaurant.priceForTwo} for two
          </p>
        </div>
      </div>
    </Link>
  );
}