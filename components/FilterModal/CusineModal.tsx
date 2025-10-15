import { useFilterStore } from "@/store/filterStore";
import { useThemeStore } from "@/store/themeStore";
import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

const CUISINES = [
  "Nigerian",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Suya",
  "Swallow",
  "Pepper Soup",
  "Jollof",
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const CuisineModal = ({ visible, onClose }: Props) => {
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
            Select Cuisine
          </Text>
          <FlatList
            data={CUISINES}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const active = filters.cuisineTypes?.includes(item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    const current = filters.cuisineTypes || [];
                    const next = active
                      ? current.filter((x) => x !== item)
                      : [...current, item];
                    setFilters({ cuisineTypes: next });
                  }}
                  className={`py-3 border-b border-gray-200 ${
                    active
                      ? isDark
                        ? "bg-yellow-900/30"
                        : "bg-yellow-100"
                      : ""
                  }`}
                >
                  <Text
                    className={`${isDark ? "text-gray-400" : "text-gray-800"}`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
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
