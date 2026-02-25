import Image from "next/image";
import { ScrollAnimate } from "@/components/scroll-animate";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

const pillars = [
  {
    title: "Strategic clarity",
    description: "Decision support that helps you focus on what actually moves the business.",
  },
  {
    title: "Sustainable systems",
    description: "Build processes that scale without burnout or constant fire drills.",
  },
  {
    title: "Calm execution",
    description: "Move at your pace with guidance that keeps you aligned with your values.",
  },
];

export function AboutSection() {
  return (
    <ScrollAnimate>
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5">
              <Image
                src="/images/about_us.png"
                alt="Founder working with AI board of agents - holographic figures providing strategic guidance in a modern office setting"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#0A0F1F]/5 px-3 py-1 text-xs font-semibold tracking-wide text-[#0A0F1F]">
              About Soul Games Studios
            </span>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              Calm strategy for founders building for the long term
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              We’re building an AI board of agents that supports founders with thoughtful guidance—
              helping you make decisions that compound over time, without hustle culture pressure.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="text-sm font-semibold text-gray-900">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{p.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <SmoothScrollLink
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl bg-[#0A0F1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0A0F1F]/90"
              >
                Explore how it works
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Join the waitlist
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimate>
  );
}
