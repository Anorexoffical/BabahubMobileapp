import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTachometerAlt, 
  FaBoxes, 
  FaShoppingBag, 
  FaChartLine, 
  FaUsers,
  FaBars,
  FaTimes,
  FaChevronDown
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import '../Style/Topbar.css';

const Topbar = ({ onItemClick }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="topbar">
      {/* Left Logo/Title */}
      <div className="topbar-left">
        <div className="logo-container">
          <div className="logo-shape"></div>
          <h4 className="topbar-title">My<span>App</span></h4>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Center Menu */}
      <div className={`topbar-menu ${menuOpen ? 'show' : ''}`}>
        <Link 
          to="/dashboard" 
          className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`} 
          onClick={() => { onItemClick && onItemClick(); closeMenu(); }}
        >
          <FaTachometerAlt className="menu-icon" />
          <span>Dashboard</span>
          <div className="active-indicator"></div>
        </Link>
        <Link 
          to="/products" 
          className={`menu-item ${location.pathname === '/products' ? 'active' : ''}`} 
          onClick={() => { onItemClick && onItemClick(); closeMenu(); }}
        >
          <FaBoxes className="menu-icon" />
          <span>Products</span>
          <div className="active-indicator"></div>
        </Link>
        <Link 
          to="/orders" 
          className={`menu-item ${location.pathname === '/orders' ? 'active' : ''}`} 
          onClick={() => { onItemClick && onItemClick(); closeMenu(); }}
        >
          <FaShoppingBag className="menu-icon" />
          <span>Orders</span>
          <span className="badge">5</span>
          <div className="active-indicator"></div>
        </Link>
        <Link 
          to="/customers" 
          className={`menu-item ${location.pathname === '/customers' ? 'active' : ''}`} 
          onClick={() => { onItemClick && onItemClick(); closeMenu(); }}
        >
          <FaUsers className="menu-icon" />
          <span>Customers</span>
          <div className="active-indicator"></div>
        </Link>
        <Link 
          to="/reports" 
          className={`menu-item ${location.pathname === '/reports' ? 'active' : ''}`} 
          onClick={() => { onItemClick && onItemClick(); closeMenu(); }}
        >
          <FaChartLine className="menu-icon" />
          <span>Reports</span>
          <div className="active-indicator"></div>
        </Link>
      </div>

      {/* Right Side Controls */}
      <div className="topbar-right">
        {/* User Profile Dropdown */}
        <div className="dropdown-container" ref={dropdownRef}>
          <div className="user-profile" onClick={toggleDropdown}>
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="User" 
              className="user-avatar" 
            />
            <div className="user-info">
              <div className="user-name">Sarah Johnson</div>
              <small className="user-role">Admin</small>
            </div>
            <FaChevronDown className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
          </div>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;