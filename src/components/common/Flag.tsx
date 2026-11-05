import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import type { FlagProps } from "@/interfaces/props/FlagProps";

/** A small country flag that hides itself instead of showing a broken image. */
export function Flag({ uri, width = 24 }: FlagProps) {
  const [failed, setFailed] = useState(false);
  if (!uri || failed) return null;
  return (
    <Image accessibilityIgnoresInvertColors source={{ uri }} onError={() => setFailed(true)}
      style={[styles.flag, { width, height: Math.round((width * 3) / 4) }]} />
  );
}

const styles = StyleSheet.create({ flag: { borderRadius: 2 } });
