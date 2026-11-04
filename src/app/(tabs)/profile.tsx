import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { InfoRow } from "@/components/common/InfoRow";
import { LinkRow } from "@/components/common/LinkRow";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { SPACING } from "@/constants/theme";
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
  return (
    <Screen>
      <StateView loading={loading} error={error} onRetry={reload} />
      {profile ? (
        <>
          <View style={styles.header}>
            <Avatar name={profile.name} imageUrl={profile.profileImageUrl} />
            <View style={styles.flex}>
              <Text style={{ color: theme.text, fontSize: 22, fontWeight: "800" }}>{profile.name}</Text>
              <Text style={{ color: theme.muted }}>@{profile.userName} - {profile.userType}</Text>
            </View>
          </View>
          <Card>
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="Mobile" value={profile.mobileNumber} />
            <InfoRow label="Age" value={profile.age ? String(profile.age) : "-"} />
            <InfoRow label="Member since" value={formatDate(profile.memberSince)} />
            {profile.agency ? <InfoRow label="Agency" value={profile.agency.agencyName} /> : null}
            {profile.agencyBranch ? <InfoRow label="Branch" value={profile.agencyBranch.branchName} /> : null}
            {profile.wallet ? <InfoRow label="Wallet" value={formatMoney(profile.wallet.balance)} strong /> : null}
          </Card>
          <Card>
            <LinkRow label="Edit profile" hint="Name, mobile, age, photo" onPress={() => router.push("/profile/edit")} />
            <LinkRow label="Support requests" hint="Ask for help or send a suggestion" onPress={() => router.push("/requests")} />
            <LinkRow label="My reports" hint="PDF and Excel exports" onPress={() => router.push("/reports")} />
            <LinkRow label="Booking payments" onPress={() => router.push("/payments")} />
          </Card>
        </>
      ) : null}
      <Button label="Sign out" variant="outline" onPress={logout} />
    </Screen>
  );
}

const styles = StyleSheet.create({ header: { flexDirection: "row", alignItems: "center", gap: SPACING.lg }, flex: { flex: 1 } });
