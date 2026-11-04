/** Envelope returned by every server endpoint. */
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
  fieldErrors?: Record<string, string>;
}
