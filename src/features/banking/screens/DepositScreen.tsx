import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Deposit } from '../types';

export const DepositScreen: React.FC = () => {
  // TODO: Implement deposit fetching logic
  const mockDeposits: Deposit[] = [
    {
      id: '1',
      accountId: 'DEP123456789',
      amount: 15000.00,
      term: 12,
      interestRate: 3.5,
      startDate: new Date('2024-01-01'),
      maturityDate: new Date('2025-01-01'),
      status: 'ACTIVE',
    },
    {
      id: '2',
      accountId: 'DEP123456789',
      amount: 8000.00,
      term: 6,
      interestRate: 3.0,
      startDate: new Date('2024-02-01'),
      maturityDate: new Date('2024-08-01'),
      status: 'ACTIVE',
    },
  ];

  const totalDeposits = mockDeposits.reduce((sum, dep) => sum + dep.amount, 0);
  const averageInterestRate = mockDeposits.reduce((sum, dep) => sum + dep.interestRate, 0) / mockDeposits.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Fixed Deposits</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Deposits</Text>
            <Text style={styles.summaryValue}>${totalDeposits.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Average Interest Rate</Text>
            <Text style={styles.summaryValue}>{averageInterestRate.toFixed(1)}%</Text>
          </View>
        </View>

        <View style={styles.depositsContainer}>
          <Text style={styles.sectionTitle}>Your Deposits</Text>
          {mockDeposits.map((deposit) => (
            <View key={deposit.id} style={styles.depositCard}>
              <View style={styles.depositHeader}>
                <Text style={styles.depositTerm}>{deposit.term} Months</Text>
                <Text style={styles.depositStatus}>{deposit.status}</Text>
              </View>
              <Text style={styles.depositAmount}>${deposit.amount.toFixed(2)}</Text>
              <Text style={styles.depositInterest}>Interest Rate: {deposit.interestRate}%</Text>
              <View style={styles.depositDates}>
                <Text style={styles.depositDate}>
                  Start: {deposit.startDate.toLocaleDateString()}
                </Text>
                <Text style={styles.depositDate}>
                  Maturity: {deposit.maturityDate.toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionsContainer}>
          {/* TODO: Add action buttons for new deposit, early withdrawal, etc. */}
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
  summaryContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  depositsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  depositCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  depositHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  depositTerm: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  depositStatus: {
    fontSize: 14,
    color: '#007AFF',
  },
  depositAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  depositInterest: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  depositDates: {
    marginTop: 5,
  },
  depositDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  actionsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
  },
}); 