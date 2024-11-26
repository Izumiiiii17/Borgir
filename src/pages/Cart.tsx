import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Home, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add items from restaurants to start an order
          </p>
          <div className="flex space-x-4 justify-center">
            <Link
              to="/"
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/restaurants"
              className="btn btn-primary flex items-center space-x-2"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span>Browse Restaurants</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Cart
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/restaurants"
            className="btn btn-primary flex items-center space-x-2"
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span>Browse More</span>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center p-4 border-b dark:border-gray-700 last:border-0"
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ₹{item.price}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-orange-100 dark:bg-dark-accent 
                           text-orange-500 hover:bg-orange-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-gray-900 dark:text-white font-medium w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-orange-100 dark:bg-dark-accent 
                           text-orange-500 hover:bg-orange-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}

        <div className="p-4 bg-gray-50 dark:bg-dark-accent">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="text-gray-900 dark:text-white font-medium">₹{total}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
            <span className="text-gray-900 dark:text-white font-medium">₹40</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-gray-900 dark:text-white">₹{total + 40}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full btn btn-primary py-3 text-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}