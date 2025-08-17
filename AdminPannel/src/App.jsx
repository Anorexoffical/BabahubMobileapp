import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar'; // updated import
import ProductTable from './components/ProductTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomerRecords from './components/CustomerRecords';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import NotFound from './components/NotFound';
import Orders from './components/Orders';

function App() {
  return (
    <Router>
  
        {/* Main Content */}
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductTable />} />
            <Route path="/customers" element={<CustomerRecords />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
  );
}

export default App;
