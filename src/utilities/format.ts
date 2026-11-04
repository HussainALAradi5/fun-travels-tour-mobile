const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatMoney = (value: number | null | undefined) => money.format(Number(value ?? 0));

export function formatDate(value?: string | null): string {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function placeName(place?: { name?: string; famousName?: string } | null): string {
  return place?.name ?? place?.famousName ?? "-";
}

/** Builds a query string, skipping empty values. */
export function toQuery(params: object = {}): string {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "");
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
}
