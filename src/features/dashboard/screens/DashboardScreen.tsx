import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO: Replace with actual user data from authentication
const mockUser = {
  name: 'John Doe',
  totalBalance: 25000.00,
  savingsBalance: 15000.00,
  investmentBalance: 8000.00,
  depositBalance: 2000.00,
};

export const DashboardScreen: React.FC = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/login');
  };

  const navigateToProduct = (product: string) => {
    router.push(`/${product}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{mockUser.name}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${mockUser.totalBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Your Products</Text>
          
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigateToProduct('savings')}
          >
            <View style={styles.productIcon}>
              <Ionicons name="wallet-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Savings Account</Text>
              <Text style={styles.productBalance}>
                ${mockUser.savingsBalance.toFixed(2)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigateToProduct('investments')}
          >
            <View style={styles.productIcon}>
              <Ionicons name="trending-up-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Investments</Text>
              <Text style={styles.productBalance}>
                ${mockUser.investmentBalance.toFixed(2)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigateToProduct('deposits')}
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
        </View>
      </ScrollView>
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
  logoutButton: {
    padding: 8,
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