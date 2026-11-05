import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import { Modal, Pressable, SectionList, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RADIUS, SPACING, TOUCH_TARGET } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { SelectRowProps } from "@/interfaces/props/SelectRowProps";
import type { SelectSheetProps } from "@/interfaces/props/SelectSheetProps";
import { Flag } from "./Flag";

/**
 * Bottom sheet for picking one item (countries, dial codes, ...): a search bar, A-Z sections,
 * flags, a tick on the current choice, and an optional "any" row that clears it.
 */
export function SelectSheet<T>({ visible, title, items, label, detail, image, keyOf, selectedKey, clearLabel, onClear,
  searchPlaceholder = "Search", onSelect, onClose }: SelectSheetProps<T>) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q ? items.filter((item) => `${label(item)} ${detail?.(item) ?? ""}`.toLowerCase().includes(q)) : items;
    const groups = new Map<string, T[]>();
    for (const item of [...matches].sort((a, b) => label(a).localeCompare(label(b)))) {
      const letter = label(item).charAt(0).toUpperCase();
      groups.set(letter, [...(groups.get(letter) ?? []), item]);
    }
    return [...groups].map(([letter, data]) => ({ title: letter, data }));
  }, [items, query, label, detail]);
  const close = () => { setQuery(""); onClose(); };
  const choose = (item: T) => { setQuery(""); onSelect(item); };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Close" />
      <View style={[styles.sheet, { backgroundColor: theme.background, paddingBottom: insets.bottom + SPACING.md }]}>
        <View style={[styles.handle, { backgroundColor: theme.border }]} />
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={SPACING.sm} onPress={close}
            style={[styles.close, { backgroundColor: theme.surface }]}>
            <Ionicons name="close" size={20} color={theme.text} />
          </Pressable>
        </View>
        <View style={[styles.search, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Ionicons name="search" size={18} color={theme.muted} />
          <TextInput value={query} onChangeText={setQuery} placeholder={searchPlaceholder} placeholderTextColor={theme.muted}
            autoCapitalize="none" autoCorrect={false} accessibilityLabel={searchPlaceholder} style={[styles.searchInput, { color: theme.text }]} />
          {query ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={SPACING.sm} onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color={theme.muted} />
            </Pressable>
          ) : null}
        </View>
        <SectionList
          sections={sections}
          keyExtractor={keyOf}
          keyboardShouldPersistTaps="handled"
          stickySectionHeadersEnabled
          initialNumToRender={30}
          ListHeaderComponent={clearLabel && onClear && !query ? (
            <Row label={clearLabel} selected={!selectedKey} icon="globe-outline" onPress={() => { setQuery(""); onClear(); }} />
          ) : undefined}
          ListEmptyComponent={<Text style={[styles.empty, { color: theme.muted }]}>{`Nothing matches "${query}"`}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={[styles.section, { color: theme.muted, backgroundColor: theme.background }]}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <Row label={label(item)} detail={detail?.(item)} flag={image?.(item)} selected={keyOf(item) === selectedKey}
              onPress={() => choose(item)} />
          )}
        />
      </View>
    </Modal>
  );
}

function Row({ label, detail, flag, icon, selected, onPress }: SelectRowProps) {
  const theme = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress}
      style={({ pressed }) => [styles.row, { backgroundColor: selected ? `${theme.primary}14` : pressed ? theme.surface : "transparent" }]}>
      {icon ? <Ionicons name={icon} size={22} color={theme.primary} /> : <View style={styles.flagBox}><Flag uri={flag} width={28} /></View>}
      <Text numberOfLines={1} style={[styles.rowLabel, { color: theme.text, fontWeight: selected ? "700" : "500" }]}>{label}</Text>
      {detail ? <Text style={{ color: theme.muted, fontVariant: ["tabular-nums"] }}>{detail}</Text> : null}
      {selected ? <Ionicons name="checkmark-circle" size={20} color={theme.primary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  sheet: { height: "85%", borderTopLeftRadius: RADIUS.lg + 8, borderTopRightRadius: RADIUS.lg + 8, paddingHorizontal: SPACING.lg, gap: SPACING.md },
  handle: { alignSelf: "center", width: 40, height: 5, borderRadius: 3, marginTop: SPACING.sm },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 20, fontWeight: "800" },
  close: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  search: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, minHeight: TOUCH_TARGET, borderWidth: 1,
    borderRadius: RADIUS.md, paddingHorizontal: SPACING.md },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: SPACING.sm },
  section: { fontSize: 12, fontWeight: "800", paddingVertical: SPACING.xs, letterSpacing: 1 },
  row: { minHeight: TOUCH_TARGET + 4, flexDirection: "row", alignItems: "center", gap: SPACING.md, paddingHorizontal: SPACING.sm, borderRadius: RADIUS.md },
  flagBox: { width: 28, alignItems: "center" },
  rowLabel: { flex: 1, fontSize: 16 },
  empty: { textAlign: "center", paddingVertical: SPACING.xl },
});
