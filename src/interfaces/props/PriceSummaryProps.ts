import type { BookingEstimate } from "../booking/BookingEstimate";

export interface PriceSummaryProps {
  estimate: BookingEstimate;
  travelers: number;
  kidsDiscountPercent: number;
}
