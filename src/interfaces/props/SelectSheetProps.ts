export interface SelectSheetProps<T> {
  visible: boolean;
  title: string;
  items: T[];
  /** Text shown for an item and matched by the search box. */
  label: (item: T) => string;
  /** Optional right-hand detail, such as a dial code. */
  detail?: (item: T) => string;
  keyOf: (item: T) => string;
  onSelect: (item: T) => void;
  onClose: () => void;
}
