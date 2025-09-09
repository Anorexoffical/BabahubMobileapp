import React, { useEffect, useState } from 'react';
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
import Login from './components/Login';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userData');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const handleLogin = (name) => {
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userData');
    setUserName(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      {userName && <Topbar onLogout={handleLogout} userName={userName} />}
      <div className="content-with-topbar">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
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

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
