"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact Us", href: "#contact" },
] as const;

function navLinkClassName(isActive: boolean) {
  return [
    "relative py-2 text-base font-semibold transition duration-300 [font-family:var(--font-orbitron)]",
    "after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:rounded-full after:transition-colors after:duration-300",
    isActive
      ? "text-[#d22127] after:bg-[#d22127]"
      : "text-[#a1a1aa] hover:text-[#eef3ff] after:bg-transparent",
  ].join(" ");
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", menuOpen);
    return () => document.body.classList.remove("nav-menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "bg-[rgba(7,7,10,0.85)]" : "bg-[rgba(7,7,10,0.7)]"
      }`}
    >
      <motion.div
        className="relative mx-auto flex h-[85px] max-w-6xl items-center justify-between px-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <a
          className="flex items-center gap-2"
          href="#home"
          aria-label="Vega Studios Home"
          onClick={closeMenu}
        >
          <Image
            src="https://vegastudios.io/logos/vega-studio-logo-white.png"
            alt="Vega Studios"
            width={420}
            height={110}
            priority
            className="h-[72px] w-auto"
          />
        </a>

        <nav
          id="main-navigation"
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={navLinkClassName(activeSection === link.id)}
              href={link.href}
              aria-current={activeSection === link.id ? "page" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="nav-toggle !hidden h-9 w-9 max-md:!inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[rgba(10,16,31,0.35)] text-white/85 transition duration-300 hover:border-white/20 hover:bg-[rgba(10,16,31,0.55)] hover:text-white [&_.nav-toggle-bar]:w-4"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <a
            className="menu-cta hidden !h-9 items-center justify-center rounded-xl bg-[#d22127] !px-3.5 text-sm font-semibold text-white transition duration-300 hover:opacity-90 [font-family:var(--font-orbitron)] md:inline-flex"
            href="#contact"
            onClick={closeMenu}
          >
            Contact Us
          </a>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`fixed left-0 right-0 top-[72px] z-20 mx-[0.9rem] hidden gap-[0.35rem] rounded-[14px] border border-white/10 bg-[rgba(12,15,24,0.96)] p-[0.85rem] shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ${
            menuOpen
              ? "max-md:grid max-md:opacity-100 max-md:visible max-md:translate-y-0"
              : "max-md:hidden"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={`mobile-${link.id}`}
              className={[
                "justify-self-stretch rounded-lg border-b-2 py-[0.7rem] px-2 text-center text-base font-medium leading-6 transition duration-180 [font-family:var(--font-geist-sans)]",
                activeSection === link.id
                  ? "border-[#d22127] bg-[rgba(74,120,206,0.12)] text-[#d22127]"
                  : "border-transparent text-[#a1a1aa] hover:bg-[rgba(74,120,206,0.12)] hover:text-[#d22127]",
              ].join(" ")}
              href={link.href}
              aria-current={activeSection === link.id ? "page" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
