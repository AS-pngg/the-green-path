import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Pixel Theme Colors
        pixel: {
          forest: "hsl(var(--pixel-forest))",
          "forest-light": "hsl(var(--pixel-forest-light))",
          "forest-dark": "hsl(var(--pixel-forest-dark))",
          ocean: "hsl(var(--pixel-ocean))",
          "ocean-light": "hsl(var(--pixel-ocean-light))",
          "ocean-dark": "hsl(var(--pixel-ocean-dark))",
          earth: "hsl(var(--pixel-earth))",
          "earth-light": "hsl(var(--pixel-earth-light))",
          "earth-dark": "hsl(var(--pixel-earth-dark))",
          sky: "hsl(var(--pixel-sky))",
          "sky-light": "hsl(var(--pixel-sky-light))",
          "sky-dark": "hsl(var(--pixel-sky-dark))",
          warning: "hsl(var(--pixel-warning))",
          danger: "hsl(var(--pixel-danger))",
          success: "hsl(var(--pixel-success))",
          cloud: "hsl(var(--pixel-cloud))",
          mountain: "hsl(var(--pixel-mountain))",
          tree: "hsl(var(--pixel-tree))",
          leaf: "hsl(var(--pixel-leaf))",
          light: "hsl(var(--pixel-light))",
          dark: "hsl(var(--pixel-dark))",
        },
        carbon: {
          excellent: "hsl(var(--carbon-excellent))",
          good: "hsl(var(--carbon-good))",
          warning: "hsl(var(--carbon-warning))",
          danger: "hsl(var(--carbon-danger))",
        },
        disaster: {
          flood: "hsl(var(--disaster-flood))",
          fire: "hsl(var(--disaster-fire))",
          storm: "hsl(var(--disaster-storm))",
          pollution: "hsl(var(--disaster-pollution))",
        },
      },
      fontFamily: {
        pixel: ["Press Start 2P", "cursive"],
        digital: ["Orbitron", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
