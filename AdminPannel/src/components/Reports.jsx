import axios from 'axios';
import { useState, useEffect } from "react";
import { FiDollarSign, FiTrendingUp, FiShoppingCart, FiClock, FiCreditCard, FiBox, FiCalendar, FiSearch, FiAlertTriangle, FiFilter } from 'react-icons/fi';
import "../Style/Reports.css";

function Reports(){
    const [productData, setProductSoldData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [totalSaleAmount, setTotalSaleAmt] = useState(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [stockFilter, setStockFilter] = useState('all'); // 'all', 'low', 'out'
    const [inventoryData, setInventoryData] = useState([]);

    // Fetch inventory data on component mount
    useEffect(() => {
        fetchInventoryData();
    }, []);

    const fetchInventoryData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/inventory');
            setInventoryData(response.data);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        }
    };

    const parseDate = (dateString) => {
        return dateString.split('T')[0]; // format as yyyy-MM-dd
    };

    const handleSearchWithDate = async () => {
        if (!fromDate || !toDate) {
            alert("Please fill in both date fields!");
            return;
        }
        
        setLoading(true);
        
        try {
            const productSoldResponse = await axios.get(`http://localhost:3001/salereport/searchByDate?fromDate=${fromDate}&toDate=${toDate}`);
            const productSoldData = productSoldResponse.data;
            const filteredProducts = productSoldData.filter(product => product.squareFootOrQuantity > 0);
        
            const totalAmt = filteredProducts.reduce((sum, prod) => sum + (parseInt(prod.productSalePrice) * parseInt(prod.squareFootOrQuantity)), 0);
            setTotalSaleAmt(totalAmt);
            
            setProductSoldData(filteredProducts);
            setFilteredProducts(filteredProducts);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Check if a product is low in stock
    const isLowStock = (productId) => {
        const inventoryItem = inventoryData.find(item => item.productID === productId);
        if (!inventoryItem) return false;
        
        // Assuming we consider less than 10 items as low stock
        return inventoryItem.quantity > 0 && inventoryItem.quantity < 10;
    };

    // Check if a product is out of stock
    const isOutOfStock = (productId) => {
        const inventoryItem = inventoryData.find(item => item.productID === productId);
        if (!inventoryItem) return false;
        
        return inventoryItem.quantity === 0;
    };

    // Apply stock filter
    const applyStockFilter = (filterType) => {
        setStockFilter(filterType);
        
        if (filterType === 'all') {
            setFilteredProducts(productData);
        } else if (filterType === 'low') {
            const lowStockProducts = productData.filter(product => 
                isLowStock(product.productID)
            );
            setFilteredProducts(lowStockProducts);
        } else if (filterType === 'out') {
            const outOfStockProducts = productData.filter(product => 
                isOutOfStock(product.productID)
            );
            setFilteredProducts(outOfStockProducts);
        }
    };

    return (
        <div className="analytics-dashboard">
            <div className="dashboard-header">
                <div className="container-fluid px-3 px-md-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h1 className="gradient-text">Sales Analytics</h1>
                            <p className="subtitle">Track and analyze your sales performance in real-time</p>
                        </div>
                        <div className="d-flex align-items-center date-filter mt-2 mt-md-0">
                            <div className="input-group input-group-dates me-2">
                                <span className="input-group-text"><FiCalendar size={16} /></span>
                                <input 
                                    type="date" 
                                    className="form-control form-control-sm" 
                                    onChange={(e) => setFromDate(e.target.value)} 
                                />
                            </div>
                            <span className="text-white mx-2">to</span>
                            <div className="input-group input-group-dates me-2">
                                <span className="input-group-text"><FiCalendar size={16} /></span>
                                <input 
                                    type="date" 
                                    className="form-control form-control-sm" 
                                    onChange={(e) => setToDate(e.target.value)} 
                                />
                            </div>
                            <button 
                                className="btn btn-search" 
                                onClick={handleSearchWithDate}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <FiSearch className="me-1" size={16} />
                                        Search
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-3 px-md-4 dashboard-content">
                <div className="row mb-4">
                    <div className="col-xl-3 col-md-6 col-sm-6 mb-4">
                        <div className="summary-card card card-sales">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Total Sales</div>
                                        <div className="h5 mb-0 font-weight-bold">${totalSaleAmount.toLocaleString()}</div>
                                    </div>
                                    <div className="summary-icon">
                                        <FiDollarSign size={24} />
                                    </div>
                                </div>
                                <div className="mt-2 text-small">
                                    <span className="text-success">
                                        <FiTrendingUp className="me-1" />
                                        Revenue
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-6 mb-4">
                        <div className="summary-card card card-products">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Products Sold</div>
                                        <div className="h5 mb-0 font-weight-bold">{productData.length}</div>
                                    </div>
                                    <div className="summary-icon">
                                        <FiBox size={24} />
                                    </div>
                                </div>
                                <div className="mt-2 text-small">
                                    <span className="text-secondary">
                                        <FiBox className="me-1" />
                                        Items
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-6 mb-4">
                        <div className="summary-card card card-due">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Low Stock Items</div>
                                        <div className="h5 mb-0 font-weight-bold">
                                            {inventoryData.filter(item => item.quantity > 0 && item.quantity < 10).length}
                                        </div>
                                    </div>
                                    <div className="summary-icon">
                                        <FiAlertTriangle size={24} />
                                    </div>
                                </div>
                                <div className="mt-2 text-small">
                                    <span className="text-warning">
                                        <FiAlertTriangle className="me-1" />
                                        Needs Attention
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 col-sm-6 mb-4">
                        <div className="summary-card card card-expense">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Out of Stock</div>
                                        <div className="h5 mb-0 font-weight-bold">
                                            {inventoryData.filter(item => item.quantity === 0).length}
                                        </div>
                                    </div>
                                    <div className="summary-icon">
                                        <FiBox size={24} />
                                    </div>
                                </div>
                                <div className="mt-2 text-small">
                                    <span className="text-danger">
                                        <FiBox className="me-1" />
                                        Restock Needed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow mb-4 tabs-card">
                    <div className="card-header py-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                            <FiBox className="me-2" />
                            Sales Details
                        </h6>
                        <div className="d-flex align-items-center">
                            <span className="me-2 small text-muted">Showing data from</span>
                            <span className="font-weight-bold text-primary me-3">
                                {fromDate || 'N/A'} to {toDate || 'N/A'}
                            </span>
                            <div className="btn-group">
                                <button 
                                    type="button" 
                                    className={`btn btn-sm ${stockFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => applyStockFilter('all')}
                                >
                                    <FiFilter className="me-1" />
                                    All Products
                                </button>
                                <button 
                                    type="button" 
                                    className={`btn btn-sm ${stockFilter === 'low' ? 'btn-warning' : 'btn-outline-warning'}`}
                                    onClick={() => applyStockFilter('low')}
                                >
                                    <FiAlertTriangle className="me-1" />
                                    Low Stock
                                </button>
                                <button 
                                    type="button" 
                                    className={`btn btn-sm ${stockFilter === 'out' ? 'btn-danger' : 'btn-outline-danger'}`}
                                    onClick={() => applyStockFilter('out')}
                                >
                                    <FiBox className="me-1" />
                                    Out of Stock
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Invoice ID</th>
                                        <th>Product ID</th>
                                        <th>Sale Date</th>
                                        <th>Product Name</th>
                                        <th>Sale Price</th>
                                        <th>Quantity</th>
                                        <th>Sale Amount</th>
                                        <th>Stock Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((prod, index) => {
                                            const lowStock = isLowStock(prod.productID);
                                            const outOfStock = isOutOfStock(prod.productID);
                                            
                                            return (
                                                <tr key={prod._id} className="table-row">
                                                    <td className="fw-bold">{index+1}</td>
                                                    <td><span className="badge bg-light text-dark">{prod.invoiceID}</span></td>
                                                    <td><span className="badge bg-info">{prod.productID}</span></td>
                                                    <td>{parseDate(prod.date)}</td>
                                                    <td className="fw-medium">{prod.productName}</td>
                                                    <td>${prod.productSalePrice}</td>
                                                    <td><span className="badge bg-secondary">{prod.squareFootOrQuantity}</span></td>
                                                    <td className="fw-bold text-success">${(prod.productSalePrice * prod.squareFootOrQuantity).toLocaleString()}</td>
                                                    <td>
                                                        {outOfStock ? (
                                                            <span className="badge bg-danger">Out of Stock</span>
                                                        ) : lowStock ? (
                                                            <span className="badge bg-warning">Low Stock</span>
                                                        ) : (
                                                            <span className="badge bg-success">In Stock</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center py-5">
                                                {loading ? (
                                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                                        <div className="spinner-border text-primary mb-3" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <p className="text-muted">Loading sales data...</p>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                                        <FiBox size={48} className="text-muted mb-3" />
                                                        <p className="text-muted mb-1">No data available</p>
                                                        <small className="text-muted">Select a date range and click Search to load sales data</small>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {filteredProducts.length > 0 && (
                                    <tfoot className="table-footer">
                                        <tr>
                                            <td colSpan="7" className="text-end fw-bold">Totals:</td>
                                            <td className="fw-bold text-success">${totalSaleAmount.toLocaleString()}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;