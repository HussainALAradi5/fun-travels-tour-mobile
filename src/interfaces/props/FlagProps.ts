export interface FlagProps {
  /** Flag image address; nothing is drawn when it is missing or fails to load. */
  uri?: string | null;
  /** Width in points; the height keeps the 4:3 flag shape. */
  width?: number;
}
