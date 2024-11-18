import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './components/Users';
import Posts from './components/Posts';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <Link to="/users" style={styles.navLink}>Users</Link>
          <Link to="/posts" style={styles.navLink}>Posts</Link>
        </nav>
        <div style={styles.content}>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  nav: {
    backgroundColor: '#3498db',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '800px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    padding: '12px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    fontWeight: '500',
  },
  navLinkHover: {
    backgroundColor: '#2980b9',
    transform: 'scale(1.05)',
  },
  content: {
    maxWidth: '1200px',
    width: '100%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    minHeight: '80vh',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  },
};

export default App;
