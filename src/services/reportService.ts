import { ENDPOINTS } from "@/config/endpoints";
import type { MediaResponseDto } from "@/dtos/media/MediaResponseDto";
import type { ReportRequestDto } from "@/dtos/report/ReportRequestDto";
import { MediaCategory } from "@/enums/MediaCategory";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import { toQuery } from "@/utilities/format";
import { api } from "./apiClient";

/** Server-generated PDF/Excel reports, kept as the user's media. */
export const reportService = {
  generate: (request: ReportRequestDto) => api.post<MediaResponseDto>(ENDPOINTS.reports, request),
  mine: () => api.get<PageResponse<MediaResponseDto>>(ENDPOINTS.media.root + toQuery({ category: MediaCategory.REPORT, size: 50 })),
  remove: (id: number) => api.delete<void>(ENDPOINTS.media.byId(id)),
};
