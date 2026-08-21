import React from 'react';
import Image from 'next/image';
import { secondaryButtonClassName } from './buttonStyles';

export default function AboutSection() {
  return (
    <section id="about" className="scroll-reveal py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              About
            </p>

            <div className="portrait-hover relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 sm:max-w-[320px] md:max-w-[360px] lg:mx-0 lg:max-w-[420px]">
              <Image
                src="/Dhiraj.jpeg"
                alt="Portrait of Dhiraj Pandit"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <div className="max-w-3xl pt-2">
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              A small introduction.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[var(--muted)] sm:text-xl">
              I’m D.K. Pandit, a developer from Urlabari, Nepal. I usually
              build with React, Next.js, Node.js, and MongoDB, and I tend to
              enjoy practical projects that need the interface and the backend
              to work together.
            </p>

            <p className="mt-5 text-lg leading-8 text-[var(--muted)] sm:text-xl">
              I like software that feels calm and direct. That usually means
              keeping the interface simple, making the structure easy to read,
              and focusing on the part that actually has to work.
            </p>

            <div className="mt-10 grid gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  What I build
                </p>

                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                  Web apps, mobile APKs, and small products with real backend
                  plumbing.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  What I use
                </p>

                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                  Next.js, TypeScript, React, Tailwind, Node.js, and MongoDB.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  How I work
                </p>

                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                  Focused on clarity, useful details, and interfaces that stay
                  out of the way.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="/resume.pdf" className={secondaryButtonClassName}>
                Download resume
              </a>

              <a href="#projects" className={secondaryButtonClassName}>
                View projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}