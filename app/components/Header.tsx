'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const updateActiveSection = () => {
      const currentHash = window.location.hash.replace('#', '') || 'home';
      setActiveSection(currentHash);
    };

    updateActiveSection();
    window.addEventListener('hashchange', updateActiveSection);

    return () => window.removeEventListener('hashchange', updateActiveSection);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,white)]/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-[var(--foreground)] uppercase">
          Dhiraj Pandit
        </Link>

        <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-[var(--surface-strong)] text-[var(--foreground)]'
                    : 'text-[var(--muted)]'
                }`}
              >
                {link.label}
              </a>
            ))}
        </div>

        <a
          href="https://github.com/DhirajBro1"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex"
        >
          GitHub
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] p-2 text-[var(--foreground)] md:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-[var(--surface-strong)] text-[var(--foreground)]'
                      : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/DhirajBro1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg border border-[var(--border)] px-3 py-3 text-sm font-medium text-[var(--foreground)]"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
