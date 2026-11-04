import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { SelectSheetProps } from "@/interfaces/props/SelectSheetProps";
import { Button } from "./Button";
import { TextField } from "./TextField";

/** Full-screen searchable list for picking one item (countries, dial codes, ...). */
export function SelectSheet<T>({ visible, title, items, label, detail, keyOf, onSelect, onClose }: SelectSheetProps<T>) {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => `${label(item)} ${detail?.(item) ?? ""}`.toLowerCase().includes(q)) : items;
  }, [items, query, label, detail]);
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.sheet, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text, fontSize: 20, fontWeight: "800" }}>{title}</Text>
        <TextField label="Search" value={query} onChangeText={setQuery} autoCapitalize="none" />
        <FlatList data={visibleItems} keyExtractor={keyOf} keyboardShouldPersistTaps="handled" renderItem={({ item }) => (
          <Pressable accessibilityRole="button" style={[styles.item, { borderColor: theme.border }]}
            onPress={() => { onSelect(item); setQuery(""); }}>
            <Text style={{ color: theme.text, flex: 1 }}>{label(item)}</Text>
            {detail ? <Text style={{ color: theme.muted }}>{detail(item)}</Text> : null}
          </Pressable>
        )} />
        <Button label="Close" variant="outline" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: { flex: 1, padding: SPACING.lg, paddingTop: SPACING.xl * 2, gap: SPACING.md },
  item: { minHeight: TOUCH_TARGET, flexDirection: "row", alignItems: "center", gap: SPACING.md, borderBottomWidth: StyleSheet.hairlineWidth },
});
