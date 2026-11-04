import { ENDPOINTS } from "@/config/endpoints";
import type { CommentResponseDto } from "@/dtos/support/CommentResponseDto";
import type { TimelineResponseDto } from "@/dtos/support/TimelineResponseDto";
import type { UserRequestCreateRequestDto } from "@/dtos/support/UserRequestCreateRequestDto";
import type { UserRequestResponseDto } from "@/dtos/support/UserRequestResponseDto";
import { ReferenceType } from "@/enums/ReferenceType";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import { toQuery } from "@/utilities/format";
import { api } from "./apiClient";

/** Support requests and their comment thread (the server's generic tracking timeline). */
export const supportService = {
  mine: () => api.get<PageResponse<UserRequestResponseDto>>(ENDPOINTS.userRequests.root + toQuery({ size: 50, sortDir: "desc" })),
  byId: (id: number) => api.get<UserRequestResponseDto>(ENDPOINTS.userRequests.byId(id)),
  create: (request: UserRequestCreateRequestDto) => api.post<UserRequestResponseDto>(ENDPOINTS.userRequests.root, request),
  remove: (id: number) => api.delete<void>(ENDPOINTS.userRequests.byId(id)),
  timeline: (id: number) => api.get<TimelineResponseDto>(ENDPOINTS.tracking.timeline(ReferenceType.USER_REQUEST, id)),
  comment: (id: number, content: string) =>
    api.post<CommentResponseDto>(ENDPOINTS.tracking.comments(ReferenceType.USER_REQUEST, id), { content }),
};
