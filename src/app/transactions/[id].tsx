import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Text } from "react-native";
import { Card } from "@/components/common/Card";
import { InfoRow } from "@/components/common/InfoRow";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { useAsync } from "@/hooks/useAsync";
import { useTheme } from "@/hooks/useTheme";
import { paymentService } from "@/services/paymentService";
import { formatDateTime, formatMoney } from "@/utilities/format";

export default function TransactionScreen() {
  const theme = useTheme();
  const id = Number(useLocalSearchParams<{ id: string }>().id);
  const { data, loading, error, reload } = useAsync(useCallback(() => paymentService.transaction(id), [id]));
  if (!data) return <StateView loading={loading} error={error} onRetry={reload} />;
  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: "800" }}>{formatMoney(data.amount)}</Text>
        <Text style={{ color: theme.muted }}>{data.description ?? data.transactionType}</Text>
        <InfoRow label="Type" value={data.transactionType.replace(/_/g, " ")} />
        <InfoRow label="Date" value={formatDateTime(data.timestamp)} />
        <InfoRow label="Account" value={data.account?.accountNumber ?? "-"} />
        <InfoRow label="Reference" value={`#${data.id}`} />
      </Card>
    </Screen>
  );
}
