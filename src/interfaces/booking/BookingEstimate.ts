/** The price breakdown shown before booking; the server recalculates and charges the same way. */
export interface BookingEstimate {
  fare: number;
  kidsDiscount: number;
  kidsChairs: number;
  seatUpgrades: number;
  meals: number;
  total: number;
}
