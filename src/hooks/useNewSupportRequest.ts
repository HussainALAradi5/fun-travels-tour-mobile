import { router } from "expo-router";
import { useState } from "react";
import { UserRequestType } from "@/enums/UserRequestType";
import { supportService } from "@/services/supportService";
import { useAction } from "./useAction";

/** The new-request form: type, title, and description. */
export function useNewSupportRequest() {
  const [type, setType] = useState<UserRequestType>(UserRequestType.SUPPORT);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { pending, run } = useAction();
  const canSubmit = title.trim().length > 0 && description.trim().length > 0;
  const submit = () => run(async () => {
    const created = await supportService.create({ type, title: title.trim(), description: description.trim() });
    router.replace(`/requests/${created.id}`);
  });
  return { type, setType, title, setTitle, description, setDescription, canSubmit, submit, pending };
}
