import { Image, StyleSheet, Text, View } from "react-native";
import { API_ORIGIN } from "@/config/api.config";
import { useTheme } from "@/hooks/useTheme";
import type { AvatarProps } from "@/interfaces/props/AvatarProps";

const DEFAULT_SIZE = 72;

/** Profile photo, or the user's initials when there is none. */
export function Avatar({ name, imageUrl, size = DEFAULT_SIZE }: AvatarProps) {
  const theme = useTheme();
  const shape = { width: size, height: size, borderRadius: size / 2 };
  if (imageUrl) {
    const uri = imageUrl.startsWith("/") ? API_ORIGIN + imageUrl : imageUrl;
    return <Image accessibilityLabel={`${name} profile photo`} source={{ uri }} style={shape} />;
  }
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <View style={[styles.circle, shape, { backgroundColor: theme.primary }]}>
      <Text style={{ color: theme.primaryText, fontWeight: "800", fontSize: size / 3 }}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ circle: { alignItems: "center", justifyContent: "center" } });
