import { useRestaurantStore } from "@/store/restaurantDetailsStore";
import { useThemeStore } from "@/store/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { restaurant, fetchRestaurant, loading, error } = useRestaurantStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  useEffect(() => {
    if (id) fetchRestaurant(id);
  }, [id]);

  if (loading) {
    return (
      <View
        className={`flex-1 justify-center items-center ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    );
  }

  if (error || !restaurant) {
    return (
      <View
        className={`flex-1 justify-center items-center p-5 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <Text
          className={`text-lg ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {error || "Restaurant not found"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className={`flex-1 ${isDark ? "bg-black" : "bg-white"}`}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Section with Image */}
      <View>
        <Image
          source={restaurant.image}
          style={{ width: "100%", height: 240 }}
          resizeMode="cover"
        />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className={`absolute top-12 left-4 rounded-full p-2.5 shadow-md shadow-black/40 ${
            isDark ? "bg-gray-800/90" : "bg-white/90"
          }`}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#fff" : "#111"}
          />
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View className="p-4">
        <Text
          className={`text-2xl font-bold ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {restaurant.name}
        </Text>
        <Text className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {restaurant.cuisine.join(", ")}
        </Text>
        <Text className="text-yellow-500 font-semibold mt-2">
          ⭐ {restaurant.rating}
        </Text>

        <View className="mt-4">
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Menu
          </Text>
          {restaurant.menu.map((item) => (
            <View
              key={item.id}
              className={`mb-3 border-b pb-2 flex-row justify-between ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <View className="flex-1 pr-3">
                <Text
                  className={`font-medium ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {item.name}
                </Text>
                <Text
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.description}
                </Text>
              </View>
              <Text
                className={`font-semibold ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                ₦{item.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
