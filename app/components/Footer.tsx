import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/DhirajBro1',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dhiroj-kr-pandit-2539b9347',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.249-.13.597-.13.946v5.421h-3.554s.049-8.879 0-9.796h3.554v1.393c.435-.671 1.213-1.625 2.948-1.625 2.154 0 3.767 1.41 3.767 4.44v5.588zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.958-1.715 1.187 0 1.927.76 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.656h3.891v10.796zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z'
    },
    {
      name: 'Email',
      url: 'mailto:panditdhiraj296@gmail.com',
      icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
    }
  ];

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
      ]
    },
    {
      title: 'Services',
      links: [
        { href: '#', label: 'Web Development' },
        { href: '#', label: 'App Development' },
        { href: '#', label: 'Consulting' },
        { href: '#', label: 'Maintenance' },
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="animate-fadeInUp">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">DKP</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Building beautiful, functional web experiences for ambitious creators.</p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, idx) => (
            <div key={section.title} className="animate-fadeInUp" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium relative group"
                    >
                      {link.label}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Follow</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 transform group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Dhiraj Kumar Pandit. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-300 font-medium">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-300 font-medium">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
