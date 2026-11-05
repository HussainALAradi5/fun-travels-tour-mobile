export const ChairType = {
  STANDARD: "STANDARD", KIDS_CHAIR: "KIDS_CHAIR", WHEELCHAIR_ACCESSIBLE: "WHEELCHAIR_ACCESSIBLE", PREMIUM_RECLINER: "PREMIUM_RECLINER",
} as const;
export type ChairType = (typeof ChairType)[keyof typeof ChairType];

/** Short labels for seat chips. */
export const CHAIR_LABEL: Record<ChairType, string> = {
  STANDARD: "", KIDS_CHAIR: "Kids", WHEELCHAIR_ACCESSIBLE: "Accessible", PREMIUM_RECLINER: "Premium",
};
