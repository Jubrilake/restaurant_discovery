// src/lib/mockApi.ts
import { images } from "@/constant";
import {
  Restaurant,
  RestaurantFilter,
  RestaurantWithMenu,
} from "@/types/restaurant";
import { makeMenu } from "@/utils";

const imagesArr = Object.values(images);

export function pickImageForIndex(index: number) {
  return imagesArr[(index - 1) % imagesArr.length];
}

// generate a dataset (600+ items)
function makeDataset(): Restaurant[] {
  const base: Restaurant[] = [
    {
      id: "sweet-kiwi-001",
      name: "Sweet Kiwi Cafe",
      image: pickImageForIndex(1),
      cuisine: ["Nigerian", "Continental", "Desserts"],
      deliveryTime: { min: 25, max: 45 },
      rating: 4.5,
      priceRange: 2,
      dietaryOptions: ["Vegetarian", "Gluten-Free"],
      isOpen: true,
      location: { latitude: 6.5244, longitude: 3.3792 },
    },
    {
      id: "suya-palace-002",
      name: "Suya Palace",
      image: pickImageForIndex(2),
      cuisine: ["Nigerian", "Grill", "African"],
      deliveryTime: { min: 35, max: 60 },
      rating: 4.7,
      priceRange: 2,
      dietaryOptions: ["Halal", "Spicy"],
      isOpen: true,
      location: { latitude: 6.6018, longitude: 3.3515 },
    },
  ];

  for (let i = 0; i < 900; i++) {
    base.push({
      id: `r-${i}`,
      name: `Demo Restaurant ${i}`,
      image: i === 0 ? pickImageForIndex(2) : pickImageForIndex(i),
      cuisine: i % 3 === 0 ? ["Nigerian", "Jollof"] : ["Continental"],
      deliveryTime: { min: 20 + (i % 20), max: 20 + (i % 60) },
      rating: Math.round((3.5 + (i % 15) * 0.1) * 10) / 10,
      priceRange: ((i % 4) + 1) as 1 | 2 | 3 | 4,
      dietaryOptions: i % 2 === 0 ? ["Vegetarian"] : ["Halal"],
      isOpen: i % 7 !== 0,
      location: {
        latitude: 6.5 + (i % 10) * 0.001,
        longitude: 3.3 + (i % 10) * 0.001,
      },
    });
  }

  return base;
}

const DATA = makeDataset();

export async function fetchRestaurants({
  q = "",
  filters,
  cursor,
  limit = 20,
}: {
  q?: string;
  filters?: RestaurantFilter;
  cursor?: string | null;
  limit?: number;
}): Promise<{ data: Restaurant[]; nextCursor?: string | null }> {
  // simulate latency
  await new Promise((res) => setTimeout(res, 300 + Math.random() * 300));

  let filtered = DATA.slice();

  if (q && q.trim().length > 0) {
    const low = q.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(low) ||
        r.cuisine.join(" ").toLowerCase().includes(low)
    );
  }

  // Apply filters
  if (filters) {
    if (filters.cuisineTypes && filters.cuisineTypes.length) {
      filtered = filtered.filter((r) =>
        filters.cuisineTypes!.some((c) => r.cuisine.includes(c))
      );
    }
    if (filters.priceRanges && filters.priceRanges.length) {
      filtered = filtered.filter((r) =>
        filters.priceRanges!.includes(r.priceRange)
      );
    }
    if (filters.minRating) {
      filtered = filtered.filter((r) => r.rating >= filters.minRating!);
    }
    if (filters.maxDeliveryTime) {
      filtered = filtered.filter(
        (r) => r.deliveryTime.max <= filters.maxDeliveryTime!
      );
    }
    if (filters.dietaryRestrictions && filters.dietaryRestrictions.length) {
      filtered = filtered.filter((r) =>
        filters.dietaryRestrictions!.some((d) => r.dietaryOptions.includes(d))
      );
    }
    if (filters.sortBy) {
      if (filters.sortBy === "rating")
        filtered.sort((a, b) => b.rating - a.rating);
      else if (filters.sortBy === "deliveryTime")
        filtered.sort((a, b) => a.deliveryTime.max - b.deliveryTime.max);
      else if (filters.sortBy === "price")
        filtered.sort((a, b) => a.priceRange - b.priceRange);
    }
  }

  // cursor handling
  let start = 0;
  if (cursor) {
    const parsed = parseInt(cursor, 10);
    if (!Number.isNaN(parsed) && parsed >= 0) start = parsed;
  }

  const slice = filtered.slice(start, start + limit);
  const next =
    start + slice.length < filtered.length
      ? String(start + slice.length)
      : null;
  return { data: slice, nextCursor: next };
}

export async function getRestaurantWithMenu(
  id: string
): Promise<RestaurantWithMenu | null> {
  await new Promise((res) => setTimeout(res, 300 + Math.random() * 300)); // simulate latency

  const restaurant = DATA.find((r) => r.id === id);
  if (!restaurant) return null;

  const extended: RestaurantWithMenu = {
    ...restaurant,
    deliveryFee: 800 + Math.floor(Math.random() * 3) * 200,
    minimumOrder: 2500 + Math.floor(Math.random() * 5) * 500,
    promotions: [
      "10% off on orders above ₦5000",
      "Free delivery on weekends",
      "Buy 2 get 1 free on drinks",
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    menu: makeMenu(restaurant.id),
  };

  return extended;
}
