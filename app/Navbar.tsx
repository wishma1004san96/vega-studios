"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="hero-nav-wrap">
      <motion.div
        className="hero-nav"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <a className="logo-lockup" href="#home" aria-label="Vega Studios Home">
          <Image
            src="/vega-studio-logo-white.webp"
            alt="Vega Studios"
            width={170}
            height={62}
            priority
            className="logo-image"
          />
        </a>

        <nav className="hero-menu" aria-label="Main navigation">
          <a className="is-active" href="#home">
            Home
          </a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <a className="menu-cta" href="#contact">
          Contact Us
        </a>
      </motion.div>
      <div className="hero-nav-divider" aria-hidden="true" />
    </header>
  );
}
