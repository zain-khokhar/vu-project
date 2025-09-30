'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { MessageCircle, Send, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { createComment } from '@/actions/comments';
import { formatDistanceToNow } from 'date-fns';

function CommentItem({ comment }) {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-start space-x-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <User className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-gray-900">{comment.name}</span>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap break-words">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({ documentId, initialComments, initialPagination }) {
  const [isPending, startTransition] = useTransition();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [message, setMessage] = useState({ type: '', content: '' });
  
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments || [],
    (state, newComment) => [newComment, ...state]
  );
  
  const [pagination, setPagination] = useState(initialPagination);
  const [allComments, setAllComments] = useState(initialComments || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.content.trim()) {
      setMessage({ type: 'error', content: 'Please fill in all fields' });
      return;
    }

    const tempComment = {
      _id: `temp-${Date.now()}`,
      name: formData.name.trim(),
      content: formData.content.trim(),
      createdAt: new Date().toISOString(),
      documentId
    };

    setMessage({ type: '', content: '' });

    startTransition(async () => {
      // Optimistically add the comment inside the transition
      addOptimisticComment(tempComment);
      try {
        const result = await createComment(documentId, formData.name, formData.content);
        
        if (result.success) {
          // Update the actual comments list
          setAllComments(prev => [result.comment, ...prev]);
          setPagination(prev => ({
            ...prev,
            totalCount: prev.totalCount + 1
          }));
          
          // Clear form
          setFormData({ name: '', content: '' });
          setMessage({ type: 'success', content: 'Comment posted successfully!' });
          
          // Clear success message after 3 seconds
          setTimeout(() => setMessage({ type: '', content: '' }), 3000);
        } else {
          setMessage({ type: 'error', content: result.error || 'Failed to post comment' });
        }
      } catch (error) {
        setMessage({ type: 'error', content: 'An unexpected error occurred' });
      }
    });
  };

  const loadMoreComments = async () => {
    if (isLoadingMore || !pagination.hasMore) return;
    
    setIsLoadingMore(true);
    
    try {
      const response = await fetch(`/api/comments?documentId=${documentId}&page=${pagination.currentPage + 1}`);
      const result = await response.json();
      
      if (result.success) {
        setAllComments(prev => [...prev, ...result.comments]);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error('Error loading more comments:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const displayedComments = optimisticComments.length > 0 ? optimisticComments : allComments;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Comments ({pagination?.totalCount || 0})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        {message.content && (
          <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{message.content}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            disabled={isPending}
            className="col-span-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            maxLength={100}
            required
          />
          <textarea
            placeholder="Write your comment..."
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            disabled={isPending}
            className="col-span-1 sm:col-span-2 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 resize-none"
            rows={3}
            maxLength={2000}
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {formData.content.length}/2000 characters
          </div>
          <button
            type="submit"
            disabled={isPending || !formData.name.trim() || !formData.content.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>{isPending ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      {displayedComments.length > 0 ? (
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}

          {/* Load More Button */}
          {pagination?.hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={loadMoreComments}
                disabled={isLoadingMore}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingMore ? 'Loading...' : 'Load More Comments'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h4>
          <p className="text-gray-600">Be the first to share your thoughts about this document!</p>
        </div>
      )}
    </div>
  );
}