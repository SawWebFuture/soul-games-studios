import { isAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BridgeShell } from "@/components/bridge-shell";

const recommendedGenerators = [
  "Midjourney — strongest cinematic mood and premium visual polish.",
  "Flux (Dev/Pro) — strong control and consistency for production web assets.",
  "Ideogram — best when text-in-image quality matters.",
  "GPT Image — fast ideation and variation generation.",
];

const websiteShotList = [
  { section: "Hero Banner", purpose: "Immediate brand emotion + clarity", ratio: "16:9", done: true, asset: "Hero_Banner.png" },
  { section: "About Section Visual", purpose: "Signal-from-noise philosophy", ratio: "3:2", done: true, asset: "About_section_visual.png" },
  { section: "Feature Tabs Imagery", purpose: "Identity tools + experiments + systems", ratio: "16:9", done: false, asset: "(pending dedicated set)" },
  { section: "Experiments Grid Thumbnails", purpose: "Clickable experiment cards", ratio: "1:1", done: true, asset: "Experiments_Section_Tile_001.png" },
  { section: "Subscribe CTA Backdrop", purpose: "Warm conversion-focused visual", ratio: "16:9", done: true, asset: "Subscribe_CTA_backdrop.png" },
  { section: "YouTube Handoff Art", purpose: "Next mission bridge visual", ratio: "16:9", done: true, asset: "YouTube_handoff_visual.png" },
  { section: "Collectible Card Backdrop", purpose: "Card rarity / reward visual system", ratio: "3:4", done: true, asset: "Collectible_card_backdrop.png" },
  { section: "Merch Showcase Mockups", purpose: "Revenue-ready product visuals", ratio: "4:5", done: true, asset: "Merch_mockup_scene.png" },
  { section: "Footer Accent", purpose: "Subtle polished close", ratio: "21:9", done: true, asset: "Footer_accent.png" },
];

const promptPack = [
  {
    title: "Hero banner",
    prompt:
      "Cinematic hero image for an AI-first creative studio, calm intentional futuristic aesthetic, soft volumetric light, cosmic gradients, subtle geometric overlays, high contrast focal center, clean negative space for headline text, premium brand feel, no people, no logos, ultra-detailed, 16:9",
  },
  {
    title: "Experiments section tiles",
    prompt:
      "Four cohesive concept art tiles for experimental digital products, playful philosophical technology vibe, each tile representing identity artifacts, creator systems, AI collaboration, collectible outcomes, visually distinct but same color language, modern UI-friendly composition, no text, 1:1",
  },
  {
    title: "About section visual",
    prompt:
      "Abstract visual metaphor of signal emerging from noise, calm technological spirituality, minimal shapes, layered depth, soft glow, elegant and grounded, editorial quality, website background art, no text",
  },
  {
    title: "Subscribe CTA backdrop",
    prompt:
      "Warm futuristic invitation scene, portal-like light doorway, hopeful and intriguing tone, smooth gradients, modern digital mysticism, space for call-to-action button and short text, no characters, no text in image",
  },
  {
    title: "YouTube handoff visual",
    prompt:
      "High-impact YouTube thumbnail background for AI experiment launch, dramatic lighting, central energy object, bold visual hierarchy, emotional curiosity hook, clean composition for title overlay, no text, 16:9",
  },
  {
    title: "Collectible card backdrop",
    prompt:
      "Collectible card background for futuristic experiment rewards, holographic accents, structured framing, rarity-tier visual language (common, rare, secret), sharp center composition, no text, transparent/isolated-friendly style",
  },
  {
    title: "Merch mockup scene",
    prompt:
      "Lifestyle product mockup scene for premium studio merch, minimal desk environment, soft directional light, modern creator workspace, clean brand-forward composition, e-commerce ready, 4:5",
  },
  {
    title: "Footer accent",
    prompt:
      "Minimal cosmic linework and gradient glow, elegant low-contrast decorative website footer graphic, sophisticated and subtle, no text, wide horizontal format",
  },
];

const testingMethod = [
  "Generate each prompt in 3 styles: Cinematic, Minimal, Playful.",
  "Score each candidate (1-10): first-glance clarity, brand fit, CTA readability, emotional pull.",
  "Keep top 20% only; discard the rest.",
  "Lock winning style tokens for future prompts to maintain consistency.",
];

const styleTokens = [
  "brand palette: deep navy, indigo, teal, soft violet",
  "clear center-left negative space for headline and CTA",
  "same art direction as previous image set",
  "ultra clean edges, no artifacts, production-ready",
];

const websiteSectionBuildPlan = [
  {
    section: "Header / Navigation",
    mustHave: [
      "Logo + clear brand wordmark",
      "Primary nav links (About, Experiments, Waitlist/Subscribe)",
      "Persistent CTA button (Get Updates / Join Waitlist)",
      "Mobile menu behavior + sticky header",
    ],
  },
  {
    section: "Hero + Slides",
    mustHave: [
      "One clear value proposition headline",
      "Supporting subheadline tied to North Star",
      "Primary CTA + secondary CTA",
      "Hero visual/slide set with readable text-safe areas",
      "Slide controls + accessibility labels",
    ],
  },
  {
    section: "About",
    mustHave: [
      "Who Soul Games Studios is (short and sharp)",
      "Studio philosophy quote / belief statement",
      "Brand-trust visual (about image)",
      "Bridge sentence connecting philosophy to experiments",
    ],
  },
  {
    section: "Experiments",
    mustHave: [
      "Experiments overview grid with active statuses",
      "Each card includes name, 1-line value, and CTA",
      "Link to dedicated experiment pages (/experiments/[slug])",
      "Share hooks + email capture handoff",
    ],
  },
  {
    section: "Collectible Cards",
    mustHave: [
      "Explain card system (standard/rare/subscriber secret)",
      "Visual sample card(s)",
      "How users unlock cards",
      "CTA into latest experiment to start collecting",
    ],
  },
  {
    section: "YouTube / Next Mission Bridge",
    mustHave: [
      "Latest launch video embed or link",
      "Pinned next-mission CTA block",
      "UTM-tracked links to next project",
      "Optional short recap bullets from latest drop",
    ],
  },
  {
    section: "Subscribe Portal",
    mustHave: [
      "Functional waitlist/subscribe form backed by API",
      "Clear incentive (drops, cards, private unlocks)",
      "Success state and trust copy",
      "Consent/privacy microcopy",
    ],
  },
  {
    section: "Merch",
    mustHave: [
      "Initial 3-5 hero products",
      "Experiment-themed merchandising tie-ins",
      "Clear pricing + CTA",
      "Subscriber perk mention (early access/discount)",
    ],
  },
  {
    section: "Footer",
    mustHave: [
      "Brand close + short mission line",
      "Social/channel links",
      "Legal links (privacy/terms)",
      "Low-noise visual accent",
    ],
  },
];

export default async function WebsiteRoadmapPage() {
  if (!(await isAuthed())) redirect("/login");

  return (
    <BridgeShell activeHref="/website-roadmap">
      <div className="space-y-4">
        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader>
            <CardTitle>Website Roadmap — Image Prompt System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p>
              Goal: build a reusable visual system that makes the Soul Games Studios website more engaging,
              conversion-friendly, and brand-consistent across tools.
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Recommended Generators</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {recommendedGenerators.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">• {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Website Section Build Plan (What each section must include)</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-300">
            {websiteSectionBuildPlan.map((item) => (
              <div key={item.section} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
                <p className="text-zinc-100">{item.section}</p>
                <div className="mt-2 space-y-1">
                  {item.mustHave.map((line) => (
                    <p key={line} className="text-xs text-zinc-400">□ {line}</p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Section-by-Section Website Shot List</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {websiteShotList.map((item) => (
              <div key={item.section} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
                <p>
                  <span className="text-zinc-100">{item.done ? "✅" : "⬜"} {item.section}</span> · {item.ratio}
                </p>
                <p className="mt-1 text-xs text-zinc-400">Purpose: {item.purpose}</p>
                <p className="mt-1 text-xs text-zinc-500">Asset: {item.asset}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Copy/Paste Prompt Pack</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {promptPack.map((item) => (
              <div key={item.title} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">
                <p className="text-zinc-100">{item.title}</p>
                <p className="mt-1 text-xs text-zinc-400">{item.prompt}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Testing Method (Fast A/B)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {testingMethod.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">→ {item}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#0c1016]">
          <CardHeader><CardTitle className="text-base">Style Tokens to Append</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            {styleTokens.map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-900/40 p-3">+ {item}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BridgeShell>
  );
}
