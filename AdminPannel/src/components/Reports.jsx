import React, { useState } from 'react';
import { 
  FiBarChart2, 
  FiDollarSign, 
  FiShoppingBag, 
  FiUsers,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiTrendingUp,
  FiTrendingDown,
  FiStar,
  FiShoppingCart,
  FiUser,
  FiPieChart,
  FiCreditCard,
  FiPackage,
  FiRepeat
} from 'react-icons/fi';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Tab, 
  Tabs, 
  Table, 
  Button,
  Dropdown,
  Badge,
  ProgressBar,
  Form
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Style/Reports.css';

// Mock chart components (in a real app, use Chart.js or similar)
const BarChart = ({ data, labels, color }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="chart-container">
      <div className="chart-bars">
        {data.map((value, index) => (
          <div key={index} className="bar-column">
            <div className="bar-label">{labels[index]}</div>
            <div className="bar-wrapper">
              <div 
                className="bar" 
                style={{
                  height: `${(value / maxValue) * 100}%`,
                  background: `linear-gradient(to top, ${color}, ${color}80)`
                }}
                data-value={value}
              ></div>
            </div>
            <div className="bar-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = ({ data, labels, color }) => {
  const maxValue = Math.max(...data);
  const points = data.map((value, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (value / maxValue) * 100
  }));
  
  const pathData = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  return (
    <div className="line-chart-container">
      <svg viewBox="0 0 100 100" className="line-chart">
        <path 
          d={pathData} 
          stroke={color} 
          strokeWidth="2" 
          fill="none" 
          className="line-path"
        />
        {points.map((point, i) => (
          <circle 
            key={i}
            cx={point.x}
            cy={point.y}
            r="2.5"
            fill={color}
            stroke="#fff"
            strokeWidth="1"
            className="line-point"
          />
        ))}
      </svg>
      <div className="line-chart-labels">
        {labels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
};

const MiniSparkline = ({ data, color, positive }) => {
  const maxValue = Math.max(...data);
  const points = data.map((value, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (value / maxValue) * 100
  }));
  
  const pathData = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  return (
    <div className="mini-sparkline">
      <svg viewBox="0 0 100 100">
        <path 
          d={pathData} 
          stroke={color} 
          strokeWidth="2" 
          fill="none" 
        />
      </svg>
      <div className={`trend-indicator ${positive ? 'positive' : 'negative'}`}>
        {positive ? <FiTrendingUp /> : <FiTrendingDown />}
      </div>
    </div>
  );
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(new Date());
  const [exportFormat, setExportFormat] = useState('PDF');
  const [timeRange, setTimeRange] = useState('last30days');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample data for reports
  const reportData = {
    sales: [
      { date: '2023-07-01', amount: 1250.50, orders: 15, returns: 2 },
      { date: '2023-07-02', amount: 980.75, orders: 12, returns: 1 },
      { date: '2023-07-03', amount: 1540.20, orders: 18, returns: 0 },
      { date: '2023-07-04', amount: 870.30, orders: 10, returns: 1 },
      { date: '2023-07-05', amount: 2100.00, orders: 22, returns: 3 },
      { date: '2023-07-06', amount: 1430.60, orders: 16, returns: 1 },
      { date: '2023-07-07', amount: 950.25, orders: 11, returns: 0 }
    ],
    products: [
      { id: 1, name: 'Wireless Headphones', sold: 42, revenue: 3359.58, stock: 15, rating: 4.7, category: 'Audio' },
      { id: 2, name: 'Smart Watch', sold: 28, revenue: 2519.72, stock: 8, rating: 4.5, category: 'Wearables' },
      { id: 3, name: 'Bluetooth Speaker', sold: 35, revenue: 1609.65, stock: 12, rating: 4.3, category: 'Audio' },
      { id: 4, name: 'Phone Case', sold: 87, revenue: 1391.13, stock: 45, rating: 4.2, category: 'Accessories' },
      { id: 5, name: 'Laptop', sold: 5, revenue: 4499.95, stock: 3, rating: 4.8, category: 'Computers' },
      { id: 6, name: 'Wireless Earbuds', sold: 38, revenue: 2899.62, stock: 10, rating: 4.6, category: 'Audio' },
      { id: 7, name: 'Tablet', sold: 12, revenue: 3599.88, stock: 5, rating: 4.4, category: 'Computers' }
    ],
    customers: [
      { id: 1, name: 'John Doe', orders: 8, spent: 1250.50, lastOrder: '2023-07-05', status: 'VIP', location: 'New York' },
      { id: 2, name: 'Jane Smith', orders: 5, spent: 980.75, lastOrder: '2023-07-03', status: 'Regular', location: 'Chicago' },
      { id: 3, name: 'Robert Johnson', orders: 12, spent: 2540.20, lastOrder: '2023-07-07', status: 'VIP', location: 'Los Angeles' },
      { id: 4, name: 'Emily Davis', orders: 3, spent: 470.30, lastOrder: '2023-07-01', status: 'New', location: 'Houston' },
      { id: 5, name: 'Michael Wilson', orders: 7, spent: 1800.00, lastOrder: '2023-07-06', status: 'Regular', location: 'Phoenix' },
      { id: 6, name: 'Sarah Brown', orders: 9, spent: 2100.75, lastOrder: '2023-07-04', status: 'VIP', location: 'Philadelphia' },
      { id: 7, name: 'David Lee', orders: 4, spent: 650.40, lastOrder: '2023-07-02', status: 'Regular', location: 'San Antonio' }
    ],
    trends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      sales: [12500, 14300, 9800, 16700, 15400, 18900, 21000],
      orders: [142, 168, 115, 192, 178, 215, 243],
      customers: [85, 92, 76, 104, 98, 118, 132],
      revenueByCategory: {
        Audio: 7859.25,
        Wearables: 2519.72,
        Accessories: 1391.13,
        Computers: 8099.83
      }
    }
  };

  // Calculate summary stats
 const summaryStats = {
  totalSales: reportData.sales.reduce((sum, day) => sum + day.amount, 0),
  totalOrders: reportData.sales.reduce((sum, day) => sum + day.orders, 0),
  avgOrderValue: (reportData.sales.reduce((sum, day) => sum + day.amount, 0) / 
                 reportData.sales.reduce((sum, day) => sum + day.orders, 0)), // Added closing parenthesis here
  topProduct: reportData.products.reduce((top, product) => 
              product.revenue > top.revenue ? product : top, {revenue: 0}),
  returningCustomers: reportData.customers.filter(c => c.orders > 1).length,
  salesGrowth: ((reportData.trends.sales[6] - reportData.trends.sales[5]) / 
              reportData.trends.sales[5] * 100),
  orderGrowth: ((reportData.trends.orders[6] - reportData.trends.orders[5]) / 
              reportData.trends.orders[5] * 100),
  customerGrowth: ((reportData.trends.customers[6] - reportData.trends.customers[5]) / 
                 reportData.trends.customers[5] * 100)
};

  const handleExport = () => {
    // In a real app, this would generate and download the report
    alert(`Exporting ${activeTab} report as ${exportFormat}`);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    const today = new Date();
    const newStartDate = new Date();
    
    switch(range) {
      case 'today':
        newStartDate.setDate(today.getDate());
        break;
      case 'last7days':
        newStartDate.setDate(today.getDate() - 7);
        break;
      case 'last30days':
        newStartDate.setDate(today.getDate() - 30);
        break;
      case 'last90days':
        newStartDate.setDate(today.getDate() - 90);
        break;
      case 'thisYear':
        newStartDate.setFullYear(today.getFullYear(), 0, 1);
        break;
      default:
        newStartDate.setDate(today.getDate() - 30);
    }
    
    setStartDate(newStartDate);
    setEndDate(today);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <button 
                  className="sidebar-toggle me-3" 
                  onClick={toggleSidebar}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="header-title">
                  <h1>
                    <FiBarChart2 className="me-2" />
                    Analytics Dashboard
                  </h1>
                  <p className="subtitle">Monitor your business performance in real-time</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-end align-items-center">
                <div className="time-range-selector me-3">
                  <Button 
                    variant={timeRange === 'today' ? 'primary' : 'outline-secondary'} 
                    size="sm" 
                    onClick={() => handleTimeRangeChange('today')}
                    className="time-range-btn"
                  >
                    Today
                  </Button>
                  <Button 
                    variant={timeRange === 'last7days' ? 'primary' : 'outline-secondary'} 
                    size="sm" 
                    onClick={() => handleTimeRangeChange('last7days')}
                    className="time-range-btn"
                  >
                    7D
                  </Button>
                  <Button 
                    variant={timeRange === 'last30days' ? 'primary' : 'outline-secondary'} 
                    size="sm" 
                    onClick={() => handleTimeRangeChange('last30days')}
                    className="time-range-btn"
                  >
                    30D
                  </Button>
                  <Button 
                    variant={timeRange === 'last90days' ? 'primary' : 'outline-secondary'} 
                    size="sm" 
                    onClick={() => handleTimeRangeChange('last90days')}
                    className="time-range-btn"
                  >
                    90D
                  </Button>
                  <Button 
                    variant={timeRange === 'thisYear' ? 'primary' : 'outline-secondary'} 
                    size="sm" 
                    onClick={() => handleTimeRangeChange('thisYear')}
                    className="time-range-btn"
                  >
                    YTD
                  </Button>
                </div>
                <div className="date-filter">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="form-control-sm"
                    customInput={<Button variant="outline-secondary" size="sm"><FiCalendar /></Button>}
                  />
                  <span className="mx-2 text-muted">to</span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="form-control-sm"
                    customInput={<Button variant="outline-secondary" size="sm"><FiCalendar /></Button>}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <Container fluid className="dashboard-content">
        <Row>
          {/* Main Content */}
          <Col lg={sidebarCollapsed ? 12 : 9} className="main-content">
            {/* Summary Cards */}
            <Row className="mb-4 summary-cards">
              <Col xl={3} lg={6} className="mb-3">
                <Card className="summary-card revenue-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Total Revenue</h6>
                        <h2>{formatCurrency(summaryStats.totalSales)}</h2>
                        <div className="d-flex align-items-center mt-2">
                          <Badge bg={summaryStats.salesGrowth >= 0 ? "success" : "danger"}>
                            {summaryStats.salesGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            {Math.abs(summaryStats.salesGrowth).toFixed(1)}%
                          </Badge>
                          <small className="text-muted ms-2">vs last period</small>
                        </div>
                      </div>
                      <div className="summary-icon">
                        <FiDollarSign />
                      </div>
                    </div>
                    <MiniSparkline 
                      data={reportData.trends.sales.slice(-5)} 
                      color={summaryStats.salesGrowth >= 0 ? "#28a745" : "#dc3545"} 
                      positive={summaryStats.salesGrowth >= 0}
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={3} lg={6} className="mb-3">
                <Card className="summary-card orders-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Total Orders</h6>
                        <h2>{summaryStats.totalOrders}</h2>
                        <div className="d-flex align-items-center mt-2">
                          <Badge bg={summaryStats.orderGrowth >= 0 ? "success" : "danger"}>
                            {summaryStats.orderGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            {Math.abs(summaryStats.orderGrowth).toFixed(1)}%
                          </Badge>
                          <small className="text-muted ms-2">vs last period</small>
                        </div>
                      </div>
                      <div className="summary-icon">
                        <FiShoppingBag />
                      </div>
                    </div>
                    <MiniSparkline 
                      data={reportData.trends.orders.slice(-5)} 
                      color={summaryStats.orderGrowth >= 0 ? "#28a745" : "#dc3545"} 
                      positive={summaryStats.orderGrowth >= 0}
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={3} lg={6} className="mb-3">
                <Card className="summary-card avg-order-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Avg. Order Value</h6>
                        <h2>{formatCurrency(summaryStats.avgOrderValue)}</h2>
                        <div className="d-flex align-items-center mt-2">
                          <Badge bg="success">
                            <FiTrendingUp />
                            3.2%
                          </Badge>
                          <small className="text-muted ms-2">vs last period</small>
                        </div>
                      </div>
                      <div className="summary-icon">
                        <FiCreditCard />
                      </div>
                    </div>
                    <MiniSparkline 
                      data={reportData.sales.slice(-5).map(day => day.amount / day.orders)} 
                      color="#28a745" 
                      positive={true}
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={3} lg={6} className="mb-3">
                <Card className="summary-card customers-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Returning Customers</h6>
                        <h2>{summaryStats.returningCustomers}</h2>
                        <div className="d-flex align-items-center mt-2">
                          <Badge bg={summaryStats.customerGrowth >= 0 ? "success" : "danger"}>
                            {summaryStats.customerGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            {Math.abs(summaryStats.customerGrowth).toFixed(1)}%
                          </Badge>
                          <small className="text-muted ms-2">vs last period</small>
                        </div>
                      </div>
                      <div className="summary-icon">
                        <FiRepeat />
                      </div>
                    </div>
                    <MiniSparkline 
                      data={reportData.trends.customers.slice(-5)} 
                      color={summaryStats.customerGrowth >= 0 ? "#28a745" : "#dc3545"} 
                      positive={summaryStats.customerGrowth >= 0}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Main Dashboard Content */}
            <Card className="dashboard-card">
              <Card.Header className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Business Analytics</h5>
                  <div className="d-flex">
                    <Dropdown className="me-2">
                      <Dropdown.Toggle variant="outline-secondary" size="sm" className="export-btn">
                        <FiDownload className="me-1" /> Export
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setExportFormat('PDF')}>PDF</Dropdown.Item>
                        <Dropdown.Item onClick={() => setExportFormat('Excel')}>Excel</Dropdown.Item>
                        <Dropdown.Item onClick={() => setExportFormat('CSV')}>CSV</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="primary" size="sm" onClick={handleExport} className="generate-btn">
                      Generate Report
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Tabs
                  id="reports-tabs"
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="custom-tabs"
                >
                  <Tab eventKey="sales" title={<><FiDollarSign /> Sales</>} />
                  <Tab eventKey="products" title={<><FiPackage /> Products</>} />
                  <Tab eventKey="customers" title={<><FiUser /> Customers</>} />
                  <Tab eventKey="trends" title={<><FiTrendingUp /> Trends</>} />
                </Tabs>
                
                <Tab.Content>
                  {/* Sales Report Tab */}
                  <Tab.Pane eventKey="sales">
                    <Row>
                      <Col md={12} className="mb-4">
                        <Card className="chart-card">
                          <Card.Body>
                            <h6 className="card-title">Daily Sales Performance</h6>
                            <BarChart 
                              data={reportData.sales.map(day => day.amount)} 
                              labels={reportData.sales.map(day => day.date.split('-')[2])} 
                              color="#4e73df" 
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={12}>
                        <Card>
                          <Card.Body>
                            <div className="table-responsive">
                              <Table hover className="mb-0">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Sales</th>
                                    <th>Orders</th>
                                    <th>Returns</th>
                                    <th>Avg. Value</th>
                                    <th>Conversion</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {reportData.sales.map((day, index) => {
                                    const conversionRate = (day.orders / 100) * 100; // Mock conversion rate
                                    return (
                                      <tr key={index}>
                                        <td>{day.date}</td>
                                        <td className="fw-bold">{formatCurrency(day.amount)}</td>
                                        <td>{day.orders}</td>
                                        <td className={day.returns > 0 ? 'text-danger' : 'text-success'}>
                                          {day.returns > 0 ? `${day.returns} (${((day.returns/day.orders)*100).toFixed(1)}%)` : '0'}
                                        </td>
                                        <td>{formatCurrency(day.amount / day.orders)}</td>
                                        <td>
                                          <ProgressBar 
                                            now={conversionRate} 
                                            variant={conversionRate > 15 ? 'success' : conversionRate > 10 ? 'warning' : 'danger'} 
                                            label={`${conversionRate.toFixed(1)}%`}
                                          />
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  {/* Product Performance Tab */}
                  <Tab.Pane eventKey="products">
                    <Row>
                      <Col md={6} className="mb-4">
                        <Card className="h-100">
                          <Card.Body>
                            <h6 className="card-title">Revenue by Category</h6>
                            <div className="revenue-categories">
                              {Object.entries(reportData.trends.revenueByCategory).map(([category, revenue], index) => {
                                const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'];
                                const percentage = (revenue / summaryStats.totalSales) * 100;
                                return (
                                  <div key={index} className="category-item">
                                    <div className="category-info">
                                      <div className="category-color" style={{backgroundColor: colors[index]}}></div>
                                      <div className="category-name">{category}</div>
                                      <div className="category-value">{formatCurrency(revenue)}</div>
                                    </div>
                                    <ProgressBar 
                                      now={percentage} 
                                      variant="success" 
                                      style={{height: '8px'}}
                                    />
                                    <div className="category-percentage">{percentage.toFixed(1)}%</div>
                                  </div>
                                );
                              })}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} className="mb-4">
                        <Card className="h-100">
                          <Card.Body>
                            <h6 className="card-title">Top Selling Products</h6>
                            <div className="top-products">
                              {reportData.products
                                .sort((a, b) => b.revenue - a.revenue)
                                .slice(0, 3)
                                .map((product, index) => (
                                  <div key={index} className="product-item">
                                    <div className="product-info">
                                      <div className="product-icon">
                                        <FiShoppingCart />
                                      </div>
                                      <div>
                                        <div className="product-name">{product.name}</div>
                                        <small className="text-muted">{product.category}</small>
                                      </div>
                                    </div>
                                    <div className="product-stats">
                                      <div className="product-revenue">{formatCurrency(product.revenue)}</div>
                                      <div className="product-sales">{product.sold} sold</div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={12}>
                        <Card>
                          <Card.Body>
                            <div className="table-responsive">
                              <Table hover className="mb-0">
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Units Sold</th>
                                    <th>Revenue</th>
                                    <th>Rating</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {reportData.products.map((product, index) => (
                                    <tr key={index}>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="product-icon me-2">
                                            <FiShoppingCart />
                                          </div>
                                          <div>
                                            <div className="fw-bold">{product.name}</div>
                                            <small className="text-muted">SKU: {1000 + product.id}</small>
                                          </div>
                                        </div>
                                      </td>
                                      <td>{product.category}</td>
                                      <td>{product.sold}</td>
                                      <td className="fw-bold">{formatCurrency(product.revenue)}</td>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <FiStar className="text-warning me-1" />
                                          {product.rating}
                                        </div>
                                      </td>
                                      <td>
                                        <ProgressBar 
                                          now={(product.sold / (product.sold + product.stock)) * 100} 
                                          variant={
                                            (product.sold / (product.sold + product.stock)) * 100 > 80 ? 'success' : 
                                            (product.sold / (product.sold + product.stock)) * 100 > 50 ? 'warning' : 'danger'
                                          } 
                                          style={{height: '6px'}}
                                        />
                                        <small>{product.stock} remaining</small>
                                      </td>
                                      <td>
                                        {product.stock < 5 ? (
                                          <Badge bg="danger">Low Stock</Badge>
                                        ) : product.stock < 15 ? (
                                          <Badge bg="warning">Medium</Badge>
                                        ) : (
                                          <Badge bg="success">In Stock</Badge>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  {/* Customer Insights Tab */}
                  <Tab.Pane eventKey="customers">
                    <Row>
                      <Col md={6} className="mb-4">
                        <Card className="h-100">
                          <Card.Body>
                            <h6 className="card-title">Customer Segments</h6>
                            <div className="customer-segments">
                              <div className="segment-item">
                                <div className="segment-info">
                                  <div className="segment-icon vip">
                                    <FiStar />
                                  </div>
                                  <div>
                                    <div className="segment-name">VIP Customers</div>
                                    <small className="text-muted">Top 10% spenders</small>
                                  </div>
                                </div>
                                <div className="segment-stats">
                                  <div className="segment-count">
                                    {reportData.customers.filter(c => c.status === 'VIP').length}
                                  </div>
                                  <div className="segment-growth positive">
                                    <FiTrendingUp /> 22%
                                  </div>
                                </div>
                              </div>
                              <div className="segment-item">
                                <div className="segment-info">
                                  <div className="segment-icon regular">
                                    <FiUser />
                                  </div>
                                  <div>
                                    <div className="segment-name">Regular Customers</div>
                                    <small className="text-muted">Frequent buyers</small>
                                  </div>
                                </div>
                                <div className="segment-stats">
                                  <div className="segment-count">
                                    {reportData.customers.filter(c => c.status === 'Regular').length}
                                  </div>
                                  <div className="segment-growth positive">
                                    <FiTrendingUp /> 8%
                                  </div>
                                </div>
                              </div>
                              <div className="segment-item">
                                <div className="segment-info">
                                  <div className="segment-icon new">
                                    <FiUser />
                                  </div>
                                  <div>
                                    <div className="segment-name">New Customers</div>
                                    <small className="text-muted">First-time buyers</small>
                                  </div>
                                </div>
                                <div className="segment-stats">
                                  <div className="segment-count">
                                    {reportData.customers.filter(c => c.status === 'New').length}
                                  </div>
                                  <div className="segment-growth positive">
                                    <FiTrendingUp /> 15%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} className="mb-4">
                        <Card className="h-100">
                          <Card.Body>
                            <h6 className="card-title">Top Customers</h6>
                            <div className="top-customers">
                              {reportData.customers
                                .sort((a, b) => b.spent - a.spent)
                                .slice(0, 3)
                                .map((customer, index) => (
                                  <div key={index} className="customer-item">
                                    <div className="customer-info">
                                      <div className="customer-avatar">
                                        {customer.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="customer-name">{customer.name}</div>
                                        <small className="text-muted">{customer.location}</small>
                                      </div>
                                    </div>
                                    <div className="customer-stats">
                                      <div className="customer-ltv">{formatCurrency(customer.spent)}</div>
                                      <div className="customer-orders">{customer.orders} orders</div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={12}>
                        <Card>
                          <Card.Body>
                            <div className="table-responsive">
                              <Table hover className="mb-0">
                                <thead>
                                  <tr>
                                    <th>Customer</th>
                                    <th>Location</th>
                                    <th>Orders</th>
                                    <th>Total Spent</th>
                                    <th>Avg. Value</th>
                                    <th>Last Order</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {reportData.customers.map((customer, index) => (
                                    <tr key={index}>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="customer-avatar me-2">
                                            {customer.name.charAt(0)}
                                          </div>
                                          <div className="fw-bold">{customer.name}</div>
                                        </div>
                                      </td>
                                      <td>{customer.location}</td>
                                      <td>{customer.orders}</td>
                                      <td className="fw-bold">{formatCurrency(customer.spent)}</td>
                                      <td>{formatCurrency(customer.spent / customer.orders)}</td>
                                      <td>{customer.lastOrder}</td>
                                      <td>
                                        {customer.status === 'VIP' ? (
                                          <Badge bg="primary">VIP</Badge>
                                        ) : customer.status === 'New' ? (
                                          <Badge bg="success">New</Badge>
                                        ) : (
                                          <Badge bg="secondary">Regular</Badge>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  {/* Sales Trends Tab */}
                  <Tab.Pane eventKey="trends">
                    <Row>
                      <Col md={12} className="mb-4">
                        <Card className="chart-card">
                          <Card.Body>
                            <h6 className="card-title">Monthly Sales Trend</h6>
                            <BarChart 
                              data={reportData.trends.sales} 
                              labels={reportData.trends.labels} 
                              color="#4e73df" 
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} className="mb-4">
                        <Card className="h-100">
                          <Card.Body>
                            <h6 className="card-title">Order Volume</h6>
                            <LineChart 
                              data={reportData.trends.orders} 
                              labels={reportData.trends.labels} 
                              color="#1cc88a" 
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} className="mb-4">
                        <Card className="h-100">
                          <Card.Body>
                            <h6 className="card-title">Customer Growth</h6>
                            <LineChart 
                              data={reportData.trends.customers} 
                              labels={reportData.trends.labels} 
                              color="#36b9cc" 
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={12}>
                        <Card>
                          <Card.Body>
                            <div className="table-responsive">
                              <Table hover className="mb-0">
                                <thead>
                                  <tr>
                                    <th>Month</th>
                                    <th>Sales</th>
                                    <th>Orders</th>
                                    <th>Customers</th>
                                    <th>Avg. Order</th>
                                    <th>Growth</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {reportData.trends.labels.map((month, index) => {
                                    const salesGrowth = index > 0 ? 
                                      ((reportData.trends.sales[index] - reportData.trends.sales[index-1]) / 
                                      reportData.trends.sales[index-1] * 100) : 0;
                                    
                                    return (
                                      <tr key={index}>
                                        <td>{month}</td>
                                        <td className="fw-bold">{formatCurrency(reportData.trends.sales[index])}</td>
                                        <td>{reportData.trends.orders[index]}</td>
                                        <td>{reportData.trends.customers[index]}</td>
                                        <td>{formatCurrency(reportData.trends.sales[index] / reportData.trends.orders[index])}</td>
                                        <td>
                                          <Badge bg={salesGrowth >= 0 ? "success" : "danger"}>
                                            {salesGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                            {Math.abs(salesGrowth).toFixed(1)}%
                                          </Badge>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar with Insights */}
          {!sidebarCollapsed && (
            <Col lg={3} className="sidebar">
              <Card className="sidebar-card">
                <Card.Header>
                  <h5 className="mb-0">Key Insights</h5>
                </Card.Header>
                <Card.Body>
                  <div className="insight-item">
                    <div className="insight-header">
                      <div className="insight-icon primary">
                        <FiStar />
                      </div>
                      <h6>Top Product</h6>
                    </div>
                    <div className="insight-content">
                      <p className="insight-value">{summaryStats.topProduct.name}</p>
                      <p className="insight-detail">
                        Generated {formatCurrency(summaryStats.topProduct.revenue)} (
                        {((summaryStats.topProduct.revenue / summaryStats.totalSales) * 100).toFixed(1)}% of revenue)
                      </p>
                    </div>
                  </div>
                  
                  <div className="insight-item">
                    <div className="insight-header">
                      <div className="insight-icon success">
                        <FiTrendingUp />
                      </div>
                      <h6>Sales Growth</h6>
                    </div>
                    <div className="insight-content">
                      <p className="insight-value">{summaryStats.salesGrowth.toFixed(1)}% this month</p>
                      <p className="insight-detail">
                        Compared to {(summaryStats.salesGrowth > 0 ? summaryStats.salesGrowth/2 : summaryStats.salesGrowth*2).toFixed(1)}% last month
                      </p>
                    </div>
                  </div>
                  
                  <div className="insight-item">
                    <div className="insight-header">
                      <div className="insight-icon warning">
                        <FiUsers />
                      </div>
                      <h6>Customer Retention</h6>
                    </div>
                    <div className="insight-content">
                      <p className="insight-value">
                        {((summaryStats.returningCustomers / reportData.customers.length) * 100).toFixed(1)}% returning rate
                      </p>
                      <p className="insight-detail">
                        {summaryStats.returningCustomers} out of {reportData.customers.length} customers made repeat purchases
                      </p>
                    </div>
                  </div>
                  
                  <div className="insight-item">
                    <div className="insight-header">
                      <div className="insight-icon info">
                        <FiShoppingBag />
                      </div>
                      <h6>Order Trends</h6>
                    </div>
                    <div className="insight-content">
                      <p className="insight-value">
                        {reportData.trends.orders[6]} orders this month
                      </p>
                      <p className="insight-detail">
                        {((reportData.trends.orders[6] - reportData.trends.orders[5]) / reportData.trends.orders[5] * 100).toFixed(1)}% change from last month
                      </p>
                    </div>
                  </div>

                  <div className="insight-item">
                    <div className="insight-header">
                      <div className="insight-icon secondary">
                        <FiPieChart />
                      </div>
                      <h6>Revenue Distribution</h6>
                    </div>
                    <div className="insight-content">
                      <div className="revenue-distribution">
                        {Object.entries(reportData.trends.revenueByCategory).map(([category, revenue], index) => {
                          const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'];
                          const percentage = (revenue / summaryStats.totalSales) * 100;
                          return (
                            <div key={index} className="distribution-item">
                              <div className="distribution-color" style={{backgroundColor: colors[index]}}></div>
                              <div className="distribution-name">{category}</div>
                              <div className="distribution-percentage">{percentage.toFixed(1)}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Reports;