import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { themeStylesheet } from "@/lib/theme/colours";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Where the Money Goes",
    template: "%s · Where the Money Goes",
  },
  description:
    "How Ireland's auto-enrolment savings flow into the investment system — and how much stays in Ireland.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IE"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style>{themeStylesheet()}</style>
      </head>
      <body className="flex min-h-full flex-col">
        <TooltipProvider>
          <Nav />
          <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-8">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
