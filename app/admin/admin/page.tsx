'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

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
  const [tab, setTab] = useState<'submissions' | 'analytics'>('submissions');
  const [lastUpdated, setLastUpdated] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

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

  const deleteComment = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/comments?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setComments(comments.filter(c => c._id !== id));
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete comment');
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Error deleting comment');
    } finally {
      setDeleting(null);
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

  // Calculate analytics
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const submissionsToday = comments.filter(c => new Date(c.createdAt) >= today).length;
  
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const submissionsThisWeek = comments.filter(c => new Date(c.createdAt) >= weekAgo).length;
  
  const messagesPercentage = stats.total > 0 ? Math.round((stats.messages / stats.total) * 100) : 0;
  const ratingsPercentage = stats.total > 0 ? Math.round((stats.ratings / stats.total) * 100) : 0;

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

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          {(['submissions', 'analytics'] as const).map((tabName) => (
            <button
              key={tabName}
              onClick={() => setTab(tabName)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                tab === tabName
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tabName === 'submissions' ? 'Submissions' : 'Analytics'}
            </button>
          ))}
        </div>

        {/* Submissions Tab */}
        {tab === 'submissions' && (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8">
              {(['all', 'messages', 'ratings'] as const).map((filterName) => (
                <button
                  key={filterName}
                  onClick={() => setFilter(filterName)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    filter === filterName
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
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

                  return (
                    <div
                      key={comment._id}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
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
                          <button
                            onClick={() => setDeleteConfirm(comment._id)}
                            className="px-3 py-1 bg-red-900 text-red-300 rounded-full text-xs font-semibold hover:bg-red-800 transition-colors flex items-center gap-1"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
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

                      {/* Delete Confirmation Modal */}
                      {deleteConfirm === comment._id && (
                        <div className="mt-4 p-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg">
                          <p className="text-red-300 mb-3">Are you sure you want to delete this submission?</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => deleteComment(comment._id)}
                              disabled={deleting === comment._id}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                            >
                              {deleting === comment._id ? 'Deleting...' : 'Delete'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {tab === 'analytics' && (
          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Submissions Timeline</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm">Today</span>
                      <span className="text-blue-400 font-semibold">{submissionsToday}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((submissionsToday / 10) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm">This Week</span>
                      <span className="text-green-400 font-semibold">{submissionsThisWeek}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((submissionsThisWeek / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Submission Types</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm">Messages</span>
                      <span className="text-green-400 font-semibold">{messagesPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${messagesPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm">Ratings</span>
                      <span className="text-yellow-400 font-semibold">{ratingsPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all"
                        style={{ width: `${ratingsPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Average Rating</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.avgRating} ⭐</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Submissions</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.total}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Engagement Rate</p>
                  <p className="text-2xl font-bold text-green-400">
                    {stats.total > 0 ? ((stats.messages + stats.ratings) / stats.total * 100).toFixed(0) : 0}%
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-6">
              <p className="text-blue-300 text-sm">
                <span className="font-semibold">💡 Note:</span> These analytics are calculated from form submissions on your portfolio. 
                For detailed visitor analytics and page views, integrate with Vercel Analytics or Google Analytics.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>Last updated: {lastUpdated || 'loading...'}</p>
        </div>
      </div>
    </div>
  );
}
