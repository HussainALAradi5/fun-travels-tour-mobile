import { useMemo, useState } from "react";
import { DEFAULT_COUNTRY_CODE } from "@/constants/phone";
import type { CountryResponseDto } from "@/dtos/geography/CountryResponseDto";
import { useCountries } from "./useCountries";

/** Countries with dial codes; until the user picks one, the starting value's country (or Bahrain) is used. */
export function useDialCodes(initialValue = "") {
  const all = useCountries();
  const countries = useMemo(() => (all.data ?? []).filter((c) => c.dialCode), [all.data]);
  const [chosen, setSelected] = useState<CountryResponseDto | null>(null);
  const [startValue] = useState(initialValue);
  const selected = chosen
    ?? countries.find((c) => startValue.startsWith(c.dialCode))
    ?? countries.find((c) => c.countryCode === DEFAULT_COUNTRY_CODE)
    ?? countries[0]
    ?? null;
  return { countries, selected, setSelected };
}
