'use client';

import { useEffect, useState } from 'react';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  rating: number | null;
  createdAt: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'messages' | 'ratings'>('all');
  const [lastUpdated, setLastUpdated] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Update timestamp only on client
  useEffect(() => {
    if (isAuthenticated) {
      setLastUpdated(new Date().toLocaleTimeString());
      fetchComments();
      const interval = setInterval(() => {
        setLastUpdated(new Date().toLocaleTimeString());
        fetchComments();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setPasswordError('Invalid password');
        return;
      }

      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setPassword('');
    } catch (err) {
      setPasswordError('Authentication failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setComments([]);
    setPassword('');
  };

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
              <p className="text-gray-400">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  autoFocus
                />
              </div>

              {passwordError && (
                <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-300 text-sm">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Login
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-center text-gray-500 text-xs">🔒 Password protected area</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard

  const isContactMessage = (comment: Comment) => {
    return comment.comment.includes('Email:') && comment.comment.includes('Subject:');
  };

  const hasRating = (comment: Comment) => comment.rating !== null;

  const filteredComments = comments.filter((c) => {
    if (filter === 'messages') return isContactMessage(c);
    if (filter === 'ratings') return hasRating(c);
    return true;
  });

  const stats = {
    total: comments.length,
    messages: comments.filter(isContactMessage).length,
    ratings: comments.filter(hasRating).length,
    avgRating: comments.filter(hasRating).length > 0
      ? (comments.filter(hasRating).reduce((sum, c) => sum + (c.rating || 0), 0) / comments.filter(hasRating).length).toFixed(1)
      : 0,
  };

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logout */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage comments, messages, and ratings</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-2">Total Submissions</div>
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-2">Messages</div>
            <div className="text-3xl font-bold text-green-400">{stats.messages}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-2">Ratings</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.ratings}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-2">Avg Rating</div>
            <div className="text-3xl font-bold text-purple-400">
              {stats.avgRating} <span className="text-lg">⭐</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          {(['all', 'messages', 'ratings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-400">Loading...</div>
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
              <div className="text-gray-400">No submissions yet</div>
            </div>
          ) : (
            filteredComments.map((comment) => {
              const isMessage = isContactMessage(comment);
              const messageData = isMessage
                ? comment.comment.split('\n').slice(0, 2).join(' ')
                : comment.comment;

              return (
                <div
                  key={comment._id}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{comment.name}</h3>
                      <p className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      {isMessage && (
                        <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-xs font-semibold">
                          Message
                        </span>
                      )}
                      {comment.rating && (
                        <span className="px-3 py-1 bg-yellow-900 text-yellow-300 rounded-full text-xs font-semibold flex items-center gap-1">
                          {'⭐'.repeat(comment.rating)} {comment.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  {isMessage ? (
                    <div className="space-y-2 text-sm">
                      {comment.comment.split('\n').map((line, idx) => (
                        <div key={idx}>
                          {line.includes('Email:') ? (
                            <p className="text-blue-400">
                              <span className="font-semibold">Email:</span> {line.replace('Email: ', '')}
                            </p>
                          ) : line.includes('Subject:') ? (
                            <p className="text-purple-400">
                              <span className="font-semibold">Subject:</span> {line.replace('Subject: ', '')}
                            </p>
                          ) : line.trim() ? (
                            <p className="text-gray-300">{line}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm leading-relaxed">{comment.comment}</p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>Last updated: {lastUpdated || 'loading...'}</p>
        </div>
      </div>
    </div>
  );
}
