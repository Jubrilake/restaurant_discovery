/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"transpileOnly": true} */

import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native" +
      "|@react-native" +
      "|@expo" +
      "|expo(-[a-z0-9-]+)?" +
      "|react-native(-[a-z0-9-]+)?" +
      "|@react-navigation" +
      "|@expo-google-fonts" +
      ")/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  clearMocks: true,
  verbose: true,
};

export default config;
