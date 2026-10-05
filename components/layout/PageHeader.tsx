import type { ReactNode } from "react";

interface PageHeaderProps {
  /** The research question the page answers. */
  question: string;
  /** The headline finding, computed from data by the page. */
  headline: ReactNode;
  /** Date of the latest data behind the page, e.g. "September 2026". */
  asOf: string;
}

export function PageHeader({ question, headline, asOf }: PageHeaderProps) {
  return (
    <header className="space-y-3 border-b border-border pb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-balance">{question}</h1>
      <p className="max-w-3xl text-lg text-pretty">{headline}</p>
      <p className="text-sm text-muted-foreground">Data as of {asOf}</p>
    </header>
  );
}
