import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiFilter
} from 'react-icons/fi';
import { Table, Pagination, Badge, Form, Button, Card, Alert } from 'react-bootstrap';
import Topbar from './Topbar'; // Add Topbar import
import '../Style/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockOrders = [
          {
            id: 'ORD-1001',
            customer: { id: 1, name: 'John Doe', email: 'john@example.com' },
            date: '2023-07-15',
            amount: 125.50,
            status: 'completed',
            items: [
              { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
              { id: 2, name: 'Phone Case', price: 15.99, quantity: 2 }
            ],
            shipping: {
              address: '123 Main St, New York, NY 10001',
              carrier: 'FedEx',
              tracking: 'FX123456789'
            }
          },
          {
            id: 'ORD-1002',
            customer: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            date: '2023-07-18',
            amount: 89.99,
            status: 'shipped',
            items: [
              { id: 3, name: 'Smart Watch', price: 89.99, quantity: 1 }
            ],
            shipping: {
              address: '456 Oak Ave, Los Angeles, CA 90001',
              carrier: 'UPS',
              tracking: '1Z123456789'
            }
          },
          {
            id: 'ORD-1003',
            customer: { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
            date: '2023-07-20',
            amount: 210.75,
            status: 'processing',
            items: [
              { id: 4, name: 'Laptop', price: 899.99, quantity: 1 },
              { id: 5, name: 'Mouse', price: 19.99, quantity: 1 },
              { id: 6, name: 'Keyboard', price: 49.99, quantity: 1 }
            ],
            shipping: {
              address: '789 Pine Rd, Chicago, IL 60601',
              carrier: 'USPS',
              tracking: '9400100000000000000000'
            }
          },
          {
            id: 'ORD-1004',
            customer: { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
            date: '2023-07-22',
            amount: 45.99,
            status: 'pending',
            items: [
              { id: 7, name: 'Bluetooth Speaker', price: 45.99, quantity: 1 }
            ],
            shipping: {
              address: '321 Elm St, Houston, TX 77001',
              carrier: '',
              tracking: ''
            }
          },
          {
            id: 'ORD-1005',
            customer: { id: 5, name: 'Michael Wilson', email: 'michael@example.com' },
            date: '2023-07-25',
            amount: 299.99,
            status: 'completed',
            items: [
              { id: 8, name: '4K TV', price: 299.99, quantity: 1 }
            ],
            shipping: {
              address: '654 Maple Dr, Phoenix, AZ 85001',
              carrier: 'FedEx',
              tracking: 'FX987654321'
            }
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter and pagination logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSuccessMessage(`Order ${orderId} status updated to ${newStatus}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'shipped': return 'primary';
      case 'processing': return 'warning';
      case 'pending': return 'secondary';
      default: return 'light';
    }
  };

  return (
    <>
      <Topbar />
      <div className="orders-dashboard">
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>
        )}

        <div className="dashboard-header mb-4">
          <div className="container-fluid">
            <div className="row align-items-center mb-3 mb-md-0">
              <div className="col-md-6 mb-3 mb-md-0">
                <h1 className="fw-bold mb-1">Order Management</h1>
                <p className="text-muted mb-0">View and manage customer orders</p>
              </div>
              <div className="col-md-6 d-flex flex-column flex-md-row gap-3">
                <div className="search-container flex-grow-1">
                  <FiSearch className="search-icon" />
                  <Form.Control 
                    type="search" 
                    placeholder="Search orders..." 
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <Form.Select 
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ width: '150px' }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading orders...</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <Table striped bordered hover className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FiUser className="me-2" />
                            <div>
                              <div>{order.customer.name}</div>
                              <small className="text-muted">{order.customer.email}</small>
                            </div>
                          </div>
                        </td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>${order.amount.toFixed(2)}</td>
                        <td>
                          <Badge bg={getStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            onClick={() => handleViewDetails(order)}
                            className="me-2"
                          >
                            View
                          </Button>
                          {order.status === 'pending' && (
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              onClick={() => handleUpdateStatus(order.id, 'processing')}
                            >
                              Process
                            </Button>
                          )}
                          {order.status === 'processing' && (
                            <Button 
                              variant="outline-info" 
                              size="sm" 
                              onClick={() => handleUpdateStatus(order.id, 'shipped')}
                            >
                              Ship
                            </Button>
                          )}
                          {order.status === 'shipped' && (
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              onClick={() => handleUpdateStatus(order.id, 'completed')}
                            >
                              Complete
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="py-3">
                          <FiSearch size={48} className="text-muted mb-3" />
                          <h5>No orders found</h5>
                          <p className="text-muted">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {filteredOrders.length > 0 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages).keys()].map(i => (
                    <Pagination.Item
                      key={i + 1}
                      active={currentPage === i + 1}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className={`modal fade ${showDetails ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order Details - {selectedOrder.id}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseDetails}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <Card>
                        <Card.Header className="d-flex align-items-center">
                          <FiUser className="me-2" />
                          <span>Customer Information</span>
                        </Card.Header>
                        <Card.Body>
                          <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                          <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col-md-6">
                      <Card>
                        <Card.Header className="d-flex align-items-center">
                          <FiCalendar className="me-2" />
                          <span>Order Information</span>
                        </Card.Header>
                        <Card.Body>
                          <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                          <p><strong>Status:</strong> 
                            <Badge bg={getStatusVariant(selectedOrder.status)} className="ms-2">
                              {selectedOrder.status}
                            </Badge>
                          </p>
                          <p><strong>Total:</strong> ${selectedOrder.amount.toFixed(2)}</p>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>

                  <Card className="mb-4">
                    <Card.Header className="d-flex align-items-center">
                      <FiPackage className="me-2" />
                      <span>Order Items</span>
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map(item => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>${item.price.toFixed(2)}</td>
                              <td>{item.quantity}</td>
                              <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                            <td><strong>${selectedOrder.amount.toFixed(2)}</strong></td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header className="d-flex align-items-center">
                      <FiTruck className="me-2" />
                      <span>Shipping Information</span>
                    </Card.Header>
                    <Card.Body>
                      <p><strong>Address:</strong> {selectedOrder.shipping.address}</p>
                      {selectedOrder.status !== 'pending' && (
                        <>
                          <p><strong>Carrier:</strong> {selectedOrder.shipping.carrier}</p>
                          <p><strong>Tracking Number:</strong> {selectedOrder.shipping.tracking}</p>
                        </>
                      )}
                      {selectedOrder.status === 'pending' && (
                        <p className="text-muted">Shipping information will be available once order is processed</p>
                      )}
                    </Card.Body>
                  </Card>
                </div>
                <div className="modal-footer">
                  <Button variant="secondary" onClick={handleCloseDetails}>
                    Close
                  </Button>
                  {selectedOrder.status === 'pending' && (
                    <Button variant="success" onClick={() => {
                      handleUpdateStatus(selectedOrder.id, 'processing');
                      handleCloseDetails();
                    }}>
                      <FiCheckCircle className="me-1" /> Process Order
                    </Button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <Button variant="info" onClick={() => {
                      handleUpdateStatus(selectedOrder.id, 'shipped');
                      handleCloseDetails();
                    }}>
                      <FiTruck className="me-1" /> Mark as Shipped
                    </Button>
                  )}
                  {selectedOrder.status === 'shipped' && (
                    <Button variant="success" onClick={() => {
                      handleUpdateStatus(selectedOrder.id, 'completed');
                      handleCloseDetails();
                    }}>
                      <FiCheckCircle className="me-1" /> Mark as Completed
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;