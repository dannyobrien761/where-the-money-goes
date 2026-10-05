import { describe, expect, it } from "vitest";
import { colours, type ThemeMode } from "../colours";

// WCAG 2.x relative luminance and contrast ratio.
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const modes: ThemeMode[] = ["light", "dark"];

describe.each(modes)("%s palette", (mode) => {
  const p = colours[mode];
  const bg = p.neutrals.background;

  it.each([
    ...Object.entries(p.payers),
    ...Object.entries(p.regions),
    ...Object.entries(p.assets),
  ])("chart colour %s meets 3:1 against the background", (_name, hex) => {
    expect(contrast(hex, bg)).toBeGreaterThanOrEqual(3);
  });

  it.each([
    ["text", p.neutrals.text],
    ["textMuted", p.neutrals.textMuted],
    ["unverified", p.status.unverified],
  ])("%s meets 4.5:1 on background and surface", (_name, hex) => {
    expect(contrast(hex, bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(hex, p.neutrals.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it("gives every payer a distinct colour", () => {
    expect(new Set(Object.values(p.payers)).size).toBe(3);
  });

  it("gives every region a distinct colour", () => {
    expect(new Set(Object.values(p.regions)).size).toBe(7);
  });
});
