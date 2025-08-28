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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';



const { width } = Dimensions.get('window');


// Sample user data
const defaultUser = {
  isLoggedIn: false,
  name: 'Guest' ,
  profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
};


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

const HomeScreen = () => {
    const { user1 } = useAuth();


  const [cartItems, setCartItems] = useState(3);
  const [wishlist, setWishlist] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const router = useRouter();
  const bannerRef = useRef(null);

  const [products, setProducts] = useState([]);

  useEffect(() =>
  {
    const fetchFeaturedProducts = async () => {
    try {
      // const response = await fetch('http://localhost:3001/api/products/featured');
      const response = await fetch('https://f204f8e09b51.ngrok-free.app/api/products/featured');

      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
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
    const storedWishlist = await AsyncStorage.getItem('wishlist');
    let currentWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

    const isInWishlist = currentWishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      currentWishlist = currentWishlist.filter(item => item.id !== product.id);
      Toast.show({
        type: 'info',
        text1: 'Removed from Wishlist',
        text2: `${product.title} removed`,
        visibilityTime: 2000,
      });
    } else {
      currentWishlist.push(product);
      Toast.show({
        type: 'success',
        text1: 'Added to Wishlist',
        text2: `${product.title} added`,
        visibilityTime: 2000,
      });
    }
    await AsyncStorage.setItem('wishlist', JSON.stringify(currentWishlist));
    setWishlist(currentWishlist);
  } catch (error) {
    console.error('Wishlist update failed', error);
  }
};

const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const addToCart = (product) => {
    setCartItems(prev => prev + 1);
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.name} has been added to your cart`,
      visibilityTime: 2000,
    });
  };

  const renderProductItem = ({ item }) => {
    const price = item.variants?.[0]?.sizes?.[0]?.price ?? 0;

    return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handleProductPress(item)} 
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
         {/* For Android Emulator → use http://10.0.2.2:3001 */}
        {/* <Image source={{ uri: `http://localhost:3001${item.image}` }} */}
        <Image source={{ uri: `https://f3ae168b7043.ngrok-free.app${item.image}` }}

        
        style={styles.image} 
        resizeMode="cover" />

        {/* {item.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.discountPercentage}%</Text>
          </View>
        )} */}

        <TouchableOpacity
          style={styles.heartIcon}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(item);
          }}
        >
          <Ionicons
            name={isInWishlist(item.id) ? 'heart' : 'heart-outline'}
            size={24}
            color={isInWishlist(item.id) ? '#FF6B6B' : 'rgba(0,0,0,0.7)'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>{item.brand}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        {/* <Text style={styles.subtitle} numberOfLines={1}>{price}</Text> */}
        <View style={styles.priceTopRow}>
          <View>
            {/* {<Text style={styles.originalPrice}>${price.toFixed(2)}</Text>} */}
            <Text style={styles.price}>${(price).toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    );
};

  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <TouchableOpacity 
              onPress={() => router.push(user.isLoggedIn ? 'ProfileScreen' : 'LoginScreen')}
            >
              <Image 
                source={{ uri: user.profileImage }} 
                style={styles.profileImage} 
              />
            </TouchableOpacity>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcome}>Hello, Welcome 👋</Text>
              <Text style={styles.username}>{user1?.name || 'Guest'}</Text>
            </View>
          </View>
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

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesScroll}
        >
          {['All Items', 'Dress', 'T-Shirt', 'Jackets', 'Accessories', 'Shoes'].map((cat, i) => (
            <TouchableOpacity 
              key={i} 
              style={i === 0 ? styles.categoryButtonActive : styles.categoryButton}
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
        <FlatList
          data={showAllProducts ? products : products.slice(0, 4)}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
        />
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  welcomeContainer: {
    flexDirection: 'column',
  },
  cartIcon: {
    position: 'relative',
    width: 40,
    height: 40,
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
    fontSize: 14, 
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  username: { 
    fontSize: 20, 
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
  },
  categoriesScroll: {
    paddingBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categoryButtonActive: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: { 
    color: '#666',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  categoryTextActive: { 
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  bannerContainer: {
    height: 180,
    marginBottom: 25,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerItem: {
    width: width - 40,
    position: 'relative',
  },
  bannerImage: {
    width: width - 40,
    height: 180,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Inter-Bold',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  bannerPagination: {
    position: 'absolute',
    bottom: 15,
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
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  seeAll: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    overflow: 'hidden',
  },
  image: { 
    width: '100%', 
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    padding: 14,
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
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: { 
    fontSize: 15, 
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: { 
    fontSize: 12, 
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Regular',
  },
  price: { 
    fontSize: 16, 
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  rating: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  addToCartButton: {
    backgroundColor: '#111827',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default HomeScreen;