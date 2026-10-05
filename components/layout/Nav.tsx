"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/flows", label: "Flows" },
  { href: "/allocation", label: "Allocation" },
  { href: "/exposure", label: "Exposure" },
  { href: "/method", label: "Method" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3"
      >
        <Link href="/" className="font-semibold tracking-tight">
          <span className="block">Where the Money Goes</span>
          <span className="block text-xs font-normal tracking-normal text-muted-foreground">
            Irish auto-enrolment, followed through the investment system
          </span>
        </Link>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-sm underline-offset-4 hover:underline focus-visible:outline-2",
                    active ? "font-medium text-foreground underline" : "text-muted-foreground",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
