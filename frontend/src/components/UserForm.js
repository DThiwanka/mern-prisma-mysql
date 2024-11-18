import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/userService';

const UserForm = ({ onCreate, editingUser, onUpdate, users }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(''); // Added userId state

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setUserId(editingUser.userId); // Pre-fill userId for editing
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id, { name, email, userId });
      onUpdate(); // Trigger the update function from Users.js
    } else {
      await createUser({ name, email, userId });
      onCreate(); // Trigger the create function from Users.js
    }
    setName('');
    setEmail('');
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        required
      />
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        required
      />
      
      {/* UserID Dropdown */}
      {/* <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        required
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select> */}

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', cursor: 'pointer' }}>
        {editingUser ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
