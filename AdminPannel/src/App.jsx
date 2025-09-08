import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import ProductTable from './components/ProductTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomerRecords from './components/CustomerRecords';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import NotFound from './components/NotFound';
import Orders from './components/Orders';

function App() {
  // Remove all authentication state and logic
  const userName = "Demo User"; // Static user name for demonstration

  const handleLogout = () => {
    // Since we removed authentication, this is just for UI consistency
    alert("Logout functionality would go here");
  };

  return (
    <Router>
      <Topbar onLogout={handleLogout} userName={userName} />
      <div className='content-with-topbar'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/customers" element={<CustomerRecords />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;