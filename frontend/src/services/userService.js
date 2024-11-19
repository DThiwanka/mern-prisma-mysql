import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Adjust based on your backend API URL

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Should return a list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data; // Return the created user data
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data; 
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
