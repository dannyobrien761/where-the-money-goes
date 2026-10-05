import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Exposure" };

export default function ExposurePage() {
  return (
    <PageHeader
      question="How much of it ends up exposed to the Irish economy rather than global markets?"
      headline="Coming soon."
      asOf="not yet loaded"
    />
  );
}
