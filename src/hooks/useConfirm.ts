import { useCallback } from "react";
import { Alert } from "react-native";

/** Destructive actions always ask first. */
export function useConfirm() {
  return useCallback((title: string, message: string, onConfirm: () => void) => {
    Alert.alert(title, message, [
      { text: "Keep", style: "cancel" },
      { text: "Yes, cancel", style: "destructive", onPress: onConfirm },
    ]);
  }, []);
}
