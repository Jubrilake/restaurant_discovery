import { useFilterStore } from "@/store/filterStore";
import { useThemeStore } from "@/store/themeStore";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

type PriceSectionProps = {
  onFocus?: () => void;
  onBlur?: () => void;
};

export const PriceSection: React.FC<PriceSectionProps> = ({
  onFocus,
  onBlur,
}) => {
  const { setFilters, filters } = useFilterStore();
  const { theme } = useThemeStore();
  const [minPrice, setMinPrice] = useState(filters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 10000);
  const isDark = theme === "dark";

  return (
    <View>
      <Text
        className={`text-base font-semibold${
          isDark ? "text-gray-200" : "text-gray-700"
        } mt-5 mb-2`}
      >
        Price
      </Text>
      <View className="flex-row justify-between items-center mb-2">
        <Text className={` ${isDark ? "text-gray-200" : "text-gray-700"} `}>
          ₦{minPrice}
        </Text>
        <Text className={` ${isDark ? "text-gray-200" : "text-gray-700"} `}>
          ₦{maxPrice}
        </Text>
      </View>

      {/* Slider */}
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={10000}
        step={500}
        minimumTrackTintColor="#facc15"
        maximumTrackTintColor="#d1d5db"
        thumbTintColor="#facc15"
        value={maxPrice}
        onValueChange={setMaxPrice}
        onSlidingComplete={(val) => setFilters({ maxPrice: val })}
      />

      <View className="flex-row justify-between mt-3">
        {/* Min */}
        <View className="flex-1 mr-2">
          <Text
            className={`text-sm mb-1 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Min. Price (₦)
          </Text>
          <TextInput
            keyboardType="numeric"
            value={String(minPrice)}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={(text) => {
              const val = Number(text) || 0;
              setMinPrice(val);
              setFilters({ minPrice: val });
            }}
            className={`border border-gray-300 rounded-lg px-3 py-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          />
        </View>

        {/* Max */}
        <View className="flex-1 ml-2">
          <Text
            className={`text-sm mb-1 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Max. Price (₦)
          </Text>
          <TextInput
            keyboardType="numeric"
            value={String(maxPrice)}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={(text) => {
              const val = Number(text) || 0;
              setMaxPrice(val);
              setFilters({ maxPrice: val });
            }}
            className={`border border-gray-300 rounded-lg px-3 py-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          />
        </View>
      </View>
    </View>
  );
};
