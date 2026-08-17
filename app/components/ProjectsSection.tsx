'use client';

import React from 'react';
import Image from 'next/image';
import { trackAPKDownload, trackProjectView } from '@/lib/analytics';
import { secondaryButtonClassName } from './buttonStyles';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | null;
  imageAlt: string;
  tech: string[];
  liveLink?: string;
  githubLink: string;
  downloadLink?: string;
  isAPK?: boolean;
  apkFilename?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'AgriFarm App',
    category: 'Mobile app',
    description: 'A mobile application for smart agriculture with real-time monitoring, weather integration, and crop management features.',
    image: null,
    imageAlt: 'AgriFarm app preview',
    tech: ['React Expo', 'Android'],
    downloadLink: '/api/apk?file=AgriFarm.apk',
    isAPK: true,
    apkFilename: 'AgriFarm.apk',
    githubLink: 'https://github.com/DhirajBro1/AgriFarm',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Web app',
    description: 'A full-featured e-commerce platform with product management, shopping cart, and payment integration.',
    image: null,
    imageAlt: 'E-commerce website preview',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    liveLink: 'https://gopalringcenter.com.np',
    githubLink: 'https://github.com/DhirajBro1/ecommerce',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    category: 'Web app',
    description: 'A beautiful weather app with real-time data, forecasts, and location-based features.',
    image: null,
    imageAlt: 'Typography-based preview for weather dashboard',
    tech: ['HTML', 'OpenWeather API', 'CSS', 'JS'],
    liveLink: 'https://dhirajbro1.github.io/Weather_program/',
    githubLink: 'https://github.com/DhirajBro1/Weather_program',
  },
  {
    id: 6,
    title: 'Climate Change Impact Analysis – Nepal',
    category: 'Data project',
    description: 'Collected and integrated multi-source environmental datasets including river discharge, flood data, land cover, and climate data. Built predictive models to analyze environmental impact patterns with comprehensive EDA.',
    image: null,
    imageAlt: 'Typography-based preview for climate analysis project',
    tech: ['Pandas', 'NumPy', 'Matplotlib', 'Linear Regression', 'Data Cleaning', 'EDA'],
    liveLink: 'https://dhiraj.streamlit.app',
    githubLink: 'https://github.com/Omdena-NIC-Nepal/capstone-project-DhirajBro1',
  },
  {
    id: 7,
    title: 'Ledger MS',
    category: 'Mobile app',
    description: 'A digital ledger for bussinesses to maintain their accountability without any disturbance.',
    image: null,
    imageAlt: 'Ledger MS app preview',
    tech: ['React Expo', 'MongoDB', 'JWT', 'bcrypt hashing', 'Android'],
    downloadLink: '/api/apk?file=Ledger_MS.apk',
    isAPK: true,
    apkFilename: 'Ledger_MS.apk',
    githubLink: 'https://github.com/DhirajBro1/Ledger-MS',
  },
] ;

const featuredProjects = projects.filter((project) => Boolean(project.image));
const supportingProjects = projects.filter((project) => !project.image);

function ProjectMedia({ project, index }: { project: Project; index: number }) {
  if (!project.image) {
    return null;
  }

  return (
    <div className={`relative aspect-[4/3] overflow-hidden border border-[var(--border)] bg-[var(--surface)] lg:aspect-[5/4] ${index % 2 === 1 ? 'lg:ml-auto' : ''}`}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover object-center"
      />
    </div>
  );
}

export default function ProjectsSection() {
  const actionButtonClassName =
    `${secondaryButtonClassName} w-full sm:w-auto`;

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Projects</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Selected work, shown with more room.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            The image-backed projects get the most space. The projects without screenshots are presented as compact notes instead of empty frames.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {featuredProjects.map((project, index) => {
            const reversed = index % 2 === 1;

            return (
              <article
                key={project.id}
                className={`grid gap-8 border-t border-[var(--border)] pt-8 lg:items-start lg:gap-12 ${
                  reversed ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-[1.05fr_0.95fr]'
                }`}
              >
                <div className={reversed ? 'lg:order-2' : ''}>
                  <ProjectMedia project={project} index={index} />
                </div>

                <div className={reversed ? 'lg:order-1 lg:pt-2' : 'lg:pt-2'}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    {project.category} · 0{index + 1}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-base leading-8 text-[var(--muted)] sm:text-lg">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                    {project.tech.map((tech) => (
                      <span key={tech} className="border border-[var(--border)] px-3 py-1 text-[var(--foreground)]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4 text-sm font-medium sm:text-base">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionButtonClassName}
                        onClick={() => trackProjectView(project.title)}
                      >
                        Live demo
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionButtonClassName}
                        onClick={() => trackProjectView(project.title)}
                      >
                        GitHub
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.isAPK && (
                      <a
                        href={project.downloadLink}
                        download={project.apkFilename}
                        onClick={() => trackAPKDownload(project.title)}
                        className={actionButtonClassName}
                      >
                        Download APK
                        <span aria-hidden="true">↘</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Other work</p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
              The remaining projects don’t have screenshots, so they’re presented as notes rather than empty frames.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {supportingProjects.map((project, index) => (
              <article key={project.id} className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="border border-[var(--border)] px-2 py-1 text-[var(--foreground)]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4 text-sm font-medium">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionButtonClassName}
                      onClick={() => trackProjectView(project.title)}
                    >
                      Live demo
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionButtonClassName}
                      onClick={() => trackProjectView(project.title)}
                    >
                      GitHub
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.isAPK && project.downloadLink && (
                    <a
                      href={project.downloadLink}
                      download={project.apkFilename}
                      onClick={() => trackAPKDownload(project.title)}
                      className={actionButtonClassName}
                    >
                      Download APK
                      <span aria-hidden="true">↘</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}