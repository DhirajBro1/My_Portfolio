import React from 'react';
import { secondaryButtonClassName } from './buttonStyles';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid max-w-6xl items-start px-4 py-12 sm:px-6 lg:min-h-[calc(100vh-4rem)] lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Urlabari, Nepal · Portfolio
          </p>

          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight leading-[0.95] text-[var(--foreground)] sm:text-5xl lg:text-7xl">
            Dhiraj Pandit
            <span className="mt-3 block text-[var(--muted)]">I build things for the web.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            I build across Next.js, TypeScript, React, and MongoDB. This site keeps the work I’m actually making in one place: a few web apps, some mobile builds, and the backend pieces that hold them together.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className={secondaryButtonClassName}
            >
              See projects
            </a>
            <a
              href="#contact"
              className={secondaryButtonClassName}
            >
              Contact me
            </a>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Recent work includes AgriFarm, Ledger MS, an ecommerce build, a weather dashboard, and a climate analysis project.
          </p>
        </div>
      </div>
    </section>
  );
}
