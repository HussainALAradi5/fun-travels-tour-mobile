import type { CountryResponseDto } from "@/dtos/geography/CountryResponseDto";

export interface CountryFilterButtonProps {
  /** "From" or "To". */
  caption: string;
  country?: CountryResponseDto;
  onPress: () => void;
}
