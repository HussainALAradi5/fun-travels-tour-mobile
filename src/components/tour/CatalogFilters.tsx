import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SPACING } from "@/constants/theme";
import type { CountryResponseDto } from "@/dtos/geography/CountryResponseDto";
import { useCountries } from "@/hooks/useCountries";
import type { CatalogFiltersProps } from "@/interfaces/props/CatalogFiltersProps";
import { Button } from "../common/Button";
import { Chip } from "../common/Chip";
import { SelectSheet } from "../common/SelectSheet";
import type { CountryKey } from "@/types/CountryKey";
import { TextField } from "../common/TextField";

/** From/to country pickers and a travel date range, like the web catalog filters. */
export function CatalogFilters({ filter, active, onChange, onDate, onReset }: CatalogFiltersProps) {
  const countries = useCountries().data ?? [];
  const [picking, setPicking] = useState<CountryKey | null>(null);
  const [dates, setDates] = useState({ startDate: filter.startDate ?? "", endDate: filter.endDate ?? "" });
  const nameOf = (id?: number) => countries.find((c) => c.id === id)?.famousName;
  const typeDate = (key: "startDate" | "endDate", text: string) => { setDates((d) => ({ ...d, [key]: text })); onDate(key, text); };
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Chip label={nameOf(filter.startCountryId) ?? "From: any"} selected={Boolean(filter.startCountryId)} onPress={() => setPicking("startCountryId")} />
        <Chip label={nameOf(filter.endCountryId) ?? "To: any"} selected={Boolean(filter.endCountryId)} onPress={() => setPicking("endCountryId")} />
      </View>
      <View style={styles.row}>
        <View style={styles.flex}><TextField label="From date" placeholder="YYYY-MM-DD" value={dates.startDate} onChangeText={(t) => typeDate("startDate", t)} /></View>
        <View style={styles.flex}><TextField label="To date" placeholder="YYYY-MM-DD" value={dates.endDate} onChangeText={(t) => typeDate("endDate", t)} /></View>
      </View>
      {active ? <Button label="Clear filters" variant="outline" onPress={() => { setDates({ startDate: "", endDate: "" }); onReset(); }} /> : null}
      <SelectSheet<CountryResponseDto> visible={picking !== null} title="Country" items={countries} label={(c) => c.famousName}
        keyOf={(c) => String(c.id)} onClose={() => setPicking(null)}
        onSelect={(c) => { if (picking) onChange({ [picking]: c.id }); setPicking(null); }} />
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { gap: SPACING.sm }, row: { flexDirection: "row", gap: SPACING.sm }, flex: { flex: 1 } });
