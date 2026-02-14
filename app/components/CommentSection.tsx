'use client';

import { useEffect, useState } from 'react';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  rating: number | null;
  createdAt: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: '5' });
  const [error, setError] = useState<string | null>(null);

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
      setError(null);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      setError('Name and comment are required');
      return;
    }

    try {
      setFormLoading(true);
      setError(null);
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          comment: formData.comment,
          rating: formData.rating ? Number(formData.rating) : null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit comment');
      }

      // Clear form and refresh list
      setFormData({ name: '', comment: '', rating: '5' });
      await fetchComments();
    } catch (err) {
      setError(String(err));
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section className="my-12 max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Comments & Ratings</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={formLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={formLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={formLoading}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {'⭐'.repeat(n)} {n} Star{n !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

        <button
          type="submit"
          disabled={formLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {formLoading ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Comments ({comments.length})</h3>

        {loading ? (
          <p className="text-gray-600 text-center py-8">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No comments yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{c.name}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {c.rating && (
                    <span className="text-lg">{'⭐'.repeat(c.rating)}</span>
                  )}
                </div>
                <p className="text-gray-700">{c.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
