// src/types/restaurant.ts
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
