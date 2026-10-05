import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Method" };

export default function MethodPage() {
  return (
    <PageHeader
      question="How are these numbers built, and where does each one come from?"
      headline="Coming soon."
      asOf="not yet loaded"
    />
  );
}
