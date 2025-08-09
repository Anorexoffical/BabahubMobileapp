import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal
} from 'react-icons/fi';
import Topbar from './Topbar';
import '../Style/CustomerRecords.css';

const CustomerRecords = () => {
const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 8;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockCustomers = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            orders: 5,
            status: 'active',
            joinDate: '2023-01-15',
            address: '123 Main St, New York, NY 10001'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1 (555) 987-6543',
            orders: 12,
            status: 'active',
            joinDate: '2022-11-05',
            address: '456 Oak Ave, Los Angeles, CA 90001'
          },
          {
            id: 10,
            name: 'Lisa Jackson',
            email: 'lisa@example.com',
            phone: '+1 (555) 753-1598',
            orders: 6,
            status: 'inactive',
            joinDate: '2023-04-05',
            address: '753 Aspen Ave, San Jose, CA 95101'
          }
        ];
        
        setCustomers(mockCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter and pagination logic
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(c => c.id !== customerId));
    setSuccessMessage('Customer deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  return (
    <>
      <Topbar />
      <div className="customer-dashboard">
        {successMessage && (
          <div className="alert success">
            {successMessage}
            <button onClick={() => setSuccessMessage('')}>&times;</button>
          </div>
        )}

        <div className="dashboard-header">
          <div className="container-fluid">
            <div className="row align-items-center mb-3 mb-md-0">
              <div className="col-md-6 mb-3 mb-md-0">
                <h1 className="fw-bold mb-1">Customer Management</h1>
                <p className="text-muted mb-0">Manage your customer records and information</p>
              </div>
              <div className="col-md-6 d-flex flex-column flex-md-row gap-3">
                <div className="search-container flex-grow-1">
                  <FiSearch className="search-icon" />
                  <input
                    className="search-input"
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search customers..."
                  />
                </div>
              </div>
            </div>
            <div className="row g-3 mt-2">
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">{customers.length}</div>
                  <div className="stat-label">Total Customers</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">
                    {customers.filter(c => c.status === 'active').length}
                  </div>
                  <div className="stat-label">Active</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">
                    {customers.filter(c => c.status === 'inactive').length}
                  </div>
                  <div className="stat-label">Inactive</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">
                    {customers.reduce((sum, c) => sum + c.orders, 0)}
                  </div>
                  <div className="stat-label">Total Orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-4">
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="customer-table mb-0">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Contact Information</th>
                      <th>Status</th>
                      <th>Member Since</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.length > 0 ? (
                      currentCustomers.map(customer => (
                        <tr key={customer.id}>
                          <td>
                            <div className="customer-info">
                              <div className="avatar">
                                <FiUser size={24} />
                              </div>
                              <div>
                                <strong>{customer.name}</strong>
                                <div className="customer-id">ID: {customer.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <div className="contact-item">
                                <FiMail className="icon" />
                                <span>{customer.email}</span>
                              </div>
                              <div className="contact-item">
                                <FiPhone className="icon" />
                                <span>{customer.phone}</span>
                              </div>
                              <div className="contact-item">
                                <FiMapPin className="icon" />
                                <span className="address">{customer.address}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${customer.status}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-details"
                                onClick={() => handleViewDetails(customer)}
                              >
                                <FiMoreHorizontal /> Details
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => handleDeleteCustomer(customer.id)}
                              >
                                <FiTrash2 /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="no-results">
                        <td colSpan="5">
                          <div className="empty-state">
                            <FiSearch size={48} />
                            <h5>No customers found</h5>
                            <p>Try adjusting your search</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {filteredCustomers.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      <FiChevronLeft /> Prev
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map(i => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next <FiChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Customer Details Panel */}
        {showDetails && selectedCustomer && (
          <div className="details-panel">
            <div className="panel-header">
              <h2>Order History for {selectedCustomer.name}</h2>
              <button className="close-btn" onClick={handleCloseDetails}>&times;</button>
            </div>

            <div className="panel-content">
              <div className="customer-meta">
                <div>
                  <span className="meta-label">Customer ID:</span>
                  <span>{selectedCustomer.id}</span>
                </div>
                <div>
                  <span className="meta-label">Status:</span>
                  <span className={`status-badge ${selectedCustomer.status}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
                <div>
                  <span className="meta-label">Member Since:</span>
                  <span>{new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="order-history">
                <h3>Recent Orders ({selectedCustomer.orders})</h3>
                
                {/* Sample order history data - you would replace with real data */}
                <div className="order-list">
                  {selectedCustomer.orders > 0 ? (
                    Array.from({ length: Math.min(selectedCustomer.orders, 5) }).map((_, i) => (
                      <div key={i} className="order-item">
                        <div className="order-header">
                          <span className="order-id">ORD-{selectedCustomer.id}00{i+1}</span>
                          <span className="order-date">2023-{Math.floor(Math.random() * 12) + 1}-{Math.floor(Math.random() * 28) + 1}</span>
                          <span className="order-status">Completed</span>
                          <span className="order-amount">${(Math.random() * 500 + 50).toFixed(2)}</span>
                        </div>
                        <div className="order-products">
                          {Math.floor(Math.random() * 3) + 1} items
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-orders">
                      This customer hasn't placed any orders yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="panel-footer">
              <button className="btn-secondary" onClick={handleCloseDetails}>
                Close
              </button>
              <button className="btn-primary">
                View Full History
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerRecords;