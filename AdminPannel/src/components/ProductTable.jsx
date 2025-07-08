import React, { useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
  FiTrash2
} from 'react-icons/fi';
import { Modal, Button, Spinner, Table, Form, Row, Col, Badge, Alert } from 'react-bootstrap';
import AddProductModal from './AddProduct.jsx';
import '../Style/ProductTable.css';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Nike Air Max',
      description: 'Comfortable running shoes',
      brand: 'Nike',
      category: 'Footwear',
      variants: [
        {
          color: 'Red',
          colorCode: '#FF0000',
          images: [],
          sizes: [
            { size: 'S', stock: 15, price: 120 },
            { size: 'M', stock: 20, price: 120 }
          ]
        },
        {
          color: 'Blue',
          colorCode: '#2563eb',
          images: [],
          sizes: [
            { size: 'S', stock: 8, price: 120 },
            { size: 'L', stock: 12, price: 125 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Adidas Ultraboost',
      description: 'Premium running shoes',
      brand: 'Adidas',
      category: 'Footwear',
      variants: [
        {
          color: 'Black',
          colorCode: '#000000',
          images: [],
          sizes: [
            { size: 'M', stock: 5, price: 180 },
            { size: 'L', stock: 3, price: 180 }
          ]
        }
      ]
    }
  ]);

  const productsPerPage = 8;

  const handleAddProduct = (product) => {
    setIsSubmitting(true);

    setTimeout(() => {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const addedProduct = {
        ...product,
        id: newId,
        date: new Date().toLocaleDateString()
      };

      setProducts([...products, addedProduct]);
      setIsSubmitting(false);
      setShowAddModal(false);
      setSuccessMessage(`Product "${addedProduct.name}" added successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
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

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <div className="d-flex justify-content-between align-items-start mb-4">
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
              
              <h5 className="fw-bold mb-3">Available Variants</h5>
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="dashboard-header">
        <div>
          <h1 className="fw-bold mb-2">Product Inventory</h1>
          <p className="text-muted mb-0">Manage your product catalog and inventory</p>
        </div>
        <div className="header-actions">
          <div className="search-container">
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
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="add-product-btn">
            <FiPlus className="me-1" /> Add Product
          </Button>
        </div>
      </div>

      <div className="table-container mt-3">
        <Table hover responsive className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Status</th>
              <th>Stock</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <tr key={product.id} className="align-middle">
                  <td>
                    <div className="d-flex flex-column">
                      <strong className="product-name">{product.name}</strong>
                      <small className="text-muted">{product.description.substring(0, 50)}</small>
                    </div>
                  </td>
                  <td>
                    <Badge bg={getStatusVariant(product.variants)} className="fs-6">
                      {getProductStatus(product.variants)}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span>{calculateTotalStock(product.variants)}</span>
                      {product.variants.length > 1 && (
                        <span className="text-muted small">({product.variants.length} variants)</span>
                      )}
                    </div>
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
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

      {filteredProducts.length > 0 && (
        <div className="pagination-controls mt-4">
          <Button 
            variant="outline-secondary" 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="d-flex align-items-center"
          >
            <FiChevronLeft /> Prev
          </Button>
          
          <div className="d-flex gap-1">
            {[...Array(totalPages).keys()].map(i => (
              <Button 
                key={i + 1} 
                variant={currentPage === i + 1 ? 'primary' : 'outline-secondary'} 
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button 
            variant="outline-secondary" 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="d-flex align-items-center"
          >
            Next <FiChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;