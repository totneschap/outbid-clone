export const CATEGORIES = [
  { id: "seo-ai-visibility", label: "SEO & AI Visibility" },
  { id: "ai-agents-infrastructure", label: "AI Agents & Infrastructure" },
  { id: "ai-media-generation", label: "AI Media Generation" },
  { id: "marketing-advertising", label: "Marketing & Advertising" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

export function isValidCategory(id: unknown): id is CategoryId {
  return typeof id === "string" && CATEGORY_IDS.has(id);
}

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
