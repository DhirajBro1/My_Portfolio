import React from 'react';
import { trackAPKDownload, trackProjectView } from '@/lib/analytics';

const projects = [
  {
    id: 1,
    title: 'AgriFarm App',
    description: 'A mobile application for smart agriculture with real-time monitoring, weather integration, and crop management features.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2c0 0 3 2 3 7s-1 4-3 9-3 4-3 4-3-1-3-4 1-4 3-9 3-2 3-7z M9 9c0 1.657.895 3 2 3s2-1.343 2-3" />
      </svg>
    ),
    tech: ['React Expo',  'Plant org', 'Android'],
    downloadLink: '/api/apk',
    isAPK: true,
    githubLink: 'https://github.com/DhirajBro1/AgriFarm',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, and payment integration.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
      </svg>
    ),
    tech: ['HTML', 'CSS', 'JS', 'PHP','MySQL'],
    liveLink: 'https://gopalringcenter.wuaze.com',
    githubLink: 'https://github.com/DhirajBro1/ecommerce'
  },

  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A beautiful weather app with real-time data, forecasts, and location-based features.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    tech: ['HTML', 'OpenWeather API', 'CSS', 'JS'],
    liveLink: 'https://dhirajbro1.github.io/Weather_program/',
    githubLink: 'https://github.com/DhirajBro1/Weather_program'
  },

  {
    id: 6,
    title: 'Climate Change Impact Analysis – Nepal',
    description: 'Collected and integrated multi-source environmental datasets including river discharge, flood data, land cover, and climate data. Built predictive models to analyze environmental impact patterns with comprehensive EDA.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    tech: ['Pandas', 'NumPy', 'Matplotlib', 'Linear Regression', 'Data Cleaning', 'EDA'],
    liveLink: 'https://dhiraj.streamlit.app',
    githubLink: 'https://github.com/Omdena-NIC-Nepal/capstone-project-DhirajBro1'
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">Explore my latest works showcasing full-stack development, mobile apps, and innovative solutions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 hover:-translate-y-2 transform animate-fadeInUp"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                {project.icon}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-default"
                      style={{ transitionDelay: `${techIdx * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Live Link and GitHub Link Buttons */}
                <div className="flex gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 hover:-translate-y-1 transform"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 text-white rounded-lg hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 hover:-translate-y-1 transform"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3   .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>

                {/* APK Download Button */}
                {project.isAPK && (
                  <a
                    href={project.downloadLink}
                    download="AgriFarm.apk"
                    onClick={() => trackAPKDownload(project.title)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 hover:-translate-y-1 transform"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    Download APK
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fadeInUp">
          
        </div>
      </div>
    </section>
  );
}
