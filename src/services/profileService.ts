import { ENDPOINTS } from "@/config/endpoints";
import type { ProfileResponseDto } from "@/dtos/user/ProfileResponseDto";
import { api } from "./apiClient";

export const profileService = {
  /** The signed-in user's identity, agency placement, and wallet in one response. */
  mine: () => api.get<ProfileResponseDto>(ENDPOINTS.users.myProfile),
};
