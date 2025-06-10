import React from 'react';
import { View, Text, Button, Image } from 'react-native';

// Adjust the path if your image is in a different location
import registerUIImage from '../../assets/images/register_ui.png';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Custom Register UI Image */}
      <Image
        source={registerUIImage}
        style={{ width: 200, height: 200, marginBottom: 20 }} // Adjust size as needed
        resizeMode="contain"
      />
      <Text>Register Screen Placeholder</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen; 