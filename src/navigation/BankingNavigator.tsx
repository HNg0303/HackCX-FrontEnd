import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { DepositScreen } from '../features/banking/screens/DepositScreen';
import { InvestmentScreen } from '../features/banking/screens/InvestmentScreen';
import { SavingsScreen } from '../features/banking/screens/SavingsScreen';

const Tab = createBottomTabNavigator();

export const BankingNavigator: React.FC = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="credit_loan" component={SavingsScreen} />
      <Tab.Screen name="stock_investment" component={InvestmentScreen} />
      <Tab.Screen name="deposit" component={DepositScreen} />
    </Tab.Navigator>
  );
}; 