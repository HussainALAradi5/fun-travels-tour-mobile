import { ENDPOINTS } from "@/config/endpoints";
import type { ProfileResponseDto } from "@/dtos/user/ProfileResponseDto";
import type { UserUpdateRequestDto } from "@/dtos/user/UserUpdateRequestDto";
import { api } from "./apiClient";

export const profileService = {
  /** The signed-in user's identity, agency placement, and wallet in one response. */
  mine: () => api.get<ProfileResponseDto>(ENDPOINTS.users.myProfile),
  /** Name, mobile (with country code), age, and photo; returns the refreshed profile. */
  update: (request: UserUpdateRequestDto) => api.put<ProfileResponseDto>(ENDPOINTS.users.myProfile, request),
};
