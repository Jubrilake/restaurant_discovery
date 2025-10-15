import { useRestaurantSearch } from "@/hooks/useRestaurantSearch";
import { Search } from "lucide-react-native";
import React, { useEffect } from "react";
import { TextInput, View } from "react-native";

export const SearchHeader: React.FC<{
  onDebouncedSearch: (q: string) => void;
}> = ({ onDebouncedSearch }) => {
  const { query, onChange } = useRestaurantSearch("");

  useEffect(() => {
    onDebouncedSearch(query);
    // eslint-disable-next-line
  }, []);

  return (
    <View className="p-3.5">
      <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
        <Search size={20} color="#9ca3af" strokeWidth={2} />

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
