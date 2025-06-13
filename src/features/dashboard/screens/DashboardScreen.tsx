import { apiService } from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatWidget } from '../../chat/components/ChatWidget';

// TODO: Replace with actual user data from authentication
const mockUser = {
  name: 'Huyen Trang',
  totalBalance: 2500000.00,
  savingsBalance: 1500000.00,
  investmentBalance: 800000.00,
  depositBalance: 200000.00,
};
const MOCK_USER_ID = 'user_001';

type ProductType = "deposit" | "credit_loan" | "stock_investment";

const product_list: ProductType[] = ["deposit", "credit_loan", "stock_investment"];

export const DashboardScreen: React.FC = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/login');
  };

  const navigateToProduct = async (product: ProductType) => {
    try {
      // Update frequency before navigation
      await apiService.updateFrequency({
        user_id: MOCK_USER_ID,
        product: product
      });
      
      // Navigate to the appropriate screen using href with type assertion
      const routeMap = {
        'deposit': '/deposit' as const,
        'credit_loan': '/credit_loan' as const,
        'stock_investment': '/stock_investment' as const
      };
      // Use type assertion to tell TypeScript these are valid routes
      router.push(routeMap[product] as any);
    } catch (error) {
      console.error('Error updating frequency:', error);
      // Still navigate even if frequency update fails
      const routeMap = {
        'deposit': '/deposit' as const,
        'credit_loan': '/credit_loan' as const,
        'stock_investment': '/stock_investment' as const
      } as const;
      
      // Use type assertion to tell TypeScript these are valid routes
      router.push(routeMap[product] as any);
    }
  };

  const handleNavigateToChat = async () => {
    try {
      // TODO: Replace with actual user ID from authentication
      // Fetch recommendations before navigating
      const response = await apiService.getRecommendation(MOCK_USER_ID);
      
      if (response.success) {
        // Pass recommendations to chat screen through router params
        router.push({
          pathname: '/chat',
          params: { recommendations: JSON.stringify(response.recommendations) }
        });
      } else {
        // If recommendations fetch fails, still navigate but without recommendations
        router.push('/chat');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Navigate to chat even if recommendations fail
      router.push('/chat');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{mockUser.name}</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              onPress={handleNavigateToChat} 
              style={styles.headerButton}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
              <Ionicons name="log-out-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${mockUser.totalBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Your Products</Text>
          
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigateToProduct('deposit')}
          >
            <View style={styles.productIcon}>
              <Ionicons name="time-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Fixed Deposits</Text>
              <Text style={styles.productBalance}>
                ${mockUser.depositBalance.toFixed(2)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigateToProduct('credit_loan')}
          >
            <View style={styles.productIcon}>
              <Ionicons name="card-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Credit & Loans</Text>
              <Text style={styles.productBalance}>View Options</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigateToProduct('stock_investment')}
          >
            <View style={styles.productIcon}>
              <Ionicons name="bar-chart-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Stock Investment</Text>
              <Text style={styles.productBalance}>View Options</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ChatWidget />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  productsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  productBalance: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
}); 