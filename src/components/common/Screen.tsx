import { useCallback, useRef, useState, type ComponentRef, type PropsWithChildren } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

/**
 * Safe-area, keyboard-aware scroll container used by form and detail screens. Android apps are
 * edge-to-edge, so the window no longer resizes for the keyboard: the view pads itself on both
 * platforms, offset by its own distance from the top of the window (the header above it).
 */
export function Screen({ children }: PropsWithChildren) {
  const theme = useTheme();
  const frame = useRef<ComponentRef<typeof View>>(null);
  const [topOffset, setTopOffset] = useState(0);
  const measure = useCallback(() => frame.current?.measureInWindow((_x, y) => setTopOffset(y)), []);
  return (
    <SafeAreaView edges={["bottom"]} style={[styles.flex, { backgroundColor: theme.background }]}>
      <View ref={frame} style={styles.flex} onLayout={measure}>
        <KeyboardAvoidingView style={styles.flex} behavior="padding" keyboardVerticalOffset={topOffset}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive">{children}</ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.lg },
});
