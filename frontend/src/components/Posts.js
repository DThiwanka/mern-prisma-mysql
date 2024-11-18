import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { getAllPosts, createPost, updatePost, deletePost } from '../services/postService';
import { getAllUsers } from '../services/userService'; // Fetch users to get userId
import PostForm from './PostForm';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts(search);
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers(); // Fetch users once on component mount
  }, [search]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Posts Management</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={handleSearch}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        />
        <FaSearch style={{ alignSelf: 'center' }} />
      </div>

      <PostForm onCreate={fetchPosts} editingPost={editingPost} onUpdate={fetchPosts} users={users} />

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: '#f9f9f9',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <span>User ID: {post.userId}</span>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => handleEdit(post)} style={{ backgroundColor: '#3498db', color: '#fff', padding: '5px 10px' }}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(post.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', padding: '5px 10px' }}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
