import { useEffect, useMemo, useState } from "react";
import { DEFAULT_COUNTRY_CODE } from "@/constants/phone";
import type { CountryResponseDto } from "@/dtos/geography/CountryResponseDto";
import { countryService } from "@/services/countryService";

/** Countries with dial codes for the phone field, searchable, with Bahrain preselected. */
export function useDialCodes() {
  const [countries, setCountries] = useState<CountryResponseDto[]>([]);
  const [selected, setSelected] = useState<CountryResponseDto | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countryService.list()
      .then((list) => {
        const withCodes = list.filter((c) => c.dialCode);
        setCountries(withCodes);
        setSelected(withCodes.find((c) => c.countryCode === DEFAULT_COUNTRY_CODE) ?? withCodes[0] ?? null);
      })
      .catch(() => setCountries([]));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? countries.filter((c) => c.famousName.toLowerCase().includes(q) || c.dialCode.includes(q)) : countries;
  }, [countries, query]);

  return { visible, selected, setSelected, query, setQuery };
}
