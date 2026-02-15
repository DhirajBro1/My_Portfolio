import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="flex justify-center animate-fadeInLeft" style={{ animationDelay: '100ms' }}>
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-blue-600 hover:shadow-blue-600/50 transition-all duration-500 hover:-translate-y-1 transform group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src="/Dhiraj.jpeg"
                alt="Dhiraj"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6 animate-fadeInRight" style={{ animationDelay: '200ms' }}>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm D.K Pandit, a 17 year old passionate full-stack vibe coder with a deep love for creating beautiful, functional web applications. With expertise in modern technologies like React, Next.js, and Node.js, I transform ideas into reality.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you're a startup looking to bring your vision to life or an established company needing to scale, I'm here to help you build web solutions that matter.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '5+', label: 'Projects Completed' },
                { number: '2+', label: 'Years Experience' },
                { number: '100%', label: 'Client Satisfaction' },
                { number: '2+', label: 'Happy Clients' }
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1 transform animate-fadeInUp"
                  style={{ animationDelay: `${300 + idx * 50}ms` }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">{stat.number}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold hover:-translate-y-1 transform"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
