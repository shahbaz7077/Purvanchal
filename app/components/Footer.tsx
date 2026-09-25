import Link from "next/link";
import { company } from "../../data/company";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-blue-950 pb-12 pt-16 text-sm">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1100px] px-6">
        
        {/* 3 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                {company.name}
              </h3>
              <p className="mt-1 text-base font-semibold text-blue-300">
                {company.tagline}
              </p>
            </div>
            <div className="leading-relaxed text-blue-100/90">
              <p>{company.address}</p>
            </div>
            <div className="text-blue-100/90">
              <p>{company.footerLine}</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                Quick Links
              </h3>
            </div>
            <ul className="flex flex-col gap-3 text-base">
              <li>
                <Link href="#top" className="text-blue-200 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-blue-200 transition-colors hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#why-us" className="text-blue-200 transition-colors hover:text-white">
                  Why Us
                </Link>
              </li>
            </ul>
            <div>
              <Link
                href="#contact"
                className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                Get in Touch
              </h3>
            </div>
            <div>
              <a
                href={`mailto:${company.email}`}
                className="block text-base font-medium text-blue-200 transition-colors hover:text-white"
              >
                {company.email}
              </a>
            </div>
            <div className="flex flex-col gap-1 text-base">
              <span className="text-sm font-semibold uppercase tracking-wide text-blue-300/80">
                Call us:
              </span>
              <span className="font-bold text-white">
                {company.phones.join(" · ")}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-blue-800/60 pt-6 text-center text-xs font-medium text-blue-300/70">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}