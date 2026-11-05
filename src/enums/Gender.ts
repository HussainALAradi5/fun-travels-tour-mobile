export const Gender = { MALE: "MALE", FEMALE: "FEMALE" } as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const GenderLabel = { MALE: "Male", FEMALE: "Female" } as const satisfies Record<Gender, string>;

/** Badge color of each gender, for light and dark themes. */
export const GenderColor = {
  MALE: { light: "#2563EB", dark: "#60A5FA" },
  FEMALE: { light: "#DB2777", dark: "#F472B6" },
} as const satisfies Record<Gender, { light: string; dark: string }>;
