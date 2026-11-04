import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { TicketCard } from "@/components/booking/TicketCard";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { StatusBadge } from "@/components/common/StatusBadge";
import { GenericStatus } from "@/enums/GenericStatus";
import { useBookingActions } from "@/hooks/useBookingActions";
import { useReservationDetail } from "@/hooks/useReservationDetail";
import { useTheme } from "@/hooks/useTheme";
import { formatDateTime, formatMoney } from "@/utilities/format";

export default function BookingDetailScreen() {
  const theme = useTheme();
  const id = Number(useLocalSearchParams<{ id: string }>().id);
  const detail = useReservationDetail(id);
  const actions = useBookingActions(id, detail.reload);
  const reservation = detail.reservation.data;
  if (!reservation) return <StateView loading={detail.reservation.loading} error={detail.reservation.error} onRetry={detail.reload} />;
  const pending = reservation.status === GenericStatus.PENDING;
  const cancellable = pending || reservation.status === GenericStatus.CONFIRMED;
  return (
    <Screen>
      <Card>
        <StatusBadge status={reservation.status} />
        <Text style={{ color: theme.text, fontSize: 20, fontWeight: "800" }}>{reservation.tour?.title ?? reservation.reservationNumber}</Text>
        <Text style={{ color: theme.muted }}>{reservation.reservationNumber}</Text>
        <Text style={{ color: theme.text }}>Total {formatMoney(reservation.totalPrice)}</Text>
        {pending && reservation.holdExpiresAt ? (
          <Text style={{ color: theme.warning }}>Held until {formatDateTime(reservation.holdExpiresAt)}</Text>
        ) : null}
      </Card>
      {pending ? <Button label="Pay with wallet" onPress={actions.pay} loading={actions.pending} /> : null}
      {(detail.tickets.data?.content ?? []).map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onCancel={cancellable ? () => actions.cancelTicket(ticket.id) : undefined} />
      ))}
      {cancellable ? <Button label="Cancel reservation" variant="danger" onPress={actions.cancel} loading={actions.pending} /> : null}
    </Screen>
  );
}
