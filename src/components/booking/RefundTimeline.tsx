import { StyleSheet, Text, View } from "react-native";
import { RADIUS, SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { RefundTimelineProps } from "@/interfaces/props/RefundTimelineProps";
import { Card } from "../common/Card";

/** The agency's cancellation rules, so travelers know what they get back before paying. */
export function RefundTimeline({ policy }: RefundTimelineProps) {
  const theme = useTheme();
  if (!policy) return null;
  const partial = policy.partialRefundPercent > 0;
  const steps = [
    { when: `More than ${policy.fullRefundDays} days before`, back: "Full refund", color: theme.success },
    ...(partial ? [{ when: `${policy.partialRefundDays}–${policy.fullRefundDays} days before`, back: `${policy.partialRefundPercent}% back`, color: theme.warning }] : []),
    { when: `Within ${partial ? policy.partialRefundDays : policy.fullRefundDays + 1} days`, back: "No refund", color: theme.danger },
  ];
  return (
    <Card>
      <Text style={{ color: theme.text, fontWeight: "800" }}>Cancellation and refunds</Text>
      {steps.map((s) => (
        <View key={s.when} style={[styles.step, { borderLeftColor: s.color, backgroundColor: theme.background }]}>
          <Text style={{ color: theme.text, flex: 1 }}>{s.when}</Text>
          <Text style={{ color: s.color, fontWeight: "700" }}>{s.back}</Text>
        </View>
      ))}
      <Text style={{ color: theme.muted, fontSize: 12 }}>If the agency cancels the tour, you get a full refund to your wallet.</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  step: { flexDirection: "row", alignItems: "center", padding: SPACING.sm, borderLeftWidth: 4, borderRadius: RADIUS.sm },
});
