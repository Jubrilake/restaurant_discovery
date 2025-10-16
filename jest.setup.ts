import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import React from "react";
import reanimatedMock from "react-native-reanimated/mock";

// ✅ Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// ✅ Mock react-native-reanimated (ESM-safe)
jest.mock("react-native-reanimated", () => {
  reanimatedMock.default.call = () => {}; // Fix .call() crash
  return reanimatedMock;
});

// ✅ Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => {
  const MockIcon = (props: any) =>
    React.createElement("Icon", { ...props, name: props.name || "mock-icon" });

  return {
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    FontAwesome: MockIcon,
    default: MockIcon,
  };
});

// ✅ Silence Animated warnings
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper", () => ({
  NativeAnimatedHelper: {},
}));

// ✅ Mock problematic Expo modules
jest.mock("expo-font", () => ({}));
jest.mock("expo-constants", () => ({}));
jest.mock("expo-linking", () => ({
  createURL: jest.fn(),
}));
