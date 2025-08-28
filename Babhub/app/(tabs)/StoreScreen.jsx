import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

import { useRouter } from 'expo-router';


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
  const router = useRouter();

  // Fetching from backend
  useEffect(() => {
    // fetch('http://localhost:3001/api/products') 
        fetch('https://f3ae168b7043.ngrok-free.app/api/products') 

    
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);



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
        <Image source={{ uri: item.image }} 
        style={styles.brandImage} />
      </View>
      <Text style={styles.brandName}>{item.name}</Text>
      <Text style={styles.brandProducts}>{item.products} products</Text>
    </TouchableOpacity>
  );
  
  const renderProductCard = ({ item }) => {
    const price = item.variants?.[0]?.sizes?.[0]?.price ?? 0;

    return (
      <TouchableOpacity
        style={styles.productCard}
        // onPress={() => router.push(`/product/${item._id}`)}
        onPress={() => handleProductPress(item)} 
        activeOpacity={0.8}
      >
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleWishlist(item._id)}
        >
          <Ionicons
            name={wishlist.includes(item._id) ? "heart" : "heart-outline"}
            size={20}
            color={wishlist.includes(item._id) ? "#ff4757" : "#000"}
          />
        </TouchableOpacity>
        {/* <Image source={{ uri: `http://localhost:3001${item.image}` }} */}
         <Image source={{ uri: `https://f3ae168b7043.ngrok-free.app${item.image}` }}

        style={styles.productImage} />
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <View style={styles.priceAddContainer}>
          <Text style={styles.productPrice}>${price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item._id)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.heading}>Discover Products</Text>
        <TouchableOpacity style={styles.cartIcon} activeOpacity={0.7}>
          <Ionicons name="cart-outline" size={24} color="#000" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color="#aaa" 
          style={styles.searchIcon} 
        />
        <TextInput
          placeholder="Search for products, brands..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchText('')} 
            style={styles.clearIcon}
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Featured Brands Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Brands</Text>
          <TouchableOpacity activeOpacity={0.7}>
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
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={renderProductCard}
          numColumns={2}
          keyExtractor={(item) => item._id}
          columnWrapperStyle={styles.productList}
          scrollEnabled={false}
        />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Summer Sale</Text>
        <Text style={styles.bannerText}>Up to 50% off on selected items</Text>
        <TouchableOpacity style={styles.bannerButton} activeOpacity={0.7}>
          <Text style={styles.bannerButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>

      {/* Recently Viewed Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Selling Products</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[...products].reverse()}
          renderItem={renderProductCard}
          numColumns={2}
          keyExtractor={(item) => item._id}
          columnWrapperStyle={styles.productList}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
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
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#2f3542',
  },
  seeAll: {
    fontSize: 14,
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
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  brandImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#f1f2f6',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3542',
    marginBottom: 4,
    textAlign: 'center',
  },
  brandProducts: {
    fontSize: 12,
    color: '#747d8c',
    textAlign: 'center',
  },
  productList: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: width * 0.46,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2f3542',
    marginBottom: 6,
    height: 40,
    lineHeight: 20,
  },
  productBrand: {
    fontSize: 13,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#2f3542',
  },
  addButton: {
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
  discountTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ff6b81',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f1f2f6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: '#2f3542',
  },
  banner: {
    backgroundColor: '#70a1ff',
    borderRadius: 12,
    padding: 25,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bannerText: {
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: '600',
  },
});

export default StoreScreen;
