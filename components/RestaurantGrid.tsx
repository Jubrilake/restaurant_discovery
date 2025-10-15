import { Restaurant } from "@/types/restaurant";
import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantGrid: React.FC<{
  data: Restaurant[];
  onEndReached: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  hasNext?: boolean;
  loadingMore?: boolean;
}> = ({ data, onEndReached, onRefresh, refreshing, hasNext, loadingMore }) => {
  if (!data.length && !refreshing) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-gray-500">No results found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RestaurantCard item={item} />}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 120 }}
      ListFooterComponent={() =>
        loadingMore ? (
          <Text className="text-center p-4">Loading more...</Text>
        ) : null
      }
      removeClippedSubviews
      initialNumToRender={10}
      windowSize={21}
    />
  );
};
