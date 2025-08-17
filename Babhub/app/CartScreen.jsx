// import React, { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Checkout from './Checkout';

// const MAX_UNIQUE_ITEMS = 4;

// const CartScreen = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const loadCartFromStorage = async () => {
//       const storedCart = await AsyncStorage.getItem('cart');
//       if (storedCart) setCartItems(JSON.parse(storedCart));
//     };
//     loadCartFromStorage();
//   }, []);

//   useEffect(() => {
//     if (params.newCartItem) {
//       const newItem = JSON.parse(params.newCartItem);

//       setCartItems(prevItems => {
//         const existingIndex = prevItems.findIndex(
//           item => item.id === newItem.id && 
//                    item.color === newItem.color && 
//                    item.size === newItem.size
//         );

//         if (existingIndex >= 0) {
//           const updatedItems = [...prevItems];
//           updatedItems[existingIndex].quantity += newItem.quantity;
//           AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//           return updatedItems;
//         } else {
//           if (prevItems.length >= MAX_UNIQUE_ITEMS) {
//             Alert.alert('Limit Reached', `You can only add up to ${MAX_UNIQUE_ITEMS} unique products.`);
//             return prevItems;
//           }
//           const updatedItems = [...prevItems, newItem];
//           AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//           return updatedItems;
//         }
//       });
//     }
//   }, [params.newCartItem]);

//   const removeItem = async (index) => {
//     const updatedItems = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedItems);
//     await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//   };

//   const updateQuantity = async (index, newQuantity) => {
//     if (newQuantity < 1) return;
//     const updatedItems = cartItems.map((item, i) =>
//       i === index ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedItems);
//     await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//   };

//   const calculateSubtotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const calculateTax = () => calculateSubtotal() * 0.1;
//   const calculateTotal = () => calculateSubtotal() + calculateTax();

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Cart</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView style={styles.scrollContainer}>
//         {cartItems.length > 0 ? (
//           <>
//             {cartItems.map((item, index) => (
//               <View key={`${item.id}-${index}`} style={styles.cartItem}>
//                 <Image source={item.image} style={styles.itemImage} />
//                 <View style={styles.itemDetails}>
//                   <Text style={styles.itemTitle}>{item.title}</Text>
//                   <Text style={styles.itemType}>{item.type}</Text>

//                   <View style={styles.itemAttributes}>
//                     <View style={styles.attribute}>
//                       <Text style={styles.attributeLabel}>Color: </Text>
//                       <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
//                     </View>
//                     <View style={styles.attribute}>
//                       <Text style={styles.attributeLabel}>Size: </Text>
//                       <Text style={styles.attributeValue}>{item.size}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.quantityContainer}>
//                     <TouchableOpacity 
//                       onPress={() => updateQuantity(index, item.quantity - 1)}
//                       style={styles.quantityButton}
//                     >
//                       <Ionicons name="remove" size={16} />
//                     </TouchableOpacity>

//                     <Text style={styles.quantityText}>{item.quantity}</Text>

//                     <TouchableOpacity 
//                       onPress={() => updateQuantity(index, item.quantity + 1)}
//                       style={styles.quantityButton}
//                     >
//                       <Ionicons name="add" size={16} />
//                     </TouchableOpacity>
//                   </View>

//                   <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
//                 </View>

//                 <TouchableOpacity 
//                   onPress={() => removeItem(index)}
//                   style={styles.removeButton}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#FF3E3E" />
//                 </TouchableOpacity>
//               </View>
//             ))}

//             <View style={styles.summaryContainer}>
//               <Text style={styles.summaryTitle}>Order Summary</Text>

//               <View style={styles.summaryRow}>
//                 <Text>Subtotal:</Text>
//                 <Text>${calculateSubtotal().toFixed(2)}</Text>
//               </View>

//               <View style={styles.summaryRow}>
//                 <Text>Shipping:</Text>
//                 <Text>Free</Text>
//               </View>

//               <View style={styles.summaryRow}>
//                 <Text>Tax (10%):</Text>
//                 <Text>${calculateTax().toFixed(2)}</Text>
//               </View>

//               <View style={styles.divider} />

//               <View style={[styles.summaryRow, { marginTop: 10 }]}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
//                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>${calculateTotal().toFixed(2)}</Text>
//               </View>
//             </View>
//           </>
//         ) : (
//           <View style={styles.emptyCart}>
//             <Ionicons name="cart-outline" size={60} color="#ccc" />
//             <Text style={styles.emptyText}>Your cart is empty</Text>
//             <TouchableOpacity 
//               style={styles.continueShopping}
//               onPress={() => router.replace('/')}
//             >
//               <Text style={styles.continueText}>Continue Shopping</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>

//       {cartItems.length > 0 && (
//         <TouchableOpacity 
//           style={styles.checkoutButton}
//           onPress={() => router.push('/Checkout')}
//         >
//           <Text style={styles.checkoutText}>Proceed to Checkout</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f5f5f5',
//     alignItems: 'center',
//   },
//   itemImage: {
//     width: 80,
//     height: 100,
//     marginRight: 15,
//     resizeMode: 'contain',
//     borderRadius: 8,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 2,
//   },
//   itemType: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   itemAttributes: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     gap: 15,
//   },
//   attribute: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   attributeLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   attributeValue: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   colorIndicator: {
//     width: 15,
//     height: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   quantityButton: {
//     padding: 4,
//   },
//   quantityText: {
//     marginHorizontal: 10,
//     fontWeight: '600',
//   },
//   itemPrice: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   removeButton: {
//     padding: 8,
//     alignSelf: 'flex-start',
//   },
//   summaryContainer: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: 15,
//   },
//   checkoutButton: {
//     backgroundColor: '#000',
//     marginHorizontal: 20,
//     marginBottom: 20,
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   emptyCart: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     marginVertical: 15,
//   },
//   continueShopping: {
//     backgroundColor: '#000',
//     padding: 12,
//     borderRadius: 8,
//   },
//   continueText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MAX_UNIQUE_ITEMS = 4;

// const CartScreen = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const loadCartFromStorage = async () => {
//       const storedCart = await AsyncStorage.getItem('cart');
//       if (storedCart) setCartItems(JSON.parse(storedCart));
//     };
//     loadCartFromStorage();
//   }, []);

//   useEffect(() => {
//     if (params.newCartItem) {
//       const newItem = JSON.parse(params.newCartItem);

//       setCartItems(prevItems => {
//         const existingIndex = prevItems.findIndex(
//           item => item.id === newItem.id && 
//                    item.color === newItem.color && 
//                    item.size === newItem.size
//         );

//         if (existingIndex >= 0) {
//           const updatedItems = [...prevItems];
//           updatedItems[existingIndex].quantity += newItem.quantity;
//           AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//           return updatedItems;
//         } else {
//           if (prevItems.length >= MAX_UNIQUE_ITEMS) {
//             Alert.alert('Limit Reached', `You can only add up to ${MAX_UNIQUE_ITEMS} unique products.`);
//             return prevItems;
//           }
//           const updatedItems = [...prevItems, newItem];
//           AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//           return updatedItems;
//         }
//       });
//     }
//   }, [params.newCartItem]);

//   const removeItem = async (index) => {
//     const updatedItems = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedItems);
//     await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//   };

//   const updateQuantity = async (index, newQuantity) => {
//     if (newQuantity < 1) return;
//     const updatedItems = cartItems.map((item, i) =>
//       i === index ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedItems);
//     await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
//   };

//   const calculateSubtotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const calculateTax = () => calculateSubtotal() * 0.1;
//   const calculateTotal = () => calculateSubtotal() + calculateTax();

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Cart</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView style={styles.scrollContainer}>
//         {cartItems.length > 0 ? (
//           <>
//             {cartItems.map((item, index) => (
//               <View key={`${item.id}-${index}`} style={styles.cartItem}>
//                 <Image source={item.image} style={styles.itemImage} />
//                 <View style={styles.itemDetails}>
//                   <Text style={styles.itemTitle}>{item.title}</Text>
//                   <Text style={styles.itemType}>{item.type}</Text>

//                   <View style={styles.itemAttributes}>
//                     <View style={styles.attribute}>
//                       <Text style={styles.attributeLabel}>Color: </Text>
//                       <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
//                     </View>
//                     <View style={styles.attribute}>
//                       <Text style={styles.attributeLabel}>Size: </Text>
//                       <Text style={styles.attributeValue}>{item.size}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.quantityContainer}>
//                     <TouchableOpacity 
//                       onPress={() => updateQuantity(index, item.quantity - 1)}
//                       style={styles.quantityButton}
//                     >
//                       <Ionicons name="remove" size={16} />
//                     </TouchableOpacity>

//                     <Text style={styles.quantityText}>{item.quantity}</Text>

//                     <TouchableOpacity 
//                       onPress={() => updateQuantity(index, item.quantity + 1)}
//                       style={styles.quantityButton}
//                     >
//                       <Ionicons name="add" size={16} />
//                     </TouchableOpacity>
//                   </View>

//                   <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
//                 </View>

//                 <TouchableOpacity 
//                   onPress={() => removeItem(index)}
//                   style={styles.removeButton}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#FF3E3E" />
//                 </TouchableOpacity>
//               </View>
//             ))}

//             <View style={styles.summaryContainer}>
//               <Text style={styles.summaryTitle}>Order Summary</Text>

//               <View style={styles.summaryRow}>
//                 <Text>Subtotal:</Text>
//                 <Text>${calculateSubtotal().toFixed(2)}</Text>
//               </View>

//               <View style={styles.summaryRow}>
//                 <Text>Shipping:</Text>
//                 <Text>Free</Text>
//               </View>

//               <View style={styles.summaryRow}>
//                 <Text>Tax (10%):</Text>
//                 <Text>${calculateTax().toFixed(2)}</Text>
//               </View>

//               <View style={styles.divider} />

//               <View style={[styles.summaryRow, { marginTop: 10 }]}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
//                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>${calculateTotal().toFixed(2)}</Text>
//               </View>
//             </View>
//           </>
//         ) : (
//           <View style={styles.emptyCart}>
//             <Ionicons name="cart-outline" size={60} color="#ccc" />
//             <Text style={styles.emptyText}>Your cart is empty</Text>
//             <TouchableOpacity 
//               style={styles.continueShopping}
//               onPress={() => router.replace('/')}
//             >
//               <Text style={styles.continueText}>Continue Shopping</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>

//       {cartItems.length > 0 && (
//         <TouchableOpacity 
//           style={styles.checkoutButton}
//           onPress={() => router.push('/Checkout')}
//         >
//           <Text style={styles.checkoutText}>Proceed to Checkout</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f5f5f5',
//     alignItems: 'center',
//   },
//   itemImage: {
//     width: 80,
//     height: 100,
//     marginRight: 15,
//     resizeMode: 'contain',
//     borderRadius: 8,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 2,
//   },
//   itemType: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   itemAttributes: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     gap: 15,
//   },
//   attribute: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   attributeLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   attributeValue: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   colorIndicator: {
//     width: 15,
//     height: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   quantityButton: {
//     padding: 4,
//   },
//   quantityText: {
//     marginHorizontal: 10,
//     fontWeight: '600',
//   },
//   itemPrice: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   removeButton: {
//     padding: 8,
//     alignSelf: 'flex-start',
//   },
//   summaryContainer: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: 15,
//   },
//   checkoutButton: {
//     backgroundColor: '#000',
//     marginHorizontal: 20,
//     marginBottom: 20,
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   emptyCart: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     marginVertical: 15,
//   },
//   continueShopping: {
//     backgroundColor: '#000',
//     padding: 12,
//     borderRadius: 8,
//   },
//   continueText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkout from './Checkout';

const MAX_UNIQUE_ITEMS = 4;

const CartScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartFromStorage = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCartItems(JSON.parse(storedCart));
    };
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    if (params.newCartItem) {
      const newItem = JSON.parse(params.newCartItem);

      setCartItems(prevItems => {
        const existingIndex = prevItems.findIndex(
          item => item.id === newItem.id && 
                   item.color === newItem.color && 
                   item.size === newItem.size
        );

        if (existingIndex >= 0) {
          const updatedItems = [...prevItems];
          updatedItems[existingIndex].quantity += newItem.quantity;
          AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
          return updatedItems;
        } else {
          if (prevItems.length >= MAX_UNIQUE_ITEMS) {
            Alert.alert('Limit Reached', `You can only add up to ${MAX_UNIQUE_ITEMS} unique products.`);
            return prevItems;
          }
          const updatedItems = [...prevItems, newItem];
          AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
          return updatedItems;
        }
      });
    }
  }, [params.newCartItem]);

  const removeItem = async (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const calculateTax = () => calculateSubtotal() * 0.1;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemType}>{item.type}</Text>

                  <View style={styles.itemAttributes}>
                    <View style={styles.attribute}>
                      <Text style={styles.attributeLabel}>Color: </Text>
                      <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                    </View>
                    <View style={styles.attribute}>
                      <Text style={styles.attributeLabel}>Size: </Text>
                      <Text style={styles.attributeValue}>{item.size}</Text>
                    </View>
                  </View>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      onPress={() => updateQuantity(index, item.quantity - 1)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="remove" size={16} />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity 
                      onPress={() => updateQuantity(index, item.quantity + 1)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="add" size={16} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>

                <TouchableOpacity 
                  onPress={() => removeItem(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3E3E" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text>Subtotal:</Text>
                <Text>${calculateSubtotal().toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text>Shipping:</Text>
                <Text>Free</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text>Tax (10%):</Text>
                <Text>${calculateTax().toFixed(2)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={[styles.summaryRow, { marginTop: 10 }]}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>${calculateTotal().toFixed(2)}</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <Ionicons name="cart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity 
              style={styles.continueShopping}
              onPress={() => router.replace('/')}
            >
              <Text style={styles.continueText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => router.push('/Checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 100,
    marginRight: 15,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemAttributes: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 15,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attributeLabel: {
    fontSize: 14,
    color: '#666',
  },
  attributeValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  colorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    marginHorizontal: 10,
    fontWeight: '600',
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  summaryContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  checkoutButton: {
    backgroundColor: '#000',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginVertical: 15,
  },
  continueShopping: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});