import React, { useState } from 'react';
import {
  FiBarChart2,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiStar,
  FiShoppingCart,
  FiUser,
  FiPieChart,
  FiCreditCard,
  FiPackage,
  FiRepeat,
  FiCalendar,
  FiDownload
} from 'react-icons/fi';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  ProgressBar,
  Dropdown,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Style/Reports.css';

// Mini sparkline for trends
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
  // Mock data for demonstration
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [exportFormat, setExportFormat] = useState('PDF');
  const [timeRange, setTimeRange] = useState('last30days');

  // Key metrics
  const metrics = [
    {
      label: 'Total Revenue',
      value: 45230.75,
      icon: <FiDollarSign />,
      growth: 8.2,
      color: '#4e73df',
      trend: [32000, 35000, 37000, 40000, 45230]
    },
    {
      label: 'Total Orders',
      value: 1287,
      icon: <FiShoppingBag />,
      growth: 5.6,
      color: '#1cc88a',
      trend: [900, 1050, 1100, 1200, 1287]
    },
    {
      label: 'New Customers',
      value: 312,
      icon: <FiUsers />,
      growth: 12.4,
      color: '#36b9cc',
      trend: [180, 210, 250, 280, 312]
    },
    {
      label: 'Returning Rate',
      value: '38%',
      icon: <FiRepeat />,
      growth: 2.1,
      color: '#f6c23e',
      trend: [30, 32, 34, 36, 38]
    }
  ];

  // Top products
  const topProducts = [
    { name: 'Wireless Headphones', category: 'Audio', sold: 420, revenue: 13599, rating: 4.8, stock: 12 },
    { name: 'Smart Watch', category: 'Wearables', sold: 310, revenue: 11200, rating: 4.6, stock: 8 },
    { name: 'Bluetooth Speaker', category: 'Audio', sold: 270, revenue: 8900, rating: 4.5, stock: 15 }
  ];

  // Revenue by category
  const revenueByCategory = [
    { category: 'Audio', revenue: 18599 },
    { category: 'Wearables', revenue: 14200 },
    { category: 'Accessories', revenue: 6900 },
    { category: 'Computers', revenue: 5520 }
  ];

  // Top customers
  const topCustomers = [
    { name: 'John Doe', orders: 18, spent: 3200, location: 'New York', status: 'VIP' },
    { name: 'Jane Smith', orders: 15, spent: 2950, location: 'Los Angeles', status: 'VIP' },
    { name: 'Emily Davis', orders: 12, spent: 2100, location: 'Chicago', status: 'Regular' }
  ];

  // Sales trend (mock)
  const salesTrend = [1200, 1500, 1800, 2100, 2500, 3000, 3500, 4000, 4200, 4300, 4400, 4500];

  // Helper
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

  const handleExport = () => {
    alert(`Exporting report as ${exportFormat}`);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Adjust start/end date logic here if needed
  };

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <div className="header-title">
                  <h1>
                    <FiBarChart2 className="me-2" />
                    Business Reports
                  </h1>
                  <p className="subtitle">Key insights and analytics for your e-commerce performance</p>
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
                <Dropdown className="ms-3">
                  <Dropdown.Toggle variant="outline-secondary" size="sm" className="export-btn">
                    <FiDownload className="me-1" /> Export
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setExportFormat('PDF')}>PDF</Dropdown.Item>
                    <Dropdown.Item onClick={() => setExportFormat('Excel')}>Excel</Dropdown.Item>
                    <Dropdown.Item onClick={() => setExportFormat('CSV')}>CSV</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary" size="sm" onClick={handleExport} className="ms-2">
                  Generate Report
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <Container fluid className="dashboard-content">
        {/* Key Metrics */}
        <Row className="mb-4">
          {metrics.map((metric, idx) => (
            <Col xl={3} lg={6} md={6} sm={12} className="mb-3" key={idx}>
              <Card className="summary-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">{metric.label}</h6>
                      <h2>
                        {typeof metric.value === 'number'
                          ? formatCurrency(metric.value)
                          : metric.value}
                      </h2>
                      <div className="d-flex align-items-center mt-2">
                        <Badge bg={metric.growth >= 0 ? "success" : "danger"}>
                          {metric.growth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                          {Math.abs(metric.growth).toFixed(1)}%
                        </Badge>
                        <small className="text-muted ms-2">vs last period</small>
                      </div>
                    </div>
                    <div className="summary-icon" style={{ background: metric.color }}>
                      {metric.icon}
                    </div>
                  </div>
                  <MiniSparkline
                    data={metric.trend}
                    color={metric.color}
                    positive={metric.growth >= 0}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Sales Trend Chart */}
        <Row className="mb-4">
          <Col md={12}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Monthly Sales Trend</h5>
                <div className="chart-container">
                  <svg viewBox="0 0 600 120" width="100%" height="120">
                    <polyline
                      fill="none"
                      stroke="#4e73df"
                      strokeWidth="4"
                      points={salesTrend.map((v, i) =>
                        `${(i / (salesTrend.length - 1)) * 600},${120 - (v / Math.max(...salesTrend)) * 100}`
                      ).join(' ')}
                    />
                  </svg>
                  <div className="d-flex justify-content-between mt-2 px-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                      <span key={i} style={{ fontSize: 12, color: '#888' }}>{m}</span>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Revenue by Category & Top Products */}
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h6 className="mb-3">Revenue by Category</h6>
                {revenueByCategory.map((cat, idx) => {
                  const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'];
                  const total = revenueByCategory.reduce((sum, c) => sum + c.revenue, 0);
                  const percent = (cat.revenue / total) * 100;
                  return (
                    <div key={idx} className="d-flex align-items-center mb-2">
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: colors[idx], marginRight: 10
                      }}></div>
                      <div className="flex-grow-1">{cat.category}</div>
                      <div className="me-2">{formatCurrency(cat.revenue)}</div>
                      <ProgressBar now={percent} style={{ width: 80, height: 8 }} variant="info" />
                      <span className="ms-2 text-muted" style={{ fontSize: 13 }}>{percent.toFixed(1)}%</span>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <h6 className="mb-3">Top Selling Products</h6>
                <Table hover size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Sold</th>
                      <th>Revenue</th>
                      <th>Rating</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="product-icon me-2">
                              <FiShoppingCart />
                            </div>
                            <div>
                              <div className="fw-bold">{p.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{p.category}</td>
                        <td>{p.sold}</td>
                        <td>{formatCurrency(p.revenue)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FiStar className="text-warning me-1" />
                            {p.rating}
                          </div>
                        </td>
                        <td>
                          <Badge bg={p.stock < 5 ? "danger" : p.stock < 15 ? "warning" : "success"}>
                            {p.stock < 5 ? "Low" : p.stock < 15 ? "Medium" : "In Stock"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Top Customers */}
        <Row className="mb-4">
          <Col md={12}>
            <Card>
              <Card.Body>
                <h6 className="mb-3">Top Customers</h6>
                <Table hover size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Location</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((c, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="customer-avatar me-2">
                              {c.name.charAt(0)}
                            </div>
                            <div className="fw-bold">{c.name}</div>
                          </div>
                        </td>
                        <td>{c.location}</td>
                        <td>{c.orders}</td>
                        <td>{formatCurrency(c.spent)}</td>
                        <td>
                          <Badge bg={c.status === 'VIP' ? "primary" : "secondary"}>
                            {c.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reports;