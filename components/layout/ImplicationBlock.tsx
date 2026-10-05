import type { ReactNode } from "react";

interface ImplicationBlockProps {
  administration: ReactNode;
  governance: ReactNode;
  investment: ReactNode;
}

export function ImplicationBlock({ administration, governance, investment }: ImplicationBlockProps) {
  const items = [
    { title: "Administration", body: administration },
    { title: "Governance", body: governance },
    { title: "Investment", body: investment },
  ];

  return (
    <section aria-labelledby="implications-heading" className="space-y-4">
      <h2 id="implications-heading" className="text-xl font-semibold tracking-tight">
        What this means for
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(({ title, body }) => (
          <div key={title} className="space-y-2">
            <h3 className="font-medium">{title}</h3>
            <div className="text-sm text-pretty">{body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
