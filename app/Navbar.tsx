"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";

const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact Us", href: "#contact" },
] as const;

const sectionElements = [
  { navId: "home", elementId: "hero" },
  { navId: "about", elementId: "about" },
  { navId: "services", elementId: "services" },
  { navId: "contact", elementId: "contact" },
] as const;

function getScrollTargetId(sectionId: string) {
  return sectionId === "home" ? "hero" : sectionId;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let retryTimer: number | null = null;

    const getHeaderOffset = () => {
      const header = document.querySelector("header");
      return header ? Math.ceil(header.getBoundingClientRect().height) : 86;
    };

    const resolveActiveSection = () => {
      const headerOffset = getHeaderOffset();
      const activationLine = headerOffset + 120;

      for (let index = sectionElements.length - 1; index >= 1; index -= 1) {
        const { navId, elementId } = sectionElements[index];
        const element = document.getElementById(elementId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= activationLine && rect.bottom > headerOffset) {
          return navId;
        }
      }

      const hero = document.getElementById("hero");
      if (hero && hero.getBoundingClientRect().bottom > headerOffset) {
        return "home";
      }

      return sectionElements[sectionElements.length - 1].navId;
    };

    const updateActiveSection = () => {
      setActiveSection(resolveActiveSection());
    };

    const setupObserver = () => {
      const elements = sectionElements
        .map(({ elementId }) => document.getElementById(elementId))
        .filter((element): element is HTMLElement => element !== null);

      if (elements.length < sectionElements.length) {
        retryTimer = window.setTimeout(setupObserver, 50);
        return;
      }

      observer?.disconnect();

      const headerOffset = getHeaderOffset();

      observer = new IntersectionObserver(
        () => {
          updateActiveSection();
        },
        {
          rootMargin: `-${headerOffset}px 0px 0px 0px`,
          threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
        },
      );

      elements.forEach((element) => observer!.observe(element));
      updateActiveSection();
    };

    setupObserver();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", setupObserver);

    return () => {
      observer?.disconnect();
      if (retryTimer !== null) window.clearTimeout(retryTimer);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", setupObserver);
    };
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

  const getHeaderOffset = () => {
    const header = document.querySelector("header");
    return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
  };

  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    const target = document.getElementById(getScrollTargetId(sectionId));
    if (!target) return;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      getHeaderOffset();

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveSection(sectionId);
    closeMenu();
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!navLinks.some((link) => link.id === hash)) return;

    const target = document.getElementById(getScrollTargetId(hash));
    if (!target) return;

    requestAnimationFrame(() => {
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        getHeaderOffset();

      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      setActiveSection(hash);
    });
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-[rgb(7,7,10)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <motion.div
        className="relative mx-auto flex h-[97px] md:h-[78px] max-w-6xl items-center justify-between px-4 max-md:px-4 md:px-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <a
          className="flex items-center gap-2"
          href="#home"
          aria-label="Vega Studios Home"
          onClick={(event) => scrollToSection(event, "home")}
        >
          <Image
            src="/logos/vega-studio-logo-white.webp"
            alt="Vega Studios"
            width={420}
            height={110}
            priority
            className="h-[80px] w-auto md:h-[72px] lg:h-[77px]"
          />
        </a>

        <nav
          id="main-navigation"
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                className={[
                  "relative py-2 text-base font-semibold transition-colors duration-300 [font-family:var(--font-orbitron)]",
                  "after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:transition-colors after:duration-300",
                  isActive
                    ? "!text-[#d22127] after:bg-[#d22127]"
                    : "!text-[#a1a1aa] after:bg-transparent hover:!text-[#eef3ff]",
                ].join(" ")}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => scrollToSection(event, link.id)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 max-md:gap-1.5 md:gap-3">
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
            className="menu-cta max-md:!hidden hidden !h-9 !px-3.5 !text-sm items-center justify-center rounded-xl bg-[#d22127] font-semibold text-white transition duration-300 hover:opacity-90 [font-family:var(--font-orbitron)] md:inline-flex"
            href="#contact"
            onClick={(event) => scrollToSection(event, "contact")}
          >
            Contact Us
          </a>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`fixed left-0 right-0 top-[97px] z-20 mx-4 max-md:mx-4 hidden gap-[0.35rem] rounded-[14px] border border-white/10 bg-[rgba(12,15,24,0.96)] p-[0.85rem] shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ${
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
              onClick={(event) => scrollToSection(event, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
