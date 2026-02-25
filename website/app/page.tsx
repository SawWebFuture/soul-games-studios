import Image from "next/image";
import { Header } from "@/components/header";
import { WaitlistForm } from "@/components/waitlist-form";
import { FeatureTabs } from "@/components/feature-tabs";
import { Footer } from "@/components/footer";
import { ScrollAnimate } from "@/components/scroll-animate";
import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Soul Games Studios",
      description:
        "Soul Games Studios builds calm, intentional AI-first products and philosophical web experiences.",
      url: "https://soulgamesstudios.com",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Soul Games Studios",
      url: "https://soulgamesstudios.com",
      description:
        "A studio creating AI-first tools, identity artifacts, and philosophical digital experiences.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Soul Games Studios build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build calm AI-first products, playful web experiments, and identity tools for creators and AI-native teams.",
          },
        },
        {
          "@type": "Question",
          name: "What does calm-first mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Calm-first means reducing cognitive noise, simplifying decisions, and designing software that feels clear, grounded, and useful.",
          },
        },
        {
          "@type": "Question",
          name: "Are you a product studio or agency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Primarily a product studio. We occasionally collaborate on aligned experimental builds.",
          },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <HeroCarousel />
      <AboutSection />

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              ["AI-first", "Built around practical AI workflows"],
              ["Calm-first", "Designed to reduce noise and overwhelm"],
              ["Small-batch", "Focused experiments shipped quickly"],
              ["Human-centered", "Technology in service of people"],
            ].map(([title, desc]) => (
              <div key={title} className="text-center">
                <div className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">{title}</div>
                <div className="h-px bg-gray-300" />
                <div className="mt-2 text-sm text-gray-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            What we’re building now
          </h2>
          <FeatureTabs />
        </div>
      </section>

      <ScrollAnimate>
        <section id="experiments" className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              Studio experiments in motion
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Bot Photo Booth",
                  description:
                    "A nostalgic 4-panel strip generator for AI agents and bot identities.",
                },
                {
                  title: "AI Board of Agents",
                  description:
                    "A calm command center for planning, reflection, and strategic decision support.",
                },
                {
                  title: "Identity Artifacts",
                  description:
                    "Shareable visuals and lightweight tools for digital-first creators.",
                },
                {
                  title: "Creator Systems",
                  description:
                    "Automation and AI workflows that help small teams ship with less chaos.",
                },
              ].map((feature, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-gray-100" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimate>

      <ScrollAnimate>
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Studio philosophy
                </span>
                <blockquote className="mb-6 text-lg leading-8 text-gray-700">
                  &quot;We believe the next wave of software should feel less like noise and more like signal —
                  clear, thoughtful tools that help people build meaningful things.&quot;
                </blockquote>
                <div className="font-semibold text-gray-900">Soul Games Studios</div>
                <div className="text-sm text-gray-600">Calm, intentional, AI-first</div>
              </div>
              <div className="relative min-h-[180px] overflow-hidden rounded-xl bg-white">
                <Image
                  src="/brand/LinkedIn_Banner_003.png"
                  alt="Soul Games Studios visual"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      <section id="waitlist" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 px-8 py-16 md:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              Follow our studio drops
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Get first access to new experiments, product launches, and behind-the-scenes build notes.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
