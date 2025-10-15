import { useFilterStore } from "@/store/filterStore";
import { useThemeStore } from "@/store/themeStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CuisineModal } from "./CusineModal";
import { DeliveryModal } from "./DeliveryModal";
import { PriceSection } from "./PriceSection";
import { RatingModal } from "./RatingModal";
import { SortModal } from "./SortModal";

type FilterSheetProps = {
  sheetRef: React.RefObject<BottomSheet | null>;
};

export const FilterSheet: React.FC<FilterSheetProps> = ({ sheetRef }) => {
  const { reset } = useFilterStore();
  const { theme } = useThemeStore();
  const snapPoints = useMemo(() => ["75%"], []);

  const [cuisineVisible, setCuisineVisible] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [deliveryVisible, setDeliveryVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);

  const handleReset = () => {
    reset();
  };

  const isDark = theme === "dark";

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: isDark ? "#0f0f0f" : "#fff" }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
          backgroundColor: isDark ? "#0f0f0f" : "#fff",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text
                className={`text-lg font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Filter
              </Text>
              <TouchableOpacity
                onPress={handleReset}
                className={`px-3 py-1 rounded-full border ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <Text className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sort */}
            <TouchableOpacity
              onPress={() => setSortVisible(true)}
              className={`flex-row justify-between items-center py-3 border-b ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Sort By
              </Text>
              <Text className={isDark ? "text-gray-500" : "text-gray-400"}>
                {">"}
              </Text>
            </TouchableOpacity>

            {/* Price */}
            <PriceSection />

            {/* Cuisine */}
            <TouchableOpacity
              onPress={() => setCuisineVisible(true)}
              className={`flex-row justify-between items-center mt-6 py-3 border-b ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Cuisine
              </Text>
              <Text className={isDark ? "text-gray-500" : "text-gray-400"}>
                {">"}
              </Text>
            </TouchableOpacity>

            {/* Rating */}
            <TouchableOpacity
              onPress={() => setRatingVisible(true)}
              className={`flex-row justify-between items-center py-3 border-b ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Rating
              </Text>
              <Text className={isDark ? "text-gray-500" : "text-gray-400"}>
                {">"}
              </Text>
            </TouchableOpacity>

            {/* Delivery */}
            <TouchableOpacity
              onPress={() => setDeliveryVisible(true)}
              className={`flex-row justify-between items-center py-3 border-b ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Max Delivery Time
              </Text>
              <Text className={isDark ? "text-gray-500" : "text-gray-400"}>
                {">"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </BottomSheetView>

      {/* Modals */}
      <CuisineModal
        visible={cuisineVisible}
        onClose={() => setCuisineVisible(false)}
      />
      <RatingModal
        visible={ratingVisible}
        onClose={() => setRatingVisible(false)}
      />
      <DeliveryModal
        visible={deliveryVisible}
        onClose={() => setDeliveryVisible(false)}
      />
      <SortModal visible={sortVisible} onClose={() => setSortVisible(false)} />
    </BottomSheet>
  );
};
