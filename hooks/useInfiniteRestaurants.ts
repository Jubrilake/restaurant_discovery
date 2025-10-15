import { fetchRestaurants } from "@/lib/mockApi";
import { Restaurant, RestaurantFilter } from "@/types/restaurant";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";

type FetchResponse = {
  data: Restaurant[];
  nextCursor?: string | null;
};

export function useInfiniteRestaurants({
  q,
  filters,
}: {
  q: string;
  filters?: RestaurantFilter;
}) {
  return useInfiniteQuery<
    FetchResponse, // each page
    Error,          // error type
    InfiniteData<FetchResponse>, // full infinite query result
    [string, string, RestaurantFilter?],
    string | null
  >({
    queryKey: ["restaurants", q, filters],
    queryFn: async ({ pageParam }) => {
      const cursor: string | null = typeof pageParam === "string" ? pageParam : null;
      return await fetchRestaurants({
        q,
        filters,
        cursor,
        limit: 20,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 15,
  });
}
