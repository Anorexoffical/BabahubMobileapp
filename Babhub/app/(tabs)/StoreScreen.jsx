import React, { useState } from 'react';
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

const recommendedProducts = [
  {
    id: 1,
    name: 'Green Nike sports shoe',
    brand: 'Nike',
    price: '$122.6',
    discount: '78%',
    rating: 4.8,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3a2f1a32-4a8d-4978-b173-8434707b1e5e/air-zoom-pegasus-39-road-running-shoes-BpCggh.png',
  },
  {
    id: 2,
    name: 'Nike Air Jordan Shoes',
    brand: 'Nike',
    price: '$35.0',
    discount: '14%',
    rating: 4.5,
    image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2fd03263-44b4-4078-b9b5-d3535717c077/air-jordan-1-mid-mens-shoes-b3js2T.png',
  },
  {
    id: 3,
    name: 'Adidas Running Shoes',
    brand: 'Adidas',
    price: '$120.0',
    discount: '25%',
    rating: 4.7,
    image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/6f4d8a9a5d9b4b4c8f5aad5300f5f8f_9366/Ultraboost_Light_Shoes_Black_HP9205_01_standard.jpg',
  },
  {
    id: 4,
    name: 'IKEA Desk Lamp',
    brand: 'IKEA',
    price: '$29.99',
    discount: '10%',
    rating: 4.2,
    image: 'https://www.ikea.com/us/en/images/products/tradfri-led-bulb-e26-806-lumen-wireless-dimmable-warm-white-globe-clear__0981569_pe815033_s5.jpg',
  },
];

const StoreScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

  const renderBrandCard = ({ item }) => (
    <TouchableOpacity style={styles.brandCard} activeOpacity={0.8}>
      <View style={styles.brandImageContainer}>
        <Image source={{ uri: item.image }} style={styles.brandImage} />
      </View>
      <Text style={styles.brandName}>{item.name}</Text>
      <Text style={styles.brandProducts}>{item.products} products</Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }) => (
    <View style={styles.productCard}>
      {item.discount && (
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>{item.discount} OFF</Text>
        </View>
      )}
      <TouchableOpacity 
        style={styles.heartIcon}
        onPress={() => toggleWishlist(item.id)}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={wishlist.includes(item.id) ? "heart" : "heart-outline"} 
          size={20} 
          color={wishlist.includes(item.id) ? "#ff4757" : "#000"} 
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
      <View style={styles.priceAddContainer}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => addToCart(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

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
          data={recommendedProducts}
          renderItem={renderProductCard}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
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
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recommendedProducts.slice().reverse()}
          renderItem={renderProductCard}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
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
