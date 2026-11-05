import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SPACING } from "@/constants/theme";
import type { CountryResponseDto } from "@/dtos/geography/CountryResponseDto";
import { useCountries } from "@/hooks/useCountries";
import { useTheme } from "@/hooks/useTheme";
import type { CatalogFiltersProps } from "@/interfaces/props/CatalogFiltersProps";
import type { CountryKey } from "@/types/CountryKey";
import { toIsoDate } from "@/utilities/dates";
import { Button } from "../common/Button";
import { DateField } from "../common/DateField";
import { SelectSheet } from "../common/SelectSheet";
import { CountryFilterButton } from "./CountryFilterButton";

/** From/to country cards and a travel date range picked from the phone's calendar, like the web catalog filters. */
export function CatalogFilters({ filter, active, onChange, onDate, onReset }: CatalogFiltersProps) {
  const theme = useTheme();
  const countries = useCountries().data ?? [];
  const [picking, setPicking] = useState<CountryKey | null>(null);
  const countryOf = (id?: number) => countries.find((c) => c.id === id);
  const today = toIsoDate(new Date());
  const pickDate = (key: "startDate" | "endDate", value?: string) => {
    onDate(key, value ?? "");
    // A start after the chosen end would match nothing, so the end moves with it.
    if (key === "startDate" && value && filter.endDate && filter.endDate < value) onDate("endDate", "");
  };
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <CountryFilterButton caption="From" country={countryOf(filter.startCountryId)} onPress={() => setPicking("startCountryId")} />
        <Ionicons name="arrow-forward" size={18} color={theme.muted} />
        <CountryFilterButton caption="To" country={countryOf(filter.endCountryId)} onPress={() => setPicking("endCountryId")} />
      </View>
      <View style={styles.row}>
        <View style={styles.flex}>
          <DateField label="From date" value={filter.startDate} minimumDate={today} onChange={(v) => pickDate("startDate", v)} />
        </View>
        <View style={styles.flex}>
          <DateField label="To date" value={filter.endDate} minimumDate={filter.startDate ?? today} onChange={(v) => pickDate("endDate", v)} />
        </View>
      </View>
      {active ? <Button label="Clear filters" variant="outline" onPress={onReset} /> : null}
      <SelectSheet<CountryResponseDto> visible={picking !== null} title={picking === "endCountryId" ? "Travelling to" : "Leaving from"}
        items={countries} label={(c) => c.famousName} image={(c) => c.flagPngUrl} keyOf={(c) => String(c.id)}
        selectedKey={picking && filter[picking] ? String(filter[picking]) : undefined} searchPlaceholder="Search countries"
        clearLabel="Any country" onClear={() => { if (picking) onChange({ [picking]: undefined }); setPicking(null); }}
        onClose={() => setPicking(null)} onSelect={(c) => { if (picking) onChange({ [picking]: c.id }); setPicking(null); }} />
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { gap: SPACING.md }, row: { flexDirection: "row", alignItems: "center", gap: SPACING.sm }, flex: { flex: 1 } });
