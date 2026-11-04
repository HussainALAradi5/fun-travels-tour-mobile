export interface AvatarProps {
  name: string;
  /** Server path ("/uploads/...") or a data URL of a newly picked photo. */
  imageUrl?: string | null;
  size?: number;
}
