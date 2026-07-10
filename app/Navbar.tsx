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

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

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
    document.body.classList.toggle("nav-menu-open", menuOpen);
    return () => document.body.classList.remove("nav-menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="hero-nav-wrap">
      <motion.div
        className="hero-nav"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <a className="logo-lockup" href="#home" aria-label="Vega Studios Home" onClick={closeMenu}>
          <Image
            src="https://vegastudios.io/logos/vega-studio-logo-white.png"
            alt="Vega Studios"
            width={170}
            height={62}
            priority
            className="logo-image"
          />
        </a>

        <div className="hero-nav-actions">
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <a className="menu-cta" href="#contact" onClick={closeMenu}>
            Contact Us
          </a>
        </div>

        <nav
          id="main-navigation"
          className={`hero-menu${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={activeSection === link.id ? "is-active" : undefined}
              href={link.href}
              aria-current={activeSection === link.id ? "page" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </motion.div>
      <div className="hero-nav-divider" aria-hidden="true" />
    </header>
  );
}
