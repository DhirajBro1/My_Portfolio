import React from 'react';

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
    githubLink: 'https://github.com/',
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
    tech: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates and team features.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    tech: ['React', 'Firebase', 'Redux', 'Material UI'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/'
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
    tech: ['Vue.js', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/'
  },
  {
    id: 5,
    title: 'Social Media Platform',
    description: 'A social networking platform with user profiles, posts, and real-time messaging.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 7a4 4 0 11-8 0 4 4 0 018 0zM6 17a6 6 0 1112 0v2H6v-2z" />
      </svg>
    ),
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/'
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    description: 'An advanced analytics dashboard with data visualization and real-time metrics.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    tech: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/'
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

                {/* APK Download Button */}
                {project.isAPK && (
                  <a
                    href={project.downloadLink}
                    download="AgriFarm.apk"
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
