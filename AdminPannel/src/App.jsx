import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './components/Topbar';
import ProductTable from './components/ProductTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomerRecords from './components/CustomerRecords';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import NotFound from './components/NotFound';
import Orders from './components/Orders';
import Login from './components/Login.jsx';
import "./Style/Login.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  // Restore login from localStorage
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setIsAuthenticated(true);
      setUserName(savedUserName);
    }
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated && !loading) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const handleLogin = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('userName');
    localStorage.removeItem('userData');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Topbar onLogout={handleLogout} userName={userName} />}
      <div className={isAuthenticated ? 'content-with-topbar' : ''}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } 
          />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><ProductTable /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><CustomerRecords /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
