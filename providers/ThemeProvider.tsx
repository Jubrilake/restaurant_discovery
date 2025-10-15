import { useThemeStore } from "@/store/themeStore";
import { setStatusBarStyle } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme, View } from "react-native";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useThemeStore();
  const systemTheme = useColorScheme();

  // optional: sync with system setting on first mount
  useEffect(() => {
    if (!theme && systemTheme) setTheme(systemTheme as "light" | "dark");
  }, [systemTheme]);

  // set status bar color properly
  useEffect(() => {
    setStatusBarStyle(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <View
      className={`${theme === "dark" ? "dark bg-black" : "bg-gray-50"} flex-1`}
    >
      {children}
    </View>
  );
};
