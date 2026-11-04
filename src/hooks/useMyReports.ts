import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";
import { MESSAGES } from "@/constants/messages";
import type { MediaResponseDto } from "@/dtos/media/MediaResponseDto";
import { reportService } from "@/services/reportService";
import { downloadAndShare } from "@/utilities/fileShare";
import { useAction } from "./useAction";
import { useAsync } from "./useAsync";

/** Reports this user generated (on web or mobile): open/share again, or delete. */
export function useMyReports() {
  const list = useAsync(useCallback(() => reportService.mine(), []));
  const { reload } = list;
  useFocusEffect(useCallback(() => { void reload(); }, [reload]));
  const { pending, run } = useAction();
  const open = (media: MediaResponseDto) => run(() => downloadAndShare(media));
  const remove = (media: MediaResponseDto) => Alert.alert(MESSAGES.deleteReportTitle, media.fileName, [
    { text: "Keep", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: () => void run(async () => {
      await reportService.remove(media.id);
      await list.reload();
    }) },
  ]);
  return { list, open, remove, pending };
}
