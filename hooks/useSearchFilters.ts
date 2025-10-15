// src/hooks/useSearchFilters.ts
import { useCallback } from "react";
import { useFilterStore } from "@/store/filterStore";
import type { RestaurantFilter } from "@/types/restaurant";

/**
 * Check if any filters or search query are active
 */
export function hasActiveFilters(filters: RestaurantFilter, q: string): boolean {
  // True if user typed something
  if (q.trim().length > 0) return true;

  // True if any actual filter is active
  return (
    (filters.cuisineTypes && filters.cuisineTypes.length > 0) ||
    (filters.priceRanges && filters.priceRanges.length > 0) ||
    (filters.minRating != null && filters.minRating > 0) ||
    (filters.maxDeliveryTime != null && filters.maxDeliveryTime > 0) ||
    (filters.dietaryRestrictions && filters.dietaryRestrictions.length > 0) ||
    filters.sortBy != null
  );
}

/**
 * A reusable hook to manage search + filter logic.
 * Encapsulates Zustand filter store with convenience helpers.
 */
export const useSearchFilters = () => {
  const { filters, setFilters, removeFilter, reset } = useFilterStore();

  /** Add or update a filter value */
  const updateFilter = useCallback(
    <K extends keyof RestaurantFilter>(key: K, value: RestaurantFilter[K]) => {
      setFilters({ [key]: value });
    },
    [setFilters]
  );

  /** Remove a single filter (or a value from an array filter) */
  const removeSingleFilter = useCallback(
    <K extends keyof RestaurantFilter>(
      key: K,
      value?: RestaurantFilter[K] extends (infer U)[] ? U : RestaurantFilter[K]
    ) => {
      removeFilter(key, value as any);
    },
    [removeFilter]
  );

  /** Clear all filters */
  const clearAllFilters = useCallback(() => reset(), [reset]);

  /** Check if any filters are active (excluding query) */
  const hasFiltersOnly = Object.keys(filters || {}).length > 0;

  return {
    filters,
    updateFilter,
    removeSingleFilter,
    clearAllFilters,
    hasFiltersOnly,
    hasActiveFilters, // ✅ exposed utility for reuse
  };
};
