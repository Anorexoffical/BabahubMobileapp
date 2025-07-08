import React from 'react';
import { 
  FaTachometerAlt, 
  FaBoxes, 
  FaShoppingBag, 
  FaCog, 
  FaChartLine, 
  FaUsers, 
  FaFileInvoice 
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import '../Style/Sidebar.css'; // Assuming you have a CSS file for styling

const Sidebar = ({ onItemClick }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h4 className="sidebar-title">My App</h4>
      </div>
      
      <div className="sidebar-menu">
        <Link 
          to="/dashboard" 
          className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`} 
          onClick={onItemClick}
        >
          <FaTachometerAlt className="menu-icon" />
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/products" 
          className={`menu-item ${location.pathname === '/products' ? 'active' : ''}`} 
          onClick={onItemClick}
        >
          <FaBoxes className="menu-icon" />
          <span>Products</span>
        </Link>
        <Link 
          to="/orders" 
          className={`menu-item ${location.pathname === '/orders' ? 'active' : ''}`} 
          onClick={onItemClick}
        >
          <FaShoppingBag className="menu-icon" />
          <span>Orders</span>
          <span className="badge">5</span>
        </Link>
       
        <Link 
          to="/customers" 
          className={`menu-item ${location.pathname === '/customers' ? 'active' : ''}`} 
          onClick={onItemClick}
        >
          <FaUsers className="menu-icon" />
          <span>Customers</span>
        </Link>
        <Link 
          to="/Reports" 
          className={`menu-item ${location.pathname === '/Reports' ? 'active' : ''}`} 
          onClick={onItemClick}
        >
          <FaChartLine className="menu-icon" />
          <span>Reports </span>
        </Link>
      
      </div>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="User" 
            className="user-avatar" 
          />
          <div className="user-info">
            <div className="user-name">Sarah Johnson</div>
            <small className="user-role">Admin</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;