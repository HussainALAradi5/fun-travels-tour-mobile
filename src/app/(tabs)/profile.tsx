import { router } from "expo-router";
import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Screen } from "@/components/common/Screen";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const logout = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };
  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: "800" }}>{user?.name}</Text>
        <Text style={{ color: theme.muted }}>{user?.email}</Text>
        <Text style={{ color: theme.muted }}>{user?.mobileNumber}</Text>
        <Text style={{ color: theme.muted }}>Role: {user?.userType}</Text>
      </Card>
      <Button label="Sign out" variant="outline" onPress={logout} />
    </Screen>
  );
}
