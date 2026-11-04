import { useColorScheme } from "react-native";
import { COLORS } from "@/constants/theme";

export function useTheme() {
  return COLORS[useColorScheme() === "dark" ? "dark" : "light"];
}
