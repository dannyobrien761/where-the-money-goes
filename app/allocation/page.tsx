import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Allocation" };

export default function AllocationPage() {
  return (
    <PageHeader
      question="Under stated allocation assumptions, which asset classes receive that money?"
      headline="Coming soon."
      asOf="not yet loaded"
    />
  );
}
