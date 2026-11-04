import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerBackTitle: "Back" }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="tours/[id]" options={{ title: "Tour" }} />
          <Stack.Screen name="bookings/[id]" options={{ title: "Booking" }} />
          <Stack.Screen name="tickets/[id]" options={{ title: "Boarding pass" }} />
          <Stack.Screen name="transactions/[id]" options={{ title: "Transaction" }} />
          <Stack.Screen name="payments/index" options={{ title: "Payments" }} />
          <Stack.Screen name="payments/[id]" options={{ title: "Payment" }} />
          <Stack.Screen name="requests/index" options={{ title: "Support requests" }} />
          <Stack.Screen name="requests/new" options={{ title: "New request" }} />
          <Stack.Screen name="requests/[id]" options={{ title: "Request" }} />
          <Stack.Screen name="reports/index" options={{ title: "My reports" }} />
          <Stack.Screen name="profile/edit" options={{ title: "Edit profile" }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
