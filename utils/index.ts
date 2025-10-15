import { images } from "@/constant";
import type { RestaurantWithMenu } from "@/types/restaurant";

const imagesArr = Object.values(images);

export function makeMenu(restaurantId: string): RestaurantWithMenu["menu"] {
  const categories = ["Starters", "Main Course", "Desserts", "Drinks"];
  const sampleNames = [
    "Jollof Rice with Chicken",
    "Grilled Suya Platter",
    "Fried Plantain & Eggs",
    "Efo Riro with Pounded Yam",
    "Pepper Soup Special",
    "Ice Cream Sundae",
    "Chapman Mocktail",
    "Fruit Smoothie",
  ];

  return Array.from({ length: 8 }).map((_, i) => ({
    id: `${restaurantId}-menu-${i + 1}`,
    name: sampleNames[i % sampleNames.length],
    description:
      "Delicious and freshly prepared, made with authentic local ingredients and served hot.",
    price: 2000 + (i % 5) * 500,
    image: imagesArr[i % imagesArr.length],
    category: categories[i % categories.length],
    dietaryTags:
      i % 3 === 0 ? ["Vegetarian"] : i % 4 === 0 ? ["Gluten-Free"] : ["Halal"],
    isAvailable: i % 7 !== 0,
    preparationTime: 10 + (i % 15),
  }));
}
