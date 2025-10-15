import { useFilterStore } from "@/store/filterStore";
import { useThemeStore } from "@/store/themeStore";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const SORT_OPTIONS = [
  { key: "rating", label: "Rating" },
  { key: "deliveryTime", label: "Delivery Time" },
  { key: "price", label: "Price" },
] as const;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const SortModal = ({ visible, onClose }: Props) => {
  const { filters, setFilters } = useFilterStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

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
            Sort By
          </Text>

          {SORT_OPTIONS.map(({ key, label }) => {
            const active = filters.sortBy === key;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => setFilters({ sortBy: active ? undefined : key })}
                className={`py-3 border-b border-gray-200 ${
                  active ? (isDark ? "bg-yellow-600/30" : "bg-yellow-100") : ""
                }`}
              >
                <Text
                  className={`text-lg font-semibold mb-3 ${
                    isDark ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={onClose}
            className="bg-yellow-400 mt-6 rounded-lg py-3 items-center"
          >
            <Text className="text-white font-semibold text-base">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
