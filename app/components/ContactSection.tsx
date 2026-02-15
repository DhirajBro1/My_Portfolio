'use client';

import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  rating: number | null;
  createdAt: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', rating: 0 });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data.slice(0, 3));
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          comment: `Email: ${formData.email}\nSubject: ${formData.subject}\n\n${formData.message}`,
          rating: formData.rating > 0 ? formData.rating : null,
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '', rating: 0 });
      await fetchComments();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-6">
            Have a project in mind or want to discuss opportunities? Let's connect!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 hover:-translate-y-1 transform animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl mb-4">
              <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Email</h3>
            <a href="mailto:panditdhiraj296@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              panditdhiraj296@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 hover:-translate-y-1 transform animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl mb-4">
              <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Phone</h3>
            <a href="tel:+977 9705330207" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              +977 9705330207
            </a>
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 hover:-translate-y-1 transform animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl mb-4">
              <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Location</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Urlabari, Nepal</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send me a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-fadeInUp" style={{ animationDelay: '350ms' }}>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                  placeholder="Your name"
                />
              </div>
              <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: '450ms' }}>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                placeholder="What is this about?"
              />
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: '475ms' }}>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Rate My Portfolio (Optional)</label>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className={`text-3xl transition-all duration-200 transform hover:scale-125 ${
                        star <= formData.rating
                          ? 'text-yellow-400 drop-shadow-lg'
                          : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
                      }`}
                      title={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {formData.rating > 0 && (
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400 resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            {status && (
              <div className={`p-4 rounded-lg text-sm font-semibold animate-fadeInUp ${
                status.type === 'success'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-800/50'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800/50'
              }`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 disabled:bg-gray-400 disabled:shadow-none transition-all duration-300 font-semibold text-lg hover:-translate-y-1 transform active:translate-y-0"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
