// Professional HealthAI Clinical Platform Theme
export const theme = {
  colors: {
    // Primary - Medical Blue (Trust, Professionalism)
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6", // Main primary
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },

    // Secondary - Medical Green (Health, Growth)
    secondary: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e", // Main secondary
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },

    // Accent - Dark Slate (Professional, Subtle)
    accent: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b", // Main accent
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },

    // Neutral Grays - Dark Theme
    neutral: {
      50: "#0f172a",
      100: "#1e293b",
      200: "#334155",
      300: "#475569",
      400: "#64748b",
      500: "#94a3b8",
      600: "#cbd5e1",
      700: "#e2e8f0",
      800: "#f1f5f9",
      900: "#f8fafc",
    },

    // Status Colors
    success: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
    },
    warning: {
      50: "#1e293b",
      500: "#64748b",
      600: "#475569",
    },
    error: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
    },
    info: {
      50: "#eff6ff",
      500: "#3b82f6",
      600: "#2563eb",
    },
  },

  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "Consolas", "monospace"],
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// CSS Custom Properties for dynamic theming
export const cssVariables = {
  "--color-primary": theme.colors.primary[500],
  "--color-primary-hover": theme.colors.primary[600],
  "--color-secondary": theme.colors.secondary[500],
  "--color-accent": theme.colors.accent[500],
  "--color-neutral-50": theme.colors.neutral[50],
  "--color-neutral-100": theme.colors.neutral[100],
  "--color-neutral-200": theme.colors.neutral[200],
  "--color-neutral-300": theme.colors.neutral[300],
  "--color-neutral-400": theme.colors.neutral[400],
  "--color-neutral-500": theme.colors.neutral[500],
  "--color-neutral-600": theme.colors.neutral[600],
  "--color-neutral-700": theme.colors.neutral[700],
  "--color-neutral-800": theme.colors.neutral[800],
  "--color-neutral-900": theme.colors.neutral[900],
  "--font-sans": theme.typography.fontFamily.sans.join(", "),
  "--font-mono": theme.typography.fontFamily.mono.join(", "),
  "--radius-sm": theme.borderRadius.sm,
  "--radius-md": theme.borderRadius.md,
  "--radius-lg": theme.borderRadius.lg,
  "--radius-xl": theme.borderRadius.xl,
  "--shadow-sm": theme.shadows.sm,
  "--shadow-md": theme.shadows.md,
  "--shadow-lg": theme.shadows.lg,
  "--shadow-xl": theme.shadows.xl,
};

export default theme;
