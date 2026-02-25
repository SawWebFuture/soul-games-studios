export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Soul Games Studios",
    url: "https://soulgamesstudios.com",
    description:
      "AI-first creator studio building calm, intentional products and philosophical web experiences.",
    email: "reggiewilliamsfounder@gmail.com",
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#fbfcfa_0%,#f5f7f4_100%)] text-[#16233e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="pointer-events-none fixed -left-[8vmax] -top-[12vmax] -z-10 h-[42vmax] w-[42vmax] animate-aurora-a rounded-full bg-[radial-gradient(circle,#9adf63,transparent_58%)] opacity-35 blur-[60px]" />
      <div className="pointer-events-none fixed -bottom-[12vmax] -right-[14vmax] -z-10 h-[42vmax] w-[42vmax] animate-aurora-b rounded-full bg-[radial-gradient(circle,#4f7fa1,transparent_58%)] opacity-35 blur-[60px]" />

      <header className="mx-auto mt-4 flex w-[min(1060px,92vw)] items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-2.5 font-bold text-[#16233e]">
          <img
            src="/logo.jpg"
            alt="Soul Games Studios logo"
            className="h-10 w-10 rounded-[10px] border border-[#4a658838] object-cover"
          />
          <span>Soul Games Studios</span>
        </a>
        <nav className="hidden gap-4 md:flex">
          <a href="#about" className="font-semibold text-[#4f6482] hover:text-[#2b3d63]">About</a>
          <a href="#experiments" className="font-semibold text-[#4f6482] hover:text-[#2b3d63]">Experiments</a>
          <a href="#contact" className="font-semibold text-[#4f6482] hover:text-[#2b3d63]">Contact</a>
        </nav>
      </header>

      <main id="top" className="mx-auto my-5 grid w-[min(1060px,92vw)] gap-4 pb-16">
        <section className="reveal card-glass hero-glow relative overflow-hidden rounded-[20px] border border-[#4a658838] p-7 shadow-[0_14px_36px_rgba(41,61,99,0.08)]">
          <p className="mb-2.5 text-xs uppercase tracking-[.12em] text-[#4f6482]">AI-first creator studio</p>
          <h1 className="mb-3 text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-semibold">Calm software for a loud internet.</h1>
          <p className="max-w-[60ch] text-[#2a3e5c]">
            We build intentional AI products and philosophical web experiences designed to feel simple,
            delightful, and deeply human.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href="#experiments" className="btn-primary">Explore experiments</a>
            <a href="mailto:reggiewilliamsfounder@gmail.com" className="btn-ghost">Work with us</a>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="reveal card-glass rounded-[20px] border border-[#4a658838] p-7 shadow-[0_14px_36px_rgba(41,61,99,0.08)]">
            <h2 id="about" className="mb-2.5 text-2xl font-semibold">What we believe</h2>
            <ul className="list-disc space-y-1 pl-5 text-[#273a58]">
              <li>Technology should reduce noise, not add to it.</li>
              <li>AI can be soulful, useful, and playful at the same time.</li>
              <li>Small experiments can become meaningful products.</li>
            </ul>
          </article>
          <article className="reveal delay-1 card-glass rounded-[20px] border border-[#4a658838] p-7 shadow-[0_14px_36px_rgba(41,61,99,0.08)]">
            <h2 className="mb-2.5 text-2xl font-semibold">What we build</h2>
            <p className="text-[#2a3e5c]">Single-purpose tools, identity artifacts, and creative AI utilities.</p>
            <p className="text-[#2a3e5c]">Built quickly. Shipped thoughtfully. Improved in public.</p>
          </article>
        </section>

        <section id="experiments" className="reveal card-glass rounded-[20px] border border-[#4a658838] p-7 shadow-[0_14px_36px_rgba(41,61,99,0.08)]">
          <h2 className="mb-3 text-2xl font-semibold">Current experiments</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <article className="rounded-2xl border border-[#4a658838] bg-white/70 p-4">
              <h3 className="mb-2 text-lg font-semibold">Bot Photo Booth</h3>
              <p className="text-[#2a3e5c]">A nostalgic 4-panel photo strip generator for AI agents and bot identities.</p>
            </article>
            <article className="rounded-2xl border border-[#4a658838] bg-white/70 p-4">
              <h3 className="mb-2 text-lg font-semibold">AI Board of Agents</h3>
              <p className="text-[#2a3e5c]">A calm command center for creating, organizing, and collaborating with AI agents.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="reveal card-glass rounded-[20px] border border-[#4a658838] p-7 shadow-[0_14px_36px_rgba(41,61,99,0.08)]">
          <h2 className="mb-2.5 text-2xl font-semibold">Build with us</h2>
          <p className="mb-4 text-[#2a3e5c]">
            If you’re building at the edge of AI, culture, and product design, we’d love to connect.
          </p>
          <a href="mailto:reggiewilliamsfounder@gmail.com?subject=Soul%20Games%20Studios" className="btn-primary">
            Contact Soul Games Studios
          </a>
        </section>
      </main>
    </div>
  );
}
