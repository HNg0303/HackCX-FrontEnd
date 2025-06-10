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
            case 'Savings':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Investments':
              iconName = focused ? 'trending-up' : 'trending-up-outline';
              break;
            case 'Deposits':
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
      <Tab.Screen name="Savings" component={SavingsScreen} />
      <Tab.Screen name="Investments" component={InvestmentScreen} />
      <Tab.Screen name="Deposits" component={DepositScreen} />
    </Tab.Navigator>
  );
}; 