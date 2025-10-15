export interface Restaurant {
  id: string;
  name: string;
  image: string | ImageSourcePropType;
  cuisine: string[];
  deliveryTime: { min: number; max: number };
  rating: number;
  priceRange: 1 | 2 | 3 | 4;
  dietaryOptions: string[];
  isOpen: boolean;
  location: { latitude: number; longitude: number };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietaryTags: string[];
  isAvailable: boolean;
  preparationTime?: number;
}

export interface RestaurantWithMenu extends Restaurant {
  menu: MenuItem[];
  deliveryFee: number;
  minimumOrder: number;
  promotions: string[];
}

export type RestaurantFilter = {
  cuisineTypes?: string[];
  priceRanges?: (1 | 2 | 3 | 4)[];
  minRating?: number | null;
  maxDeliveryTime?: number | null;
  dietaryRestrictions?: string[];
  sortBy?: "rating" | "deliveryTime" | "price";
  minPrice?: number;
  maxPrice?: number;
};
