import { useRestaurantSearch } from "@/hooks/useRestaurantSearch";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { TextInput, View } from "react-native";

export const SearchHeader: React.FC<{
  onDebouncedSearch: (q: string) => void;
}> = ({ onDebouncedSearch }) => {
  const { query, onChange } = useRestaurantSearch("");

  useEffect(() => {
    onDebouncedSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="p-3.5">
      <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
        {/* Ionicons Search Icon */}
        <Ionicons name="search-outline" size={20} color="#9ca3af" />

        <TextInput
          placeholder="Search restaurants, cuisine..."
          value={query}
          onChangeText={(t) => onChange(t, onDebouncedSearch)}
          className="flex-1 ml-2 text-gray-800"
          returnKeyType="search"
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  );
};
