import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// TODO: Replace with actual auth state management
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Check authentication status
    // For now, always show login screen
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Auth screens
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
          </>
        ) : (
          // App screens
          <>
            <Stack.Screen name="dashboard" />
            <Stack.Screen name="credit_loan" />
            <Stack.Screen name="stock_investment" />
            <Stack.Screen name="deposit" />
            <Stack.Screen name="chat" />
            <Stack.Screen name="transaction" />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export function AppLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'credit_loan':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'stock_investment':
              iconName = focused ? 'trending-up' : 'trending-up-outline';
              break;
            case 'deposit':
              iconName = focused ? 'time' : 'time-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="credit_loan"
        options={{
          title: 'credit_loan',
        }}
      />
      <Tabs.Screen
        name="stock_investment"
        options={{
          title: 'stock_investment',
        }}
      />
      <Tabs.Screen
        name="deposit"
        options={{
          title: 'deposit',
        }}
      />
    </Tabs>
  );
}
