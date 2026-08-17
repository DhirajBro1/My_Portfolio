'use client';

import React from 'react';
import { trackSkillInteraction } from '@/lib/analytics';

const skillsData = [
  {
    category: 'Frontend',
    description: 'Interfaces, layout, and the parts of the app people actually see.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    description: 'APIs, MongoDB, and the server-side pieces that keep things working.',
    skills: ['Node.js', 'MongoDB', 'APIs', 'GridFS'],
  },
  {
    category: 'Tools',
    description: 'The workflow pieces around shipping, versioning, and deployment.',
    skills: ['Git', 'GitHub', 'Vercel', 'npm'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Skills</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            Small groups, not a wall of badges.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            The work on the site already shows most of this. This section just groups the tools into the way I actually think about them.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {skillsData.map((skillGroup) => (
            <section
              key={skillGroup.category}
              className="border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                {skillGroup.category}
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {skillGroup.description}
              </p>

              <ul className="mt-6 space-y-3">
                {skillGroup.skills.map((skill) => (
                  <li key={skill}>
                    <button
                      type="button"
                      onClick={() => trackSkillInteraction(skill)}
                      className="group flex w-full items-center justify-between border-b border-[var(--border)] py-3 text-left text-sm font-medium text-[var(--foreground)]"
                    >
                      <span>{skill}</span>
                      <span className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Also familiar with</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--foreground)]">
            {['Responsive design', 'REST APIs', 'Git workflows', 'SEO basics', 'Testing', 'Deployment'].map((skill) => (
              <span key={skill} className="rounded-full border border-[var(--border)] px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
