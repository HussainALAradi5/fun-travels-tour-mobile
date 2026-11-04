/** Kinds of support request. */
export const UserRequestType = {
  SUPPORT: "SUPPORT",
  SUGGESTION: "SUGGESTION",
} as const;

export type UserRequestType = (typeof UserRequestType)[keyof typeof UserRequestType];
