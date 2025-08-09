import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiStar, FiImage, FiDollarSign } from 'react-icons/fi';
import { Modal, Button, Spinner, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';

const AddProduct = ({ show, onHide }) => {

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    isFeatured: false,
    image: '',
    variants: [{
      color: '',
      colorCode: '#6c757d',
      // images: [],
      sizes: [{ size: '', stock: 0, price: 0 }]
    }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleToggleFeatured = () => {
    setNewProduct(prev => ({ ...prev, isFeatured: !prev.isFeatured }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index][field] = value;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[variantIndex].sizes[sizeIndex][field] = value;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const addVariant = () => {
    setNewProduct({
      ...newProduct,
      variants: [
        ...newProduct.variants,
        {
          color: '',
          colorCode: '#6c757d',
          // images: [],
          sizes: [{ size: '', stock: 0, price: 0 }]
        }
      ]
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants.splice(index, 1);
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const removeSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[variantIndex].sizes.splice(sizeIndex, 1);
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setSuccessMessage(`Product "${newProduct.name}" saved successfully!`);
  //     setTimeout(() => {
  //       setSuccessMessage('');
  //       onHide();
  //       resetForm();
  //     }, 2000);
  //   } catch (error) {
  //     console.error('Error saving product:', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const response = await axios.post('http://localhost:3001/api/products', newProduct);

    console.log('Product added:', response.data);
    setSuccessMessage(`Product "${response.data.name}" saved successfully!`);

    setTimeout(() => {
      setSuccessMessage('');
      onHide();
      resetForm();
    }, 2000);
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Error adding product. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      brand: '',
      category: '',
      isFeatured: false,
      variants: [{
        color: '',
        colorCode: '#6c757d',
        // images: [],
        sizes: [{ size: '', stock: 0, price: 0 }]
      }]
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable className="product-modal">
      <Modal.Header closeButton={!isSubmitting} className="bg-white border-bottom-0">
        <Modal.Title className="fw-bold text-primary">
          <span className="d-flex align-items-center gap-2">
            <FiPlus className="text-primary" size={24} />
            <span>Add New Product</span>
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        {successMessage && (
          <Alert variant="success" className="mb-4 border-0 shadow-sm" onClose={() => setSuccessMessage('')} dismissible>
            <div className="d-flex align-items-center">
              <FiStar className="me-2" size={18} />
              {successMessage}
            </div>
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit} className="product-form">
          {/* Basic Information Section */}
          <div className="mb-5">
            <div className="d-flex align-items-center mb-4">
              <div className="section-icon bg-primary bg-opacity-10 text-primary p-2 rounded-circle me-3">
                <FiImage size={20} />
              </div>
              <h4 className="fw-bold mb-0">Basic Information</h4>
            </div>
            
            <Row className="g-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted mb-2">Product Name *</Form.Label>
                  <Form.Control 
                    name="name" 
                    value={newProduct.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter product name"
                    className="border-2 py-2 px-3"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted mb-2">Brand *</Form.Label>
                  <Form.Control 
                    name="brand" 
                    value={newProduct.brand} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter brand name"
                    className="border-2 py-2 px-3"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted mb-2">Category *</Form.Label>
                  <Form.Control 
                    name="category" 
                    value={newProduct.category} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter category"
                    className="border-2 py-2 px-3"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Form.Check 
                  type="switch"
                  id="featured-product-switch"
                  label={<span className="fw-medium text-muted">Featured Product</span>}
                  checked={newProduct.isFeatured}
                  onChange={handleToggleFeatured}
                  className="ms-2"
                />
                {newProduct.isFeatured && (
                  <Badge bg="warning" className="ms-2 d-flex align-items-center">
                    <FiStar size={14} className="me-1" /> Featured
                  </Badge>
                )}
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-medium text-muted mb-2">Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name="description" 
                    value={newProduct.description} 
                    onChange={handleInputChange} 
                    placeholder="Enter detailed product description..."
                    className="border-2 py-2 px-3"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Variants Section */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <div className="section-icon bg-primary bg-opacity-10 text-primary p-2 rounded-circle me-3">
                  <FiPlus size={20} />
                </div>
                <h4 className="fw-bold mb-0">Product Variants</h4>
              </div>
              <Button 
                variant="outline-primary" 
                size="sm" 
                onClick={addVariant}
                className="d-flex align-items-center gap-1"
              >
                <FiPlus size={16} /> Add More Variant
              </Button>
            </div>

            {newProduct.variants.map((variant, index) => (
              <div key={index} className="mb-4 p-4 border rounded position-relative bg-white shadow-sm">
                {newProduct.variants.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-3"
                    onClick={() => removeVariant(index)}
                    disabled={isSubmitting}
                  >
                    <FiTrash2 size={14} />
                  </Button>
                )}
                
                <div className="d-flex align-items-center mb-3">
                  <div className="color-preview me-2" style={{ 
                    backgroundColor: variant.colorCode, 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%',
                    border: '1px solid #dee2e6'
                  }} />
                  <h6 className="mb-0 text-muted fw-medium">Variant #{index + 1}</h6>
                </div>
                
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium text-muted mb-2">Color Name *</Form.Label>
                      <Form.Control 
                        value={variant.color} 
                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                        placeholder="e.g., Midnight Black, Ocean Blue"
                        required
                        className="border-2 py-2 px-3"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium text-muted mb-2">Color Code *</Form.Label>
                      <div className="d-flex align-items-center gap-3">
                        <Form.Control 
                          type="color" 
                          className="form-control-color p-0 border rounded"
                          value={variant.colorCode} 
                          onChange={(e) => handleVariantChange(index, 'colorCode', e.target.value)}
                          style={{ width: '50px', height: '50px' }}
                          required
                        />
                        <div className="text-muted small bg-light p-2 rounded">
                          Selected: <span className="fw-medium">{variant.colorCode}</span>
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4 pt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-medium text-muted mb-0">
                      <FiDollarSign className="me-2" size={16} />
                      Sizes & Pricing
                    </h6>
                  </div>
                  
                  {variant.sizes.map((size, sIdx) => (
                    <Row key={sIdx} className="mb-3 align-items-end g-3">
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-muted mb-2">Size *</Form.Label>
                          <Form.Control
                            placeholder="e.g., S, M, L, XL"
                            value={size.size}
                            onChange={(e) => handleSizeChange(index, sIdx, 'size', e.target.value)}
                            required
                            className="border-2 py-2 px-3"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-muted mb-2">Stock *</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            placeholder="Available quantity"
                            value={size.stock}
                            onChange={(e) => handleSizeChange(index, sIdx, 'stock', parseInt(e.target.value || 0))}
                            required
                            className="border-2 py-2 px-3"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-muted mb-2">Price ($) *</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-2">$</span>
                            <Form.Control
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              value={size.price}
                              onChange={(e) => handleSizeChange(index, sIdx, 'price', parseFloat(e.target.value || 0))}
                              required
                              className="border-2 py-2 px-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        {variant.sizes.length > 1 && (
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="w-100 h-100 d-flex align-items-center justify-content-center"
                            onClick={() => removeSize(index, sIdx)}
                            disabled={isSubmitting}
                          >
                            <FiTrash2 size={14} />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="d-flex justify-content-between mt-5 pt-3 border-top">
            <Button 
              variant="outline-secondary" 
              onClick={onHide} 
              disabled={isSubmitting}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 fw-medium"
            >
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Saving Product...
                </>
              ) : (
                <>
                  <FiPlus className="me-2" size={18} />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProduct;