/** Calendar dates as the API sends them (YYYY-MM-DD), read and written in the phone's own time zone. */
export function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromIsoDate(value?: string | null): Date | undefined {
  const match = value ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(value) : null;
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : undefined;
}

/** A short, local date such as "Thu, 5 Dec 2026". */
export function formatPickedDate(value?: string | null): string | undefined {
  const date = fromIsoDate(value);
  return date?.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
