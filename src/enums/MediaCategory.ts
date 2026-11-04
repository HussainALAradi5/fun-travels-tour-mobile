/** What a stored file is for. */
export const MediaCategory = {
  REPORT: "REPORT",
} as const;

export type MediaCategory = (typeof MediaCategory)[keyof typeof MediaCategory];
