import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';
import UserForm from './UserForm';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);

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

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Users Management</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name..."
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

      <UserForm onCreate={fetchUsers} editingUser={editingUser} onUpdate={fetchUsers} users={users} />

      {users && users.length > 0 ? (
        users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: '#f9f9f9',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => handleEdit(user)} style={{ backgroundColor: '#3498db', color: '#fff', padding: '5px 10px' }}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(user.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', padding: '5px 10px' }}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default Users;
