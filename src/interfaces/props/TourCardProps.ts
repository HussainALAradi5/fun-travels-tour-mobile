import type { Tour } from "../tour/Tour";

export interface TourCardProps {
  tour: Tour;
  onPress: () => void;
}
