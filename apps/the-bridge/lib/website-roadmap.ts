export type WebsiteSectionPlan = {
  slug: string;
  section: string;
  mustHave: string[];
  cursorPrompt: string;
};

export const websiteSectionBuildPlan: WebsiteSectionPlan[] = [
  {
    slug: "header-navigation",
    section: "Header / Navigation",
    mustHave: [
      "✅ Logo + clear brand wordmark",
      "✅ Primary nav links (About, Experiments, Waitlist/Subscribe)",
      "✅ Persistent CTA button (Get Updates / Join Waitlist)",
      "✅ Mobile menu behavior + sticky header",
    ],
    cursorPrompt:
      "You are helping implement the Soul Games Studios website Header / Navigation in Next.js + Tailwind. Build a responsive, sticky header with: brand wordmark/logo on left, nav links (About, Experiments, Waitlist/Subscribe), and a persistent primary CTA button (Get Updates / Join Waitlist). Include a mobile menu with accessible toggle, keyboard navigation, focus states, and clear aria-labels. Keep styling aligned with The Bridge dark premium aesthetic. Return: (1) implementation plan, (2) exact files to edit, (3) final TSX/CSS code, (4) quick test checklist.",
  },
  {
    slug: "hero-slides",
    section: "Hero + Slides",
    mustHave: [
      "🟡 One clear value proposition headline",
      "✅ Supporting subheadline tied to North Star",
      "⬜ Primary CTA + secondary CTA",
      "✅ Hero visual/slide set with readable text-safe areas",
      "✅ Slide controls + accessibility labels",
    ],
    cursorPrompt:
      "Implement the Hero + Slides section for Soul Games Studios. Requirements: one crystal-clear value proposition headline, supporting subheadline, primary + secondary CTA buttons, slide-capable hero visuals with text-safe overlays, and accessible slide controls (buttons, aria labels, keyboard support). Optimize for fast first render and mobile readability. Return complete component code and where to place it in the current route structure.",
  },
  {
    slug: "about",
    section: "About",
    mustHave: [
      "✅ Who Soul Games Studios is (short and sharp)",
      "✅ Studio philosophy quote / belief statement",
      "✅ Brand-trust visual (about image)",
      "✅ Bridge sentence connecting philosophy to experiments",
    ],
    cursorPrompt:
      "Create the About section for Soul Games Studios website using concise, high-signal copy blocks and a trust-building visual. Include: short identity statement, philosophy quote, supporting image area, and bridge sentence connecting philosophy to experiments. Keep hierarchy and spacing premium and scannable on mobile/desktop. Provide final TSX markup with placeholder copy that can be swapped later.",
  },
  {
    slug: "experiments",
    section: "Experiments",
    mustHave: [
      "⬜ Experiments overview grid with active statuses",
      "🟡 Each card includes name, 1-line value, and CTA",
      "⬜ Link to dedicated experiment pages (/experiments/[slug])",
      "⬜ Share hooks + email capture handoff",
    ],
    cursorPrompt:
      "Build the Experiments section as a reusable grid component. Each card should include experiment name, one-line value proposition, status badge, and CTA linking to /experiments/[slug]. Add lightweight share hooks and an email-capture handoff CTA pattern. Use typed data structures and map-driven rendering. Return: data model, component code, and route-linking notes.",
  },
  {
    slug: "collectible-cards",
    section: "Collectible Cards",
    mustHave: [
      "⬜ Explain card system (standard/rare/subscriber secret)",
      "⬜ Visual sample card(s)",
      "⬜ How users unlock cards",
      "⬜ CTA into latest experiment to start collecting",
    ],
    cursorPrompt:
      "Implement the Collectible Cards section. Explain card tiers (standard, rare, subscriber secret), show sample visuals, explain unlock flow, and include a strong CTA into the latest experiment. Maintain a playful-philosophical but premium style. Output production-ready TSX for this section plus suggested data schema for card tiers.",
  },
  {
    slug: "youtube-next-mission-bridge",
    section: "YouTube / Next Mission Bridge",
    mustHave: [
      "⬜ Latest launch video embed or link",
      "⬜ Pinned next-mission CTA block",
      "⬜ UTM-tracked links to next project",
      "⬜ Optional short recap bullets from latest drop",
    ],
    cursorPrompt:
      "Build a YouTube / Next Mission Bridge section with: latest video embed/link, pinned next-mission CTA, UTM-tagged links to next project, and optional recap bullets from the latest drop. Prioritize conversion to the next action while keeping page performance healthy. Provide TSX and helper function examples for generating UTM URLs.",
  },
  {
    slug: "subscribe-portal",
    section: "Subscribe Portal",
    mustHave: [
      "⬜ Functional waitlist/subscribe form backed by API",
      "✅ Clear incentive (drops, cards, private unlocks)",
      "✅ Success state and trust copy",
      "⬜ Consent/privacy microcopy",
    ],
    cursorPrompt:
      "Implement a Subscribe Portal section with a working waitlist form backed by API route, success/error states, trust copy, and explicit consent/privacy microcopy. Keep friction low and conversion-focused. Include validation, loading states, and accessible form labels. Return complete frontend + API route code scaffolding.",
  },
  {
    slug: "merch",
    section: "Merch",
    mustHave: [
      "⬜ Initial 3-5 hero products",
      "⬜ Experiment-themed merchandising tie-ins",
      "⬜ Clear pricing + CTA",
      "⬜ Subscriber perk mention (early access/discount)",
    ],
    cursorPrompt:
      "Create a Merch section showcasing 3–5 hero products with experiment-themed tie-ins, clear pricing presentation, CTA buttons, and subscriber perk callouts (early access/discount). Keep layout modular so products can be CMS/data driven later. Return TSX for cards/grid and recommended prop/data shape.",
  },
  {
    slug: "blog-updates",
    section: "Blog / Updates",
    mustHave: [
      "⬜ Blog index page (/blog)",
      "⬜ Individual post route (/blog/[slug])",
      "⬜ Categories/tags (build logs, launches, lessons, roadmap)",
      "⬜ CTA from each post to experiments + subscribe portal",
      "⬜ Weekly publishing cadence (minimum 1 post/week)",
    ],
    cursorPrompt:
      "Set up Blog / Updates architecture in Next.js app router: /blog index, /blog/[slug] posts, categories/tags, and in-post CTAs that route to experiments + subscribe portal. Keep SEO basics in place (metadata, headings, internal links). Return file tree, starter page code, and content model recommendations.",
  },
  {
    slug: "footer",
    section: "Footer",
    mustHave: [
      "✅ Brand close + short mission line",
      "⬜ Social/channel links",
      "⬜ Legal links (privacy/terms)",
      "🟡 Low-noise visual accent",
    ],
    cursorPrompt:
      "Implement the Soul Games Studios footer with concise brand close + mission line, social/channel links, legal links (privacy/terms), and a subtle visual accent. Keep it elegant and low-noise. Ensure link accessibility, responsive spacing, and consistency with existing design tokens.",
  },
];

export function getWebsiteSection(slug: string) {
  return websiteSectionBuildPlan.find((item) => item.slug === slug);
}
