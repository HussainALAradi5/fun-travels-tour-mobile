export interface SelectRowProps {
  label: string;
  detail?: string;
  flag?: string | null;
  /** Shown instead of a flag, e.g. for the "Any country" row. */
  icon?: "globe-outline";
  selected: boolean;
  onPress: () => void;
}
