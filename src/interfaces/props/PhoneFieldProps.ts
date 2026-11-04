export interface PhoneFieldProps {
  label: string;
  /** Full number with country code, for example +97339990001. */
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
