import Image from "next/image";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/brand/SoulGamesStudios_Square_Logo.jpg"
                alt="Soul Games Studios"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-lg font-semibold text-gray-900">Soul Games Studios</span>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              AI-first creator studio building calm, intentional products and philosophical web experiences.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/" className="transition-colors hover:text-gray-900">Home</a></li>
              <li><SmoothScrollLink href="#about" className="transition-colors hover:text-gray-900">About</SmoothScrollLink></li>
              <li><SmoothScrollLink href="#experiments" className="transition-colors hover:text-gray-900">Experiments</SmoothScrollLink></li>
              <li><SmoothScrollLink href="#waitlist" className="transition-colors hover:text-gray-900">Get updates</SmoothScrollLink></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: reggiewilliamsfounder@gmail.com</li>
              <li>Studio mode: Remote-first</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>© 2026 Soul Games Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
