import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [scaleValue] = useState(new Animated.Value(1));
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/products/${id}`)
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

  const animatePress = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true
    }).start(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      }).start();
    });
  };

  const colors = product.variants.map(v => v.colorCode);
  const sizes = product.variants[selectedColorIndex]?.sizes || [];

  const selectedSizeObj = sizes[selectedSizeIndex] || { price: 0, stock: 0 };
  const price = selectedSizeObj.price;
  const stock = selectedSizeObj.stock;

  const handleAddToCart = async () => {
    animatePress();

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

      const existingIndex = cart.findIndex(
        item => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
      );

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += newItem.quantity;
      } else {
        if (cart.length >= 4) {
          Alert.alert('Limit Reached', 'You can only add up to 4 unique products.');
          return;
        }
        cart.push(newItem);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      router.push('/CartScreen');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart.');
    }
  };

  const handleIncrement = () => {
    animatePress();
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      animatePress();
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image
              source={{ uri: product.image }}
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
          
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF3E3E" : "#333"} 
            />
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
            <Text style={styles.originalPrice}>${price.toFixed(2)}</Text>
            <Text style={styles.price}>${(price).toFixed(2)}</Text>
            
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
              <TouchableOpacity onPress={handleDecrement} disabled={quantity <= 1} style={styles.quantityButton}>
                <Ionicons name="remove" size={22} color="#fff" />
              </TouchableOpacity>
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </Animated.View>
              <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                <Ionicons name="add" size={22} color="#fff" />
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
    position: 'relative'
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
    height: width * 0.9,
  },
  productImage: { 
    width: '100%', 
    height: '100%' 
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF3E3E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  discountBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 8,
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 60,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 8,
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  contentContainer: { 
    padding: 25,
    paddingBottom: 100 // Extra padding for the fixed button
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
  ratingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: { 
    fontSize: 15, 
    color: '#666',
    fontWeight: '500',
  },
  priceContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 12,
    fontSize: 16,
  },
  discountedPrice: { 
    fontSize: 30, 
    fontWeight: '700', 
    color: '#000',
    marginRight: 12,
  },
  savingsTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 5,
  },
  savingsText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
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
  colorCheckmark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 12,
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
  featuresContainer: {
    gap: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c4c4c',
  },
  quantityButtonLeft: {
    backgroundColor: 'transparent',
  },
  quantityButtonRight: {
    backgroundColor: 'transparent',
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
  buttonContainer: { 
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  addToCartButton: {
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