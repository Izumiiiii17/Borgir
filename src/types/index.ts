export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: number;
  cuisines: string[];
  priceForTwo: number;
  imageUrl: string;
  offers?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isVeg: boolean;
}