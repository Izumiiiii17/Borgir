import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Utensils, ShoppingBag, User, LogOut } from 'lucide-react'; // Updated icon import
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark-primary shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-orange-500" /> {/* Updated Icon */}
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Borgir</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8 hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                         bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-white
                         focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Search for restaurants, dishes, or cuisines"
              />
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/restaurants"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
            >
              Restaurants
            </Link>
            <Link 
              to="/cart" 
              className="relative text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-slow">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
                >
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
              >
                Login
              </Link>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
