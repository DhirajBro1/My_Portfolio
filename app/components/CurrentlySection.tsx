export default function CurrentlySection() {
  const items = [
    'Building and refining this portfolio in Next.js, React, TypeScript, and Tailwind CSS.',
    'Keeping the MongoDB-backed contact flow, APK delivery, and admin routes working.',
    'Looking for cleaner ways to present projects, screenshots, and personal notes.',
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl border-t border-[var(--border)] pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Currently</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            What I’m focused on now.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            A small snapshot of the work and stack already present in this repository.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((item, index) => (
            <div key={item} className="border-l border-[var(--border)] pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {['Building', 'Learning', 'Curious about'][index]}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}