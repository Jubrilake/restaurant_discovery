import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { FilterSheet } from "@/components/FilterModal/FilterSheet";
import { RestaurantGrid } from "@/components/RestaurantGrid";
import { SearchHeader } from "@/components/SearchHeader";
import { useInfiniteRestaurants } from "@/hooks/useInfiniteRestaurants";
import { hasActiveFilters, useSearchFilters } from "@/hooks/useSearchFilters";

import { useThemeStore } from "@/store/themeStore";

import { FilterChips } from "@/components/FilterChips";

import "../global.css";

export default function Index() {
  const sheetRef = useRef<BottomSheet>(null);
  const { filters, clearAllFilters, removeSingleFilter } = useSearchFilters();

  const { theme, toggleTheme } = useThemeStore();
  const [qState, setQState] = React.useState("");

  const { data, fetchNextPage, refetch, isFetching, isFetchingNextPage } =
    useInfiniteRestaurants({
      q: qState,
      filters,
    });

  const restaurants = useMemo(
    () => (data ? data.pages.flatMap((p) => p.data) : []),
    [data]
  );

  const openFilters = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  const hasSearchOrFilter = hasActiveFilters(filters, qState);

  const themeIcon = theme === "dark" ? "moon" : "sun";

  return (
    <GestureHandlerRootView>
      <View
        className={`flex-1 pt-10 ${
          theme === "dark" ? "bg-black" : "bg-gray-50"
        }`}
      >
        {/* Header */}
        <View className="px-4 pb-2 flex flex-row justify-between items-center">
          {hasSearchOrFilter ? (
            <Text
              className={`font-semibold text-xl ${
                theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              {restaurants.length} restaurant
              {restaurants.length !== 1 ? "s" : ""} found
            </Text>
          ) : (
            <Text
              className={`font-semibold text-xl ${
                theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Explore top restaurants near you
            </Text>
          )}

          {/* Theme Toggle */}
          <TouchableOpacity
            className={`p-2 rounded-full ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
            onPress={toggleTheme}
          >
            <Feather
              name={themeIcon}
              size={20}
              color={theme === "dark" ? "#f9fafb" : "#333"}
            />
          </TouchableOpacity>
        </View>

        {/* Search + Filter Row */}
        <View className="flex-row items-center px-4 py-3 space-x-3">
          <View className="flex-1 flex ">
            <SearchHeader onDebouncedSearch={setQState} />
          </View>

          <TouchableOpacity
            className={`px-3 py-2 rounded-lg flex-row items-center ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
            onPress={openFilters}
          >
            <Feather
              name="sliders"
              size={18}
              color={theme === "dark" ? "#f9fafb" : "#333"}
            />
            <Text
              className={`ml-1 ${
                theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <>
          <FilterChips reset={clearAllFilters} filters={filters} removeFilter={removeSingleFilter}/>
        </>

        {/* Restaurant Grid */}
        <RestaurantGrid
          data={restaurants}
          onEndReached={fetchNextPage}
          onRefresh={() => refetch()}
          refreshing={isFetching && !isFetchingNextPage}
          hasNext={!!data?.pages[data.pages.length - 1].nextCursor}
          loadingMore={isFetchingNextPage}
        />

        <FilterSheet sheetRef={sheetRef} />
      </View>
    </GestureHandlerRootView>
  );
}
