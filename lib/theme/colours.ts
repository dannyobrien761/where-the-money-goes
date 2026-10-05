// Single source of colour for the whole app.
// Each payer, region and asset class has one fixed hue, with a light and a dark
// value. Chart colours meet WCAG AA for graphical objects (≥ 3:1 against the
// background); text neutrals meet AA for body text (≥ 4.5:1). Both are checked
// in lib/theme/__tests__/colours.test.ts.

export const PAYERS = ["employee", "employer", "state"] as const;
export type Payer = (typeof PAYERS)[number];

export const REGIONS = [
  "ireland",
  "euro_area_ex_ie",
  "uk",
  "us",
  "japan",
  "emerging",
  "other",
] as const;
export type Region = (typeof REGIONS)[number];

export const ASSET_CLASSES = [
  "equities",
  "bonds",
  "cash",
  "real_assets",
  "other",
] as const;
export type AssetClass = (typeof ASSET_CLASSES)[number];

export type ThemeMode = "light" | "dark";

export interface Palette {
  payers: Record<Payer, string>;
  regions: Record<Region, string>;
  assets: Record<AssetClass, string>;
  neutrals: {
    background: string;
    surface: string;
    border: string;
    gridline: string;
    text: string;
    textMuted: string;
  };
  status: {
    unverified: string;
  };
}

export const colours: Record<ThemeMode, Palette> = {
  light: {
    payers: {
      employee: "#2563eb",
      employer: "#0f766e",
      state: "#b45309",
    },
    regions: {
      ireland: "#15803d",
      euro_area_ex_ie: "#1d4ed8",
      uk: "#7c3aed",
      us: "#b91c1c",
      japan: "#be185d",
      emerging: "#a16207",
      other: "#525252",
    },
    assets: {
      equities: "#4338ca",
      bonds: "#0e7490",
      cash: "#4d7c0f",
      real_assets: "#c2410c",
      other: "#525252",
    },
    neutrals: {
      background: "#ffffff",
      surface: "#fafafa",
      border: "#e5e5e5",
      gridline: "#e5e5e5",
      text: "#0a0a0a",
      textMuted: "#6b6b6b",
    },
    status: {
      unverified: "#92400e",
    },
  },
  dark: {
    payers: {
      employee: "#60a5fa",
      employer: "#2dd4bf",
      state: "#fbbf24",
    },
    regions: {
      ireland: "#4ade80",
      euro_area_ex_ie: "#60a5fa",
      uk: "#a78bfa",
      us: "#f87171",
      japan: "#f472b6",
      emerging: "#facc15",
      other: "#a3a3a3",
    },
    assets: {
      equities: "#818cf8",
      bonds: "#22d3ee",
      cash: "#a3e635",
      real_assets: "#fb923c",
      other: "#a3a3a3",
    },
    neutrals: {
      background: "#0a0a0a",
      surface: "#171717",
      border: "#262626",
      gridline: "#262626",
      text: "#fafafa",
      textMuted: "#a3a3a3",
    },
    status: {
      unverified: "#fcd34d",
    },
  },
};

const kebab = (s: string) =>
  s.replace(/_/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

/** Flattens a palette into CSS custom properties, e.g. `--c-payers-employee`. */
export function toCssVariables(palette: Palette): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [group, entries] of Object.entries(palette)) {
    for (const [name, value] of Object.entries(entries as Record<string, string>)) {
      vars[`--c-${kebab(group)}-${kebab(name)}`] = value;
    }
  }
  return vars;
}

/** CSS text declaring the palette for light (:root) and dark (.dark) modes. */
export function themeStylesheet(): string {
  const block = (selector: string, mode: ThemeMode) =>
    `${selector}{${Object.entries(toCssVariables(colours[mode]))
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}}`;
  return block(":root", "light") + block(".dark", "dark");
}
