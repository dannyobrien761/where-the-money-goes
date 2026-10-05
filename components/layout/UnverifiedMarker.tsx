"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DEFAULT_NOTE = "This input has not yet been checked against its source.";

/** Badge shown next to any number that depends on an input with `verified: false`. */
export function UnverifiedMarker({ note }: { note?: string }) {
  const text = note ?? DEFAULT_NOTE;

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={`Unverified: ${text}`}
        className="ml-1 inline-flex items-center rounded-sm border border-unverified px-1 align-middle text-[0.7rem] leading-4 font-medium text-unverified focus-visible:outline-2"
      >
        unverified
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
