import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { errorMessage } from "@/utilities/errors";

/** Runs a mutation, tracks its pending state, and shows server errors. */
export function useAction() {
  const [pending, setPending] = useState(false);
  const run = useCallback(async (action: () => Promise<void>) => {
    setPending(true);
    try {
      await action();
    } catch (e) {
      Alert.alert("Request failed", errorMessage(e));
    } finally {
      setPending(false);
    }
  }, []);
  return { pending, run };
}
