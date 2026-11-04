import type { ReportRequestDto } from "@/dtos/report/ReportRequestDto";

export interface ExportButtonProps {
  report: Omit<ReportRequestDto, "format">;
  label?: string;
}
