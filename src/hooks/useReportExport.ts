import { Alert } from "react-native";
import type { ReportRequestDto } from "@/dtos/report/ReportRequestDto";
import { ReportFormat } from "@/enums/ReportFormat";
import { reportService } from "@/services/reportService";
import { downloadAndShare } from "@/utilities/fileShare";
import { useAction } from "./useAction";

/** Asks for PDF or Excel, has the server build the report, then downloads and shares it. */
export function useReportExport(spec: Omit<ReportRequestDto, "format">) {
  const { pending, run } = useAction();
  const generate = (format: ReportFormat) => run(async () => {
    const media = await reportService.generate({ ...spec, format });
    await downloadAndShare(media);
  });
  const choose = () => Alert.alert("Export report", "The server builds the report from all your records.", [
    { text: "PDF", onPress: () => void generate(ReportFormat.PDF) },
    { text: "Excel", onPress: () => void generate(ReportFormat.XLSX) },
    { text: "Cancel", style: "cancel" },
  ]);
  return { choose, pending };
}
