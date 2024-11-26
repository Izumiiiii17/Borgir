import React from 'react';
import { Leaf, Plus, Minus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  item: MenuItemType;
}

export default function MenuItem({ item }: Props) {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);

  return (
    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <div className="flex-1">
        {item.isVeg && (
          <Leaf className="h-4 w-4 text-green-500 mb-1" />
        )}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {item.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          ₹{item.price}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {item.description}
        </p>
      </div>
      
      <div className="ml-4">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
        )}
        
        <div className="mt-2">
          {!cartItem ? (
            <button
              onClick={() => addToCart(item)}
              className="w-full btn btn-primary"
            >
              Add
              <Plus className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                className="p-1 rounded-full bg-orange-100 dark:bg-dark-accent 
                         text-orange-500 hover:bg-orange-200"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-gray-900 dark:text-white font-medium">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                className="p-1 rounded-full bg-orange-100 dark:bg-dark-accent 
                         text-orange-500 hover:bg-orange-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}