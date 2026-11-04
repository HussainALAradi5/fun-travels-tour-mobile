import { router } from "expo-router";
import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/hooks/useTheme";
import { formatDate, formatMoney } from "@/utilities/format";

export default function ProfileScreen() {
  const theme = useTheme();
  const { signOut } = useAuth();
  const { data: profile, loading, error, reload } = useProfile();
  const logout = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };
  const muted = { color: theme.muted };
  return (
    <Screen>
      <StateView loading={loading} error={error} onRetry={reload} />
      {profile ? (
        <>
          <Card>
            <Text style={{ color: theme.text, fontSize: 22, fontWeight: "800" }}>{profile.name}</Text>
            <Text style={muted}>@{profile.userName} · {profile.userType}</Text>
            <Text style={muted}>{profile.email}</Text>
            <Text style={muted}>{profile.mobileNumber}</Text>
            {profile.memberSince ? <Text style={muted}>Member since {formatDate(profile.memberSince)}</Text> : null}
            {profile.agency ? <Text style={muted}>Agency: {profile.agency.agencyName}</Text> : null}
            {profile.agencyBranch ? <Text style={muted}>Branch: {profile.agencyBranch.branchName}</Text> : null}
          </Card>
          {profile.wallet ? (
            <Card>
              <Text style={muted}>Wallet {profile.wallet.accountNumber}</Text>
              <Text style={{ color: theme.text, fontSize: 24, fontWeight: "800" }}>{formatMoney(profile.wallet.balance)}</Text>
            </Card>
          ) : null}
        </>
      ) : null}
      <Button label="Sign out" variant="outline" onPress={logout} />
    </Screen>
  );
}
