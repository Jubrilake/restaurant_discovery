import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// ✅ Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// ✅ Mock react-native-reanimated (ESM-safe)
jest.mock("react-native-reanimated", () => import("react-native-reanimated/mock"));

// ✅ Silence Animated warnings in Jest
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
