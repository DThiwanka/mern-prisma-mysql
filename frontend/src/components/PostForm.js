import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../services/postService';

const PostForm = ({ onCreate, editingPost, onUpdate, users }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(''); // Added userId state

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
      setUserId(editingPost.userId); // Pre-fill userId for editing
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPost) {
      await updatePost(editingPost.id, { title, content, userId });
      onUpdate(); // Trigger the update function from Posts.js
    } else {
      await createPost({ title, content, userId });
      onCreate(); // Trigger the create function from Posts.js
    }
    setTitle('');
    setContent('');
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>


      {/* UserID Dropdown */}
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        required
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        required
      />
      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ padding: '10px', width: '100%', height: '150px' }}
        required
      />



      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', cursor: 'pointer' }}>
        {editingPost ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;
