import { Pressable, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import type { ReservationCardProps } from "@/interfaces/props/ReservationCardProps";
import { formatDateTime, formatMoney } from "@/utilities/format";
import { Card } from "../common/Card";
import { StatusBadge } from "../common/StatusBadge";

export function ReservationCard({ reservation, onPress }: ReservationCardProps) {
  const theme = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open booking ${reservation.reservationNumber}`} onPress={onPress}>
      <Card>
        <StatusBadge status={reservation.status} />
        <Text style={{ color: theme.text, fontSize: 17, fontWeight: "700" }}>{reservation.tour?.title ?? reservation.reservationNumber}</Text>
        <Text style={{ color: theme.muted }}>{reservation.reservationNumber} - booked {formatDateTime(reservation.bookingDate)}</Text>
        <Text style={{ color: theme.text }}>{reservation.requestedSlots} traveler(s) - {formatMoney(reservation.totalPrice)}</Text>
      </Card>
    </Pressable>
  );
}
