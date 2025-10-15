import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";
type ThemeStore = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (mode) => set({ theme: mode }),
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    {
      name: "lb-theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
