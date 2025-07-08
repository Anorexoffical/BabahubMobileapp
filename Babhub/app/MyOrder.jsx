import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // ✅ Use Expo Router

const dummyOrders = [
  {
    id: 'ORD-1001',
    orderDate: '2025-06-25',
    status: 'Delivered',
    items: ['Denim Jacket', 'Black Jeans'],
    total: 8200,
  },
  {
    id: 'ORD-1002',
    orderDate: '2025-06-22',
    status: 'Shipped',
    items: ['Casual Sneakers'],
    total: 5500,
  },
  {
    id: 'ORD-1003',
    orderDate: '2025-06-20',
    status: 'Processing',
    items: ['T-shirt', 'Cap', 'Wallet'],
    total: 3600,
  },
];

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Use router instead of navigation

  useEffect(() => {
    setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>#{item.id}</Text>
        <Text style={[styles.orderStatus, getStatusColor(item.status)]}>{item.status}</Text>
      </View>
      <Text style={styles.orderDate}>Date: {item.orderDate}</Text>
      <Text style={styles.orderItems}>Items: {item.items.join(', ')}</Text>
      <Text style={styles.orderTotal}>Total: PKR {item.total}</Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return { color: '#2a9d8f' };
      case 'Shipped':
        return { color: '#f4a261' };
      case 'Processing':
        return { color: '#e76f51' };
      default:
        return { color: '#888' };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#264653" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/ProfileScreen')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#264653" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#264653',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    elevation: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerSpacer: {
    width: 24,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fefefe',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#264653',
  },
  orderStatus: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
});
