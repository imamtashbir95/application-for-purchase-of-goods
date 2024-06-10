import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Officer from './pages/Officer';
import Finance from './pages/Finance';
import Manager from './pages/Manager';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch the user role if the token exists
      axios.get('http://localhost:8000/api/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        localStorage.setItem('role', response.data.role);
      }).catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        setRole('');
      });
      setRole(localStorage.getItem('role'));
    }
  }, []);

  return (
      <Router>
          <Routes>
              <Route 
                  path="/" 
                  element={role ? <Navigate to={`/${role}`} /> : <Login setRole={setRole} />}
              />
              {/* <Route path="/" element={<Login />} /> */}
              <Route path="/officer" element={<ProtectedRoute role={role} children={<Officer />} />} />
              <Route path="/manager" element={<ProtectedRoute role={role} children={<Manager />} />} />
              <Route path="/finance" element={<ProtectedRoute role={role} children={<Finance />} />} />
          </Routes>
      </Router>
  );
};

export default App;