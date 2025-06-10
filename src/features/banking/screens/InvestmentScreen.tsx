import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Investment } from '../types';

export const InvestmentScreen: React.FC = () => {
  // TODO: Implement investment fetching logic
  const mockInvestments: Investment[] = [
    {
      id: '1',
      accountId: 'INV123456789',
      type: 'Stocks',
      amount: 10000.00,
      returnRate: 7.5,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'ACTIVE',
    },
    {
      id: '2',
      accountId: 'INV123456789',
      type: 'Bonds',
      amount: 5000.00,
      returnRate: 4.2,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-02-01'),
      status: 'ACTIVE',
    },
  ];

  const totalInvestment = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const averageReturnRate = mockInvestments.reduce((sum, inv) => sum + inv.returnRate, 0) / mockInvestments.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Investment Portfolio</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Investment</Text>
            <Text style={styles.summaryValue}>${totalInvestment.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Average Return Rate</Text>
            <Text style={styles.summaryValue}>{averageReturnRate.toFixed(1)}%</Text>
          </View>
        </View>

        <View style={styles.investmentsContainer}>
          <Text style={styles.sectionTitle}>Your Investments</Text>
          {mockInvestments.map((investment) => (
            <View key={investment.id} style={styles.investmentCard}>
              <View style={styles.investmentHeader}>
                <Text style={styles.investmentType}>{investment.type}</Text>
                <Text style={styles.investmentStatus}>{investment.status}</Text>
              </View>
              <Text style={styles.investmentAmount}>${investment.amount.toFixed(2)}</Text>
              <Text style={styles.investmentReturn}>Return Rate: {investment.returnRate}%</Text>
              <Text style={styles.investmentDate}>
                {investment.startDate.toLocaleDateString()} - {investment.endDate.toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsContainer}>
          {/* TODO: Add action buttons for new investment, withdraw, etc. */}
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
  investmentsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  investmentCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  investmentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  investmentStatus: {
    fontSize: 14,
    color: '#007AFF',
  },
  investmentAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  investmentReturn: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  investmentDate: {
    fontSize: 12,
    color: '#999',
  },
  actionsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
  },
}); 