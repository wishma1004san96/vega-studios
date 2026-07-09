"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";

const headlineLines = [
  [
    { text: "WE", accent: false },
    { text: " BUILD", accent: true },
    { text: " BRANDS", accent: false },
  ],
  [
    { text: "THAT", accent: false },
    { text: " MOVE", accent: true },
    { text: " PEOPLE", accent: false },
  ],
];

const description = [
  "Vega studios is a full-service marketing agency that crafts into impact.",
  "We help businesses grow through creative storytelling, smart strategy, and results-driven digital experiences.",
];

const particles = [
  { left: "11%", top: "23%", size: 6, delay: 0, duration: 11 },
  { left: "22%", top: "62%", size: 4, delay: 0.7, duration: 12 },
  { left: "76%", top: "29%", size: 5, delay: 1.2, duration: 10.8 },
  { left: "87%", top: "73%", size: 4, delay: 1.9, duration: 12.4 },
];

const sliderItems = [
  "Digital Marketing",
  "Advertising",
  "Branding",
  "Outdoor Marketing",
  "Marketing Consulting",
  "Event & Activations",
  "Media Solutions",
  "Web Solutions",
];

const aboutItems = [
  {
    titlePrimary: "What",
    titleSecondary: "we do",
    text: "From digital marketing to outdoor advertising, web design to brand storytelling, we craft 360 marketing ecosystems that move your business forward.",
  },
  {
    titlePrimary: "Who",
    titleSecondary: "We Are",
    text: "We are a collective of creators, strategists, and innovators who believe that marketing should inspire, not interrupt. Our mission is to bring brands to life through meaningful ideas, digital mastery, and powerful design.",
  },
  {
    titlePrimary: "Why",
    titleSecondary: "Choose Us",
    text: "Because we are not another agency, we are your creative growth partner. We do not just deliver projects, we build long-term brand legacies.",
  },
];

const coreValues = [
  "Innovation",
  "Honesty",
  "Education",
  "Discipline",
  "Result Oriented",
  "Family",
  "Loyalty",
  "Teamwork",
];

type ServiceIconVariant =
  | "megaphone"
  | "target"
  | "brush"
  | "pin"
  | "chart"
  | "spark"
  | "radio"
  | "globe";

type ProcessIconVariant =
  | "search"
  | "doc"
  | "palette"
  | "sliders"
  | "wrench"
  | "rocket"
  | "flask";

type ServiceCard = {
  title: string;
  description: string;
  items: string[];
  icon: ServiceIconVariant;
};

const servicesCards: ServiceCard[] = [
  {
    title: "Digital Marketing",
    description:
      "We help your brand stay ahead in a world that never stops scrolling. Our team belnds creativity with data to make your campaings perform, not just exist.",
    icon: "megaphone",
    items: [
      "Social Media Marketing",
      "Influncer Marketing",
      "E-mail Marketing",
      "Content Marketing",
      "Search Engine Optimizations",
      "Search Engine Marketing",
      "Display Advertisements",
    ],
  },
  {
    title: "Advertising",
    description:
      "We create campaigns that spark emotion and drive action, from billboards to digital screens. Our creaive process merges local insights with global trends for maximum impact.",
    icon: "target",
    items: [
      "Adverising Campaings & Strategy",
      "Below the Line Advertising",
      "Through the Line Advertising",
      "Above the Line Advertising",
    ],
  },
  {
    title: "Branding",
    description:
      "From the first impression to long-term recognition, we craft cohesive brand identities that resonate. Every color, line, and word is designed to speak your truth.",
    icon: "brush",
    items: [
      "Brand Identity Design",
      "Corporate Identity Design",
      "Design and Packaging",
      "Branded Entertainment",
      "Eco Branding",
      "Corporate Citizenship",
      "CSR - Brand Connection",
    ],
  },
  {
    title: "Outdoor Marketing",
    description:
      "From highway billboards to store displays, we make your brand shine in every space it occupies.",
    icon: "pin",
    items: [
      "Printing - Offset & Digital",
      "Billboards/Hoardings",
      "Out of Home Multimedia",
      "Corporate Signatures",
      "Instore Display Stands",
      "Exhibition Stalls",
      "Vehicle Branding",
    ],
  },
  {
    title: "Marketing Consulting",
    description:
      "We connect data, cretivity, and human psychology to craft marketing blueprints that grow your brand inteligently.",
    icon: "chart",
    items: [
      "Marketing Business Planning",
      "Branding, Marketing Plans",
      "Market and Consumer Insights",
      "Communication Action Plans",
    ],
  },
  {
    title: "Events & Activations",
    description:
      "Your event should feel like your brand, bold, memorable, and seamless. From product launches to corporate celegrations, we handle it all from concept to applause.",
    icon: "spark",
    items: [
      "Corporate Events",
      "Product Launches",
      "Theme Parties",
      "Road Activations",
      "Supermarket Activations",
      "Promotions",
    ],
  },
  {
    title: "Media Solutions",
    description:
      "We plan and excute integrated media strategies that amplify your message across every platform.",
    icon: "radio",
    items: [
      "Media Research and Analysis",
      "Media Planning and Buiying (Placement)",
      "Recommendation on Various Media Platfroms",
      "Integrated Media Campaings - Traditional and Digital",
    ],
  },
  {
    title: "Web Solutions",
    description:
      "We design sleek, user-focused websites that perfrom beautifully on every device.",
    icon: "globe",
    items: [
      "Responsive Web Design Strategy",
      "User Interface Desigining",
      "User Experience Designing",
      "Content Strategy",
      "Content Management System Integration",
      "Information Architecture & Design",
    ],
  },
];

const processSteps: {
  title: string;
  description: string;
  icon: ProcessIconVariant;
  className: string;
}[] = [
  {
    title: "Research & Planning",
    description: "We study your market, audience, and goals to build a clear roadmap.",
    icon: "search",
    className: "process-step-a",
  },
  {
    title: "Content",
    description: "We craft messaging and content that speaks to the right people.",
    icon: "doc",
    className: "process-step-b",
  },
  {
    title: "Creatives",
    description: "We design visuals that feel premium, consistent, and on-brand.",
    icon: "palette",
    className: "process-step-c",
  },
  {
    title: "Optimization",
    description: "We refine targeting, creatives, and performance for stronger results.",
    icon: "sliders",
    className: "process-step-d",
  },
  {
    title: "Maintenance",
    description: "We monitor, improve, and keep everything running smoothly.",
    icon: "wrench",
    className: "process-step-e",
  },
  {
    title: "Launch",
    description: "We go live with confidence and track impact from day one.",
    icon: "rocket",
    className: "process-step-f",
  },
  {
    title: "Trials",
    description: "We test variations to find what converts best and scales safely.",
    icon: "flask",
    className: "process-step-g",
  },
];

function ServiceCardIcon({ variant }: { variant: ServiceIconVariant }) {
  if (variant === "megaphone") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <path d="M11 34L37 24V48L11 38V34Z" stroke="currentColor" strokeWidth="2.6" />
        <path d="M37 26L58 18V54L37 46" stroke="currentColor" strokeWidth="2.6" />
        <path d="M18 39L24 53" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "target") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <circle cx="36" cy="36" r="22" stroke="currentColor" strokeWidth="2.6" />
        <circle cx="36" cy="36" r="13" stroke="currentColor" strokeWidth="2.6" />
        <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2.6" />
      </svg>
    );
  }

  if (variant === "brush") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <path
          d="M20 48L46 22C49 19 54 19 57 22C60 25 60 30 57 33L31 59"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path d="M18 55C23 54 25 57 24 62C19 63 16 60 18 55Z" stroke="currentColor" strokeWidth="2.6" />
      </svg>
    );
  }

  if (variant === "pin") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <path
          d="M36 62C36 62 52 45 52 33C52 24 44 16 36 16C28 16 20 24 20 33C20 45 36 62 36 62Z"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <circle cx="36" cy="33" r="6" stroke="currentColor" strokeWidth="2.6" />
      </svg>
    );
  }

  if (variant === "chart") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <path d="M14 54H58" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="18" y="37" width="8" height="17" rx="2" stroke="currentColor" strokeWidth="2.6" />
        <rect x="31" y="30" width="8" height="24" rx="2" stroke="currentColor" strokeWidth="2.6" />
        <rect x="44" y="23" width="8" height="31" rx="2" stroke="currentColor" strokeWidth="2.6" />
      </svg>
    );
  }

  if (variant === "spark") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <path d="M36 16L41 31L56 36L41 41L36 56L31 41L16 36L31 31L36 16Z" stroke="currentColor" strokeWidth="2.6" />
        <path d="M54 18L56 24L62 26L56 28L54 34L52 28L46 26L52 24L54 18Z" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    );
  }

  if (variant === "radio") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <rect x="19" y="24" width="34" height="24" rx="5" stroke="currentColor" strokeWidth="2.6" />
        <circle cx="30" cy="36" r="5" stroke="currentColor" strokeWidth="2.6" />
        <path d="M40 32H48" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M40 38H46" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M53 21L58 16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="18" stroke="currentColor" strokeWidth="2.6" />
      <path d="M18 36H54" stroke="currentColor" strokeWidth="2.6" />
      <path d="M36 18C42 24 42 48 36 54C30 48 30 24 36 18Z" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

function ProcessStepIcon({ variant }: { variant: ProcessIconVariant }) {
  if (variant === "search") {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.9" />
        <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "doc") {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <path d="M7 3H14L18 7V21H7V3Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="M14 3V7H18" stroke="currentColor" strokeWidth="1.9" />
        <path d="M10 12H15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "palette") {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <path
          d="M12 3C6.5 3 3 7.2 3 11.8C3 15.5 5.7 18 8.5 18H9.8C10.8 18 11.3 18.8 11 19.6C10.6 20.9 11.3 22 12.8 22C18.2 22 21 17.5 21 12.5C21 7.1 17 3 12 3Z"
          stroke="currentColor"
          strokeWidth="1.9"
        />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
        <circle cx="15" cy="11" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "sliders") {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <path d="M4 7H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M4 12H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M4 17H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="11" cy="17" r="2" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    );
  }

  if (variant === "wrench") {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <path
          d="M14 6.5C14.8 4.7 16.9 3.8 18.9 4.3L16.7 6.5L18.5 8.3L20.7 6.1C21.2 8.1 20.3 10.2 18.5 11L10.2 19.3C9.5 20 8.3 20 7.6 19.3L4.7 16.4C4 15.7 4 14.5 4.7 13.8L13 5.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "rocket") {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
        <path
          d="M14.8 4.2C12.4 4.5 10.2 5.7 8.6 7.4L7 9L9.8 14.2L15 17L16.6 15.4C18.3 13.8 19.5 11.6 19.8 9.2L20 7L17.8 7.2C16.7 7.3 15.7 7.6 14.8 8.1"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.5 14.5L7 17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M9 3H15L14 8H10L9 3Z" stroke="currentColor" strokeWidth="1.9" />
      <path d="M10 8V16L7 21H17L14 16V8" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M8 12H16" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

export default function Hero() {
  const topSteps = processSteps.slice(0, 3);
  const optimizationStep = processSteps[3];
  const bottomSteps = processSteps.slice(4);

  return (
    <div className="landing-wrap" id="home">
      <Navbar />

      <div className="hero-particles" aria-hidden="true">
        <div className="hero-bg-blur" />
        <div className="hero-bg-grid" />
        <div className="hero-bg-overlay" />

        {particles.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${particle.top}-${index}`}
            className="hero-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -6, 0],
              x: [0, 3, -2, 0],
              scale: [1, 1.08, 1],
              opacity: [0.12, 0.3, 0.11],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <main className="hero-main">
        <motion.section
          className="hero-block"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <h1 className="hero-headline" aria-label="WE BUILD BRANDS THAT MOVE PEOPLE">
            {headlineLines.map((line, lineIndex) => (
              <span className="hero-line" key={`line-${lineIndex}`}>
                {line.map((chunk, chunkIndex) => (
                  <span
                    key={`chunk-${lineIndex}-${chunkIndex}`}
                    className={chunk.accent ? "is-accent" : undefined}
                  >
                    {chunk.text.split("").map((character, charIndex) => (
                      <motion.span
                        key={`char-${lineIndex}-${chunkIndex}-${charIndex}-${character}`}
                        className="hero-letter"
                        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay:
                            0.2 +
                            lineIndex * 0.19 +
                            chunkIndex * 0.1 +
                            charIndex * 0.02,
                        }}
                      >
                        {character === " " ? "\u00A0" : character}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6 }}
          >
            {description[0]}
            <br />
            {description[1]}
          </motion.p>

          <motion.a
            className="hero-button"
            href="#contact"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.85 }}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            LET&apos;S CREATE SOMETHING POWERFULL
          </motion.a>
        </motion.section>

        <div className="scroll-indicator" aria-hidden="true">
          <span className="mouse">
            <svg
              className="mouse-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="1.5"
                width="12"
                height="17"
                rx="6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                className="mouse-wheel"
                x="9"
                y="5"
                width="2"
                height="4"
                rx="1"
                fill="currentColor"
              />
            </svg>
          </span>
          <svg
            className="arrow"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </main>

      <section id="marquee" className="service-slider" aria-label="Services marquee">
        <div className="service-track">
          {[...sliderItems, ...sliderItems].map((item, index) => (
            <span className="service-pill" key={`${item}-${index}`}>
              <span>{item}</span>
              <span className="service-sep">|</span>
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="about-section" aria-label="About Us">
        <div className="about-shell">
          <h2 className="about-title">
            <span>About</span> <em>Us</em>
          </h2>

          <div className="about-list">
            {aboutItems.map((item) => (
              <article
                className="about-row"
                key={`${item.titlePrimary}-${item.titleSecondary}`}
              >
                <h3>
                  <span>{item.titlePrimary}</span> {item.titleSecondary}
                </h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="about-row about-values-row">
            <h3>Core Values</h3>
            <div className="about-values-list">
              {coreValues.map((value) => (
                <span className="core-value-pill" key={value}>
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section" aria-label="Our Services">
        <div className="services-shell">
          <h2 className="services-title">
            Our <em>Services</em>
          </h2>

          <div className="services-grid">
            {servicesCards.map((card) => (
              <article className="services-card" key={card.title}>
                <span className="services-card-icon">
                  <ServiceCardIcon variant={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.items.map((item) => (
                    <li key={`${card.title}-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="relative -mt-px overflow-hidden bg-background/60 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-background/60"
        aria-label="Our Process"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56">
          <div className="absolute -top-24 left-1/2 h-72 w-[160%] -translate-x-1/2 opacity-60 blur-3xl [mask-image:linear-gradient(to_bottom,black,transparent)] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(72,120,206,0.30),transparent_35%,rgba(210,33,39,0.26),transparent_65%,rgba(72,120,206,0.22))]" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56">
          <div className="absolute -bottom-24 left-1/2 h-72 w-[150%] -translate-x-1/2 opacity-65 blur-3xl [mask-image:linear-gradient(to_top,black,transparent)] bg-[radial-gradient(circle_at_50%_50%,rgba(210,33,39,0.25),transparent_62%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-center text-[42px] font-semibold tracking-tight leading-[42px] sm:text-5xl [font-family:var(--font-orbitron)]">
            Our <span className="text-[#d22127]">Process</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-7 text-muted sm:text-base">
            Our process is simple, create, connect and convert.
          </p>

          <div className="mt-10 hidden lg:block">
            <div className="relative mx-auto max-w-[860px]">
              <span className="pointer-events-none absolute left-[19%] right-[52%] top-[145px] border-t-2 border-dashed border-white/45" />
              <span className="pointer-events-none absolute left-[51%] right-[18.5%] top-[145px] border-t-2 border-dashed border-white/45" />
              <span className="pointer-events-none absolute right-[18.5%] top-[145px] h-[184px] border-l-2 border-dashed border-white/45" />
              <span className="pointer-events-none absolute left-[19%] right-[52%] top-[329px] border-t-2 border-dashed border-white/45" />
              <span className="pointer-events-none absolute left-[51%] right-[18.5%] top-[329px] border-t-2 border-dashed border-white/45" />

              <div className="grid grid-cols-3 gap-x-6">
                {topSteps.map((step) => (
                  <article key={step.title} className="text-center">
                    <p className="pt-1 text-sm font-semibold tracking-[0.08em] text-[#4a78ce] [font-family:var(--font-orbitron)]">
                      {step.title}
                    </p>
                    <p className="mt-3 px-1 text-sm leading-6 text-[#a1a1aa]">{step.description}</p>
                    <span className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#4a78ce] bg-black/20 text-white backdrop-blur">
                      <ProcessStepIcon variant={step.icon} />
                    </span>
                  </article>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-x-6">
                <div />
                <div />
                <article className="grid grid-cols-[52px_1fr] items-start gap-x-4 pl-[46px]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#4a78ce] bg-black/20 text-white backdrop-blur">
                    <ProcessStepIcon variant={optimizationStep.icon} />
                  </span>
                  <div>
                    <p className="pt-1 text-sm font-semibold tracking-[0.08em] text-[#4a78ce] [font-family:var(--font-orbitron)]">
                      {optimizationStep.title}
                    </p>
                    <p className="mt-2 max-w-[232px] text-sm leading-6 text-[#a1a1aa]">
                      {optimizationStep.description}
                    </p>
                  </div>
                </article>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-x-6">
                {bottomSteps.map((step) => (
                  <article key={step.title} className="text-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#4a78ce] bg-black/20 text-white backdrop-blur">
                      <ProcessStepIcon variant={step.icon} />
                    </span>
                    <p className="pt-3 text-sm font-semibold tracking-[0.08em] text-[#4a78ce] [font-family:var(--font-orbitron)]">
                      {step.title}
                    </p>
                    <p className="mt-3 px-1 text-sm leading-6 text-[#a1a1aa]">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:hidden">
            <div className="space-y-6">
              {processSteps.map((step) => (
                <article
                  key={step.title}
                  className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4a78ce] bg-black/25 text-white">
                      <ProcessStepIcon variant={step.icon} />
                    </span>
                    <p className="text-sm font-semibold tracking-[0.08em] text-[#4a78ce] [font-family:var(--font-orbitron)]">
                      {step.title}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#a1a1aa]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="anchor-gap" aria-hidden="true" />
    </div>
  );
}
