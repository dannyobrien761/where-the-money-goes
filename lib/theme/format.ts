// Number formatting for the UI edge. The model works in whole euro and decimal
// rates; nothing else should format numbers for display.

const EUR_UNITS = [
  { divisor: 1e9, suffix: "bn" },
  { divisor: 1e6, suffix: "m" },
  { divisor: 1e3, suffix: "k" },
  { divisor: 1, suffix: "" },
] as const;

/** Rounds to 1 dp below 10 and to whole numbers from 10 up; drops a trailing ".0". */
function compact(scaled: number): string {
  const dp = scaled < 10 ? 1 : 0;
  return scaled.toFixed(dp).replace(/\.0$/, "");
}

/**
 * Formats a euro amount compactly: €12k, €2.5m, €340m, €1.2bn.
 * Negative values keep their sign: -€340m.
 */
export function formatEur(value: number): string {
  if (!Number.isFinite(value)) return "–";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  let i = EUR_UNITS.findIndex((u) => abs >= u.divisor);
  if (i === -1) i = EUR_UNITS.length - 1;

  let text = compact(abs / EUR_UNITS[i].divisor);
  // Rounding can push a value into the next unit (999.6m → "1000m" → "1bn").
  if (i > 0 && Number(text) >= 1000) {
    i -= 1;
    text = compact(abs / EUR_UNITS[i].divisor);
  }
  if (text === "0") return "€0";
  return `${sign}€${text}${EUR_UNITS[i].suffix}`;
}

/** Formats a decimal rate as a percentage: 0.015 → "1.5%". */
export function formatPct(rate: number, dp = 1): string {
  if (!Number.isFinite(rate)) return "–";
  const text = (rate * 100).toFixed(dp);
  // Avoid "-0.0%" for tiny negatives that round to zero.
  return `${Number(text) === 0 ? (0).toFixed(dp) : text}%`;
}
