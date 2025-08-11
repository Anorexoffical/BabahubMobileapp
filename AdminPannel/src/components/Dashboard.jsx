import React from 'react';
import { 
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage
} from 'react-icons/fi';
import { Outlet, useLocation } from 'react-router-dom';
import '../Style/Dashboard.css';
import Topbar from './Topbar';

const Dashboard = () => {
  const location = useLocation();

  // Sample data for dashboard cards
  const stats = {
    totalSales: 12453.89,
    totalOrders: 342,
    newCustomers: 28,
    topProduct: 'Wireless Headphones'
  };

  return (
    <>
      <Topbar />
      <div className="dashboard-main">
        {location.pathname === '/dashboard' ? (
          <div className="dashboard-header beautiful-dashboard-header">
            <div className="container-fluid">
              <div className="row align-items-center mb-3 mb-md-0">
                <div className="col-12 text-center mb-4">
                  <h1 className="fw-bold mb-1 gradient-text">Dashboard Overview</h1>
                  <p className="text-muted mb-0 fs-5">Your business summary at a glance</p>
                </div>
              </div>
              <div className="row g-4 mt-2 justify-content-center">
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card stat-card-glass">
                    <div className="stat-icon stat-icon-sales">
                      <FiDollarSign size={32} />
                    </div>
                    <div>
                      <div className="stat-value">${stats.totalSales.toLocaleString()}</div>
                      <div className="stat-label">Total Sales</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card stat-card-glass">
                    <div className="stat-icon stat-icon-orders">
                      <FiShoppingBag size={32} />
                    </div>
                    <div>
                      <div className="stat-value">{stats.totalOrders}</div>
                      <div className="stat-label">Total Orders</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card stat-card-glass">
                    <div className="stat-icon stat-icon-customers">
                      <FiUsers size={32} />
                    </div>
                    <div>
                      <div className="stat-value">{stats.newCustomers}</div>
                      <div className="stat-label">New Customers</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card stat-card-glass">
                    <div className="stat-icon stat-icon-product">
                      <FiPackage size={32} />
                    </div>
                    <div>
                      <div className="stat-value">{stats.topProduct}</div>
                      <div className="stat-label">Top Product</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default Dashboard;