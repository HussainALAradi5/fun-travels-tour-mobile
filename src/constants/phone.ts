/** Country preselected in the phone field (ISO 3166-1 alpha-2). */
export const DEFAULT_COUNTRY_CODE = "BH";
/** The server's rule: "+", the country code, then the number (E.164). */
export const MOBILE_PATTERN = /^\+[1-9]\d{7,14}$/;
export const MOBILE_HINT = "Pick your country code, then enter your number";
