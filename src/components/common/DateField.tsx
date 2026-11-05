import Ionicons from "@expo/vector-icons/Ionicons";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { DateFieldProps } from "@/interfaces/props/DateFieldProps";
import { formatPickedDate, fromIsoDate, toIsoDate } from "@/utilities/dates";
import { Button } from "./Button";

/**
 * Tap-to-pick date: the system calendar dialog on Android, an inline calendar sheet on iOS.
 * The value stays YYYY-MM-DD for the API; the field shows it in the phone's own format.
 */
export function DateField({ label, value, placeholder = "Any date", minimumDate, maximumDate, onChange }: DateFieldProps) {
  const theme = useTheme();
  const [iosDraft, setIosDraft] = useState<Date | null>(null);
  const current = fromIsoDate(value) ?? fromIsoDate(minimumDate) ?? new Date();
  const limits = { minimumDate: fromIsoDate(minimumDate), maximumDate: fromIsoDate(maximumDate) };
  const shown = formatPickedDate(value);

  const open = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({ value: current, mode: "date", ...limits, onValueChange: (_e, date) => onChange(toIsoDate(date)) });
    } else {
      setIosDraft(current);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`${label}: ${shown ?? placeholder}`} onPress={open}
        style={[styles.field, { borderColor: value ? theme.primary : theme.border, backgroundColor: theme.surface }]}>
        <Ionicons name="calendar-outline" size={18} color={value ? theme.primary : theme.muted} />
        <Text numberOfLines={1} style={[styles.value, { color: value ? theme.text : theme.muted }]}>{shown ?? placeholder}</Text>
        {value ? (
          <Pressable accessibilityRole="button" accessibilityLabel={`Clear ${label}`} hitSlop={SPACING.sm} onPress={() => onChange(undefined)}>
            <Ionicons name="close-circle" size={18} color={theme.muted} />
          </Pressable>
        ) : null}
      </Pressable>
      {Platform.OS === "ios" ? (
        <Modal visible={iosDraft !== null} transparent animationType="slide" onRequestClose={() => setIosDraft(null)}>
          <Pressable style={styles.backdrop} onPress={() => setIosDraft(null)} accessibilityLabel="Close calendar" />
          <View style={[styles.sheet, { backgroundColor: theme.surface }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>{label}</Text>
            {iosDraft ? (
              <RNDateTimePicker value={iosDraft} mode="date" display="inline" {...limits}
                onValueChange={(_e, date) => setIosDraft(date)} />
            ) : null}
            <Button label="Done" onPress={() => { if (iosDraft) onChange(toIsoDate(iosDraft)); setIosDraft(null); }} />
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: SPACING.xs },
  label: { fontWeight: "600" },
  field: { minHeight: TOUCH_TARGET, flexDirection: "row", alignItems: "center", gap: SPACING.sm, borderWidth: 1,
    borderRadius: RADIUS.md, paddingHorizontal: SPACING.md },
  value: { flex: 1, fontSize: 15 },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  sheet: { padding: SPACING.lg, paddingBottom: SPACING.xl * 1.5, gap: SPACING.md, borderTopLeftRadius: RADIUS.lg, borderTopRightRadius: RADIUS.lg },
  sheetTitle: { fontSize: 18, fontWeight: "800" },
});
