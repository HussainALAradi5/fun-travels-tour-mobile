import { Image, StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { BoardingPassProps } from "@/interfaces/props/BoardingPassProps";
import { formatDate, formatDateTime, formatMoney } from "@/utilities/format";
import { Card } from "../common/Card";
import { InfoRow } from "../common/InfoRow";
import { StatusBadge } from "../common/StatusBadge";

const QR_SIZE = 180;

/** The web boarding pass on a phone: route, dates, seat, passenger, price, and the QR code once paid. */
export function BoardingPass({ ticket, tour }: BoardingPassProps) {
  const theme = useTheme();
  const dates = tour ?? ticket.tour;
  const place = (city?: string, country?: string | null) => [city, country].filter(Boolean).join(", ") || "To be announced";
  return (
    <Card>
      <StatusBadge status={ticket.ticketStatus} />
      <Text style={{ color: theme.text, fontSize: 20, fontWeight: "800" }}>{ticket.tour?.title ?? "Tour"}</Text>
      <View style={styles.route}>
        <View style={styles.flex}>
          <Text style={{ color: theme.muted, fontSize: 12 }}>DEPARTURE</Text>
          <Text style={{ color: theme.text, fontWeight: "700" }}>{place(tour?.startCity?.name, tour?.startCountry?.officialName)}</Text>
          <Text style={{ color: theme.muted }}>{formatDate(dates?.startDate)}</Text>
        </View>
        <View style={[styles.flex, styles.right]}>
          <Text style={{ color: theme.muted, fontSize: 12 }}>ARRIVAL</Text>
          <Text style={{ color: theme.text, fontWeight: "700", textAlign: "right" }}>{place(tour?.endCity?.name, tour?.endCountry?.officialName)}</Text>
          <Text style={{ color: theme.muted }}>{formatDate(dates?.endDate)}</Text>
        </View>
      </View>
      <InfoRow label="Ticket" value={ticket.ticketNumber} />
      <InfoRow label="Passenger" value={ticket.customer?.name ?? "-"} />
      <InfoRow label="Seat" value={ticket.assignedSeat?.seatCode ?? "Unassigned"} />
      <InfoRow label="Vehicle" value={tour?.transportation ? `${tour.transportation.type} ${tour.transportation.transportationNumber}` : "To be assigned"} />
      <InfoRow label="Booked" value={formatDateTime(ticket.bookingDate)} />
      <InfoRow label={ticket.paid ? "Total paid" : "Amount due"} value={formatMoney(ticket.totalPrice)} strong />
      {ticket.paid && ticket.qrCode ? (
        <Image accessibilityLabel={`QR code for ticket ${ticket.ticketNumber}`} source={{ uri: ticket.qrCode }} style={styles.qr} />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  route: { flexDirection: "row", gap: SPACING.md, paddingVertical: SPACING.sm },
  flex: { flex: 1, gap: 2 },
  right: { alignItems: "flex-end" },
  qr: { width: QR_SIZE, height: QR_SIZE, alignSelf: "center", marginTop: SPACING.sm },
});
