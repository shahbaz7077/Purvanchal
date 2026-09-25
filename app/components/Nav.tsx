"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { company } from "../../data/company";

type NavLink = { label: string; href: string };

const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "Products", href: "#products" },
  { label: "Why us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false);
          setIsOpen(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <header
      id="top"
      className={`sticky top-0 z-30 w-full overflow-hidden border-b border-white/10 bg-blue-950/95 backdrop-blur-md shadow-xl shadow-blue-950/20 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5 sm:px-8">
        
        <Link href="#top" className="group flex items-center" onClick={closeMenu}>
          <div className="leading-tight">
            <div className="text-xl font-bold text-white transition-colors group-hover:text-blue-200 sm:text-2xl">
              {company.name}
            </div>
            <div className="hidden text-sm font-medium text-blue-200 sm:block">
              {company.tagline}
            </div>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden gap-3 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-4 py-3 text-lg font-semibold text-blue-100 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-1 h-1 origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="rounded-xl p-3 text-white transition-colors hover:bg-white/10 md:hidden"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-transform duration-300"
          >
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* animated mobile menu */}
      <div
        className={`overflow-hidden border-white/10 transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isOpen ? "max-h-80 border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav id="mobile-menu" aria-label="Mobile" className="px-6 pb-6 pt-4 sm:px-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{ transitionDelay: isOpen ? `${i * 40}ms` : "0ms" }}
              className={`block rounded-xl px-4 py-4 text-lg font-semibold text-blue-100 transition-all duration-300 hover:bg-white/10 hover:pl-6 hover:text-white ${
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}