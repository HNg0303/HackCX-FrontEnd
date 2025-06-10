import { NavigationContainer } from '@react-navigation/native';
import 'expo-router/entry';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BankingNavigator } from './src/navigation/BankingNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BankingNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 