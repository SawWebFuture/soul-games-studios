import Image from "next/image";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/brand/SoulGamesStudios_Square_Logo.jpg"
                alt="Soul Games Studios"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-lg font-semibold text-gray-900">
                Soul Games Studios
              </span>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Strategic AI support for founders building sustainable companies.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-gray-600"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-gray-600"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Pages</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/" className="transition-colors hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <SmoothScrollLink href="#about" className="transition-colors hover:text-gray-900">
                  About Us
                </SmoothScrollLink>
              </li>
              <li>
                <SmoothScrollLink href="#features" className="transition-colors hover:text-gray-900">
                  Features
                </SmoothScrollLink>
              </li>
              <li>
                <SmoothScrollLink href="#waitlist" className="transition-colors hover:text-gray-900">
                  Join Waitlist
                </SmoothScrollLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: hello@soulgamesstudios.com</li>
              <li>Location: Remote First</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>© 2024 Soul Games Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
