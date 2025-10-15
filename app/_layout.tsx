import { TanstackProvider } from "@/providers/TanstackProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <TanstackProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <SafeAreaView style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </ThemeProvider>
      </SafeAreaProvider>
    </TanstackProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
