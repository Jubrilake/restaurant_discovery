import { RestaurantFilter } from "@/types/restaurant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  filters: RestaurantFilter;
  setFilters: (f: Partial<RestaurantFilter>) => void;
  removeFilter: <K extends keyof RestaurantFilter>(
    key: K,
    value?: RestaurantFilter[K] extends (infer U)[] ? U : RestaurantFilter[K]
  ) => void;
  reset: () => void;
};

export const useFilterStore = create<State>()(
  persist(
    (set) => ({
      filters: {},

      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),

      removeFilter: (key, value) =>
        set((s) => {
          const updated = { ...s.filters };
          const current = updated[key];
          if (Array.isArray(current)) {
            const filtered = current.filter((v) => v !== value);
            updated[key] = filtered.length > 0 ? (filtered as any) : undefined;
          } else {
            delete updated[key];
          }
          return { filters: updated };
        }),

      reset: () => set({ filters: {} }),
    }),
    {
      name: "lb-filters",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
