import { RestaurantFilter } from "@/types/restaurant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const FilterChips = ({
  reset,
  filters,
  removeFilter,
}: {
  reset: () => void;
  removeFilter: (key: keyof RestaurantFilter, value?: any) => void;
  filters: RestaurantFilter;
}) => {
  const chips: { key: string; label: string; value: string | number }[] = [];

  Object.entries(filters).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach((v) => chips.push({ key, label: key, value: v }));
    } else if (typeof val !== "undefined" && val !== null) {
      chips.push({ key, label: key, value: val });
    }
  });

  if (chips.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row flex-wrap mb-2 space-x-2 px-4 min-h-9"
    >
      {chips.map((chip, index) => (
        <View
          key={`${chip.key}-${chip.value}-${index}`}
          className="flex-row items-center bg-gray-200 rounded-full px-3 py-2 mr-2"
        >
          <Text className="text-sm text-gray-800 mr-1">
            {chip.label}: {chip.value}
          </Text>

          {/* Ionicons Close Icon */}
          <TouchableOpacity
            onPress={() =>
              removeFilter(chip.key as keyof RestaurantFilter, chip.value)
            }
          >
            <Ionicons name="close" size={16} color="#444" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={reset}
        className="flex-row items-center bg-red-100 rounded-full px-3 py-1"
      >
        <Text className="text-sm text-red-600 font-medium">Clear All</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
