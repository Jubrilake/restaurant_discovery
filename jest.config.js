// jest.config.js
module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native" +
      "|@react-native" +
      "|@react-navigation" +
      "|expo" +
      "|expo-asset" +
      "|expo-constants" +
      "|expo-font" +
      "|expo-haptics" +
      "|expo-image" +
      "|expo-linking" +
      "|expo-modules-core" +
      "|expo-router" +
      "|expo-splash-screen" +
      "|expo-status-bar" +
      "|expo-web-browser" +
      ")/)"
  ],
};
