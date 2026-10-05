import type { ReactNode } from "react";

/** One-sentence takeaway shown with every chart. The text must be computed from data. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-4 border-foreground/70 pl-3 font-medium">
      <span className="sr-only">Takeaway: </span>
      {children}
    </p>
  );
}
