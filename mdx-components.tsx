import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Prose in /content is rendered with these.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
