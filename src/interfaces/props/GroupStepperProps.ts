export interface GroupStepperProps {
  adults: number;
  kids: number;
  limit: number;
  kidsDiscountPercent: number;
  canSeat: boolean;
  onChange: (adults: number, children: number) => void;
  onSeatEveryone: () => void;
}
