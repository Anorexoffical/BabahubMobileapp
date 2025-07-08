import React from 'react';
import { 
  FiHome, 
  FiShoppingBag, 
  FiUsers, 
  FiPackage, 
  FiBarChart2,
  FiDollarSign,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../Style/Dashboard.css';

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
      {/* Main Content */}
      <div className="main-content">
        

        {/* Dashboard Content */}
        {location.pathname === '/dashboard' ? (
          <div className="dashboard-content">
            <h1 className="page-title">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon sales">
                  <FiDollarSign />
                </div>
                <div className="stat-info">
                  <h3>Total Sales</h3>
                  <p>${stats.totalSales.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon orders">
                  <FiShoppingBag />
                </div>
                <div className="stat-info">
                  <h3>Total Orders</h3>
                  <p>{stats.totalOrders}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon customers">
                  <FiUsers />
                </div>
                <div className="stat-info">
                  <h3>New Customers</h3>
                  <p>{stats.newCustomers}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon products">
                  <FiPackage />
                </div>
                <div className="stat-info">
                  <h3>Top Product</h3>
                  <p>{stats.topProduct}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <Link to="/orders" className="view-all">View All</Link>
              </div>
              
              <div className="activity-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ORD-1042</td>
                      <td>John Doe</td>
                      <td>2023-07-28</td>
                      <td>$125.50</td>
                      <td><span className="badge completed">Completed</span></td>
                    </tr>
                    <tr>
                      <td>ORD-1041</td>
                      <td>Jane Smith</td>
                      <td>2023-07-27</td>
                      <td>$89.99</td>
                      <td><span className="badge shipped">Shipped</span></td>
                    </tr>
                    <tr>
                      <td>ORD-1040</td>
                      <td>Robert Johnson</td>
                      <td>2023-07-26</td>
                      <td>$210.75</td>
                      <td><span className="badge processing">Processing</span></td>
                    </tr>
                    <tr>
                      <td>ORD-1039</td>
                      <td>Emily Davis</td>
                      <td>2023-07-25</td>
                      <td>$45.99</td>
                      <td><span className="badge pending">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <Link to="/dashboard/orders/new" className="action-btn">
                  <FiShoppingBag />
                  <span>Create New Order</span>
                </Link>
                <Link to="/dashboard/products/new" className="action-btn">
                  <FiPackage />
                  <span>Add New Product</span>
                </Link>
                <Link to="/dashboard/customers/new" className="action-btn">
                  <FiUsers />
                  <span>Add New Customer</span>
                </Link>
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