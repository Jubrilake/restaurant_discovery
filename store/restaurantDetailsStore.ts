// src/store/restaurantStore.ts
import { getRestaurantWithMenu } from "@/lib/mockApi";
import type { RestaurantWithMenu } from "@/types/restaurant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type RestaurantState = {
  restaurant: RestaurantWithMenu | null;
  loading: boolean;
  error: string | null;
  fetchRestaurant: (id: string) => Promise<void>;
  clearRestaurant: () => void;
};

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      restaurant: null,
      loading: false,
      error: null,

      fetchRestaurant: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const data = await getRestaurantWithMenu(id);
          if (!data) {
            set({
              restaurant: null,
              loading: false,
              error: "Restaurant not found",
            });
            return;
          }
          set({ restaurant: data, loading: false });
        } catch (err) {
          set({
            loading: false,
            error: err instanceof Error ? err.message : "Something went wrong",
          });
        }
      },

      clearRestaurant: () => set({ restaurant: null, error: null }),
    }),
    {
      name: "lb-restaurant",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        restaurant: state.restaurant,
      }),
    }
  )
);
