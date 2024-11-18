import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts'; // Adjust based on your backend API URL

// Fetch all posts with search
export const getAllPosts = async (search = '') => {
  try {
    const response = await axios.get(`${API_URL}?search=${search}`);
    return response.data; // Should return { posts: [] }
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Create a new post
export const createPost = async (post) => {
  try {
    const response = await axios.post(API_URL, post);
    return response.data; // Return the created post data
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Update an existing post
export const updatePost = async (id, post) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, post);
    return response.data; // Return updated post data
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
