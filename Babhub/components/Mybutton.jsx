import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React from 'react'

const Mybutton = ({btntitle,onPress}) => {
    

  return (
    <View>
         <TouchableOpacity style={styles.loginButton} onPress={onPress}>  
                <Text style={styles.loginText} >{btntitle}</Text>
              </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 134,
        borderRadius: 25,
        marginTop: 16,
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Mybutton
