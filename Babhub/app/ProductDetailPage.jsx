import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
const { width } = Dimensions.get('window');

const products = [
  {
    id: '1',
    title: 'Modern Light Clothes',
    type: 'Premium T-Shirt',
    price: 212.99,
    discountPrice: 179.99,
    rating: 5.0,
    description: 'Crafted from organic cotton with a luxurious soft finish. The perfect balance of comfort and style for your everyday wardrobe. Features moisture-wicking technology and reinforced stitching for durability.',
    stockStatus: 'In Stock',
    brand: 'UrbanWear',
    discountPercentage: 15,
    image: require('../assets/images/product1.png'),
    colors: ['#3A5F0B', '#1E3A1A', '#000000'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: [
      { icon: 'leaf', color: '#4CAF50', text: 'Eco-friendly materials' },
      { icon: 'shirt', color: '#2196F3', text: 'Premium craftsmanship' },
      { icon: 'return-up-back', color: '#9C27B0', text: 'Easy 30-day returns' }
    ]
  },
  {
    id: '2',
    title: 'Light Dress Bless',
    type: 'Elegant Dress',
    price: 162.99,
    discountPrice: 139.99,
    rating: 4.5,
    description: 'An exquisite dress featuring delicate embroidery and a flattering silhouette. The lightweight fabric drapes beautifully while providing comfortable all-day wear.',
    stockStatus: 'In Stock',
    brand: 'FashionPlus',
    discountPercentage: 12,
    image: require('../assets/images/1.webp'),
    colors: ['#E6C9A8', '#5D4037', '#FFFFFF'],
    sizes: ['XS', 'S', 'M'],
    features: [
      { icon: 'flower', color: '#E91E63', text: 'Floral embroidery' },
      { icon: 'body', color: '#795548', text: 'Flattering silhouette' },
      { icon: 'sunny', color: '#FF9800', text: 'Lightweight fabric' }
    ]
  }
];

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [scaleValue] = useState(new Animated.Value(1));
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products.find(item => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const animatePress = (animationValue) => {
    Animated.spring(animationValue, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true
    }).start(() => {
      Animated.spring(animationValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      }).start();
    });
  };
const handleAddToCart = async () => {
  animatePress(scaleValue);

  const newItem = {
    id: product.id,
    title: product.title,
    type: product.type,
    price: product.discountPrice,
    image: product.image,
    color: product.colors[selectedColor],
    size: product.sizes[selectedSize],
    quantity: quantity
  };

  try {
    const storedCart = await AsyncStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = cart.findIndex(
      item => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
    );

    if (existingIndex >= 0) {
      // Item exists with same variation; just update quantity
      cart[existingIndex].quantity += newItem.quantity;
    } else {
      // New variation or product
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
    animatePress(scaleValue);
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      animatePress(scaleValue);
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image with Floating Elements */}
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
          
          {product.discountPercentage && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>
                {product.discountPercentage}% OFF
              </Text>
            </View>
          )}
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.canGoBack?.() ? router.back() : router.replace('/')}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF3E3E" : "#333"} 
            />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productType}>{product.type}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < Math.round(product.rating) ? 'star' : 'star-outline'}
                  size={20}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text style={styles.ratingText}>{product.rating.toFixed(1)} • 128 Reviews</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>${product.discountPrice.toFixed(2)}</Text>
            {product.discountPrice < product.price && (
              <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            )}
            <View style={styles.savingsTag}>
              <Text style={styles.savingsText}>
                Save ${(product.price - product.discountPrice).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Color Selection */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {product.colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === index && styles.selectedColorOption
                  ]}
                  onPress={() => setSelectedColor(index)}
                >
                  {selectedColor === index && (
                    <Ionicons name="checkmark" size={16} color="#FFF" style={styles.colorCheckmark} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Size</Text>
            <View style={styles.sizeOptions}>
              {product.sizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeOption,
                    selectedSize === index && styles.selectedSizeOption
                  ]}
                  onPress={() => setSelectedSize(index)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === index && styles.selectedSizeText
                  ]}>
                    {size}
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

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresContainer}>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name={feature.icon} size={20} color={feature.color} />
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity 
                onPress={handleDecrement}
                disabled={quantity <= 1}
                style={[
                  styles.quantityButton, 
                  styles.quantityButtonLeft,
                  quantity <= 1 && styles.disabledButton
                ]}
                activeOpacity={0.6}
              >
                <View style={styles.buttonInner}>
                  <Ionicons 
                    name="remove" 
                    size={22} 
                    color={quantity <= 1 ? '#aaa' : '#fff'} 
                  />
                </View>
              </TouchableOpacity>
              
              <Animated.View style={[styles.quantityDisplay, { transform: [{ scale: scaleValue }] }]}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </Animated.View>
              
              <TouchableOpacity 
                onPress={handleIncrement}
                style={[styles.quantityButton, styles.quantityButtonRight]}
                activeOpacity={0.6}
              >
                <View style={styles.buttonInner}>
                  <Ionicons name="add" size={22} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button (Fixed at bottom) */}
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity 
          onPress={handleAddToCart}
          disabled={product.stockStatus.toLowerCase() === 'out of stock'}
          style={[
            styles.addToCartButton,
            product.stockStatus.toLowerCase() === 'out of stock' && styles.disabledButton
          ]}
          activeOpacity={0.8}
        >
          <Ionicons 
            name="cart" 
            size={22} 
            color="white" 
            style={styles.cartIcon} 
          />
          <Text style={styles.buttonText}>
            {product.stockStatus.toLowerCase() === 'out of stock' 
              ? 'Out of Stock' 
              : `Add to Cart • $${(product.discountPrice * quantity).toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </Animated.View>
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