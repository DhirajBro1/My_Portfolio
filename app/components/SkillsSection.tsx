'use client';

import React from 'react';
import { trackSkillInteraction } from '@/lib/analytics';

const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 92, icon: 'react' },
      { name: 'Next.js', level: 90, icon: 'nextdotjs' },
      { name: 'TypeScript', level: 85, icon: 'typescript' },
      { name: 'Tailwind CSS', level: 94, icon: 'tailwindcss' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 88, icon: 'nodedotjs' },
      { name: 'Express.js', level: 85, icon: 'express' },
      { name: 'MongoDB', level: 88, icon: 'mongodb' },
      { name: 'PostgreSQL', level: 80, icon: 'postgresql' },
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      { name: 'Git & GitHub', level: 90, icon: 'github' },
      { name: 'Docker', level: 75, icon: 'docker' },
      { name: 'Firebase', level: 70, icon: 'firebase' },
      { name: 'REST APIs', level: 92, icon: 'fastapi' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((skillGroup, groupIdx) => (
            <div
              key={skillGroup.category}
              className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 hover:-translate-y-1 transform animate-fadeInUp"
              style={{ animationDelay: `${groupIdx * 100}ms` }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b-2 border-gradient-to-r from-blue-600 to-purple-600">
                {skillGroup.category}
              </h3>

              <div className="space-y-6">
                {skillGroup.skills.map((skill, skillIdx) => (
                  <div
                    key={skill.name}
                    className="animate-fadeInUp p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600 transition-colors duration-300 cursor-pointer"
                    style={{ animationDelay: `${groupIdx * 100 + skillIdx * 50}ms` }}
                    onClick={() => trackSkillInteraction(skill.name)}
                  >
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <img
                          src={`https://cdn.simpleicons.org/${skill.icon}`}
                          alt={skill.name}
                          className="w-5 h-5"
                          title={skill.name}
                        />
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center animate-fadeInUp">Other Competencies</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Agile', 'Scrum', 'UI/UX Design', 'Web Performance', 'SEO', 'Testing', 'CI/CD', 'Responsive Design'].map((skill, idx) => (
              <span
                key={skill}
                className="px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold text-sm border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm hover:scale-110 transition-transform duration-300 animate-fadeInUp"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
