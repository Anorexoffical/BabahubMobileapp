import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';
import { FiMenu, FiX } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomerRecords from './components/CustomerRecords';
import Dashboard from './components/Dashboard';
// import Invoices from './components/Invoices';
import Reports from './components/Reports';
import NotFound from './components/NotFound';
import Orders from './components/Orders';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Mobile Header */}
        {isMobile && (
          <div className="mobile-header">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="mobile-title">My App</h1>
          </div>
        )}

        {/* Sidebar */}
        <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar onItemClick={() => isMobile && setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen && isMobile ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductTable />} />
            <Route path="/customers" element={<CustomerRecords />} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="Reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;