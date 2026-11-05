export interface DateFieldProps {
  label: string;
  /** YYYY-MM-DD, or empty for no date. */
  value?: string;
  placeholder?: string;
  /** Earliest and latest dates that can be picked, as YYYY-MM-DD. */
  minimumDate?: string;
  maximumDate?: string;
  onChange: (value: string | undefined) => void;
}
