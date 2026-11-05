import type { AgencyPolicyResponseDto } from "@/dtos/agency/AgencyPolicyResponseDto";

export interface RefundTimelineProps {
  policy: AgencyPolicyResponseDto | null | undefined;
}
