"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 20));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 bg-[#0A0F1F] transition-all duration-500 ease-out",
        scrolled
          ? "border-b border-white/10 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md bg-[#0A0F1F]/95"
          : "border-b border-white/5 backdrop-blur-sm bg-[#0A0F1F]/90",
      ].join(" ")}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] rounded-xl bg-white px-3 py-2 text-sm font-medium text-[#0A0F1F] shadow">
        Skip to content
      </a>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={["flex items-center justify-between transition-all duration-500", scrolled ? "h-16" : "h-20"].join(" ")}>
          <Link href="/" className="flex items-center gap-3" aria-label="Soul Games Studios home" onClick={() => setMobileOpen(false)}>
            <Image src="/brand/SoulGamesStudios_Square_Logo.jpg" alt="Soul Games Studios logo" width={scrolled ? 32 : 40} height={scrolled ? 32 : 40} className={["rounded-xl ring-1 ring-white/15 transition-all duration-500", scrolled ? "scale-90" : "scale-100"].join(" ")} priority />
            <span className={["font-semibold tracking-tight text-white transition-all duration-500", scrolled ? "text-sm sm:text-base" : "text-base sm:text-lg"].join(" ")}>Soul Games Studios</span>
            <span className={["hidden md:inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/15 transition-all duration-500", scrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"].join(" ")}>Calm AI-first products</span>
          </Link>

          <nav className={["hidden items-center gap-6 md:flex transition-all duration-500", scrolled ? "gap-4" : "gap-6"].join(" ")} aria-label="Primary">
            <SmoothScrollLink href="#about" className={["font-medium text-white/75 hover:text-white transition-all duration-300", scrolled ? "text-xs" : "text-sm"].join(" ")}>About</SmoothScrollLink>
            <SmoothScrollLink href="#experiments" className={["font-medium text-white/75 hover:text-white transition-all duration-300", scrolled ? "text-xs" : "text-sm"].join(" ")}>Experiments</SmoothScrollLink>
            <SmoothScrollLink href="#waitlist" className={["rounded-2xl bg-white font-semibold text-[#0A0F1F] transition-all duration-300 hover:bg-white/90 hover:scale-105", scrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2 text-sm"].join(" ")}>Get Studio Updates</SmoothScrollLink>
          </nav>

          <button type="button" className="inline-flex items-center justify-center rounded-xl p-2 text-white/80 hover:bg-white/10 md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></> : <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4">
            <nav className="rounded-2xl border border-white/10 bg-[#0A0F1F] p-3 shadow-lg" aria-label="Mobile">
              <SmoothScrollLink href="#about" className="block rounded-xl px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10" onClick={() => setMobileOpen(false)}>About</SmoothScrollLink>
              <SmoothScrollLink href="#experiments" className="block rounded-xl px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10" onClick={() => setMobileOpen(false)}>Experiments</SmoothScrollLink>
              <SmoothScrollLink href="#waitlist" className="mt-2 block rounded-2xl bg-white px-4 py-2 text-center text-sm font-semibold text-[#0A0F1F]" onClick={() => setMobileOpen(false)}>Get Studio Updates</SmoothScrollLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
