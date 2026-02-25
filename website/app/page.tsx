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
        "Soul Games Studios builds calm, AI-powered tools and games that help future founders grow sustainably.",
      url: "https://soulgamesstudios.com",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Soul Games Studios",
      url: "https://soulgamesstudios.com",
      description:
        "AI board of agents and strategic tools for founders building sustainable companies.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an AI board of agents?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An AI board of agents is a strategic advisory system that acts like a board of directors. It provides thoughtful guidance on key decisions, long-term planning, and sustainable growth strategies—helping founders make better choices without the hustle culture pressure.",
          },
        },
        {
          "@type": "Question",
          name: "Who is this for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our tools are designed for future founders—both aspiring entrepreneurs and early-stage founders who want to build sustainable companies. If you're tired of hustle culture and want strategic, calm support for long-term growth, this is for you.",
          },
        },
        {
          "@type": "Question",
          name: "How is this different from other AI tools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike productivity-focused AI tools that optimize for speed and output, our AI board of agents emphasizes strategic thinking, sustainable growth, and thoughtful decision-making. We're building for the long term, not quick wins.",
          },
        },
        {
          "@type": "Question",
          name: "What does 'calm' mean in your brand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Calm means thoughtful, strategic support without the pressure of hustle culture. We believe in sustainable progress over frantic activity, helping founders build companies that last rather than burn out.",
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

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <AboutSection />

      {/* Statistics Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">5+</div>
              <div className="h-px bg-gray-300" />
              <div className="mt-2 text-sm text-gray-600">
                Years building strategic tools
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">500+</div>
              <div className="h-px bg-gray-300" />
              <div className="mt-2 text-sm text-gray-600">
                Founders on waitlist
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">12+</div>
              <div className="h-px bg-gray-300" />
              <div className="mt-2 text-sm text-gray-600">
                AI agents in development
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">98%</div>
              <div className="h-px bg-gray-300" />
              <div className="mt-2 text-sm text-gray-600">
                Founder satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Tabs */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Innovative AI meets strategic thinking
            <br />
            for sustainable founder success
          </h2>
          <FeatureTabs />
        </div>
      </section>

      {/* Vision/Approach Section */}
      <ScrollAnimate>
        <section className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              From vision to reality — we craft your strategic path with
              <br />
              unrivaled attention to sustainable growth
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Strategic Planning",
                  description:
                    "Long-term thinking and decision frameworks that align with your values.",
                },
                {
                  title: "Sustainable Growth",
                  description:
                    "Build systems that scale without the burnout. Focus on what matters.",
                },
                {
                  title: "Calm Guidance",
                  description:
                    "Thoughtful support without hustle culture pressure. Build companies that last.",
                },
                {
                  title: "AI Advisory",
                  description:
                    "Your board of agents provides strategic insights when you need them most.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 h-12 w-12 rounded-lg bg-gray-100" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Testimonial Section */}
      <ScrollAnimate>
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Founder Review
                </span>
                <blockquote className="mb-6 text-lg leading-8 text-gray-700">
                  &quot;Soul Games Studios&apos; AI board helped me think through
                  my first major pivot with clarity I didn&apos;t have before. The
                  strategic guidance felt like having experienced advisors, but
                  without the pressure to move fast. It&apos;s exactly what I
                  needed as a first-time founder.&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah M.</div>
                    <div className="text-sm text-gray-600">
                      Founder & CEO, TechCo
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-gray-200 opacity-50" />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Projects/Showcase Section */}
      <ScrollAnimate>
        <section className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                Showcasing excellence
                <br />
                our strategic AI solutions
              </h2>
              <button className="hidden rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700 md:block">
                View All Solutions
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src="/brand/LinkedIn_Banner_003.png"
                      alt="Strategic Planning Tool"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src="/brand/SoulGamesStudios_Square_Logo.jpg"
                      alt="Decision Framework"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Strategic Planning Suite
                </h3>
                <p className="mb-4 text-sm text-gray-600">2024</p>
                <div className="flex flex-wrap gap-2">
                  {["Strategic", "AI-Powered", "Long-term", "Sustainable"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src="/brand/LinkedIn_Banner_003.png"
                    alt="Growth Framework"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Growth Framework AI
                </h3>
                <p className="mb-4 text-sm text-gray-600">2023</p>
                <div className="flex flex-wrap gap-2">
                  {["Growth", "Sustainable", "Strategic", "Founder-Focused"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Newsletter/Waitlist Section */}
      <section id="waitlist" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 px-8 py-16 md:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              Stay up to date
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Join our waitlist and be among the first to experience our AI
              board of agents and strategic tools for future founders.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
