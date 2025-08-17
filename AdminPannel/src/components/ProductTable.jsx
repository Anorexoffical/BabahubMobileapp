import React, { useEffect, useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal
} from 'react-icons/fi';
import { Modal, Button, Table, Badge, Alert } from 'react-bootstrap';
import AddProductModal from './AddProduct.jsx';
import '../Style/ProductTable.css';
import Topbar from './Topbar.jsx';
import axios from 'axios';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetchProducts();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const productsPerPage = 8;

  const handleAddProduct = async (product) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/products', product);
      setProducts([...products, res.data]);
      setShowAddModal(false);
      setSuccessMessage(`Product "${res.data.name}" added successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error adding product:', err);
    }
    setIsSubmitting(false);
  };

  const calculateTotalStock = (variants) => {
    return variants.reduce((total, v) =>
      total + v.sizes.reduce((sum, s) => sum + s.stock, 0), 0);
  };

  const getProductStatus = (variants) => {
    const total = calculateTotalStock(variants);
    if (total === 0) return 'Out of Stock';
    if (total < 10) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusVariant = (variants) => {
    const total = calculateTotalStock(variants);
    if (total === 0) return 'danger';
    if (total < 10) return 'warning';
    return 'success';
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  return (
    <>
      <Topbar />

      <div className="product-dashboard">
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible className="fade-in">
            {successMessage}
          </Alert>
        )}

        <AddProductModal 
          show={showAddModal} 
          onHide={() => !isSubmitting && setShowAddModal(false)} 
          onAddProduct={handleAddProduct}
          isSubmitting={isSubmitting}
        />

        {/* Product Details Modal */}
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
          <Modal.Header closeButton className="bg-light">
            <Modal.Title className="fw-bold">Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-2">
                  <div>
                    <h4 className="fw-bold mb-1">{selectedProduct.name}</h4>
                    <div className="d-flex gap-3 text-muted">
                      <span>{selectedProduct.brand}</span>
                      <span>•</span>
                      <span>{selectedProduct.category}</span>
                    </div>
                  </div>
                  <Badge bg={getStatusVariant(selectedProduct.variants)} className="fs-6">
                    {getProductStatus(selectedProduct.variants)}
                  </Badge>
                </div>
                
                {selectedProduct.image && (
                  <div className="mb-3">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      style={{ maxWidth: '200px', borderRadius: '8px' }} 
                    />
                  </div>
                )}

                <h5 className="fw-bold mb-3">Available Variants</h5>
                <div className="table-responsive">
                  <Table bordered hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Stock</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.variants.map((variant, vIdx) =>
                        variant.sizes.map((size, sIdx) => (
                          <tr key={`${vIdx}-${sIdx}`}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <span
                                  className="color-dot"
                                  style={{ backgroundColor: variant.colorCode }}
                                ></span>
                                {variant.color}
                              </div>
                            </td>
                            <td>{size.size}</td>
                            <td>
                              <Badge bg={size.stock === 0 ? 'danger' : size.stock < 5 ? 'warning' : 'success'}>
                                {size.stock}
                              </Badge>
                            </td>
                            <td className="fw-bold">${size.price.toFixed(2)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Dashboard Header */}
        <div className={`dashboard-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container-fluid">
            <div className="row align-items-center mb-3 mb-md-0">
              <div className="col-md-6 mb-3 mb-md-0">
                <h1 className="fw-bold mb-1">Product Inventory</h1>
                <p className="text-muted mb-0">Manage your product catalog and inventory</p>
              </div>

              <div className="col-md-6 d-flex flex-column flex-md-row gap-3">
                <div className="search-container flex-grow-1">
                  <FiSearch className="search-icon" />
                  <input 
                    className="search-input"
                    value={searchTerm} 
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }} 
                    placeholder="Search products..." 
                  />
                </div>
                
                <Button 
                  variant="primary" 
                  onClick={() => setShowAddModal(true)} 
                  className="add-product-btn"
                >
                  <FiPlus className="me-1" /> Add Product
                </Button>
              </div>
            </div>
            
            <div className="row g-3 mt-2">
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">{products.length}</div>
                  <div className="stat-label">Total Products</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">
                    {products.reduce((sum, p) => sum + calculateTotalStock(p.variants), 0)}
                  </div>
                  <div className="stat-label">Total Stock</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">
                    {products.filter(p => getProductStatus(p.variants) === 'In Stock').length}
                  </div>
                  <div className="stat-label">In Stock</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-value">
                    {products.filter(p => getProductStatus(p.variants) === 'Low Stock').length}
                  </div>
                  <div className="stat-label">Low Stock</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="container-fluid mt-4">
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <Table hover className="products-table mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Status</th>
                      <th className="d-none d-md-table-cell">Stock</th>
                      <th className="d-none d-lg-table-cell">Brand</th>
                      <th className="d-none d-lg-table-cell">Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.length > 0 ? (
                      currentProducts.map(product => (
                        <tr key={product._id} className="align-middle">
                          <td>
                            <div className="d-flex flex-column">
                              <strong className="product-name">{product.name}</strong>
                              <small className="text-muted">
                                {product.description ? product.description.substring(0, 50) : ''}
                              </small>
                            </div>
                          </td>
                          <td>
                            <Badge bg={getStatusVariant(product.variants)} className="fs-6">
                              {getProductStatus(product.variants)}
                            </Badge>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <div className="d-flex align-items-center gap-2">
                              <span>{calculateTotalStock(product.variants)}</span>
                              {product.variants.length > 1 && (
                                <span className="text-muted small">({product.variants.length} variants)</span>
                              )}
                            </div>
                          </td>
                          <td className="d-none d-lg-table-cell">{product.brand}</td>
                          <td className="d-none d-lg-table-cell">{product.category}</td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => openDetailsModal(product)}
                              className="d-flex align-items-center gap-1"
                            >
                              <FiMoreHorizontal /> Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <div className="py-3">
                            <FiSearch size={48} className="text-muted mb-3" />
                            <h5>No products found</h5>
                            <p className="text-muted">Try adjusting your search or add a new product</p>
                            <Button variant="primary" onClick={() => setShowAddModal(true)}>
                              <FiPlus className="me-1" /> Add Product
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 && (
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
      </div>
    </>
  );
};

export default ProductTable;
