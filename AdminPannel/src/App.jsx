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

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setIsAuthenticated(true);
      setUserName(savedUserName);
    }
    setLoading(false);
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated && !loading) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Login handler to set authentication state
  const handleLogin = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserName('');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <Topbar onLogout={handleLogout} userName={userName} />}
      <div className={isAuthenticated ? 'content-with-topbar' : ''}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
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
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ProductTable />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <ProtectedRoute>
                <CustomerRecords />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;