import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const banners = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Summer Collection',
    subtitle: 'Up to 40% off on selected items',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'New Arrivals',
    subtitle: 'Discover the latest trends',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Exclusive Deals',
    subtitle: 'Limited time offers only for you',
  },
];

// Banner item component
const BannerItem = ({ item, router }) => (
  <View style={styles.bannerItem}>
    <Image source={{ uri: item.image }} style={styles.bannerImage} />
    <View style={styles.bannerOverlay}>
      <Text style={styles.bannerTitle}>{item.title}</Text>
      <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => router.push('StoreScreen')}
      >
        <Text style={styles.bannerButtonText}>Explore Now →</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Product Item Component
const ProductItem = ({ item, onPress, onWishlistToggle, isInWishlist }) => {
  // Safely handle price with fallback - using the API structure
  const price = item.variants?.[0]?.sizes?.[0]?.price || 0;
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: `http://localhost:3001${item.image}` }} 
          style={styles.image}
          resizeMode="cover" 
          defaultSource={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }}
        />

        <TouchableOpacity
          style={styles.heartIcon}
          onPress={(e) => {
            e.stopPropagation();
            onWishlistToggle(item);
          }}
        >
          <Ionicons
            name={isInWishlist ? 'heart' : 'heart-outline'}
            size={24}
            color={isInWishlist ? '#FF6B6B' : 'rgba(0,0,0,0.7)'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>{item.brand || 'Unknown Brand'}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{item.name || 'Unnamed Product'}</Text>
        <View style={styles.priceTopRow}>
          <View>
            <Text style={styles.price}>${(price).toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.viewDetailButton}
            onPress={(e) => {
              e.stopPropagation();
              onPress(item);
            }}
          >
            <Ionicons name="eye" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const bannerRef = useRef(null);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          const cartItems = JSON.parse(cartData);
          setCartItems(cartItems.length);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistData = await AsyncStorage.getItem('wishlist');
        if (wishlistData) {
          setWishlist(JSON.parse(wishlistData));
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/products/featured');
        const data = await response.json();
        
        // Use the API data directly without modifying the structure
        setProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        // Fallback data for testing with the same structure as API
        setProducts([
          {
            _id: '1',
            name: 'Sample Product',
            brand: 'Sample Brand',
            image: '/images/sample.jpg',
            variants: [{ sizes: [{ price: 29.99 }] }]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const onViewRef = useRef(({ changed }) => {
    if (changed && changed[0]?.index !== undefined) {
      setCurrentBannerIndex(changed[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleProductPress = (product) => {
    router.push({
      pathname: 'ProductDetailPage',
      params: { id: product._id },
    });
  };

  const toggleWishlist = async (product) => {
    try {
      // Get price from API structure
      const price = product.variants?.[0]?.sizes?.[0]?.price || 0;
      
      // Create a wishlist item with consistent structure
      const wishlistItem = {
        id: product._id,
        title: product.name,
        brand: product.brand,
        image: `http://localhost:3001${product.image}`,
        price: price
      };

      const storedWishlist = await AsyncStorage.getItem('wishlist');
      let currentWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

      const isInWishlist = currentWishlist.some(item => item.id === wishlistItem.id);
      
      if (isInWishlist) {
        currentWishlist = currentWishlist.filter(item => item.id !== wishlistItem.id);
        Toast.show({
          type: 'info',
          text1: 'Removed from Wishlist',
          text2: `${wishlistItem.title} removed`,
          visibilityTime: 2000,
        });
      } else {
        currentWishlist.push(wishlistItem);
        Toast.show({
          type: 'success',
          text1: 'Added to Wishlist',
          text2: `${wishlistItem.title} added`,
          visibilityTime: 2000,
        });
      }
      
      await AsyncStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      setWishlist(currentWishlist);
    } catch (error) {
      console.error('Wishlist update failed', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update wishlist',
        visibilityTime: 2000,
      });
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const renderProductItem = ({ item, index }) => {
    const productInWishlist = isInWishlist(item._id);
    
    return (
      <ProductItem 
        item={item}
        onPress={handleProductPress}
        onWishlistToggle={toggleWishlist}
        isInWishlist={productInWishlist}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => router.push(user?.isLoggedIn ? 'ProfileScreen' : 'ProfileScreen')}
            >
              <Image
                source={{ uri: user?.profileImage || 'https://ui-avatars.com/api/?name=' + (user?.name || 'Guest') + '&background=random' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcome}>Hello, Welcome 👋</Text>
              <Text style={styles.username}>{user?.name || "Guest"}</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.wishlistIcon}
              onPress={() => router.push('WishlistScreen')}
            >
              <Ionicons
                name={wishlist.length > 0 ? 'heart' : 'heart-outline'}
                size={24}
                color={wishlist.length > 0 ? '#FF6B6B' : 'black'}
              />
              {wishlist.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{wishlist.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartIcon}
              onPress={() => router.push('CartScreen')}
            >
              <Ionicons name="cart-outline" size={24} color="black" />
              {cartItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {['All Items', 'Dress', 'T-Shirt', 'Jackets', 'Accessories', 'Shoes'].map((cat, i) => (
            <TouchableOpacity
              key={cat}
              style={i === 0 ? styles.categoryButtonActive : styles.categoryButton}
              onPress={() => {
                console.log(`Selected category: ${cat}`);
              }}
            >
              <Text style={i === 0 ? styles.categoryTextActive : styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <FlatList
            ref={bannerRef}
            data={banners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <BannerItem item={item} router={router} />}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          <View style={styles.bannerPagination}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: currentBannerIndex === index ? '#fff' : 'rgba(255,255,255,0.5)',
                    width: currentBannerIndex === index ? 16 : 8,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Featured Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => setShowAllProducts(!showAllProducts)}>
            <Text style={styles.seeAll}>{showAllProducts ? 'Show Less' : 'See All'}</Text>
          </TouchableOpacity>
        </View>

        {/* Products */}
        {products.length > 0 ? (
          <FlatList
            data={showAllProducts ? products : products.slice(0, 6)}
            renderItem={renderProductItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.list}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={5}
          />
        ) : (
          <View style={styles.noProductsContainer}>
            <Ionicons name="alert-circle-outline" size={50} color="#ccc" />
            <Text style={styles.noProductsText}>No products available</Text>
          </View>
        )}
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: width * 0.05,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noProductsText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    marginRight: width * 0.03,
  },
  welcomeContainer: {
    flexDirection: 'column',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistIcon: {
    position: 'relative',
    width: width * 0.1,
    height: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cartIcon: {
    position: 'relative',
    width: width * 0.1,
    height: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F8F9FA',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: width * 0.035,
    color: '#666',
  },
  username: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  categoriesScroll: {
    paddingBottom: height * 0.01,
  },
  categoryButton: {
    paddingHorizontal: width * 0.045,
    paddingVertical: height * 0.012,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: width * 0.025,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categoryButtonActive: {
    paddingHorizontal: width * 0.045,
    paddingVertical: height * 0.012,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginRight: width * 0.025,
  },
  categoryText: {
    color: '#666',
    fontSize: width * 0.035,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontSize: width * 0.035,
  },
  bannerContainer: {
    height: height * 0.22,
    marginBottom: height * 0.03,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerItem: {
    width: width - (width * 0.1),
    position: 'relative',
  },
  bannerImage: {
    width: width - (width * 0.1),
    height: height * 0.22,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: width * 0.05,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bannerTitle: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: width * 0.035,
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.035,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#1A1A1A',
    fontSize: width * 0.035,
    fontWeight: '600',
  },
  bannerPagination: {
    position: 'absolute',
    bottom: height * 0.015,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#666',
    fontSize: width * 0.035,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  list: {
    paddingBottom: height * 0.03,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: height * 0.02,
    // Use Platform-specific shadow handling
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }
    }),
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  imageContainer: {
    position: 'relative',
    height: height * 0.2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 6,
    // Use Platform-specific shadow handling
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      }
    }),
  },
  cardContent: {
    padding: width * 0.035,
  },
  brandContainer: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4B5563',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  price: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#111827',
  },
  viewDetailButton: {
    backgroundColor: '#000000',
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    // Use Platform-specific shadow handling
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }
    }),
  },
  priceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default HomeScreen;