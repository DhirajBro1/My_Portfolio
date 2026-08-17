'use client';

import { useState } from 'react';
import { trackContactForm, trackRatingSubmit } from '@/lib/analytics';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', rating: 0 });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          comment: `Email: ${formData.email}\nSubject: ${formData.subject}\n\n${formData.message}`,
          rating: formData.rating > 0 ? formData.rating : null,
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      trackContactForm(formData.name, formData.email);
      if (formData.rating > 0) {
        trackRatingSubmit(formData.rating, formData.name);
      }

      setStatus({ type: 'success', message: "Message sent successfully. I'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '', rating: 0 });
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Contact</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            If you want to reach out, do it directly.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            I’m open to project ideas, collaboration, feedback, or just a quick note about the work here. Keep it simple and I’ll take it from there.
          </p>

          <div className="mt-10 space-y-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--foreground)]">
            <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-[var(--muted)]">Email</span>
              <a className="break-all text-left hover:text-[var(--accent)] sm:text-right" href="mailto:panditdhiraj296@gmail.com">
                panditdhiraj296@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-[var(--muted)]">Phone</span>
              <a className="hover:text-[var(--accent)] sm:text-right" href="tel:+9779705330207">
                +977 9705330207
              </a>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-[var(--muted)]">Location</span>
              <span className="sm:text-right">Urlabari, Nepal</span>
            </div>
          </div>
        </div>

        <div className="border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8 lg:p-10">
          <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Send a message</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            The form below still goes through the existing MongoDB-backed route.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2 w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="mt-2 w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] resize-none"
                placeholder="Tell me a little about what you need."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">Optional rating</label>
              <div className="mt-3 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Optional rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                    className={`border px-3 py-2 text-sm ${
                      star <= formData.rating
                        ? 'border-[var(--foreground)] text-[var(--foreground)]'
                        : 'border-[var(--border)] text-[var(--muted)]'
                    }`}
                    aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    aria-pressed={formData.rating === star}
                  >
                    {star}★
                  </button>
                ))}
                {formData.rating > 0 && (
                  <span className="text-sm text-[var(--muted)]">{formData.rating}/5 selected</span>
                )}
              </div>
            </div>

            {status && (
              <div
                className={`border px-4 py-3 text-sm ${
                  status.type === 'success'
                    ? 'border-[var(--foreground)] text-[var(--foreground)]'
                    : 'border-[var(--border)] text-[var(--muted)]'
                }`}
                aria-live="polite"
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center border border-[var(--foreground)] bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
