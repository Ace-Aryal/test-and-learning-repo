import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { trpc } from "@/utils/trpc";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { StatusBar } from "expo-status-bar";

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}
function TrpcDemo() {
  // Type-safe query using the shared API!
  const helloQuery = trpc.greetings.useQuery();

  return (
    <View style={styles.container}>
      <Text>Expo + tRPC + Monorepo</Text>
      {helloQuery.isLoading ? (
        <Text>Loading...</Text>
      ) : helloQuery.error ? (
        <Text>Error: {helloQuery.error.message}</Text>
      ) : (
        <Text>Greeting: **{helloQuery.data}**</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
