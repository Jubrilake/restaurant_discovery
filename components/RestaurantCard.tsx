import { useThemeStore } from "@/store/themeStore";
import { Restaurant } from "@/types/restaurant";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const RestaurantCard: React.FC<{ item: Restaurant }> = ({ item }) => {
  const { theme } = useThemeStore();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className={`rounded-2xl overflow-hidden m-2 flex-1 shadow-sm 
        ${theme === "dark" ? "bg-gray-900" : "bg-white"}
      `}
    >
      {/* Restaurant Image */}
      <Image source={item.image} className="h-40 w-full" resizeMode="cover" />

      {/* Content */}
      <View className="p-3">
        <Text
          className={`font-semibold text-base ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {item.name}
        </Text>
        <Text
          className={`text-sm mt-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {item.cuisine.length > 1
            ? `${item.cuisine.slice(0, 1).join(", ")}, ${item.cuisine[1].slice(
                0,
                5
              )}...`
            : item.cuisine.join(", ")}
        </Text>

        <View className="flex-row justify-between items-center mt-3">
          {/* Rating */}
          <View className="flex-row items-center space-x-1">
            <Feather
              name="star"
              size={14}
              color={theme === "dark" ? "#facc15" : "#fbbf24"}
            />
            <Text
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {item.rating.toFixed(1)}
            </Text>
          </View>

          {/* Delivery Time */}
          <View className="flex-row items-center space-x-1">
            <Feather
              name="clock"
              size={13}
              color={theme === "dark" ? "#9ca3af" : "#6b7280"}
            />
            <Text
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {item.deliveryTime.max} min
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
