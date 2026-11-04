import type { Reservation } from "../booking/Reservation";

export interface ReservationCardProps {
  reservation: Reservation;
  onPress: () => void;
}
