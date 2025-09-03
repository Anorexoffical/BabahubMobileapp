import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import debounce from 'lodash.debounce';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375; // iPhone SE and similar small devices

// Calculate responsive values
const CARD_GAP = 15;
const CONTAINER_PADDING = Math.max(16, width * 0.04);
const CARD_WIDTH = (width - (CONTAINER_PADDING * 2) - CARD_GAP) / 2;

const featuredBrands = [
  {
    name: 'Nike',
    products: 265,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
  },
  {
    name: 'Adidas',
    products: 95,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
  },
  {
    name: 'Kenwood',
    products: 36,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Kenwood_logo.svg',
  },
  {
    name: 'IKEA',
    products: 36,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/IKEA_logo.svg',
  },
  {
    name: 'Samsung',
    products: 142,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  },
];

const StoreScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // For server-side search loading state
  const router = useRouter();

  // API base URL - replace with your actual API endpoint
  const API_BASE_URL = 'http://localhost:3001'; // Change this to your actual API URL

  // Fetch products from backend API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      Alert.alert('Error', 'Failed to load products. Please try again later.');
      
      // Fallback to mock data if API fails (for development)
      const mockProducts = [
        {
          _id: '1',
          name: 'Pant',
          brand: 'Engine',
          image: '/images/pant.jpg',
          variants: [{ sizes: [{ price: 50 }] }]
        },
        {
          _id: '2',
          name: 'Slipper',
          brand: 'Outfitter',
          image: '/images/slipper.jpg',
          variants: [{ sizes: [{ price: 10 }] }]
        },
        {
          _id: '3',
          name: 'Jacket',
          brand: 'J.',
          image: '/images/jacket.jpg',
          variants: [{ sizes: [{ price: 10 }] }]
        },
        {
          _id: '4',
          name: 'Hoodie',
          brand: 'Outfitter',
          image: '/images/hoodie.jpg',
          variants: [{ sizes: [{ price: 9.83 }] }]
        },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ========== SEARCH FUNCTIONALITY ==========
  

  const performClientSideSearch = (query) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredProducts(filtered);
  };

  /**
   * Server-side search function (for future implementation)
   * This will make an API call to your backend search endpoint
   * Uncomment and implement when your backend is ready
   */
  /*
  const performServerSideSearch = async (query) => {
    try {
      setSearchLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error searching products:', err);
      // Fall back to client-side search if server search fails
      performClientSideSearch(query);
    } finally {
      setSearchLoading(false);
    }
  };
  */

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      // Currently using client-side search
      performClientSideSearch(query);
      
      // When backend is ready, replace the above line with:
      // performServerSideSearch(query);
    }, 300),
    [products]
  );

  // Handle search text changes
  const handleSearchChange = (text) => {
    setSearchText(text);
    
    // If you want to clear search immediately when text is empty
    if (text.trim() === '') {
      setFilteredProducts(products);
    }
  };

  // Clear search and reset to all products
  const clearSearch = () => {
    setSearchText('');
    setFilteredProducts(products);
  };

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText, debouncedSearch]);

  // ========== END SEARCH FUNCTIONALITY ==========

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const addToCart = (productId) => {
    if (!cartItems.includes(productId)) {
      setCartItems([...cartItems, productId]);
    }
  };

  const handleProductPress = (product) => {
    router.push({
      pathname: '../ProductDetailPage',
      params: { id: product._id },
    });
  };

  const renderBrandCard = ({ item }) => (
    <TouchableOpacity style={styles.brandCard} activeOpacity={0.8}>
      <View style={styles.brandImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.brandImage} 
          resizeMode="contain"
        />
      </View>
      <Text style={styles.brandName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.brandProducts}>{item.products} products</Text>
    </TouchableOpacity>
  );
  
  const renderProductCard = ({ item }) => {
    // Safely get the price with fallbacks
    const price = item.variants?.[0]?.sizes?.[0]?.price || 
                 item.price || 
                 item.variants?.[0]?.price || 
                 0;

    // Handle image URL - use placeholder if image is not available
    let imageUri = `https://via.placeholder.com/150/cccccc/ffffff?text=${encodeURIComponent(item.name)}`;
    if (item.image) {
      if (item.image.startsWith('http')) {
        imageUri = item.image;
      } else if (item.image.startsWith('/')) {
        imageUri = `${API_BASE_URL}${item.image}`;
      }
    }

    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleWishlist(item._id)}
        >
          <Ionicons
            name={wishlist.includes(item._id) ? "heart" : "heart-outline"}
            size={isSmallScreen ? 18 : 20}
            color={wishlist.includes(item._id) ? "#ff4757" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleProductPress(item)} activeOpacity={0.8}>
          <View style={styles.productImageContainer}>
            <Image 
              source={{ uri: imageUri }}
              style={styles.productImage} 
              resizeMode="cover"
              onError={(e) => {
                console.log('Image load error:', e.nativeEvent.error);
                // You could set a default image here if needed
              }}
            />
          </View>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productBrand} numberOfLines={1}>{item.brand || 'Unknown Brand'}</Text>
          <View style={styles.priceAddContainer}>
            <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleProductPress(item)}
            >
              <Ionicons name="eye-outline" size={isSmallScreen ? 18 : 20} color="#fff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2f3542" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Discover Products</Text>
          <TouchableOpacity style={styles.cartIcon} activeOpacity={0.7}>
            <Ionicons name="cart-outline" size={isSmallScreen ? 22 : 24} color="#000" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ========== SEARCH BAR ========== */}
        <View style={styles.searchContainer}>
          <Ionicons 
            name="search" 
            size={isSmallScreen ? 18 : 20} 
            color="#aaa" 
            style={styles.searchIcon} 
          />
          <TextInput
            placeholder="Search for products, brands..."
            placeholderTextColor="#aaa"
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearchChange}
            accessibilityLabel="Search for products and brands"
            accessibilityHint="Type to search for products and brands"
            returnKeyType="search"
            onSubmitEditing={() => debouncedSearch(searchText)}
          />
          {searchLoading ? (
            <ActivityIndicator size="small" color="#aaa" style={styles.clearIcon} />
          ) : searchText.length > 0 ? (
            <TouchableOpacity 
              onPress={clearSearch} 
              style={styles.clearIcon}
              activeOpacity={0.7}
              accessibilityLabel="Clear search"
              accessibilityHint="Clears the search input"
            >
              <Ionicons name="close-circle" size={isSmallScreen ? 18 : 20} color="#aaa" />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* ========== END SEARCH BAR ========== */}

        {/* Featured Brands Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Brands</Text>
            <TouchableOpacity activeOpacity={0.7} accessibilityLabel="View all brands">
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredBrands}
            renderItem={renderBrandCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.brandList}
          />
        </View>

        {/* Recommended Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchText ? `Search Results for "${searchText}"` : 'Recommended For You'}
            </Text>
            {!searchText && (
              <TouchableOpacity activeOpacity={0.7} accessibilityLabel="View all recommended products">
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {searchLoading ? (
            <View style={styles.loadingState}>
              <ActivityIndicator size="large" color="#2f3542" />
              <Text style={styles.loadingText}>Searching products...</Text>
            </View>
          ) : filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={isSmallScreen ? 40 : 50} color="#ccc" />
              <Text style={styles.emptyStateText}>No products found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try different search terms or browse our categories
              </Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {filteredProducts.map((item, index) => (
                <View 
                  key={item._id || index} 
                  style={[
                    styles.productCardWrapper,
                    index % 2 === 0 ? { paddingRight: CARD_GAP / 2 } : { paddingLeft: CARD_GAP / 2 }
                  ]}
                >
                  {renderProductCard({ item })}
                </View>
              ))}
            </View>
          )}
        </View>

        {!searchText && (
          <>
            {/* Banner */}
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>Summer Sale</Text>
              <Text style={styles.bannerText}>Up to 50% off on selected items</Text>
              <TouchableOpacity 
                style={styles.bannerButton} 
                activeOpacity={0.7}
                accessibilityLabel="Shop summer sale"
                accessibilityHint="Navigate to summer sale products"
              >
                <Text style={styles.bannerButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>

            {/* Top Selling Products Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Selling Products</Text>
                <TouchableOpacity activeOpacity={0.7} accessibilityLabel="View all top selling products">
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.productGrid}>
                {[...products].reverse().slice(0, 4).map((item, index) => (
                  <View 
                    key={item._id || index} 
                    style={[
                      styles.productCardWrapper,
                      index % 2 === 0 ? { paddingRight: CARD_GAP / 2 } : { paddingLeft: CARD_GAP / 2 }
                    ]}
                  >
                    {renderProductCard({ item })}
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain the same as in your previous code with some additions
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: CONTAINER_PADDING,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  heading: {
    fontSize: width < 375 ? 24 : 28,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  cartIcon: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff6b81',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 12,
  },
  clearIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: width < 375 ? 14 : 16,
    color: '#2f3542',
    height: 24,
    paddingVertical: 0,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: width < 375 ? 18 : 20,
    fontWeight: '700',
    color: '#2f3542',
  },
  seeAll: {
    fontSize: width < 375 ? 12 : 14,
    color: '#57606f',
    fontWeight: '500',
  },
  brandList: {
    paddingVertical: 5,
  },
  brandCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    width: width * 0.36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  brandImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f1f2f6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandImage: {
    width: 35,
    height: 35,
  },
  brandName: {
    fontSize: width < 375 ? 14 : 16,
    fontWeight: '600',
    color: '#2f3542',
    marginBottom: 4,
    textAlign: 'center',
    maxWidth: '100%',
  },
  brandProducts: {
    fontSize: width < 375 ? 10 : 12,
    color: '#747d8c',
    textAlign: 'center',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -CARD_GAP / 2,
  },
  productCardWrapper: {
    width: '50%',
    marginBottom: CARD_GAP,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  productImageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.8,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f1f2f6',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: width < 375 ? 13 : 15,
    fontWeight: '600',
    color: '#2f3542',
    marginBottom: 6,
    height: 40,
    lineHeight: 20,
  },
  productBrand: {
    fontSize: width < 375 ? 11 : 13,
    color: '#747d8c',
    marginBottom: 8,
  },
  priceAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    fontSize: width < 375 ? 14 : 16,
    fontWeight: '700',
    color: '#2f3542',
  },
  viewButton: {
    backgroundColor: '#2f3542',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  banner: {
    backgroundColor: '#70a1ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#70a1ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  bannerTitle: {
    fontSize: width < 375 ? 18 : 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bannerText: {
    fontSize: width < 375 ? 14 : 16,
    color: '#fff',
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerButtonText: {
    color: '#70a1ff',
    fontSize: width < 375 ? 12 : 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: width < 375 ? 16 : 18,
    fontWeight: '600',
    color: '#2f3542',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: width < 375 ? 12 : 14,
    color: '#747d8c',
    textAlign: 'center',
  },
  // New styles for search loading state
  loadingState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 10,
  },
  loadingText: {
    fontSize: width < 375 ? 14 : 16,
    color: '#747d8c',
    marginTop: 16,
  },
});

export default StoreScreen;