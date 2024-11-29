// REVIEWED - 03
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import colors from "tailwindcss/colors";
import { parseColor } from "tailwindcss/lib/util/color";
import plugin from "tailwindcss/plugin";

export const toRGB = function toRGB(value: string) {
  return parseColor(value).color.join(" ");
};

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        sidebar: {
          "DEFAULT": "rgb(var(--sidebar-background))",
          "foreground": "rgb(var(--sidebar-foreground))",
          "primary": "rgb(var(--sidebar-primary))",
          "primary-foreground": "rgb(var(--sidebar-primary-foreground))",
          "accent": "rgb(var(--sidebar-accent))",
          "accent-foreground": "rgb(var(--sidebar-accent-foreground))",
          "border": "rgb(var(--sidebar-border))",
          "ring": "rgb(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--background": toRGB(colors.white),
          "--foreground": toRGB(colors.zinc["950"]),
          "--card": toRGB(colors.white),
          "--card-foreground": toRGB(colors.zinc["950"]),
          "--popover": toRGB(colors.white),
          "--popover-foreground": toRGB(colors.zinc["950"]),
          "--primary": toRGB(colors.zinc["900"]),
          "--primary-foreground": toRGB(colors.zinc["50"]),
          "--secondary": toRGB(colors.zinc["100"]),
          "--secondary-foreground": toRGB(colors.zinc["900"]),
          "--muted": toRGB(colors.zinc["100"]),
          "--muted-foreground": toRGB(colors.zinc["500"]),
          "--accent": toRGB(colors.zinc["100"]),
          "--accent-foreground": toRGB(colors.zinc["900"]),
          "--destructive": toRGB(colors.red["500"]),
          "--destructive-foreground": toRGB(colors.zinc["50"]),
          "--border": toRGB(colors.zinc["200"]),
          "--input": toRGB(colors.zinc["200"]),
          "--ring": toRGB(colors.zinc["950"]),
          "--sidebar-background": toRGB(colors.zinc["50"]),
          "--sidebar-foreground": toRGB(colors.zinc["700"]),
          "--sidebar-primary": toRGB(colors.zinc["900"]),
          "--sidebar-primary-foreground": toRGB(colors.zinc["50"]),
          "--sidebar-accent": toRGB(colors.zinc["100"]),
          "--sidebar-accent-foreground": toRGB(colors.zinc["900"]),
          "--sidebar-border": toRGB(colors.zinc["300"]),
          "--sidebar-ring": toRGB(colors.zinc["950"]),
          "--radius": "0.5rem",
        },

        ".dark": {
          "--background": toRGB(colors.zinc["950"]),
          "--foreground": toRGB(colors.zinc["50"]),
          "--card": toRGB(colors.zinc["950"]),
          "--card-foreground": toRGB(colors.zinc["50"]),
          "--popover": toRGB(colors.zinc["950"]),
          "--popover-foreground": toRGB(colors.zinc["50"]),
          "--primary": toRGB(colors.zinc["50"]),
          "--primary-foreground": toRGB(colors.zinc["900"]),
          "--secondary": toRGB(colors.zinc["800"]),
          "--secondary-foreground": toRGB(colors.zinc["50"]),
          "--muted": toRGB(colors.zinc["800"]),
          "--muted-foreground": toRGB(colors.zinc["400"]),
          "--accent": toRGB(colors.zinc["800"]),
          "--accent-foreground": toRGB(colors.zinc["50"]),
          "--destructive": toRGB(colors.red["900"]),
          "--destructive-foreground": toRGB(colors.zinc["50"]),
          "--border": toRGB(colors.zinc["800"]),
          "--input": toRGB(colors.zinc["800"]),
          "--ring": toRGB(colors.zinc["300"]),
          "--sidebar-background": toRGB(colors.zinc["900"]),
          "--sidebar-foreground": toRGB(colors.zinc["100"]),
          "--sidebar-primary": toRGB(colors.zinc["50"]),
          "--sidebar-primary-foreground": toRGB(colors.zinc["900"]),
          "--sidebar-accent": toRGB(colors.zinc["800"]),
          "--sidebar-accent-foreground": toRGB(colors.zinc["100"]),
          "--sidebar-border": toRGB(colors.zinc["800"]),
          "--sidebar-ring": toRGB(colors.zinc["300"]),
        },
      });
    }),
  ],
} satisfies Config;
