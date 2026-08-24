export const CATEGORIES = [
  { id: "seo-ai-visibility", label: "SEO & AI Visibility" },
  { id: "ai-agents-infrastructure", label: "AI Agents & Infrastructure" },
  { id: "ai-media-generation", label: "AI Media Generation" },
  { id: "marketing-advertising", label: "Marketing & Advertising" },
  { id: "developer-tools", label: "Developer Tools" },
  { id: "productivity-personal-tools", label: "Productivity & Personal Tools" },
  { id: "people-profiles", label: "People & Profiles" },
  { id: "design-creative", label: "Design & Creative" },
  { id: "social-media-creator-tools", label: "Social Media & Creator Tools" },
  { id: "writing-content", label: "Writing & Content" },
  { id: "sales-lead-generation", label: "Sales & Lead Generation" },
  { id: "business-finance-legal", label: "Business, Finance & Legal" },
  { id: "games-entertainment", label: "Games & Entertainment" },
  { id: "education-learning", label: "Education & Learning" },
  { id: "health-fitness-wellness", label: "Health, Fitness & Wellness" },
  { id: "ecommerce-retail", label: "Ecommerce & Retail" },
  { id: "directories-launch-discovery", label: "Directories, Launch & Discovery" },
  { id: "hiring-jobs-careers", label: "Hiring, Jobs & Careers" },
  { id: "audio-voice-podcasting", label: "Audio, Voice & Podcasting" },
  { id: "crypto-web3-investing", label: "Crypto, Web3 & Investing" },
  { id: "agencies-studios-services", label: "Agencies, Studios & Services" },
  { id: "security-privacy-compliance", label: "Security, Privacy & Compliance" },
  { id: "travel-local-lifestyle", label: "Travel, Local & Lifestyle" },
  { id: "media-news", label: "Media & News" },
  { id: "domains-web-assets", label: "Domains & Web Assets" },
  { id: "leaderboards-attention-markets", label: "Leaderboards & Attention Markets" },
  { id: "real-estate-property", label: "Real Estate & Property" },
  { id: "other", label: "Other" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

export function isValidCategory(id: unknown): id is CategoryId {
  return typeof id === "string" && CATEGORY_IDS.has(id);
}

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
