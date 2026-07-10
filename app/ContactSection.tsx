"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import BackToTop from "./BackToTop";

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
          <h2 className="contact-title">
            Contact <em>Us</em>
          </h2>
          <p className="contact-kicker">Let&apos;s Bring Your Brand to Life</p>
          <p className="contact-subtitle">
            Ready to launch something amazing? Let&apos;s talk ideas, not just deliverables.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <p className="contact-card-label">Email</p>
              <a href="mailto:info@vegastudios.io">info@vegastudios.io</a>
            </div>

            <div className="contact-card">
              <p className="contact-card-label">Contact Numbers</p>
              <a href="tel:+94710179842">+94 71 017 9842</a>
              <a href="tel:+94774207781">+94 77 420 7781</a>
            </div>

            <div className="contact-card">
              <p className="contact-card-label">Location</p>
              <span>Colombo Sri Lanka</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-wrap"
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
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="contact-name">Name</label>
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
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email</label>
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
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-phone">Contact Number</label>
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
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-company">Company</label>
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
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, message: event.target.value }))
                  }
                  placeholder="Tell us what you're building…"
                />
              </div>

              <p className="contact-consent">
                By submitting, you agree to be contacted about this request.
              </p>

              <button type="submit" className="contact-submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send message"}
              </button>

              {error ? (
                <p className="contact-error" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </motion.div>
      </div>

      <footer className="site-footer" aria-label="Site footer">
        <div className="footer-shell footer-simple">
          <p className="footer-tagline-main">Where Creativity Meets Results</p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Vega Studios. All rights reserved.
          </p>
        </div>
      </footer>

      <BackToTop />
    </section>
  );
}
