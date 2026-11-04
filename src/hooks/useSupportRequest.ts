import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { MESSAGES } from "@/constants/messages";
import { UserRequestStatus } from "@/enums/UserRequestStatus";
import { supportService } from "@/services/supportService";
import { useAction } from "./useAction";
import { useAsync } from "./useAsync";

/** One request with its reply thread; the requester may comment and delete it while it is pending. */
export function useSupportRequest(id: number) {
  const request = useAsync(useCallback(() => supportService.byId(id), [id]));
  const timeline = useAsync(useCallback(() => supportService.timeline(id), [id]));
  const [reply, setReply] = useState("");
  const { pending, run } = useAction();
  const send = () => run(async () => {
    await supportService.comment(id, reply.trim());
    setReply("");
    await timeline.reload();
  });
  const remove = () => Alert.alert(MESSAGES.deleteRequestTitle, undefined, [
    { text: "Keep", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: () => void run(async () => {
      await supportService.remove(id);
      router.back();
    }) },
  ]);
  const deletable = request.data?.status === UserRequestStatus.PENDING;
  return { request, timeline, reply, setReply, send, remove, deletable, pending };
}
