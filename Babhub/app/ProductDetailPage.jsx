import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetch(`https://account.babahub.co/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching product detail:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Loading...</Text>
    </View>;
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const colors = product.variants.map(v => v.colorCode);
  const sizes = product.variants[selectedColorIndex]?.sizes || [];

  const selectedSizeObj = sizes[selectedSizeIndex] || { price: 0, stock: 0 };
  const price = selectedSizeObj.price;
  const stock = selectedSizeObj.stock;

  const handleAddToCart = async () => {
    const selectedVariant = product.variants[selectedColorIndex];
    const sizeObj = selectedVariant.sizes[selectedSizeIndex];

    const newItem = {
      id: product._id,
      title: product.name,
      image: product.image,
      color: selectedVariant.color,
      size: sizeObj.size,
      price: sizeObj.price,
      quantity
    };

    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];

      // Check if this exact variant already exists in cart
      const existingItemIndex = cart.findIndex(
        item => item.id === newItem.id && 
               item.color === newItem.color && 
               item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        // If item exists, just update the quantity (no limit for same item)
        cart[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Check if adding a new product would exceed the 4 unique product limit
        if (cart.length >= 4) {
          setShowLimitModal(true);
          return;
        }
        cart.push(newItem);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      
      // Reset quantity to 1
      setQuantity(1);
      
      // Navigate to cart screen
      router.push('/CartScreen');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Limit Modal */}
      <Modal
        visible={showLimitModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLimitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={50} color="#FF3E3E" />
            <Text style={styles.modalTitle}>Limit Reached</Text>
            <Text style={styles.modalText}>
              You can only add up to 4 different products to your cart.
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowLimitModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image
              source={{ uri: `https://account.babahub.co${product.image}` }}
              style={styles.productImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.noImage}><Text>No Image</Text></View>
          )}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.canGoBack?.() ? router.back() : router.replace('/')}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Details */}
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productType}>{product.brand}</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          {/* Color Selection */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColorIndex === index && styles.selectedColorOption
                  ]}
                  onPress={() => {
                    setSelectedColorIndex(index);
                    setSelectedSizeIndex(0);
                  }}
                >
                  {selectedColorIndex === index && (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Size</Text>
            <View style={styles.sizeOptions}>
              {sizes.map((sizeObj, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeOption,
                    selectedSizeIndex === index && styles.selectedSizeOption
                  ]}
                  onPress={() => setSelectedSizeIndex(index)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSizeIndex === index && styles.selectedSizeText
                  ]}>
                    {sizeObj.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity 
                onPress={handleDecrement} 
                disabled={quantity <= 1} 
                style={[styles.quantityButton, quantity <= 1 && styles.disabledQuantityButton]}
              >
                <Ionicons name="remove" size={22} color={quantity <= 1 ? "#999" : "#fff"} />
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity 
                onPress={handleIncrement} 
                disabled={quantity >= stock}
                style={[styles.quantityButton, quantity >= stock && styles.disabledQuantityButton]}
              >
                <Ionicons name="add" size={22} color={quantity >= stock ? "#999" : "#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <TouchableOpacity 
        onPress={handleAddToCart}
        disabled={stock <= 0}
        style={[styles.addToCartButton, stock <= 0 && styles.disabledButton]}
      >
        <Ionicons name="cart" size={22} color="white" style={styles.cartIcon} />
        <Text style={styles.buttonText}>
          {stock <= 0 ? 'Out of Stock' : `Add to Cart • $${(price * quantity).toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    marginBottom: 10,
    height: width * 0.9,
  },
  productImage: { 
    width: '100%', 
    height: '100%' 
  },
  noImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 8,
    zIndex: 3,
  },
  contentContainer: { 
    padding: 25,
    paddingBottom: 100
  },
  header: {
    marginBottom: 15,
  },
  productTitle: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#333',
    marginBottom: 5,
  },
  productType: {
    fontSize: 16,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '500',
  },
  priceContainer: { 
    marginBottom: 15,
  },
  price: { 
    fontSize: 30, 
    fontWeight: '700', 
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  optionSection: {
    marginBottom: 25,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#000',
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  sizeOption: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedSizeOption: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  selectedSizeText: {
    color: '#fff',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 15,
    color: '#333',
  },
  description: { 
    fontSize: 15, 
    color: '#666', 
    lineHeight: 24, 
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  quantityLabel: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#444',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '##e0e0e0',
  },
  quantityButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  disabledQuantityButton: {
    backgroundColor: '#ccc',
  },
  quantityDisplay: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600',
    marginLeft: 10,
  },
  cartIcon: {
    marginRight: 5,
  },
});

export default ProductDetailPage;