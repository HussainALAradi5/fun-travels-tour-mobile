import { Image, StyleSheet, Text } from "react-native";
import { TicketStatus } from "@/enums/TicketStatus";
import { useTheme } from "@/hooks/useTheme";
import type { TicketCardProps } from "@/interfaces/props/TicketCardProps";
import { formatMoney } from "@/utilities/format";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { StatusBadge } from "../common/StatusBadge";

const QR_SIZE = 160;

export function TicketCard({ ticket, onCancel, onView }: TicketCardProps) {
  const theme = useTheme();
  const active = ticket.ticketStatus !== TicketStatus.CANCELLED && ticket.ticketStatus !== TicketStatus.COMPLETED;
  return (
    <Card>
      <StatusBadge status={ticket.ticketStatus} />
      <Text style={{ color: theme.text, fontWeight: "700" }}>{ticket.ticketNumber}</Text>
      <Text style={{ color: theme.muted }}>Seat {ticket.assignedSeat?.seatCode ?? "unassigned"} - {formatMoney(ticket.totalPrice)}</Text>
      {ticket.paid && active && ticket.qrCode ? (
        <Image accessibilityLabel={`QR code for ticket ${ticket.ticketNumber}`} source={{ uri: ticket.qrCode }} style={styles.qr} />
      ) : null}
      {onView ? <Button label="Boarding pass" variant="outline" onPress={onView} /> : null}
      {active && onCancel ? <Button label="Cancel ticket" variant="danger" onPress={onCancel} /> : null}
    </Card>
  );
}

const styles = StyleSheet.create({ qr: { width: QR_SIZE, height: QR_SIZE, alignSelf: "center" } });
