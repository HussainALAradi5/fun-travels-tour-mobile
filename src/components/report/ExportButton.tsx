import { useReportExport } from "@/hooks/useReportExport";
import type { ExportButtonProps } from "@/interfaces/props/ExportButtonProps";
import { Button } from "../common/Button";

/** "Export" button that produces a server report (PDF or Excel) and opens the share sheet. */
export function ExportButton({ report, label = "Export report" }: ExportButtonProps) {
  const exporter = useReportExport(report);
  return <Button label={label} variant="outline" onPress={exporter.choose} loading={exporter.pending} />;
}
