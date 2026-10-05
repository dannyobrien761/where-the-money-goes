import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Flows" };

export default function FlowsPage() {
  return (
    <PageHeader
      question="How much money will auto-enrolment push into the investment system each year, and how big does the fund become?"
      headline="Coming soon."
      asOf="not yet loaded"
    />
  );
}
