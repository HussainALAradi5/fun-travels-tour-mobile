import type { Gender } from "@/enums/Gender";

export interface GenderPickerProps {
  label: string;
  value?: Gender | null;
  onChange: (gender: Gender) => void;
}
