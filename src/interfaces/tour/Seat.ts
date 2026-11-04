import type { SeatStatus } from "@/enums/SeatStatus";

export interface Seat {
  id: number;
  seatCode: string;
  chairType: string;
  status: SeatStatus;
  seatPriceModifier: number;
}
