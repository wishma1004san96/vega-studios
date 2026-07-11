"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "We needed a full-funnel approach. Vega Studios aligned our messaging, visuals, and media plan into a cohesive campaign that felt like a real brand evolution.",
    name: "Hassan Ali",
    tilt: "testimonial-card-left",
  },
  {
    quote:
      "They combined strategy and design beautifully. Our brand presence is consistent across channels now, and the team’s creativity is on another level.",
    name: "Sara Williams",
    tilt: "",
  },
  {
    quote:
      "Clean execution, clear communication, and measurable impact. We finally have a marketing partner we trust to ship and optimize continuously.",
    name: "Daniel Kim",
    tilt: "testimonial-card-right",
  },
  {
    quote:
      "Vega Studios brought clarity to our brand and turned our campaigns into a system. We saw stronger engagement within weeks and a roadmap we could actually execute.",
    name: "Ayesha Rahman",
    tilt: "testimonial-card-left",
  },
  {
    quote:
      "From creatives to performance optimization, everything felt intentional. The team was fast, transparent, and delivered premium work without the usual agency noise.",
    name: "Omar Siddiq",
    tilt: "",
  },
  {
    quote:
      "The new landing experience looks sharp and converts better. The process was smooth, and the reporting helped us make decisions with confidence.",
    name: "Priya Nair",
    tilt: "testimonial-card-right",
  },
];

const clientLogos = [
  {
    src: "https://vegastudios.io/clients/cilent-the-blue-water-hotel-and-spa.png",
    alt: "The Blue Water Hotel and Spa",
    invert: true,
  },
  { src: "https://vegastudios.io/clients/client-b-love-kandy.png", alt: "B Love Kandy" },
  { src: "https://vegastudios.io/clients/client-bppl.png", alt: "BPPL" },
  { src: "https://vegastudios.io/clients/client-eco-spindles-logo.png", alt: "Eco Spindles" },
  { src: "https://vegastudios.io/clients/client-galle-titans.png", alt: "Galle Titans" },
  { src: "https://vegastudios.io/clients/client-gew.png", alt: "GEW" },
  { src: "https://vegastudios.io/clients/client-glenross-living.png", alt: "Glenross Living" },
  { src: "https://vegastudios.io/clients/client-hayleys-fibre.png", alt: "Hayleys Fibre" },
  { src: "https://vegastudios.io/clients/client-hayleys-mattresses.png", alt: "Hayleys Mattresses" },
  { src: "https://vegastudios.io/clients/client-hayleys.png", alt: "Hayleys" },
  { src: "https://vegastudios.io/clients/client-lpl-t20-2023.png", alt: "LPL T20 2023" },
  { src: "https://vegastudios.io/clients/client-maskeliya-kahata.png", alt: "Maskeliya Kahata" },
  { src: "https://vegastudios.io/clients/client-mcdonald.png", alt: "McDonald" },
  { src: "https://vegastudios.io/clients/client-rich-look.png", alt: "Rich Look" },
  { src: "https://vegastudios.io/clients/client-rileys.png", alt: "Rileys" },
  { src: "https://vegastudios.io/clients/client-tdu.png", alt: "TDU" },
  { src: "https://vegastudios.io/clients/client-vta-sri-lanka.png", alt: "VTA Sri Lanka" },
  {
    src: "https://vegastudios.io/clients/client-water-garden-sigiriya.png",
    alt: "Water Garden Sigiriya",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(testimonials.length / 3);
  const visible = testimonials.slice(page * 3, page * 3 + 3);

  return (
    <section id="testimonials" className="testimonials-section" aria-label="Clients and Testimonials">
      <div className="testimonials-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="testimonials-title">
            Clients & <em>Testimonials</em>
          </h2>
          <p className="testimonials-subtitle">
            Trusted by visionaries, innovators, and industry leaderes.
            <br />
            From startups to houshold names, we&apos;ve helped brands grow with purpose.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 max-lg:mt-8 max-lg:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article
              key={item.name}
              className={[
                "relative rounded-2xl border border-white/10 bg-[rgba(10,16,31,0.35)] p-6 transition-transform duration-300",
                item.tilt === "testimonial-card-left" && "lg:[transform:rotate(-4deg)]",
                item.tilt === "testimonial-card-right" && "lg:[transform:rotate(4deg)]",
                item.tilt === "" && "lg:[transform:scale(1.04)]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={`${item.name}-star-${index}`} />
                ))}
              </div>
              <p className="mt-4 text-sm font-normal leading-7 tracking-normal text-[#a1a1aa] [font-family:ui-sans-serif,system-ui,sans-serif]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-5 text-sm font-semibold leading-5 tracking-[0.08em] text-[#4a78ce] [font-family:var(--font-orbitron)]">
                {item.name}
              </p>
            </article>
          ))}
        </div>

        <div className="testimonials-controls">
          <button
            type="button"
            className="testimonial-nav-btn"
            aria-label="Previous testimonials"
            onClick={() => setPage((current) => (current - 1 + pageCount) % pageCount)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path
                d="m15 18-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="testimonial-dots">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={page === index ? "is-active" : undefined}
                aria-label={`Go to testimonial page ${index + 1}`}
                aria-current={page === index ? "true" : undefined}
                onClick={() => setPage(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="testimonial-nav-btn"
            aria-label="Next testimonials"
            onClick={() => setPage((current) => (current + 1) % pageCount)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path
                d="m9 18 6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="client-marquee-wrap">
          <div className="client-marquee-track">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div className="client-logo-item" key={`${logo.alt}-${index}`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={240}
                  height={80}
                  className={logo.invert ? "client-logo invert" : "client-logo"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
