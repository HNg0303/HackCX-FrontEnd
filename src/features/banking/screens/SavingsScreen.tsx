import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Account } from '../types';

export const SavingsScreen: React.FC = () => {
  // TODO: Implement account fetching logic
  const mockAccount: Account = {
    id: '1',
    accountNumber: 'CRED123456789',
    type: 'CREDIT_LOAN',
    balance: 5000.00,
    currency: 'USD',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Credit Loan Account</Text>
          <Text style={styles.accountNumber}>Account: {mockAccount.accountNumber}</Text>
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>
            {mockAccount.currency} {mockAccount.balance.toFixed(2)}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          {/* TODO: Add action buttons for deposit, withdraw, transfer */}
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {/* TODO: Add transaction list */}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  accountNumber: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  balanceContainer: {
    padding: 20,
    backgroundColor: '#007AFF',
    margin: 15,
    borderRadius: 10,
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
    marginTop: 5,
  },
  actionsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
  },
  transactionsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
}); 