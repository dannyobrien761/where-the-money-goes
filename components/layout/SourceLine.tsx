interface SourceLineProps {
  sources: { label: string; url?: string }[];
}

export function SourceLine({ sources }: SourceLineProps) {
  if (sources.length === 0) return null;

  return (
    <p className="text-xs text-muted-foreground">
      {sources.length === 1 ? "Source: " : "Sources: "}
      {sources.map((s, i) => (
        <span key={`${s.label}-${i}`}>
          {i > 0 && "; "}
          {s.url ? (
            <a href={s.url} className="underline underline-offset-2 hover:text-foreground">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}
