import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function TabsLayout() {
  const { user, restoring } = useAuth();
  if (!restoring && !user) return <Redirect href="/(auth)/login" />;
  return (
    <Tabs>
      <Tabs.Screen name="tours" options={{ title: "Tours" }} />
      <Tabs.Screen name="bookings" options={{ title: "Bookings" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
      <Tabs.Screen name="notifications" options={{ title: "Alerts" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
