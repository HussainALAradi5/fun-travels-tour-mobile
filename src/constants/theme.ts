export const COLORS = {
  light: {
    background: "#F5F7FB", surface: "#FFFFFF", text: "#111827", muted: "#6B7280", border: "#E5E7EB",
    primary: "#2563EB", primaryText: "#FFFFFF", danger: "#DC2626", success: "#16A34A", warning: "#D97706",
  },
  dark: {
    background: "#0B1220", surface: "#111A2E", text: "#F3F4F6", muted: "#9CA3AF", border: "#1F2A44",
    primary: "#60A5FA", primaryText: "#0B1220", danger: "#F87171", success: "#4ADE80", warning: "#FBBF24",
  },
} as const;

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const RADIUS = { sm: 8, md: 12, lg: 16 } as const;
/** Minimum touch target recommended by both platforms. */
export const TOUCH_TARGET = 44;
