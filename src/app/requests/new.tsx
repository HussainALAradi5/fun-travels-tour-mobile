import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { Screen } from "@/components/common/Screen";
import { TextField } from "@/components/common/TextField";
import { SPACING } from "@/constants/theme";
import { UserRequestType } from "@/enums/UserRequestType";
import { useNewSupportRequest } from "@/hooks/useNewSupportRequest";
import { useTheme } from "@/hooks/useTheme";

export default function NewRequestScreen() {
  const theme = useTheme();
  const form = useNewSupportRequest();
  return (
    <Screen>
      <Text style={{ color: theme.text, fontWeight: "600" }}>Type</Text>
      <View style={styles.row}>
        {Object.values(UserRequestType).map((t) => (
          <Chip key={t} label={t === UserRequestType.SUPPORT ? "Support" : "Suggestion"} selected={form.type === t} onPress={() => form.setType(t)} />
        ))}
      </View>
      <TextField label="Title" value={form.title} onChangeText={form.setTitle} />
      <TextField label="Description" value={form.description} onChangeText={form.setDescription} multiline style={styles.area} />
      <Button label="Send request" onPress={form.submit} disabled={!form.canSubmit} loading={form.pending} />
    </Screen>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: "row", gap: SPACING.sm }, area: { minHeight: 120, textAlignVertical: "top" } });
