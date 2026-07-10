"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import BackToTop from "./BackToTop";
import Footer from "./Footer";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const contactOrbitron = "[font-family:var(--font-orbitron)]";
const contactSans =
  "[font-family:ui-sans-serif,system-ui,sans-serif]";

const fieldClassName =
  `h-11 w-full rounded-xl border border-white/10 bg-[rgba(10,16,31,0.7)] px-4 text-base font-normal leading-6 tracking-normal text-[var(--ink)] transition-[border-color,box-shadow] placeholder:text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-zinc-400/85 placeholder:[font-family:ui-sans-serif,system-ui,sans-serif] focus:border-[rgba(74,120,206,0.75)] focus:outline-none focus:ring-[3px] focus:ring-[rgba(74,120,206,0.18)] ${contactSans}`;

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-[#4a78ce]"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-[#4a78ce]"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-[#4a78ce]"
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message.");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Us">
      <div className="contact-shell contact-layout">
        <motion.div
          className="contact-copy"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className={`contact-title !text-4xl !font-semibold !leading-none !tracking-tight sm:!text-5xl ${contactOrbitron}`}>
            Contact <em>Us</em>
          </h2>
          <p className={`contact-kicker !text-base !font-semibold !leading-6 !tracking-[0.1em] !normal-case ${contactOrbitron}`}>
            Let&apos;s Bring Your Brand to Life
          </p>
          <p className="contact-subtitle !font-normal ![font-family:ui-sans-serif,system-ui,sans-serif]">
            Ready to launch something amazing? Let&apos;s talk ideas, not just deliverables.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-[rgba(10,16,31,0.4)] p-5 text-left">
              <div className="flex items-center gap-2">
                <MailIcon />
                <p className={`text-sm font-semibold leading-5 text-[var(--ink)] ${contactSans}`}>Email</p>
              </div>
              <a
                href="mailto:info@vegastudios.io"
                className={`mt-2 block text-sm font-normal leading-5 text-zinc-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[var(--ink)] ${contactSans}`}
              >
                info@vegastudios.io
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(10,16,31,0.4)] p-5 text-left">
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <p className={`text-sm font-semibold leading-5 text-[var(--ink)] ${contactSans}`}>Contact Numbers</p>
              </div>
              <a
                href="tel:+94710179842"
                className={`mt-2 block text-sm font-normal leading-5 text-zinc-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[var(--ink)] ${contactSans}`}
              >
                +94 71 017 9842
              </a>
              <a
                href="tel:+94774207781"
                className={`mt-2 block text-sm font-normal leading-5 text-zinc-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[var(--ink)] ${contactSans}`}
              >
                +94 77 420 7781
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(10,16,31,0.4)] p-5 text-left">
              <div className="flex items-center gap-2">
                <MapPinIcon />
                <p className={`text-sm font-semibold leading-5 text-[var(--ink)] ${contactSans}`}>Location</p>
              </div>
              <span className={`mt-2 block text-sm font-normal leading-5 text-zinc-400 ${contactSans}`}>Colombo Sri Lanka</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-white/10 bg-[rgba(10,16,31,0.4)] p-6"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          {submitted ? (
            <div className="contact-success" role="status">
              <p className="contact-success-title">Message sent!</p>
              <p className="contact-success-text">
                Thank you for reaching out. We&apos;ll be in touch soon.
              </p>
              <button
                type="button"
                className="contact-submit"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={`grid gap-2 text-sm font-normal leading-5 text-zinc-400 ${contactSans}`}>
                  <span>Name</span>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    placeholder="Your name"
                    className={fieldClassName}
                  />
                </label>

                <label className={`grid gap-2 text-sm font-normal leading-5 text-zinc-400 ${contactSans}`}>
                  <span>Email</span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="you@company.com"
                    className={fieldClassName}
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className={`grid gap-2 text-sm font-normal leading-5 text-zinc-400 ${contactSans}`}>
                  <span>Contact Number</span>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    placeholder="+94 77 123 4567"
                    className={fieldClassName}
                  />
                </label>

                <label className={`grid gap-2 text-sm font-normal leading-5 text-zinc-400 ${contactSans}`}>
                  <span>Company</span>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, company: event.target.value }))
                    }
                    placeholder="Company name"
                    className={fieldClassName}
                  />
                </label>
              </div>

              <label className={`grid gap-2 text-sm font-normal leading-5 text-zinc-400 ${contactSans}`}>
                <span>Message</span>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={form.message}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, message: event.target.value }))
                  }
                  placeholder="Tell us what you're building…"
                  className={`${fieldClassName} min-h-[140px] resize-y py-3`}
                />
              </label>

              <p className={`text-sm font-normal leading-5 text-zinc-400 ${contactSans}`}>
                By submitting, you agree to be contacted about this request.
              </p>

              <div className="flex">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex h-11 items-center justify-center rounded-xl bg-[var(--red)] px-5 text-sm font-semibold leading-5 text-white shadow-[0_8px_24px_rgba(243,40,52,0.28)] transition-[box-shadow,transform,opacity] hover:shadow-[0_14px_30px_rgba(243,40,52,0.4)] hover:not-disabled:-translate-y-px disabled:cursor-wait disabled:opacity-70 ${contactSans}`}
                >
                  {submitting ? "Sending..." : "Send message"}
                </button>
              </div>

              {error ? (
                <p className="contact-error" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </motion.div>
      </div>

      <Footer />

      <BackToTop />
    </section>
  );
}
