import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-5 py-12 max-lg:py-8 max-md:py-6 max-md:px-4">
        <div className="flex flex-col items-center text-center">
          <a
            href="#home"
            className="inline-flex items-center justify-center"
            aria-label="Vega Studios Home"
          >
            <Image
              src="https://vegastudios.io/logos/vega-studio-logo-white.png"
              alt="Vega Studios"
              width={420}
              height={110}
              className="h-24 w-auto sm:h-28 max-lg:h-20 max-md:h-16"
            />
          </a>
          <p className="mt-5 text-lg font-semibold leading-7 tracking-[0.08em] text-[#e5e7eb] sm:text-xl max-lg:mt-4 max-lg:text-base max-md:mt-3 max-md:text-base [font-family:var(--font-orbitron)]">
            Where Creativity Meets Results
          </p>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm font-normal leading-5 tracking-normal text-[#a1a1aa] max-lg:mt-6 max-lg:pt-5 max-md:mt-5 max-md:px-1 max-md:text-xs max-md:leading-relaxed [font-family:ui-sans-serif,system-ui,sans-serif]">
          &copy; {year}{" "}
          <span className="text-[#d22127]">Vega Studios</span>. All rights reserved. | Web Developed by <span className="text-[#d22127]">Tech Eagle Hub</span>
        </div>
      </div>
    </footer>
  );
}
