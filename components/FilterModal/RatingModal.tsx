import { useFilterStore } from "@/store/filterStore";
import { useThemeStore } from "@/store/themeStore";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const RATINGS = [5, 4, 3, 2];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const RatingModal = ({ visible, onClose }: Props) => {
  const { filters, setFilters } = useFilterStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={{
            color: i <= count ? "#FACC15" : isDark ? "#4B5563" : "#D1D5DB", // yellow for filled, gray for empty
            fontSize: 20,
            marginRight: 4,
          }}
        >
          {i <= count ? "★" : "☆"}
        </Text>
      );
    }
    return stars;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View
          className={`w-[90%] max-h-[70%] rounded-2xl p-6 ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          <Text
            className={`text-lg font-semibold mb-3 ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Select Rating
          </Text>

          {RATINGS.map((r) => {
            const active = filters.minRating === r;
            return (
              <TouchableOpacity
                key={r}
                onPress={() => setFilters({ minRating: active ? null : r })}
                className={`py-3 border-b border-gray-200 flex-row items-center ${
                  active ? (isDark ? "bg-yellow-900/30" : "bg-yellow-100") : ""
                }`}
              >
                <View className="flex-row">{renderStars(r)}</View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={onClose}
            className="bg-yellow-400 mt-5 rounded-lg py-3 items-center"
          >
            <Text className="text-white font-semibold text-base">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
