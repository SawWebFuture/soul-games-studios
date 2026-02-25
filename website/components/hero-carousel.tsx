"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Building the future",
    subtitle: "STRATEGIC AI",
    description:
      "Your AI board of agents provides calm, thoughtful guidance for founders building sustainable companies—without the hustle culture pressure.",
    image: "/images/header_image_001.png",
    glow: "bg-violet-500/15",
  },
  {
    id: 2,
    title: "Think strategically",
    subtitle: "GROW SUSTAINABLY",
    description:
      "Make decisions that matter. Get long-term strategic guidance from your AI board—helping you build companies that last, not just scale fast.",
    image: "/images/header_image_002.png",
    glow: "bg-indigo-500/15",
  },
  {
    id: 3,
    title: "No hustle culture",
    subtitle: "JUST CALM PROGRESS",
    description:
      "Build at your own pace. Your AI board of agents helps you maintain perspective and stay aligned with your values—no burnout, just thoughtful growth.",
    image: "/images/header_image_003.png",
    glow: "bg-emerald-500/12",
  },
];

function splitSubtitle(subtitle: string) {
  const parts = subtitle.trim().split(/\s+/);
  return {
    first: parts[0] ?? "",
    rest: parts.slice(1).join(" "),
  };
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseThenResume = () => {
    setIsAutoPlaying(false);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseThenResume();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseThenResume();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseThenResume();
  };

  const { first, rest } = splitSubtitle(slides[currentSlide].subtitle);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Unified deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F] via-[#111B3D] to-[#070A14]" />

      {/* Soft glow per slide */}
      <div
        className={[
          "pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-700",
          slides[currentSlide].glow,
        ].join(" ")}
      />
      <div className="pointer-events-none absolute top-40 right-[-140px] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 30%, black 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 30%, black 40%, transparent 70%)",
        }}
      />

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-0 top-1/2 z-10 -translate-y-1/2 items-center justify-center rounded-r-2xl bg-white/10 p-4
                   ring-1 ring-white/15 shadow-lg backdrop-blur transition hover:bg-white/15 hover:ring-white/25 md:p-5"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5 text-white md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-0 top-1/2 z-10 -translate-y-1/2 items-center justify-center rounded-l-2xl bg-white/10 p-4
                   ring-1 ring-white/15 shadow-lg backdrop-blur transition hover:bg-white/15 hover:ring-white/25 md:p-5"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5 text-white md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slides */}
      <div className="relative mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-4 md:px-6">
        {slides.map((slide, index) => {
          const s = splitSubtitle(slide.subtitle);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
                {/* Left */}
                <div className={`flex flex-col justify-center text-center lg:text-left ${index === currentSlide ? "animate-slide-in" : ""}`}>
                  <div className="inline-flex w-fit mx-auto lg:mx-0 items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/70 ring-1 ring-white/10">
                    Calm, strategic guidance
                  </div>

                  <h1 className="mt-5 mb-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <div className="mb-5 flex flex-wrap items-end justify-center gap-2 lg:justify-start">
                    <span className="text-2xl font-semibold text-white/55 sm:text-3xl md:text-4xl lg:text-5xl">
                      {s.first}
                    </span>
                    {s.rest ? (
                      <span
                        className={`text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl ${index === currentSlide ? "animate-text-reveal" : ""
                          }`}
                      >
                        {s.rest}
                      </span>
                    ) : null}
                  </div>

                  <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
                    {slide.description}
                  </p>
                </div>

                {/* Right */}
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-2xl ${index === currentSlide ? "animate-slide-in" : ""
                    }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${index === currentSlide ? "hover:scale-[1.03]" : ""
                      }`}
                    priority={index === 0}
                  />

                  {/* Image overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/55"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
