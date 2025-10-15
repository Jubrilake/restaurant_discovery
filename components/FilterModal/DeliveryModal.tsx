import { useFilterStore } from "@/store/filterStore";
import { useThemeStore } from "@/store/themeStore";
import Slider from "@react-native-community/slider";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const DeliveryModal = ({ visible, onClose }: Props) => {
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
            Max Delivery Time (minutes)
          </Text>

          <Slider
            minimumValue={10}
            maximumValue={120}
            step={5}
            minimumTrackTintColor="#facc15"
            maximumTrackTintColor="#d1d5db"
            thumbTintColor="#facc15"
            value={filters.maxDeliveryTime ?? 60}
            onValueChange={(val) => setFilters({ maxDeliveryTime: val })}
          />

          <Text
            className={`text-lg font-semibold mb-3 ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {filters.maxDeliveryTime
              ? `${filters.maxDeliveryTime} mins`
              : "Any"}
          </Text>

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
