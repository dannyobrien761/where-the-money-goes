import { describe, expect, it } from "vitest";
import { formatEur, formatPct } from "../format";

describe("formatEur", () => {
  it("formats millions", () => {
    expect(formatEur(340_000_000)).toBe("€340m");
    expect(formatEur(2_500_000)).toBe("€2.5m");
  });

  it("formats billions to one decimal place", () => {
    expect(formatEur(1_234_000_000)).toBe("€1.2bn");
    expect(formatEur(12_000_000_000)).toBe("€12bn");
  });

  it("formats thousands and small amounts", () => {
    expect(formatEur(12_000)).toBe("€12k");
    expect(formatEur(950)).toBe("€950");
    expect(formatEur(0)).toBe("€0");
  });

  it("moves to the next unit when rounding reaches 1,000", () => {
    expect(formatEur(999_600_000)).toBe("€1bn");
  });

  it("keeps the sign of negative values", () => {
    expect(formatEur(-340_000_000)).toBe("-€340m");
    expect(formatEur(-1_234_000_000)).toBe("-€1.2bn");
  });
});

describe("formatPct", () => {
  it("converts decimal rates to percentages", () => {
    expect(formatPct(0.015)).toBe("1.5%");
    expect(formatPct(0.06)).toBe("6.0%");
    expect(formatPct(0.03871, 2)).toBe("3.87%");
  });

  it("keeps the sign of negative values", () => {
    expect(formatPct(-0.015)).toBe("-1.5%");
  });

  it("does not show negative zero", () => {
    expect(formatPct(-0.00001)).toBe("0.0%");
  });
});
