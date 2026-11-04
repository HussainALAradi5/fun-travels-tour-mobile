import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { InfoRow } from "@/components/common/InfoRow";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useAsync } from "@/hooks/useAsync";
import { useTheme } from "@/hooks/useTheme";
import { paymentService } from "@/services/paymentService";
import { formatDateTime, formatMoney } from "@/utilities/format";

export default function PaymentScreen() {
  const theme = useTheme();
  const id = Number(useLocalSearchParams<{ id: string }>().id);
  const { data, loading, error, reload } = useAsync(useCallback(() => paymentService.byId(id), [id]));
  if (!data) return <StateView loading={loading} error={error} onRetry={reload} />;
  return (
    <Screen>
      <Card>
        <StatusBadge status={data.status} />
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: "800" }}>{formatMoney(data.amount)}</Text>
        <InfoRow label="Method" value={data.method.replace(/_/g, " ")} />
        <InfoRow label="Date" value={formatDateTime(data.paymentDate)} />
        <InfoRow label="Reference" value={data.transactionId} />
        <InfoRow label="Reservation" value={data.reservation?.reservationNumber ?? "-"} />
      </Card>
      {data.reservation ? (
        <Button label="Open booking" variant="outline" onPress={() => router.push(`/bookings/${data.reservation!.id}`)} />
      ) : null}
    </Screen>
  );
}
